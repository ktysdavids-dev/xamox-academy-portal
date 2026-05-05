# Xamox Academy — Portal del alumno

Aplicación **Next.js** para el campus en **app.xamoxacademy.com**. La landing de ventas sigue en Webflow (**www.xamoxacademy.com**).

## Desarrollo local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Subir a GitHub

```bash
cd /ruta/al/proyecto
git status
git remote add origin https://github.com/TU_USUARIO/xamox-academy-portal.git
git branch -M main
git push -u origin main
```

(Crea antes el repositorio vacío en GitHub.)

## Desplegar en Render

1. **New** → **Blueprint** (o **Web Service** si prefieres un solo servicio).
2. Conecta el repositorio de GitHub y selecciona la rama `main`.
3. Render detectará `render.yaml`. Confirma región y plan.
4. Variables: revisa `NEXT_PUBLIC_SITE_URL` (por defecto `https://app.xamoxacademy.com`). Ajusta si tu URL de Render es temporal (`*.onrender.com`).
5. Tras el deploy, en **Settings** → **Custom Domain**, añade **app.xamoxacademy.com** y configura el **CNAME** en tu DNS tal como indica Render.

Render inyecta `PORT` automáticamente; `next start` lo usa sin cambios.

## Qué incluye este MVP

- Página de entrada del portal, login (demo) y panel **Mis cursos** con datos de ejemplo.
- Sustituye el login demo por **NextAuth**, **Clerk**, **Supabase Auth**, etc., y los cursos por tu API, CMS o integración con Hotmart u otro proveedor.

## Licencia

Propiedad de Xamox Academy. Uso según tu política interna.
