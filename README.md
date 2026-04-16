# CAONGD Data Explorer V3

Plataforma interactiva de datos lista para GitHub, con navegación superior premium, filtros por URL, comparador anual y mapas integrados.

## Arranque

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Qué incluye

- React + Vite
- navegación superior premium estilo Apple
- páginas de Resumen, Andalucía, Otros países, Base social, ONGD y Comparador
- filtros cruzados sincronizados con la URL
- mapa de Andalucía y mapa mundial con Leaflet
- tablas y rankings conectados al JSON
- comparativa anual base 2023 / 2024

## Estructura de datos

Los datasets están en:

- `public/data/data-2023.json`
- `public/data/data-2024.json`

La edición 2024 incluida es una **edición demo derivada** para mostrar la arquitectura comparativa. Sustituye ese archivo por la edición real cuando la tengas.

## Subir a GitHub

1. Crea un repositorio nuevo.
2. Copia estos archivos al repositorio.
3. Ejecuta:

```bash
git init
git add .
git commit -m "CAONGD Data Explorer V3"
git branch -M main
git remote add origin TU_URL_DEL_REPO
git push -u origin main
```

## Despliegue

Puedes desplegarlo en Vercel o Netlify sin cambios adicionales.
