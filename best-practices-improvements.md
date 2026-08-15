# Mejores prácticas

Para alcanzar el 100% en la categoría de Mejores prácticas de Lighthouse, revisa y aplica las siguientes recomendaciones.

## Problemas comunes de Mejores prácticas

1. **Uso de APIs obsoletas**
   - Evita `document.write()`, eventos no pasivos, etc.

2. **Vulnerabilidades de seguridad**
   - Implementar Política de Seguridad de Contenido (CSP).
   - Evitar uso de `innerHTML` con datos no confiables.
   - Usar `rel="noopener"` en enlaces externos con `target="_blank"`.

3. **Errores en la consola**
   - Corregir errores de JavaScript y advertencias.

4. **HTTPS**
   - Ya está implementado (el sitio usa HTTPS).

5. **Credenciales en fuentes no seguras**
   - Asegúrate de que los formularios no se envíen desde HTTP.

6. **Uso de plugins obsoletos**
   - No usar Flash, Silverlight, etc.

7. **Tamaño de los taps**
   - Asegurar que los elementos interactivos tengan tamaño mínimo recomendado (48x48 dp).

8. **Viewport meta tag**
   - Ya presente, pero verifica que tenga `width=device-width, initial-scale=1`.

## Acciones específicas

### Eliminar APIs obsoletas
- Revisa tu código por uso de:
  - `document.write()`
  - `document.all`
  - `attachEvent`
  - `keyboardEvent.keyCode` (usa `key` o `code`)
  - eventos de toque no pasivos (añade `{passive: true}` a listeners de `touchstart` y `touchmove` cuando no se llame a `preventDefault`).

Ejemplo:
```javascript
element.addEventListener('touchstart', handler, {passive: true});
```

### Seguridad
- **CSP**: Encabezado HTTP `Content-Security-Policy` que restringe fuentes de scripts, estilos, etc.
  Ejemplo (modo estricto):
  ```
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.example.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self';
  ```
  Ajusta según los recursos que realmente uses.

- **`rel="noopener"`**:
  ```html
  <a href="https://example.com" target="_blank" rel="noopener">Enlace externo</a>
  ```

### Evitar errores en consola
- Ejecuta el sitio y abre la consola de desarrollador (F12).
- Corrige cualquier error de carga de recursos 404, errores de JavaScript, advertencias de uso de propiedades obsoletas.

### Tamaño de los taps
- Asegúrate de que botones, enlaces y otros controles tengan al menos 48x48 píxeles de área táctil.
- Usa padding suficiente:
  ```css
  .btn { min-height: 44px; min-width: 44px; padding: 12px; }
  ```

### Evitar redireccionamientos múltiplos
- Cada redireccionamiento agrega latencia. Asegúrate de que las URLs apuntan directamente al recurso final.

### Uso de HTTPS en todas las recursos
- Verifica que no haya contenido mixto (HTTP en HTTPS). Usa la pestaña Seguridad en DevTools.

### Evitar `document.write()`
- Si lo usas para cargar scripts, reemplázalo por inserción dinámica de `<script>` o módulos ES.

### Evitar APIs de geolocalización y notificación sin permiso del usuario
- Solicita permiso solo tras interacción del usuario.

## Checklist de Mejores prácticas

[ ] Ningún uso de `document.write()`
[ ] Ningún uso de APIs obsoletas (keyCode, attachEvent, etc.)
[ ] Todos los listeners de touch son pasivos cuando no se necesita preventDefault
[ ] CSP implementado en encabezados HTTP
[ ] Todos los enlaces externos con target="_blank" tienen rel="noopener"
[ ] Ningún error en la consola de desarrollador
[ ] Ningún contenido mixto (HTTP en HTTPS)
[ ] Tamaño mínimo de taps de 48x48 px
[ ] Viewport meta tag configurado correctamente
[ ] No uso de plugins obsoletos (Flash, etc.)
[ ] Formularios solo se envían mediante HTTPS (si aplica)
[ ] Redireccionamientos innecesarios eliminados

## Recursos
- [Web.dev - Mejores prácticas](https://web.dev/learn/best-practices/)
- [Política de Seguridad de Contenido (CSP)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Tamaño de objetivos táctiles](https://web.dev/tap-targets/)