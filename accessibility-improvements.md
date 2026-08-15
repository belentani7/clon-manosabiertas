# Mejoras de accesibilidad

Aunque la puntuación de accesibilidad ya es alta (91%), podemos alcanzar el 100% atendiendo a los detalles que Lighthouse señala.

## Problemas comunes detectados por Lighthouse de accesibilidad

1. **Elementos de control de formulario sin nombre accesible**
   - Asegúrate de que cada `<input>`, `<select>`, `<textarea>` tenga un `<label>` asociado o un atributo `aria-label`/`aria-labelledby`.

2. **Contraste insuficiente**
   - Revisa los informes de contraste y ajusta colores para cumplir con WCAG AA (ratio mínimo 4.5:1 para texto normal, 3:1 para texto grande).

3. **Elementos interaccionables sin nombre accesible**
   - Botones y enlaces deben tener texto descriptivo o `aria-label`.

4. **Orden de tabulación lógico**
   - Usa `tabindex` solo cuando sea necesario; evita valores positivos que rompan el orden natural.

5. **Uso adecuado de ARIA**
   - No usar ARIA cuando un elemento HTML nativo suffice.
   - Asegurar que los roles ARIA sean válidos y que los atributos requeridos estén presentes.

6. **Navegación con teclado**
   - Todos los componentes deben ser operables solo con teclado.
   - Evitar trampas de foco.

7. **Identificación de idioma**
   - El elemento `<html>` debe tener un atributo `lang` válido (ya parece estar presente).

## Acciones específicas

### Formularios
- Agregar `<label>` explícitos:
  ```html
  <label for="email">Correo electrónico</label>
  <input type="email" id="email" name="email">
  ```
- O usar `aria-label` cuando el label no sea visible:
  ```html
  <button aria-label="Cerrar menú">×</button>
  ```

### Contraste
- Usa herramientas como WebAIM Contrast Checker.
- Ajusta colores en CSS: asegúrate de que el texto sobre fondo tenga suficiente contraste.

### Nombres accesibles
- Evita enlaces con texto genérico como "clic aquí". Usa descriptivos: "Descargar guía de derechos".
- Los íconos solos deben tener `aria-label` o `aria-hidden="true"` si son decorativos.

### Orden de tabulación
- Revisa con Tab el orden de navegación; ajusta el DOM o usa `tabindex="-1"` para eliminar de tabulación elementos no necesarios.

### ARIA
- Ejemplo de menú desplegable accesible:
  ```html
  <button aria-haspopup="true" aria-expanded="false" aria-controls="menu-menu">
    Menú
  </button>
  <nav id="menu-menu" hidden>
    <!-- enlaces -->
  </nav>
  ```
  Usa JavaScript para togglear `aria-expanded` y `hidden`.

### Saltos de contenido
- Incluir un enlace de salto al contenido principal:
  ```html
  <a href="#main-content" class="skip-link">Ir al contenido principal</a>
  ```

## Checklist de accesibilidad

[ ] Todos los controles de formulario tienen label asociado o aria-label
[ ] Todos los botones tienen nombre accesible (texto o aria-label)
[ ] Todos los enlaces tienen propósito claro
[ ] Contraste de texto cumple WCAG AA
[ ] Orden de tabulación lógico y sin trampas
[ ] Uso adecuado de ARIA (roles válidos, atributos requeridos)
[ ] Elementos decorativos tienen aria-hidden="true"
[ ] Idioma de la página especificado en <html lang="es">
[ ] Enlaces de salto al contenido presentes y visibles al enfoque
[ ] Mensajes de error y validación anunciados a lectores de pantalla (aria-live)

## Recursos
- [Web.dev - Accesibilidad](https://web.dev/learn/accessibility/)
- [WAI-ARIA Authoring Practices](https://w3c.github.io/aria-practices/)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)