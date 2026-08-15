# Módulo de Best Practices (Mejores Prácticas)

## Conceptos clave

- **HTTPS**: Encriptación de conexiones entre cliente y servidor.
- **Service Workers**: Scripts que ejecutan en segundo plano para habilitar funcionalidades como offline y push notifications.
- **Prevención de vulnerabilidades comunes**: Protección contra XSS, CSRF, inyección de SQL, etc.
- **Optimización de recursos**: Uso eficiente de HTML, CSS, JavaScript y medios.
- **Prácticas de seguridad**: Headers de seguridad, política de contenido, subresource integrity.

## Explicación detallada

La categoría de "Mejores Prácticas" en Lighthouse evalúa aspectos relacionados con la seguridad, el rendimiento y la calidad general del desarrollo web. Estas prácticas no solo mejoran la experiencia del usuario sino que también protegen el sitio y sus datos.

### Por qué es importante
- **Seguridad**: Protege contra ataques comunes que podrían comprometer datos de usuarios o del sitio.
- **Confianza**: Los usuarios confían más en sitios que muestran indicadores de seguridad visibles (como el candado de HTTPS).
- **Compatibilidad**: Asegura que el sitio funcione correctamente en diferentes navegadores y dispositivos.
- **Mantenimiento**: Código que sigue mejores prácticas es más fácil de mantener y actualizar.

### Cómo Lighthouse evalúa las mejores prácticas
Lighthouse ejecuta una serie de auditorías que verifican:
- Uso de HTTPS
- Presence of security headers (like Content Security Policy)
- Uso de bibliotecas JavaScript con vulnerabilidades conocidas
- Implementación correcta de APIs web
- Evitación de prácticas obsoletas o inseguras
- Uso adecuado de servicios modernos (como service workers cuando es apropiado)

### Problemas comunes en mejores prácticas
1. **HTTP en lugar de HTTPS**: Conexiones no encriptadas.
2. **Falta de headers de seguridad**: Como Content Security Policy, X-Frame-Options, etc.
3. **Bibliotecas JavaScript vulnerables**: Uso de versiones antiguas con CVE conocidos.
4. **Uso de `document.write()`**: Puede bloquear el renderizado y causar problemas en conexiones lentas.
5. **Event listeners pasivos no utilizados**: En touch/scroll events para mejorar rendimiento de scroll.
6. **Falta de `noopener` en enlaces externos**: Riesgo de security mediante `window.opener`.
7. **Uso de APIs obsoletas**: Como `AppCache` o ciertos eventos de mutación.
8. **Imágenes con resolución insuficiente**: Para pantallas de alta densidad (Retina).

## Preguntas de autoevaluación

1. ¿Qué hace el header de seguridad `Content Security Policy (CSP)`?
   a) Encripta la comunicación entre cliente y servidor
   b) Previene ataques de inyección específicamente controlando qué recursos pueden cargarse
   c) Mejora el rendimiento almacenando en caché recursos estáticos
   d) Redirige automáticamente HTTP a HTTPS

2. ¿Cuál es el atributo recomendado para enlaces externos que abren en nueva pestaña para evitar riesgos de security?
   a) `rel="nofollow"`
   b) `rel="noopener"`
   c) `rel="external"`
   d) `rel="nofollow noopener"`

3. Verdadero o falso: Usar una versión antigua de jQuery siempre es seguro si el sitio no maneja datos sensibles.
   a) Verdadero
   b) Falso

4. ¿Qué auditoría de Lighthouse verificarías si sospechas que tu sitio está usando una biblioteca JavaScript con vulnerabilidades conocidas?
   a) "Usa tecnologías modernas"
   b) "Evita bibliotecas de JavaScript con vulnerabilidades de seguridad conocidas"
   c) "Implementa política de seguridad de contenido"
   d) "Evita solicitudes de origen cruzado"

5. Si tu sitio carga recursos desde múltiples dominios, ¿qué header de seguridad podrías usar para controlar qué dominios pueden ser embebidos en iframes?
   a) `X-Content-Type-Options: nosniff`
   b) `X-Frame-Options: SAMEORIGIN`
   c) `Referrer-Policy: no-referrer-when-downgrade`
   d) `Strict-Transport-Security: max-age=31536000`

## Ejercicios prácticos

1. **Verifica tu implementación de HTTPS**:
   - Abre tu sitio en Chrome
   - Haz clic en el candado junto a la URL
   - Verifica que diga "Conexión segura" y que el certificado sea válido
   - Si ves "No seguro", necesitas obtener e instalar un certificado SSL/TLS

