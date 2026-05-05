# Xamox Academy — Portal del alumno

Aplicación **Next.js** para el campus en **app.xamoxacademy.com**. La landing de ventas sigue en Webflow (**www.xamoxacademy.com**).

## Repositorio (GitHub)

Código publicado y listo para desplegar:

**https://github.com/ktysdavids-dev/xamox-academy-portal**

## Desplegar en Render (un clic)

Pulsa el botón, inicia sesión en Render, autoriza el repositorio y aplica el Blueprint (`render.yaml` ya está en la raíz):

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/ktysdavids-dev/xamox-academy-portal)

Después del primer deploy:

1. Si Render te da una URL `*.onrender.com`, en **Environment** ajusta `NEXT_PUBLIC_SITE_URL` a esa URL (para metadata/SEO) hasta que tengas el dominio propio.
2. **Settings** → **Custom Domain** → añade **app.xamoxacademy.com** y en tu DNS el **CNAME** que indique Render.

## Desarrollo local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Qué incluye este MVP

- Página de entrada del portal, login (demo) y panel **Mis cursos** con datos de ejemplo.
- Sustituye el login demo por **NextAuth**, **Clerk**, **Supabase Auth**, etc., y los cursos por tu API, CMS o integración con Hotmart u otro proveedor.

## Licencia

Propiedad de Xamox Academy. Uso según tu política interna.
