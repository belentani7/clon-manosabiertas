# Optimización para Manos Abiertas

Este directorio contiene el plan de acción, recursos y ejemplos de código para mejorar las puntuaciones de Lighthouse del sitio https://mismanosabiertas.netlify.app y alcanzar el 100% en todas las categorías.

## Auditoría inicial (Lighthouse)

- Rendimiento: 45%
- Accesibilidad: 91%
- Mejores prácticas: 96%
- SEO: 100%
- Navegación agente: 100%

## Plan de acción

1. **Mejorar rendimiento**
   - Optimizar imágenes (formato WebP, dimensiones correctas, compresión)
   - Habilitar compresión de texto (gzip/Brotli)
   - Aprovechar caché del navegador
   - Minificar CSS y JavaScript
   - Eliminar recursos bloqueantes de renderizado
   - Usar `preload` y `preconnect` para fuentes críticas
   - Reducir tiempo de ejecución de JavaScript

2. **Mejorar accesibilidad**
   - Asegurar contraste suficiente (ya 91%, revisar elementos específicos)
   - Añadir atributos `aria-label` donde falte
   - Mejorar foco visible y orden de tabulación
   - Asegurar que los elementos interactivos tengan nombres accesibles

3. **Mejores prácticas**
   - Evitar APIs obsoletas
   - Implementar Política de Seguridad de Contenido (CSP)
   - Usar HTTPS (ya OK)
   - Evitar errores en consola

4. **SEO**
   - Ya 100%, mantener buenas prácticas

5. **Navegación agente**
   - Ya 100%, mantener

## Archivos incluidos

- `performance-improvements.md`: Detalles y ejemplos de código para mejorar velocidad.
- `accessibility-improvements.md`: Guía para corregir problemas de accesibilidad.
- `best-practices-improvements.md`: Acciones para cumplir con mejores prácticas.
- `seo-checklist.md`: Lista de verificación SEO (aunque ya es 100%).
- `sample-optimized-index.html`: Ejemplo de cómo podría quedar una versión optimizada del index.
- `optimization-script.js`: Script Node para ejecutar Lighthouse y generar reportes.
- `lighthouserc.json`: Configuración de Lighthouse CI.
- `todo.txt`: Lista de tareas pendientes.

## Cómo usar

1. Revisa cada archivo de mejoras y aplica los cambios recomendados al código fuente del sitio.
2. Después de cada cambio, ejecuta el script de optimización para volver a auditar:
   ```bash
   node optimization-script.js
   ```
3. Revisa el reporte generado en `./reports/`.

¡Manos a la obra!