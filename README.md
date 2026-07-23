# Sitio web — Podología Clínica Torres

Sitio estático (HTML + CSS + JS, sin frameworks) listo para publicar en GitHub Pages.

## Estructura

```
index.html          página principal
css/style.css        estilos (colores y tipografía según la Guía de Marca 2026)
js/script.js          menú móvil, año dinámico y animaciones de aparición
assets/images/        fotos de casos clínicos (antes/después)
robots.txt            indicaciones para buscadores
sitemap.xml            mapa del sitio para SEO
```

## Publicar en GitHub Pages

1. Crea un repositorio en GitHub (por ejemplo `podologia-clinica-torres`).
2. Sube todo el contenido de esta carpeta a la raíz del repositorio (no dentro de una subcarpeta).
3. Ve a **Settings → Pages**.
4. En "Source" elige la rama `main` y la carpeta `/ (root)`.
5. Guarda. GitHub te dará una URL como `https://tu-usuario.github.io/podologia-clinica-torres/`.
6. Si más adelante usas un dominio propio (ej. `podologiaclinicatorres.cl`), configúralo en la misma sección "Pages" y actualiza las URLs en `index.html`, `robots.txt` y `sitemap.xml` (ahora mismo apuntan a `https://podologiaclinicatorres.cl/` como referencia).

## Notas de SEO

- El `<title>`, la meta descripción, Open Graph, Twitter Card y los datos estructurados (JSON-LD tipo `Podiatric`) ya están cargados con la información de la clínica.
- Actualiza `https://podologiaclinicatorres.cl/` en `index.html`, `sitemap.xml` y `robots.txt` por la URL real una vez que definas el dominio final (la de GitHub Pages o un dominio propio).
- Las imágenes de casos clínicos incluyen texto alternativo (`alt`) descriptivo para accesibilidad y SEO.

## Personalización rápida

- **Colores y tipografía:** variables CSS al inicio de `css/style.css` (`:root`).
- **Textos de servicios:** sección `#servicios` en `index.html`.
- **Mapa:** el `iframe` en la sección `#ubicacion` usa las coordenadas de Av. Providencia 2237 sin necesidad de una API key de Google Maps.
- **Botón de WhatsApp:** enlaza a `https://wa.me/56979159787` con un mensaje precargado.