2. **Revisa headers de seguridad**:
   - Abre las DevTools de Chrome → pestaña Network
   - Recarga la página
   - Haz clic en cualquier recurso y revisa los headers de respuesta
   - Busca headers como:
     - `Content-Security-Policy`
     - `X-Frame-Options`
     - `X-Content-Type-Options`
     - `Referrer-Policy`
     - `Strict-Transport-Security` (solo en HTTPS)
   - Si faltan headers importantes, considera implementarlos en tu servidor o mediante un CDN

3. **Busca bibliotecas JavaScript vulnerables**:
   - En las DevTools, ve a la pestaña Sources
   - Busca archivos de bibliotecas como jQuery, Lodash, Moment.js, etc.
   - Anota las versiones que estás usando
   - Visita https://snyk.io/vuln o https://www.cvedetails.com para verificar si esas versiones tienen CVE conocidos
   - Actualiza a versiones seguras si es necesario

4. **Prueba enlaces externos**:
   - Encuentra enlaces en tu sitio que usen `target="_blank"`
   - Verifica que tengan `rel="noopener"` (y generalmente también `rel="nofollow"` para SEO)
   - Ejemplo correcto: `<a href="https://example.com" target="_blank" rel="noopener">Enlace externo</a>`

5. **Evita document.write()**:
   - Busca en tu código JavaScript instancias de `document.write()`
   - Reemplázalas con técnicas modernas como:
     - Manipulación del DOM (`element.innerHTML`, `element.textContent`, `element.appendChild()`)
     - Plantillas literales o frameworks de frontend
     - Carga asíncrona de contenido mediante fetch/XHR

## Test de conocimiento

Instrucciones: Responde las siguientes preguntas. Las respuestas están al final.

1. ¿Qué header de seguridad ayuda a prevenir ataques de clickjacking?
   a) `Content-Security-Policy`
   b) `X-Frame-Options`
   c) `X-Content-Type-Options`
   d) `Referrer-Policy`

2. Si deseas prevenir que el navegador interprete archivos como un tipo MIME diferente al declarado, qué header deberías usar:
   a) `Strict-Transport-Security`
   b) `X-Frame-Options: DENY`
   c) `X-Content-Type-Options: nosniff`
   d) `Public-Key-Pins`

3. Verdadero o falso: Es seguro usar `target="_blank"` sin `rel="noopener"` si el enlace externo es a un sitio de confianza.
   a) Verdadero
   b) Falso

4. ¿Cuál de las siguientes NO es una buena práctica para incluir JavaScript en tu HTML?
   a) Cargar scripts no críticos con `defer`
   b) Inlinear CSS crítico y cargar el resto asíncronamente
   c) Usar `document.write()` para cargar scripts dinámicamente
   d) Agrupar y minificar archivos JavaScript

5. ¿Qué indica la auditoría de Lighthouse "Evita bibliotecas de JavaScript con vulnerabilidades de seguridad conocidas"?
   a) Tu sitio usa una versión de una biblioteca que tiene CVE público y no parchado
   b) Tu sitio carga demasiados archivos JavaScript
   c) Tu JavaScript no está minificado
   d) Tu sitio no usa módulos ES6

### Respuestas al test
1. b) `X-Frame-Options`
2. c) `X-Content-Type-Options: nosniff`
3. b) Falso - siempre es recomendado usar `noopener` con `_blank` para evitar security risks
4. c) Usar `document.write()` para cargar scripts dinámicamente
5. a) Tu sitio usa una versión de una biblioteca que tiene CVE público y no parchado

## Recursos adicionales

- **Guías de seguridad**:
  - [OWASP Top Ten](https://owasp.org/www-project-top-ten/)
  - [Security Headers](https://securityheaders.com/)
  - [Mozilla Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)

- **Herramientas de verificación**:
  - [Security Headers](https://securityheaders.com/) - Verifica headers de seguridad de tu sitio
  - [Snyk](https://snyk.io/) - Detecta vulnerabilidades en dependencias
  - [Google's Lighthouse](https://developer.chrome.com/docs/lighthouse/best-practices/)

- **Tutoriales recomendados**:
  - [Implementar Content Security Policy](https://web.dev/csp/)
  - [Entender y usar referrer policy](https://web.dev/referrer-policy/)
  - [Mejorar la seguridad con headers HTTP](https://web.dev/http-cache/)
  - [Mantener dependencias seguras](https://web.dev/update-third-party-dependencies/)