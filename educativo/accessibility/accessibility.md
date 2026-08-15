# Módulo de Accessibility (Accesibilidad)

## Conceptos clave

- **WCAG (Web Content Accessibility Guidelines)**: Guías internacionales para hacer el contenido web accesible.
- **Principios POUR**: Perceivable, Operable, Understandable, Robust.
- **Niveles de conformidad**: A (mínimo), AA (recomendado), AAA (óptimo).
- **Tecnologías de asistencia**: Lectores de pantalla, navegación solo con teclado, software de reconocimiento de voz.
- **ARIA (Accessible Rich Internet Applications)**: Atributos para mejorar la accesibilidad de contenido dinámico.

## Explicación detallada

La accesibilidad web asegura que personas con discapacidades (visual, auditiva, motriz, cognitiva) puedan percibir, operar, comprender y interactuar con el sitio web. No es solo un requisito legal en muchos países, sino también una buena práctica que mejora la experiencia para todos los usuarios.

### Por qué es importante
- **Inclusividad**: Aproximadamente el 15% de la población mundial tiene alguna forma de discapacidad.
- **Beneficios SEO**: Muchos principios de accesibilidad coinciden con buenas prácticas de SEO.
- **Experiencia mejorada**: Sitios accesibles suelen ser más fáciles de usar para todos.
- **Cumplimiento legal**: Leyes como ADA (EE.UU.), EN 301 549 (Europa) requieren accesibilidad en ciertos contextos.

### Cómo Lighthouse evalúa la accesibilidad
Lighthouse ejecuta una subconjunto de reglas de axe-core (deque) para identificar problemas comunes de accesibilidad. No sustituye una auditoría completa manual, pero captura problemas frecuentes.

### Problemas comunes de accesibilidad
1. **Contraste insuficiente**: Texto y fondo no tienen suficiente diferencia de luminosidad.
2. **Falta de texto alternativo**: Imágenes sin atributo `alt` descriptivo.
3. **Elementos no nombrados**: Botones, enlaces o controles sin nombre accesible.
4. **Orden de enfoque ilógico**: Navegación con Tab que no sigue un orden lógico.
5. **Falta de labels asociados**: Campos de formulario sin `<label>` asociado.
6. **Uso incorrecto de encabezados**: Estructura de encabezados que no refleja la jerarquía del contenido.
7. **Contenido que parpadea**: Animaciones o parpadeos que pueden provocar convulsiones.

## Preguntas de autoevaluación

1. ¿Cuál es el ratio de contraste mínimo recomendado por WCAG AA para texto normal?
   a) 3:1
   b) 4.5:1
   c) 7:1
   d) 2:1

2. ¿Qué atributo debe tener siempre una imagen que transmite información?
   a) `title`
   b) `srcset`
   c) `alt` con descripción significativa
   d) `aria-label`

3. Verdadero o falso: Un sitio puede pasar las pruebas de accesibilidad de Lighthouse y aún tener problemas de accesibilidad graves.
   a) Verdadero
   b) Falso

4. ¿Cuál de los siguientes es el mejor método para hacer un botón accesible?
   a) `<div role="button">Click me</div>`
   b) `<span onclick="doSomething()">Click me</span>`
   c) `<button>Click me</button>`
   d) `<a href="#" onclick="doSomething()">Click me</a>`

5. Si un video en tu sitio no tiene subtítulos, ¿qué grupo de usuarios se ve más afectado?
   a) Usuarios con daltonismo
   b) Usuarios con discapacidad motriz
   c) Usuarios sordos o con dificultad auditiva
   d) Usuarios con dislexia

## Ejercicios prácticos

1. **Prueba de contraste**:
   - Usa la herramienta de contraste en DevTools de Chrome (pestaña Elements → selecciona elemento → ve a la sección de estilos)
   - Verifica el contraste de texto sobre fondos variados
   - Corrige cualquier combinación que no alcance 4.5:1 para texto normal o 3:1 para texto grande

2. **Auditoría de texto alternativo**:
   - Abre las DevTools y ve a la pestaña Elements
   - Busca todas las imágenes (`<img>`) en tu página
   - Verifica que cada una tenga un atributo `alt` apropiado:
     - Imágenes informativas: Descripción concisa del contenido
     - Imágenes decorativas: `alt=""` (vacío)
     - Imágenes funcionales (como botones): Descripción de la acción

