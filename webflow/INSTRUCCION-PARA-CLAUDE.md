# Instrucción para Claude AI — Landing Xamox Academy

Copia y pega esto en Claude (mejor con el modelo Sonnet o superior y un proyecto
con artefactos activado) cuando quieras iterar la landing.

---

## Contexto

Eres un senior front-end + diseño de producto. Vamos a iterar el embed HTML
único que se pega en Webflow para la landing **Xamox Academy** —
`www.xamoxacademy.com`. La landing es la cara comercial; toda la conversión
ocurre en el sistema unificado **`https://campus.xamoxacademy.com`**
(formulario mentoría, compra Stripe y campus de alumnos).

## Reglas no negociables

1. **Un solo bloque** — un único componente Embed de Webflow:
   `<link>` de fonts + `<style>` + `<div class="xa">…</div>` + `<script>`.
   Nada de archivos externos.
2. **No depender de scripts de Webflow** — debe poder pegarse en cualquier sitio.
3. **Mobile-first**. Hasta 360px de ancho, todo debe ser usable y bonito.
4. **Marca real** (no inventes nada):
   - Logo: `https://cdn.prod.website-files.com/69e4bb201906d98ef968b09b/69f5ec5f70b2617c1524c29a_Logo%20Xamox%20Academy.webp`
   - Paleta:
     - Profundo `#060B17`, noche `#0B1426`, líneas `rgba(220,232,255,.08)`
     - Oro `#D4AF37`, oro brillante `#F4C430`
     - Cyan accent `#2DD4FF`, magenta accent `#D6336C`
   - Tipografías: **Fraunces** (display, italic para resaltes), **Inter Tight**
     (sans), **JetBrains Mono** (caps tracking).
5. **CTAs canónicos**:
   - Mentoría gratis → `https://campus.xamoxacademy.com/mentoria`
   - Compra cohorte → `https://campus.xamoxacademy.com/comprar` (redirige a Stripe)
   - Campus alumno → `https://campus.xamoxacademy.com/dashboard`
   - Nunca enlaces a `xamox-mentoria.onrender.com` (servicio retirado).
6. **Tracking**: cada CTA lleva `data-track="<nombre>"` y, si aplica,
   `data-fb-event="Lead" | "InitiateCheckout" | "Purchase"`. Un solo script
   al final dispara `dataLayer`, `gtag`, y `fbq` si están presentes (sin
   romper si no).
7. **Schema.org JSON-LD** al final del embed con `Organization`, `Course` y
   `Event` (mentoría 24/05/2026 19:00 CEST, edición 01/06/2026–24/06/2026).
8. **Accesibilidad**: skip-to-content, aria-labels en secciones, contraste
   AA, `prefers-reduced-motion` respetado, focus visible.
9. **Performance**: una sola fuente Google con `display=swap`, hero `fetchpriority="high"`,
   resto de imágenes `loading="lazy"`. Sin librerías externas.
10. **Sticky bottom CTA en móviles** (<=760px) que aparece al pasar el hero.

## Estructura obligatoria (en este orden)

1. NAV (logo + CTA mini "Reservar plaza")
2. HERO (logo grande con halo, eyebrow, h1, lede, CTA primario+secundario, contador metas)
3. VSL (placeholder para vídeo de 80s — comentar `[VSL_EMBED]` para sustituir)
4. MENTORÍA (bloque del 24 mayo con fecha grande + CTA gratis)
5. STACK (5 tarjetas: Claude, Cursor, GitHub, Render, Webflow)
6. PROGRAMA (8 sesiones en grid 2×4)
7. BONUS + COUNTDOWN al 27 mayo 23:59 CEST con CTA de compra
8. PRECIO (2 tarjetas: Live €149 destacado, Recordings €49)
9. CTA FINAL (mentoría gratis)
10. FOOTER (4 columnas: marca, acceso, grupo, legal)
11. STICKY CTA mobile

## Animaciones permitidas

- Halo cursor con `mix-blend-mode: screen` (desktop only).
- Particles dorados flotando en el hero.
- Reveal-on-scroll con `IntersectionObserver`.
- Counters animados.
- Magnetic buttons (desktop only).
- Parallax sutil en el logo del hero.
- Pulse halo y blink puntos rojos.

Todo debe respetar `@media (prefers-reduced-motion: reduce)`.

## Output

Devuelve **un único bloque HTML** listo para pegar en Webflow → Embed,
con cabecera `<!-- XAMOX ACADEMY · LANDING EMBED v<X> -->` y un changelog
breve dentro del comentario inicial.

## Cambios concretos que quiero en esta iteración

> 👉 Aquí tú (David) describes lo que quieres cambiar en cada vuelta:
> "añade testimonios", "cambia el bonus", "rediseña la sección de precios", etc.
