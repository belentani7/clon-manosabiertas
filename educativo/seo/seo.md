# Módulo de SEO (Optimización para Motores de Búsqueda)

## Conceptos clave

- **Crawling**: El proceso por el cual los motores de búsqueda descubren y acceden a las páginas web.
- **Indexing**: El almacenamiento y organización de contenido que los motores de búsqueda han rastreado.
- **Ranking**: El algoritmo que determina el orden en que aparecen las páginas en los resultados de búsqueda.
- **Palabras clave**: Términos que los usuarios ingresan en los motores de búsqueda y que representan el tema de tu contenido.
- **Experiencia de página (Page Experience)**: Conjunto de señales que miden cómo los usuarios perciben la experiencia de interactuar con una página web, incluyendo Core Web Vitals.

## Explicación detallada

El SEO (Search Engine Optimization) es el proceso de mejorar la visibilidad de un sitio web en los resultados orgánicos (no pagados) de los motores de búsqueda. Un buen SEO aumenta la cantidad y calidad del tráfico hacia tu sitio.

### Por qué es importante
- **Tráfico orgánico gratuito**: A diferencia de los anuncios pagados, el tráfico de búsqueda no tiene costo por clic.
- **Credibilidad y confianza**: Los usuarios tienden a confiar más en los resultados orgánicos que en los anuncios.
- **Tráfico calificado**: Las personas que encuentran tu sitio mediante búsqueda suelen tener una intención específica relacionada con tu contenido o productos.
- **Beneficios a largo plazo**: Un buen posicionamiento puede generar tráfico constante durante meses o años.

### Cómo Lighthouse evalúa el SEO
Lighthouse ejecuta una subconjunto de auditorías de SEO básico que verifican aspectos técnicos y de contenido que afectan la capacidad de los motores de búsqueda para rastrear e indexar tu página. Estas incluyen:
- Uso de metaetiquetas descriptivas
- Enlaces con texto descriptivo
- Imágenes con atributos alt
- Uso adecuado de encabezados
- Velocidad de carga (que afecta tanto al SEO como a la experiencia de usuario)
- Adaptabilidad móvil

### Factores que afectan el SEO
1. **Calidad y relevancia del contenido**: Contenido original, valioso y que responde a la intención de búsqueda del usuario.
2. **Experiencia de página**: Incluye Core Web Vitals (LCP, FID, CLS), seguridad HTTPS, ausencia de intersticiales intrusivos, y adaptabilidad móvil.
3. **Estructura del sitio**: Arquitectura lógica de información, URLs descriptivas, navegación clara.
4. **Señales de autoridad**: Backlinks de calidad de otros sitios relevantes.
5. **Optimización técnica**: Indexabilidad, velocidad de carga, datos estructurados, canonicalización adecuada.

## Preguntas de autoevaluación

1. ¿Qué elemento HTML es más importante para el SEO en términos de aparecer en los resultados de búsqueda?
   a) `<meta name="keywords">`
   b) `<title>`
   c) `<meta name="description">`
   d) `<h1>`

2. ¿Cuál es la longitud recomendada para una metaetiqueta de descripción para evitar que se corte en los resultados de búsqueda?
   a) Menos de 50 caracteres
   b) Entre 50 y 100 caracteres
   c) Entre 150 y 160 caracteres
   d) Más de 200 caracteres

3. Verdadero o falso: Usar exactamente la misma palabra clave múltiples veces en un contenido (keyword stuffing) mejora el ranking en los motores de búsqueda.
   a) Verdadero
   b) Falso

4. ¿Qué atributo debe tener una imagen para ayudar con el SEO además de proporcionar accesibilidad?
   a) `title`
   b) `srcset`
   c) `alt` con descripción que incluya palabras clave relevantes cuando sea apropiado
   d) `width` y `height`

5. Si tu sitio tiene múltiples versiones de la misma contenido (por ejemplo, con y sin www), ¿qué técnica SEO deberías usar para evitar problemas de contenido duplicado?
   a) Usar `meta name="robots" content="noindex"` en una versión
   b) Implementar redirecciones 301 a la versión preferida
   c) Cambiar el contenido de una versión para que sea completamente diferente
   d) No hacer nada, los motores de búsqueda lo manejan automáticamente

## Ejercicios prácticos

1. **Revisa tus metaetiquetas**:
   - Abre el código fuente de tu página principal (clic derecho → Ver código fuente)
   - Busca la etiqueta `<title>` y verifica que:
     - Sea única para cada página
     - Incluya tu palabra clave principal cercana al inicio
     - Tenga entre 50 y 60 caracteres para evitar corte en SERPs
   - Busca la metaetiqueta `<meta name="description">` y verifica que:
     - Sea atractiva y describa con precisión el contenido de la página
     - Incluya una llamada a la acción cuando sea apropiado
     - Tenga entre 150 y 160 caracteres

