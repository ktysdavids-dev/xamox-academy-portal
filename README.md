# Xamox Academy — Portal del alumno

Aplicación **Next.js 15** + **PostgreSQL** + **Auth.js** + **Stripe** para el campus en **app.xamoxacademy.com**. La venta sigue en Webflow (**www.xamoxacademy.com**).

Incluye: matrícula automática tras pago, acceso con enlace de éxito, contraseña, panel de alumno, **panel de administración** (cursos, módulos, lecciones, PDFs, enlaces, subida de archivos con Vercel Blob), y webhook de Stripe.

## Repositorio

**https://github.com/ktysdavids-dev/xamox-academy-portal** (sustituye por el tuyo si hiciste fork)

## Desarrollo local

1. Crea base PostgreSQL (local o Render) y copia `DATABASE_URL`.
2. Configura variables (ver `.env.example`).

```bash
npm install
cp .env.example .env.local
# edita .env.local
npx prisma migrate dev
npm run db:seed
npm run dev
```

- **Alumnos:** [http://localhost:3000/login](http://localhost:3000/login) (tras matrícula simulada o flujo Stripe de prueba).
- **Admin:** el email debe estar en `ADMIN_EMAILS` → [http://localhost:3000/admin](http://localhost:3000/admin)

## Stripe (pago en la web)

1. **Clave secreta** en `STRIPE_SECRET_KEY` (panel Stripe → API keys).
2. **Link o Checkout de pago** (el que ya usas en xamoxacademy.com):
   - **URL de éxito (Success URL):**  
     `https://app.xamoxacademy.com/campus/continue?session_id={CHECKOUT_SESSION_ID}`  
     (en pruebas: `http://localhost:3000/campus/continue?session_id={CHECKOUT_SESSION_ID}`).
   - **Metadata (recomendado):** clave `courseSlug` = `cohorte-01` (debe existir en la base; el seed lo crea). Si no envías metadata, se usa el curso por defecto `cohorte-01`.
3. **Webhook:** URL `https://app.xamoxacademy.com/api/stripe/webhook` (o tu URL de Render), evento `checkout.session.completed`, y pega el **signing secret** en `STRIPE_WEBHOOK_SECRET`.

Tras pagar, el usuario entra en `/campus/continue` → se crea/actualiza la cuenta y la matrícula → sesión con token de un solo uso → debe **crear contraseña** → ya puede usar `/login` cuando quiera.

## Panel de administración

- Ruta: **`/admin`** (solo usuarios cuyo email figure en `ADMIN_EMAILS`).
- Ahí gestionas **cursos → módulos → lecciones** y materiales (Markdown, vídeo por URL YouTube u otro enlace, PDF/enlaces/imagen/vídeo por URL o subida con **Vercel Blob** si defines `BLOB_READ_WRITE_TOKEN`).

## Desplegar en Render

Blueprint `render.yaml`: crea Postgres + Web Service y ejecuta **`preDeployCommand: npx prisma migrate deploy`**.

1. [Deploy to Render](https://render.com/deploy?repo=https://github.com/ktysdavids-dev/xamox-academy-portal) (ajusta el repo si cambió).
2. En **Environment**, rellena manualmente:
   - `NEXTAUTH_SECRET` (cadena larga aleatoria),
   - `ADMIN_EMAILS`,
   - `STRIPE_SECRET_KEY`,
   - `STRIPE_WEBHOOK_SECRET`,
   - opcional `BLOB_READ_WRITE_TOKEN`,
   - comprueba `NEXTAUTH_URL` y `NEXT_PUBLIC_SITE_URL` con tu URL real (`*.onrender.com` o dominio propio).
3. Tras el primer deploy estable, en **Shell** de Render:  
   `npx prisma db seed`  
   (crea el curso `cohorte-01` y una lección de ejemplo).

## Licencia

Propiedad de Xamox Academy. Uso según tu política interna.
