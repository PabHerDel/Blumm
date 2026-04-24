# Sitio estático — Referencia Field Studies Flora

## Estructura

```
site/
├── index.html          Home (hero 100vh, sin scroll)
├── about.html          About (texto en 2 columnas)
├── vision.html         Vision (texto en 2 columnas)
├── education.html      Imagen sticky + índice editorial
├── work.html           Galería asimétrica de 12 columnas
├── clients.html        Listado tipográfico
│
├── css/
│   └── styles.css      Hoja de estilos compartida por todas las páginas
│
├── js/
│   └── main.js         Toggle del menú mobile + fade-in observer
│
├── fonts/              Archivos .ttf de la fuente
│   └── README.txt
│
└── img/                Fotografías del sitio
    └── README.txt
```

## Cómo añadir las fuentes

Colocar los archivos en `fonts/` con los nombres:

- `LTCNicolasCochin.ttf` (regular)
- `LTCNicolasCochinItalic.ttf` (italic)

Si cambian los nombres, actualizar las rutas en el bloque 1 de
`css/styles.css`. Si sólo se tiene la regular, dejar ambas
declaraciones `@font-face` apuntando al mismo archivo o eliminar
el bloque italic.

## Cómo añadir las imágenes

Colocar las fotografías en `img/` y reemplazar los placeholders
en cada HTML.

**Home** — en `index.html`, dentro de `<section class="hero">`, borrar
el `<div class="hero-placeholder">` y descomentar la `<img class="hero-img">`.

**Education** — en `education.html`, dentro de `<div class="edu__image">`,
borrar el `<div class="edu__image-placeholder">` y descomentar la `<img>`.

**Our Work** — en `work.html`, cada `<figure class="item">` tiene un
`<div class="item__img">` como placeholder. Reemplazar por:

```html
<img class="item__img" src="img/work-01.jpg" alt="[Descripción]">
```

Mantener siempre la clase `item__img` para conservar las proporciones
(`aspect-ratio: 3/4` para verticales, `4/3` para horizontales, según
la clase del `<figure>` contenedor).

## Placeholders de texto

Buscar y reemplazar globalmente:

| Placeholder        | Qué es                                  |
|--------------------|-----------------------------------------|
| `[NOMBRE]`         | Nombre del emprendimiento               |
| `[TAGLINE]`        | Frase italic sobre el hero              |
| `[EMAIL]`          | Email de contacto                       |
| `[INSTAGRAM]`      | Handle de Instagram                     |
| `[WHATSAPP]`       | Número de WhatsApp                      |
| `[TÍTULO]`         | Título italic de about/vision           |
| `[INSTITUCIÓN / ROL]`, `[Año — Año]` | Entradas de education |
| `[Título del trabajo — Tipo de evento — Año]` | Captions en work |
| `[NOMBRE DE CLIENTE]` | Cada línea del listado en clients   |

## Paleta

Definida en `css/styles.css` bloque 2 (`:root`):

- `--color-bg: #FFFFFF`
- `--color-ink: #0A0A0A`
- `--color-mid: #555555`
- `--color-rule: #CCCCCC`
