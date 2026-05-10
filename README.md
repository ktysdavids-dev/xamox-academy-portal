# Xamox Academy — Sistema unificado

Aplicación **Next.js 15** + **PostgreSQL** + **Auth.js** + **Stripe** que centraliza
todo el ciclo de vida del alumno de Xamox Academy en una sola app.

Sustituye a los dos servicios anteriores (`xamox-mentoria.onrender.com` y
`xamox-academy-portal.onrender.com`) y los reemplaza por un único portal:

```
Webflow www.xamoxacademy.com  ──►  /mentoria  (inscripción gratis)
                                       │
                                       ▼
                                 Campus alumno
                                       │
                                       ├─►  /comprar  (Stripe Payment Link)
                                       └─►  /dashboard (cursos, lecciones)
                                                │
                                                └─►  /admin (solo super-admin)
```

## Rutas principales

| Ruta | Para quién | Función |
|---|---|---|
| `/` | Público | Home institucional con acceso al campus, mentoría y compra |
| `/mentoria` | Público | Formulario gratuito al que redirige la landing de Webflow. Crea cuenta + matrícula automática + acceso al campus |
| `/comprar` | Público | Redirección al Payment Link de Stripe activo |
| `/login` | Alumno | Inicio de sesión con email + contraseña, o token de un solo uso desde Stripe |
| `/dashboard` | Alumno | Cursos matriculados, materiales, próximas sesiones |
| `/dashboard/cursos/[slug]` | Alumno | Detalle de un curso |
| `/dashboard/leccion/[lessonId]` | Alumno | Lección con vídeo, markdown y materiales |
| `/admin` | Super-admin | Métricas y gestión |
| `/admin/courses` | Super-admin | CRUD de cursos, módulos, lecciones, materiales |
| `/api/stripe/webhook` | Sistema | Recibe `checkout.session.completed` y matricula al pagador |
| `/campus/continue` | Sistema | Success URL de Stripe → token + matrícula automática |
| `/auth/continue` | Sistema | Consume el token de un solo uso y abre sesión |

## Stack

- Next.js 15 (App Router, RSC, Server Actions)
- Auth.js (next-auth 5 beta) con sesión JWT
- Prisma 5 + PostgreSQL (Render Postgres)
- Stripe (Payment Link + webhook)
- Tailwind CSS + componentes propios

## Modelo de datos

`User` (con role STUDENT/ADMIN) → `Enrollment` → `Course` → `Module` → `Lesson` → `Material`.
También `OneTimeLogin` (acceso desde Stripe) y `StripeEvent` (idempotencia del webhook).

## Variables de entorno

```bash
# Postgres (Render lo inyecta automáticamente vía Blueprint)
DATABASE_URL=

# Auth.js
NEXTAUTH_SECRET=    # 48+ chars aleatorios
NEXTAUTH_URL=       # URL pública del portal

# URL pública del portal (para emails y CTAs)
NEXT_PUBLIC_SITE_URL=

# Stripe
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PAYMENT_LINK=https://buy.stripe.com/bJedR894Nfosb9ZaL46Na00

# Admins (separados por coma, sin espacios)
ADMIN_EMAILS=ktysdavids@gmail.com

# Cuentas iniciales (se crean en cada deploy si no existen)
BOOTSTRAP_ADMIN_EMAIL=ktysdavids@gmail.com
BOOTSTRAP_ADMIN_PASSWORD=…
BOOTSTRAP_STUDENT_EMAIL=djxamo13@gmail.com
BOOTSTRAP_STUDENT_PASSWORD=…

# Opcional: subida de archivos a Vercel Blob
BLOB_READ_WRITE_TOKEN=
```

## Desarrollo local

```bash
npm install
cp .env.example .env.local
# rellena variables
npx prisma migrate dev
npm run db:seed
npm run dev
```

## Deploy en Render

El blueprint `render.yaml` crea Postgres + Web Service y ejecuta:

- `npm ci && npm run build` (build)
- `npx prisma migrate deploy && npm run db:seed` (preDeploy → migra y crea/actualiza usuarios bootstrap)
- `npm start` (runtime)

Configura los secretos `NEXTAUTH_SECRET`, `STRIPE_*`, `BOOTSTRAP_*_PASSWORD`,
`ADMIN_EMAILS` y opcional `BLOB_READ_WRITE_TOKEN` en Environment.

## Stripe

1. Payment Link activo: `https://buy.stripe.com/bJedR894Nfosb9ZaL46Na00`
2. Success URL: `https://<tu-portal>/campus/continue?session_id={CHECKOUT_SESSION_ID}`
3. Webhook: `https://<tu-portal>/api/stripe/webhook` · evento
   `checkout.session.completed` · pega el signing secret en `STRIPE_WEBHOOK_SECRET`
4. Metadata recomendada: `courseSlug=cohorte-01` (default si vacío)

## Licencia

Propiedad de Xamox Academy. Uso según política interna.