2. **Optimiza tus encabezados**:
   - En cada página, verifica que:
     - Solo haya un `<h1>` (generalmente el título principal de la página)
     - Los encabezados sigan una jerarquía lógica (h2 para secciones principales, h3 para subsecciones, etc.)
     - Los encabezados incluyan variaciones de tus palabras clave de forma natural
     - No uses encabezados solo por razones de estilo (usa CSS para eso)

3. **Mejora tus enlaces internos**:
   - Identifica oportunidades para enlazar entre páginas relacionadas de tu sitio
   - Usa texto de ancla descriptivo que incluya palabras clave relevantes (evita "haz clic aquí")
   - Asegúrate de que la estructura de enlaces ayude tanto a usuarios como a motores de búsqueda a entender la relación entre tu contenido

4. **Optimiza tus imágenes para SEO**:
   - Además de las mejores prácticas de rendimiento y accesibilidad:
     - Usa nombres de archivo descriptivos con guiones (ej: `zapatos-deportivos-running.jpg` en lugar de `IMG_001.jpg`)
     - Incluye palabras clave relevantes en el atributo `alt` cuando describan naturalmente la imagen
     - Considera usar imágenes originales en lugar de siempre imágenes de stock

5. **Implementa datos estructurados**:
   - Elige un tipo de contenido relevante para tu sitio (ej: artículos, productos, eventos, preguntas frecuentes)
   - Visita https://schema.org/ para encontrar el tipo apropiado
   - Agrega datos estructurados en formato JSON-LD en el `<head>` de tu HTML
   - Prueba tu implementación con la Herramienta de Prueba de Datos Estructurados de Google

## Test de conocimiento

Instrucciones: Responde las siguientes preguntas. Las respuestas están al final.

1. ¿Cuál de las siguientes afirmaciones sobre las metaetiquetas de keywords es correcta?
   a) Son el factor más importante para el ranking en Google
   b) Google las ignora completamente para fines de ranking
   c) Deben incluir tantas palabras clave como sea posible, separadas por comas
   d) Son más importantes que la metaetiqueta de descripción

2. Para mejorar el SEO local de un negocio físico, ¿qué elemento es MÁS importante?
   a) Tener múltiples dominios con diferentes palabras clave geográficas
   b) Incluir la dirección exacta en el footer de cada página
   c) Crear y optimizar un perfil de Google Business Profile
   d) Usar palabras clave como "cerca de mí" en todo el contenido

3. Verdadero o falso: Un sitio web que carga en menos de 2 segundos en una conexión 3G rápida tendrá una ventaja significativa en el ranking de búsqueda móvil.
   a) Verdadero
   b) Falso

4. ¿Qué indica la relación entre el número de páginas indexadas y el número total de páginas en tu sitio según Google Search Console?
   a) Si el número indexado es significativamente menor, podría indicar problemas de rastreo o indexación
   b) Un ratio alto siempre indica buen SEO
   c) Este metric no es relevante para el SEO
   d) Solo importa si tienes más de 10,000 páginas

5. ¿Cuál es la práctica recomendada para manejar páginas que ya no existen en tu sitio (error 404)?
   a) Redirigir todas a la página de inicio
   b) Devolver un código 404 correcto con una página de error útil que incluya opciones de navegación
   c) Redirigir a una página aleatoria del sitio
   d) Cambiar el código de estado a 200 para evitar que los motores de búsqueda lo vean como un error

### Respuestas al test
1. b) Google las ignora completamente para fines de ranking
2. c) Crear y optimizar un perfil de Google Business Profile
3. a) Verdadero - la velocidad de página es un factor de ranking confirmado para búsquedas móviles
4. a) Si el número indexado es significativamente menor, podría indicar problemas de rastreo o indexación
5. b) Devolver un código 404 correcto con una página de error útil que incluya opciones de navegación

## Recursos adicionales

- **Guías oficiales de Google**:
  - [Guía básica de SEO](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
  - [Cómo funciona la Búsqueda de Google](https://developers.google.com/search/docs/fundamentals/how-search-works)
  - [Core Web Vitals](https://web.dev/vitals/)

- **Herramientas gratuitas**:
  - [Google Search Console](https://search.google.com/search-console/) - Monitorea tu presencia en Google Search
  - [Google Keyword Planner](https://ads.google.com/home/tools/keyword-planner/) - Investigación de palabras clave (requiere cuenta de Ads)
  - [AnswerThePublic](https://answerthepublic.com/) - Descubre preguntas que las personas hacen sobre temas
  - [Screaming Frog SEO Spider](https://www.screamingfrog.co.uk/seo-spider/) (versión gratuita limitada) - Auditoría técnica de SEO

- **Tutoriales recomendados**:
  - [Investigación de palabras clave para principiantes](https://backlinko.com/keyword-research)
  - [Optimización de contenido SEO](https://moz.com/learn/seo/on-page-seo)
  - [SEO técnico básico](https://www.semrush.com/blog/technical-seo/)
  - [Construcción de enlaces éticos](https://ahrefs.com/blog/link-building/)