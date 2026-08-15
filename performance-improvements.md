# Mejoras de rendimiento

Para elevar la puntuación de rendimiento del 45% al 100%, enfócate en las siguientes áreas identificadas por Lighthouse:

## 1. Optimizar imágenes
- **Problema:** Imágenes sin dimensiones explícitas, sin compresión adecuada, formatos no modernos.
- **Solución:**
  - Convierte todas las imágenes a WebP (mantén fallbacks JPEG/PNG para navegadores antiguos).
  - Especifica atributos `width` y `height` en todas las `<img>` para evitar CLS.
  - Usa `srcset` y `sizes` para servir imágenes apropiadamente según el viewport.
  - Comprende con herramientas como `imagemin` o `sharp`.
  - Usa `loading="lazy"` para imágenes fuera de viewport.

**Ejemplo antes:**
```html
<img src="hero.jpg" alt="Bienvenido">
```

**Ejemplo después:**
```html
<picture>
  <source srcset="hero.webp" type="image/webp">
  <source srcset="hero.jpg" type="image/jpeg">
  <img src="hero.jpg" alt="Bienvenido" width="1200" height="630" loading="lazy">
</picture>
```

## 2. Eliminar recursos bloqueantes de renderizado
- **Problema:** CSS y JavaScript que retrasan el primer pintura.
- **Solución:**
  - Inline CSS crítico (solo lo necesario para el above-the-fold).
  - Diferir carga de CSS no crítico con `rel="preload" as="style"` y `onload="this.rel='stylesheet'"`.
  - Mueve JavaScript no esencial al final o usa `defer`/`async`.
  - Minifica y combina archivos.

**Ejemplo:**
```html
<head>
  <link rel="preload" as="style" href="styles.css" onload="this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="styles.css"></noscript>
  <style>
    /* CSS crítico inline */
  </style>
</head>
<body>
  <!-- contenido -->
  <script src="main.js" defer></script>
</body>
```

## 3. Reducir tiempo de ejecución de JavaScript
- **Problema:** JavaScript pesado que bloquea el hilo principal.
- **Solución:**
  - Divide código grande en chunks menores (code splitting).
  - Elimina JavaScript no usado (cobertura de código).
  - Usa trabajadores web para tareas intensivas.
  - Evita manipulación DOM costosa en bucle.

## 4. Aprovechar caché del navegador
- **Problema:** Recursos sin encabezados de caché adecuados.
- **Solución:**
  - Configura el servidor para enviar encabezados `Cache-Control` y `ETag`.
  - Para recursos estáticos: `Cache-Control: public, max-age=31536000, immutable`.
  - Para recursos que cambian: usa hash en nombres de archivo (ej. `style.abc123.css`).

## 5. Minificar CSS y JavaScript
- **Problema:** Archivos con espacios, comentarios, formato legible que aumentan tamaño.
- **Solución:**
  - Usa herramientas como `csso`, `clean-css`, `terser` o `esbuild` en proceso de build.
  - Elimina comentarios y espacios innecesarios.

## 6. Optimizar fuentes web
- **Problema:** Fuentes que causan retraso de texto invisible (FOIT) o destello de texto no estilizado (FOUT).
- **Solución:**
  - Usa `font-display: swap;` en `@font-face`.
  - Preload fuentes críticas con `<link rel="preload" as="font" type="font/woff2" crossorigin>`.
  - Subconjunta fuentes para incluir solo caracteres necesarios.

## 7. Evitar diseños de página grandes (CLS)
- **Problema:** Elementos que se mueven durante la carga.
- **Solución:**
  - Siempre especifica dimensiones para imágenes, videos, iframes.
  - Reserva espacio para contenido dinámico (anuncios, embeds).
  - Evita insertar contenido encima de contenido existente excepto en respuesta a interacción del usuario.

## Checklist de implementación

[ ] Convertir imágenes a WebP con dimensiones explícitas
[ ] Inline CSS crítico y diferir no crítico
[ ] Minificar y combinar CSS/JS
[ ] Configurar encabezados de caché en servidor
[ ] Aplicar `font-display: swap` y preload fuentes
[ ] Eliminar JavaScript no usado
[ ] Verificar que todos los elementos tengan dimensiones
[ ] Auditar nuevamente con Lighthouse

## Recursos
- [Web.dev - Optimizar imágenes](https://web.dev/learn/performance/optimize-images/)
- [Web.dev - Eliminar recursos bloqueantes](https://web.dev/render-blocking-resources/)
- [Web.dev - Caching](https://web.dev/http-cache/)
- [Web.dev - Font optimization](https://web.dev/font-performance/)