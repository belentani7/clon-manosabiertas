# Módulo de Performance (Rendimiento)

## Conceptos clave

- **First Contentful Paint (FCP)**: Tiempo hasta que se renderiza el primer contenido en pantalla.
- **Largest Contentful Paint (LCP)**: Tiempo hasta que se renderiza el elemento más grande visible.
- **Total Blocking Time (TBT)**: Tiempo total entre FCP y Time to Interactive (TTI) donde el hilo principal estuvo bloqueado lo suficiente como para impedir la respuesta a la entrada.
- **Cumulative Layout Shift (CLS)**: Suma de todos los desplazamientos de diseño inesperados que ocurren durante la vida de la página.
- **Speed Index**: Qué tan rápido se muestra visualmente el contenido durante la carga de la página.

## Explicación detallada

El rendimiento web se mide principalmente por la velocidad de carga y la interactividad. Lighthouse utiliza métricas de laboratorio para simular condiciones de red y dispositivo típicas.

### Por qué es importante
Un sitio lento lleva a mayores tasas de rebote, menor conversión y peor experiencia de usuario. Google considera el rendimiento como factor de ranking.

### Cómo medirlo
Lighthouse emula una conexión 3G rápida y un dispositivo móvil de gama media. Las métricas se calculan a partir de un trace de rendimiento de Chrome.

### Factores que afectan el rendimiento
1. **Recursos bloqueantes**: CSS y JavaScript que impiden la renderización inicial.
2. **Imágenes no optimizadas**: Tamaño de archivo grande, formato incorrecto, falta de dimensiones explícitas.
3. **Servidor lento**: Tiempo de respuesta del servidor (TTFB) alto.
4. **Falta de caché**: Recargas innecesarias de recursos estáticos.
5. **JavaScript excesivo**: Bloqueo del hilo principal durante mucho tiempo.

## Preguntas de autoevaluación

1. ¿Qué mide LCP y cuál es el umbral recomendado para una buena experiencia?
   a) Largest Contentful Paint; < 2.5s
   b) Layout Complexity Performance; < 3s
   c) Load Completion Point; < 1.5s
   d) None of the above

2. ¿Cuál de los siguientes NO es una estrategia para mejorar el FCP?
   a) Inline critical CSS
   b) Defer non-critical JavaScript
   c) Increase image resolution
   d) Use HTTP/2

3. Verdadero o falso: Un CLS bajo indica que la página tiene pocos desplazamientos de diseño inesperados durante la carga.
   a) Verdadero
   b) Falso

4. ¿Qué métrica está más relacionada con la interactividad de la página?
   a) FCP
   b) LCP
   c) TBT
   d) CLS

5. Si tu TTFB es de 1.2s, ¿qué aspecto del rendimiento deberías mejorar primero?
   a) Optimización de imágenes
   b) Rendimiento del servidor o backend
   c) Minificación de CSS
   d) Eliminación de recursos bloqueantes

## Ejercicios prácticos

1. **Analiza tu sitio con Lighthouse**:
   - Abre las DevTools de Chrome (F12)
   - Ve a la pestaña Lighthouse
   - Ejecuta una auditoría en modo móvil
   - Anota las métricas de rendimiento actuales

2. **Identifica recursos bloqueantes**:
   - En el informe Lighthouse, busca la oportunidad "Eliminar recursos que bloqueen el renderizado"
   - Lista los archivos CSS y JavaScript mencionados
   - Para cada uno, determina si es crítico para el contenido inicial

3. **Optimiza una imagen**:
   - Elige una imagen grande de tu sitio
   - Redimensiónala a las dimensiones mostradas en pantalla
   - Cómprala usando una herramienta como Squoosh.app
   - Cambia el formato a WebP si es apropiado
   - Agrega atributos width y height explícitos

4. **Implementa carga diferida**:
   - Agrega `loading="lazy"` a imágenes que no estén en el viewport inicial
   - Verifica que no se carguen hasta que se acerquen al viewport

## Test de conocimiento

Instrucciones: Responde las siguientes preguntas. Las respuestas están al final.

1. ¿Cuál es el impacto principal de un alto Total Blocking Time (TBT)?
   a) Aumenta el tiempo de primera pintura
   b) Retrasa la capacidad de la página para responder a la entrada del usuario
   c) Incrementa el tamaño de descarga de recursos
   d) Causa más desplazamientos de diseño

2. Para mejorar el LCP en una página con una imagen hero grande, ¿qué técnica sería MÁS efectiva?
   a) Añadir un efecto de parallax
   b) Inline la imagen hero como data URI
   c) Priorizar la carga de la imagen hero usando `fetchpriority="high"`
   d) Ocultar la imagen hasta que se complete la carga

3. ¿Qué encabezado HTTP permite al navegador almacenar en caché recursos estáticos por un período prolongado?
   a) `Cache-Control: no-cache`
   b) `Cache-Control: max-age=31536000`
   c) `Expires: -1`
   d) `Pragma: no-cache`

4. ¿Cuál de las siguientes técnicas ayuda a reducir el CLS causado por fuentes web?
   a) Usar `font-display: swap`
   b) Aumentar el peso de la fuente
   c) Cargar todas las variantes de fuente simultáneamente
   d) Evitar el uso de `@font-face`

5. Si deseas medir el rendimiento de tu sitio en condiciones reales de usuario, qué herramienta de Google deberías usar principalmente?
   a) Lighthouse
   b) PageSpeed Insights (datos de campo)
   c) Search Console
   d) Google Analytics

### Respuestas al test
1. b) Retrasa la capacidad de la página para responder a la entrada del usuario
2. c) Priorizar la carga de la imagen hero usando `fetchpriority="high"`
3. b) `Cache-Control: max-age=31536000`
4. a) Usar `font-display: swap`
5. b) PageSpeed Insights (datos de campo)

## Recursos adicionales

- **Documentación oficial**:
  - [Lighthouse Performance Metrics](https://developer.chrome.com/docs/lighthouse/performance/)
  - [Web Vitals](https://web.dev/vitals/)
  - [Optimizar imágenes](https://web.dev/learn/images/)

- **Herramientas gratuitas**:
  - [Squoosh.app](https://squoosh.app) - Compresión y redimensionamiento de imágenes
  - [WebPageTest](https://www.webpagetest.org) - Pruebas de rendimiento avanzadas
  - [Chrome DevTools](https://developer.chrome.com/docs/devtools/) - Análisis en tiempo real

- **Tutoriales recomendados**:
  - [Eliminar recursos que bloqueen el renderizado](https://web.dev/render-blocking-resources/)
  - [Optimizar el LCP](https://web.dev/lcp/)
  - [Minimizar el CLS](https://web.dev/cls/)