3. **Prueba de navegación con teclado**:
   - Desconecta tu mouse
   - Usa solo la tecla Tab para navegar por tu sitio
   - Verifica que:
     - Puedes alcanzar todos los elementos interactivos
     - El orden de enfoque es lógico
     - Puedes ver claramente qué elemento tiene el foco (indicador visual)
     - No quedas "atrapado" en ningún elemento

4. **Revisa tu estructura de encabezados**:
   - En las DevTools, busca todos los elementos `<h1>`-`<h6>`
   - Verifica que:
     - Solo haya un `<h1>` por página (generalmente el título principal)
     - Los encabezados sigan una secuencia lógica (no saltes de h2 a h4)
     - Los encabezados reflejen la jerarquía real del contenido

5. **Prueba de formularios accesibles**:
   - Identifica todos los campos de formulario en tu sitio
   - Verifica que cada uno tenga un `<label>` asociado correctamente:
     - Método 1: `<label for="id">Texto</label><input id="id" ...>`
     - Método 2: `<label>Texto <input ...></label>`
   - Asegúrate de que los mensajes de error sean anunciados por lectores de pantalla (usando `aria-live` o similares)

## Test de conocimiento

Instrucciones: Responde las siguientes preguntas. Las respuestas están al final.

1. ¿Cuál es la razón principal por la que el texto alternativo (`alt`) vacío (`alt=""`) es apropiado para algunas imágenes?
   a) Para reducir el tamaño del archivo HTML
   b) Para indicar que la imagen es puramente decorativa y no transmite información
   c) Para mejorar el rendimiento de carga
   d) Para evitar que los motores de búsqueda indexen la imagen

2. Al probar la navegación con teclado, ¿qué indica que hay un problema de orden de enfoque?
   a) El foco se mueve de izquierda a derecha en lugar de de arriba a abajo
   b) El indicador de foco desaparece completamente
   c) El orden en que recibes el foco al presionar Tab no sigue una secuencia lógica de contenido
   d) Algunos elementos no pueden recibir el foco en absoluto

3. ¿Qué atributo ARIA se usa para indicar que un elemento tiene un menú desplegable asociado?
   a) `aria-haspopup="true"`
   b) `aria-expanded="true"`
   c) `aria-controls="menu-id"`
   d) Todas las anteriores pueden ser relevantes según el contexto

4. Verdadero o falso: Usar únicamente color para transmitir información (ej: campos rojos = error) es suficiente para usuarios con daltonismo si también añades un ícono de advertencia.
   a) Verdadero
   b) Falso

5. ¿Cuál es la práctica recomendada para anunciar cambios dinámicos de contenido a usuarios de lectores de pantalla?
   a) Usar `alert()` de JavaScript
   b) Añadir `title` al elemento que cambió
   c) Usar regiones live de ARIA como `aria-live="polite"`
   d) Recargar la página completa

### Respuestas al test
1. b) Para indicar que la imagen es puramente decorativa y no transmite información
2. c) El orden en que recibes el foco al presionar Tab no sigue una secuencia lógica de contenido
3. d) Todas las anteriores pueden ser relevantes según el contexto (dependiendo del patrón específico)
4. b) Falso - necesitas más que solo color y un ícono; considera patrones, texto o múltiples indicadores
5. c) Usar regiones live de ARIA como `aria-live="polite"`

## Recursos adicionales

- **Guías oficiales**:
  - [WCAG 2.1](https://www.w3.org/TR/WCAG21/)
  - [WAI-ARIA Authoring Practices](https://www.w3.org/TR/wai-aria-practices/)
  - [Fundamentos de accesibilidad web](https://web.dev/learn/accessibility/)

- **Herramientas de prueba**:
  - [axe DevTools](https://www.deque.com/axe/devtools/) (extensión de navegador)
  - [Lighthouse](https://developer.chrome.com/docs/lighthouse/accessibility/)
  - [Color Contrast Analyzer](https://www.tpgi.com/color-contrast-checker/)

- **Tutoriales recomendados**:
  - [Mejorar el contraste de colores](https://web.dev/color-contrast/)
  - [Hacer que las imágenes sean accesibles](https://web.dev/images/)
  - [Crear controles de formulario accesibles](https://web.dev/learn/forms/)
  - [Gestión del foco para accesibilidad](https://web.dev/focus-order/)