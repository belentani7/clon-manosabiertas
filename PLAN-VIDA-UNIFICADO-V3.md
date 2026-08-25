# 🤲 PLAN VIDA UNIFICADO V3 — ManosAbiertas World-Class

**Fecha:** 2026-08-25  
**Autor:** Pedro Belentani · belentani.eu · noiacore.com  
**Commit base:** c75a1fa (V3 original)  
**Estado:** ✅ Producción

---

## 📋 RESUMEN EJECUTIVO

ManosAbiertas V3.1 es la actualización mayor de la plataforma educativa gratuita para inmigrantes en España. Esta versión:

- **Preserva 100%** del código V3 original (Lenis, GSAP, WebGL shader, SFX, partículas, a11y, dark/light)
- **Añade** 115 cursos reales con catálogo dinámico desde JSON externo
- **Añade** mapa interactivo Leaflet con 20 recursos geolocalizados
- **Añade** directorio de 24 contactos esenciales (emergencias, ONGs, gobierno)
- **Añade** costo de vida por 8 ciudades españolas
- **Añade** sistema de notificaciones toast
- **Añade** CV builder mejorado con exportación real a PDF (jsPDF)
- **Añade** PWA completa (manifest.json + Service Worker offline-first)
- **Añade** backend Node.js para captura de leads
- **Añade** SEO completo (sitemap.xml, robots.txt, schema.org)

---

## 🏗️ ARQUITECTURA

```
ManosAbiertas-Optimizacion/
├── index.html              ← Frontend completo (~1700 líneas)
├── netlify.toml            ← Deploy config + CSP + cache headers
├── _headers                ← Netlify headers (SW, CORS, security)
├── _redirects              ← SPA fallback
├── manifest.json           ← PWA manifest
├── sw.js                   ← Service Worker (offline-first)
├── robots.txt              ← SEO crawl rules
├── sitemap.xml             ← SEO sitemap
├── data/
│   ├── courses.json        ← 115 cursos (8 categorías)
│   └── resources.json      ← Directorio, mapa, tasas, costo de vida
├── backend/
│   ├── lead-capture-server.js ← API Node.js (puerto 3847)
│   └── leads.json          ← Almacén de leads
├── educativo/              ← Guías de mejora (preservadas)
├── reports/                ← Lighthouse reports (preservados)
└── PLAN-VIDA-UNIFICADO-V3.md ← Este documento
```

---

## 📊 COMPARATIVA V3.0 vs V3.1 (EVIDENCIA DE NO BORRADO)

| Métrica | V3.0 (c75a1fa) | V3.1 (actual) | Delta |
|---------|----------------|---------------|-------|
| Líneas index.html | 1251 | ~1700 | +449 (+36%) |
| Archivos totales | 16 | 25 | +9 nuevos |
| Cursos | 6 (hardcoded) | 115 (JSON) | +109 |
| Contactos emergencia | 8 (hardcoded) | 24 (JSON) | +16 |
| Recursos en mapa | 0 | 20 | +20 |
| Ciudades costo vida | 0 | 8 | +8 |
| Monedas conversor | 12 | 50+ | +38 |
| PWA (SW + manifest) | ❌ | ✅ | Nuevo |
| PDF export (jsPDF) | ❌ (window.print) | ✅ | Nuevo |
| Toast notifications | ❌ | ✅ | Nuevo |
| Lead API backend | ❌ | ✅ | Nuevo |
| SEO (sitemap, robots) | ❌ | ✅ | Nuevo |

### Código V3 preservado (verificable por diff):
- ✅ CSS tokens (Itten 60/30/10, glass, radius, motion)
- ✅ Dark/light theme con prefers-color-scheme
- ✅ Hero particles (Canvas2D, noiacore-os ADN)
- ✅ WebGL shader backdrop (magic/shader.html ADN)
- ✅ Procedural SFX (chime, pop, whoosh)
- ✅ Lenis smooth scroll
- ✅ GSAP ScrollTrigger
- ✅ Marquee animado
- ✅ Counter animation
- ✅ Scroll reveal (IO + GSAP upgrade)
- ✅ Mobile menu
- ✅ Progress bar
- ✅ Skip-link + sr-only + focus-visible
- ✅ Checklist con localStorage
- ✅ Conversor de moneda offline
- ✅ CV builder (mejorado, no borrado)
- ✅ Schema.org structured data
- ✅ Navbar scroll effect
- ✅ All CSS classes and HTML structure

---

## 🚀 DEPLOY EN NETLIFY

### Reconectar el repo:

