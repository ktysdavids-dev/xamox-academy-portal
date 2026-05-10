/**
 * Cliente ligero para enviar emails transaccionales con Brevo (Sendinblue).
 *
 * Solo necesitamos un endpoint, así que evitamos el SDK pesado y vamos
 * directo con fetch. Si la API key falta o Brevo falla, log + no rompe
 * el flujo principal (los emails son fire-and-forget).
 *
 * Docs: https://developers.brevo.com/reference/sendtransacemail
 */

const BREVO_ENDPOINT = "https://api.brevo.com/v3/smtp/email";

export type BrevoAttachment = {
  /** Nombre del archivo con extensión (ej. "xamox-mentoria.ics") */
  name: string;
  /** Contenido en Base64 */
  content: string;
};

export type BrevoSendParams = {
  to: { email: string; name?: string };
  subject: string;
  htmlContent: string;
  textContent?: string;
  replyTo?: { email: string; name?: string };
  attachments?: BrevoAttachment[];
  /** Etiquetas Brevo, útiles para analítica/segmentación */
  tags?: string[];
  /** params para sustituir en plantillas Brevo (no usado por defecto) */
  params?: Record<string, unknown>;
};

const SENDER = {
  email: process.env.BREVO_SENDER_EMAIL ?? "info@xamoxacademy.com",
  name: process.env.BREVO_SENDER_NAME ?? "Xamox Academy",
};

const REPLY_TO = {
  email: process.env.BREVO_REPLY_TO_EMAIL ?? "info@xamoxacademy.com",
  name: process.env.BREVO_REPLY_TO_NAME ?? "Xamox Academy",
};

/**
 * Envía un email transaccional. Devuelve `true` si se envió, `false` si la
 * API key falta o Brevo respondió con error. Nunca lanza excepciones para
 * no tumbar las server actions / webhooks.
 */
export async function sendBrevoEmail(params: BrevoSendParams): Promise<boolean> {
  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.warn("[brevo] BREVO_API_KEY no configurada, salto envío");
    return false;
  }

  const payload: Record<string, unknown> = {
    sender: SENDER,
    to: [params.to],
    subject: params.subject,
    htmlContent: params.htmlContent,
    replyTo: params.replyTo ?? REPLY_TO,
  };
  if (params.textContent) payload.textContent = params.textContent;
  if (params.attachments?.length) payload.attachment = params.attachments;
  if (params.tags?.length) payload.tags = params.tags;
  if (params.params) payload.params = params.params;

  try {
    const res = await fetch(BREVO_ENDPOINT, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(
        `[brevo] envío fallido (${res.status}) → ${params.to.email}: ${text.slice(0, 300)}`
      );
      return false;
    }
    return true;
  } catch (e) {
    console.error("[brevo] error de red", e);
    return false;
  }
}