1. Ve a [app.netlify.com](https://app.netlify.com)
2. Selecciona el sitio `mismanosabiertas`
3. Ve a **Site settings → Build & deploy → Link site to Git**
4. Selecciona GitHub → `belentani7/ManosAbiertas-Optimizacion`
5. Branch: `main`
6. Build command: (vacío — es estático)
7. Publish directory: `.`
8. **Deploy site**

### Archivos de deploy:
- `netlify.toml` — CSP, cache, security headers
- `_headers` — Headers adicionales (SW, CORS)
- `_redirects` — SPA fallback
- `robots.txt` + `sitemap.xml` — SEO

---

## 💰 PLAN DE MONETIZACIÓN

| Canal | Implementación | Estimación mensual |
|-------|----------------|--------------------|
| **Donaciones** | Ko-fi button / Stripe checkout | €100–500 |
| **Afiliación empleo** | Enlaces InfoJobs/Indeed con referral | €200–800 |
| **CV Premium** | Plantillas + IA por €9 | €300–1500 |
| **Formación B2B** | Talleres para ONGs/Ayuntamientos (€500–2000) | €1000–5000 |
| **Lead API** | Datos anonimizados para empresas de empleo | €100–300 |
| **Total Año 1** | | **€1700–8100/mes** |

---

## 🤖 AUTOMATIZACIÓN (n8n)

### Prerrequisitos:
```bash
# Docker ya instalado
docker run -d --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n n8nio/n8n
```

### Workflows planificados:
1. **Content Updater** — Scrape BOE/SEPE RSS → actualizar JSONs → auto-commit
2. **Lead Pipeline** — Webhook → email → WhatsApp → CRM
3. **Certificate Generator** — Completar curso → generar PDF → email
4. **Analytics Dashboard** — Netlify Analytics → Telegram report

### Lead API:
```bash
cd backend
node lead-capture-server.js
# o con PM2:
pm2 start lead-capture-server.js --name leads-api
pm2 save && pm2 startup
```

---

## 🔧 MANTENIMIENTO

### Actualizar cursos:
1. Edita `data/courses.json`
2. Commit + push → Netlify redeploy automático

### Actualizar recursos/directorio:
1. Edita `data/resources.json`
2. Commit + push

### Actualizar tasas de cambio:
1. Edita `currency_rates` en `data/resources.json`
2. O automatiza con n8n workflow (API del BCE)

### Añadir idiomas:
1. Crea `data/i18n/{lang}.json` con las traducciones
2. Actualiza el engine i18n en index.html (pendiente v4)

---

## 📅 PRÓXIMOS PASOS

### Corto plazo (1-2 semanas):
- [ ] Reconectar Netlify al repo
- [ ] Configurar dominio personalizado
- [ ] Activar Google Analytics 4
- [ ] Contactar 3 ONGs para prueba piloto
- [ ] Configurar n8n en Docker

### Medio plazo (1-3 meses):
- [ ] i18n completo (39 idiomas con JSONs)
- [ ] Backend Java/Spring (auth, progreso, certificados)
- [ ] Foro comunitario (WebSocket)
- [ ] Gamificación (puntos, rachas, badges)
- [ ] App nativa con Capacitor

### Largo plazo (3-12 meses):
- [ ] Expansión a otros países (Portugal, Italia, Alemania)
- [ ] API pública para ONGs
- [ ] Certificaciones reconocidas por SEPE
- [ ] Partnership con InfoJobs/Indeed
- [ ] Modelo SaaS white-label para ayuntamientos

---

## 🛡️ SALUD DEL SISTEMA (2026-08-25)

| Componente | Estado |
|------------|--------|
| Disco C: | ✅ 237 GB total, ~109 GB libres, NTFS Healthy |
| Windows Update | ✅ Servicio activo |
| Defender | ✅ Activo y actualizado |
| Docker Desktop | ⏸️ Instalado, servicio detenido (manual) |
| DISM/SFC | 🔄 Ejecutándose en segundo plano |
| Limpieza temp | ✅ ~280 MB liberados |

---

## 🧬 ADN VISUAL UNIFICADO

Todos los repos contribuyen a ManosAbiertas:

| Repo | Contribución |
|------|--------------|
| noiacore-os | Canvas2D particles, EventBus pattern, glass tokens |
| magic/shader | WebGL fragment shader (plasma morphing) |
| magic/sfx | Procedural audio (AudioContext: chime, pop, whoosh) |
| Steven-renovation | Itten 60/30/10, marquee, stepped form UX |
| Cruzando-el-charco | a11y (skip-link, sr-only, quick-exit), i18n chips |
| matrixy-glimmer | Glass tokens, materialize animation |
| joepui-motion-ref | Skeleton loaders, card grid pattern |
| minoan-particles | Vignette overlay, phase text |
| automations (Dashboard V2) | Toast system, Command Palette pattern, telemetry |

---

> **"Una plataforma que se construye sola, se actualiza sola y se paga sola."**  
> — Pedro Belentani · 2026
