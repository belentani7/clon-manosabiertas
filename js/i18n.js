/* ═══════════════════════════════════════════════════════════════
   MANOS ABIERTAS — i18n Engine (39 Languages)

   Architecture:
   ├── Lazy-loads translation JSONs from /data/i18n/{code}.json
   ├── data-i18n="key.path" attributes on HTML elements
   ├── data-i18n-attr="placeholder:key" for attributes
   ├── RTL support (Arabic, Hebrew, Urdu, Farsi, Pashto)
   ├── localStorage persistence
   ├── Web Speech API integration (TTS per language)
   └── Language selector modal with search

   Usage:
     <span data-i18n="hero.title_1">Tu puente hacia la</span>
     <input data-i18n-attr="placeholder:courses.search_placeholder">

   API:
     I18n.setLang('en')  — switch language
     I18n.t('hero.title_1') — get translation
     I18n.speak('hero.subtitle') — TTS read aloud
   ═══════════════════════════════════════════════════════════════ */

const I18n = {
  // ─── State ───
  currentLang: 'es',
  translations: {},    // { es: {...}, en: {...}, ... }
  fallback: null,      // Spanish fallback (loaded at init)
  loading: new Set(),  // languages currently being fetched

  // ─── All 39 supported languages ───
  languages: [
    { code: 'es', name: 'Español', flag: '🇪🇸', dir: 'ltr' },
    { code: 'en', name: 'English', flag: '🇬🇧', dir: 'ltr' },
    { code: 'fr', name: 'Français', flag: '🇫🇷', dir: 'ltr' },
    { code: 'pt', name: 'Português', flag: '🇧🇷', dir: 'ltr' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦', dir: 'rtl' },
    { code: 'zh', name: '中文', flag: '🇨🇳', dir: 'ltr' },
    { code: 'uk', name: 'Українська', flag: '🇺🇦', dir: 'ltr' },
    { code: 'ro', name: 'Română', flag: '🇷🇴', dir: 'ltr' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳', dir: 'ltr' },
    { code: 'bn', name: 'বাংলা', flag: '🇧🇩', dir: 'ltr' },
    { code: 'sw', name: 'Kiswahili', flag: '🇰🇪', dir: 'ltr' },
    { code: 'am', name: 'አማርኛ', flag: '🇪🇹', dir: 'ltr' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰', dir: 'rtl' },
    { code: 'tl', name: 'Filipino', flag: '🇵🇭', dir: 'ltr' },
    { code: 'wo', name: 'Wolof', flag: '🇸🇳', dir: 'ltr' },
    { code: 'so', name: 'Soomaali', flag: '🇸🇴', dir: 'ltr' },
    { code: 'ha', name: 'Hausa', flag: '🇳🇬', dir: 'ltr' },
    { code: 'yo', name: 'Yorùbá', flag: '🇳🇬', dir: 'ltr' },
    { code: 'ig', name: 'Igbo', flag: '🇳🇬', dir: 'ltr' },
    { code: 'zu', name: 'isiZulu', flag: '🇿🇦', dir: 'ltr' },
    { code: 'rw', name: 'Kinyarwanda', flag: '🇷🇼', dir: 'ltr' },
    { code: 'ti', name: 'ትግርኛ', flag: '🇪🇷', dir: 'ltr' },
    { code: 'om', name: 'Oromoo', flag: '🇪🇹', dir: 'ltr' },
    { code: 'ln', name: 'Lingála', flag: '🇨🇩', dir: 'ltr' },
    { code: 'kg', name: 'Kikongo', flag: '🇨🇩', dir: 'ltr' },
    { code: 'ff', name: 'Fulfulde', flag: '🇬🇳', dir: 'ltr' },
    { code: 'bm', name: 'Bamanankan', flag: '🇲🇱', dir: 'ltr' },
    { code: 'ee', name: 'Eʋegbe', flag: '🇬🇭', dir: 'ltr' },
    { code: 'ak', name: 'Akan', flag: '🇬🇭', dir: 'ltr' },
    { code: 'tw', name: 'Twi', flag: '🇬🇭', dir: 'ltr' },
    { code: 'gn', name: 'Avañe\'ẽ', flag: '🇵🇾', dir: 'ltr' },
    { code: 'ay', name: 'Aymar aru', flag: '🇧🇴', dir: 'ltr' },
    { code: 'qu', name: 'Runasimi', flag: '🇵🇪', dir: 'ltr' },
    { code: 'ht', name: 'Kreyòl Ayisyen', flag: '🇭🇹', dir: 'ltr' },
    { code: 'mg', name: 'Malagasy', flag: '🇲🇬', dir: 'ltr' },
    { code: 'my', name: 'မြန်မာဘာသာ', flag: '🇲🇲', dir: 'ltr' },
    { code: 'km', name: 'ភាសាខ្មែរ', flag: '🇰🇭', dir: 'ltr' },
    { code: 'lo', name: 'ພາສາລາວ', flag: '🇱🇦', dir: 'ltr' },
    { code: 'ne', name: 'नेपाली', flag: '🇳🇵', dir: 'ltr' }
  ],

  // ─── TTS voice mapping (BCP47 codes) ───
  voiceMap: {
    es: 'es-ES', en: 'en-US', fr: 'fr-FR', pt: 'pt-BR', ar: 'ar-SA',
    zh: 'zh-CN', uk: 'uk-UA', ro: 'ro-RO', hi: 'hi-IN', bn: 'bn-BD',
    sw: 'sw-KE', ur: 'ur-PK', tl: 'fil-PH', ne: 'ne-NP', my: 'my-MM',
    km: 'km-KH', lo: 'lo-LA', am: 'am-ET', so: 'so-SO', ha: 'ha-NG',
    yo: 'yo-NG', zu: 'zu-ZA'
  },

  // ─── Init ───
  async init() {
    // Load saved language or detect from browser
    const saved = localStorage.getItem('ma_lang');
    const browserLang = (navigator.language || 'es').slice(0, 2);
    const detected = saved || (this.languages.find(l => l.code === browserLang) ? browserLang : 'es');

    // Always load Spanish as fallback
    await this.loadLang('es');
    this.fallback = this.translations.es;

    // Load detected language
    if (detected !== 'es') {
      await this.loadLang(detected);
    }

    this.currentLang = detected;
    this.applyTranslations();
    this.updateLangChips();
    this.initLangSelector();

    console.log(`[i18n] Initialized: ${detected} (${this.languages.find(l => l.code === detected)?.name})`);
  },

  // ─── Load a language JSON ───
  async loadLang(code) {
    if (this.translations[code] || this.loading.has(code)) return;
    this.loading.add(code);

    try {
      const base = document.querySelector('base')?.href || window.location.href.replace(/\/[^/]*$/, '/');
      const res = await fetch(new URL(`data/i18n/${code}.json`, base));
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      this.translations[code] = await res.json();
    } catch (err) {
      console.warn(`[i18n] Failed to load ${code}:`, err.message);
      // For languages without a JSON file, use Spanish fallback
      this.translations[code] = this.fallback || {};
    } finally {
      this.loading.delete(code);
    }
  },

  // ─── Get a translation by dot path ───
  t(key, vars = {}) {
    const get = (obj, path) => path.split('.').reduce((o, k) => o?.[k], obj);
    let val = get(this.translations[this.currentLang], key);
    if (val === undefined) val = get(this.fallback, key);
    if (val === undefined) return key;

    // Replace {var} placeholders
    if (typeof val === 'string' && Object.keys(vars).length) {
      return val.replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? k);
    }
    return val;
  },

  // ─── Apply translations to all [data-i18n] elements ───
  applyTranslations() {
    const lang = this.translations[this.currentLang] || this.fallback;
    if (!lang) return;

    // Text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      const val = this.t(key);
      if (typeof val === 'string') {
        // Preserve child elements (like <span class="highlight">)
        if (el.children.length === 0) {
          el.textContent = val;
        } else {
          // Only replace the text node(s)
          for (const node of el.childNodes) {
            if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
              node.textContent = val;
              break;
            }
          }
        }
      }
    });

    // Attributes (placeholder, aria-label, title, etc.)
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const pairs = el.dataset.i18nAttr.split(';');
      pairs.forEach(pair => {
        const [attr, key] = pair.split(':');
        if (attr && key) {
          const val = this.t(key.trim());
          if (typeof val === 'string') {
            el.setAttribute(attr.trim(), val);
          }
        }
      });
    });

    // Update document direction for RTL languages
    const langInfo = this.languages.find(l => l.code === this.currentLang);
    if (langInfo) {
      document.documentElement.setAttribute('dir', langInfo.dir);
      document.documentElement.setAttribute('lang', langInfo.code);
    }

    // Update page title
    const brandName = this.t('nav.brand');
    if (brandName && brandName !== 'nav.brand') {
      document.title = `${brandName} — ${this.t('hero.title_highlight')}`;
    }
  },

  // ─── Set language ───
  async setLang(code) {
    if (code === this.currentLang) return;

    const langInfo = this.languages.find(l => l.code === code);
    if (!langInfo) { console.warn(`[i18n] Unknown language: ${code}`); return; }

    // Show loading state
    document.body.style.cursor = 'wait';

    await this.loadLang(code);
    this.currentLang = code;
    localStorage.setItem('ma_lang', code);

    this.applyTranslations();
    this.updateLangChips();

    document.body.style.cursor = '';

    // Toast notification
    if (typeof Toast !== 'undefined') {
      Toast.info(this.t('toast.lang_changed', { lang: langInfo.name }));
    }

    console.log(`[i18n] Language changed to: ${code} (${langInfo.name})`);
  },

  // ─── Update active state on language chips ───
  updateLangChips() {
    document.querySelectorAll('.lang-chip').forEach(chip => {
      chip.classList.toggle('active', chip.dataset.lang === this.currentLang);
    });
  },

  // ─── Initialize the language selector modal ───
  initLangSelector() {
    const btn = document.getElementById('lang-toggle');
    if (!btn) return;

    // Remove old click handler (theme toggle) — we'll use a separate button for theme
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);

    newBtn.addEventListener('click', () => this.showLangModal());

    // Also make lang chips clickable
    document.querySelectorAll('.lang-chip[data-lang]').forEach(chip => {
      chip.addEventListener('click', () => this.setLang(chip.dataset.lang));
    });
  },

  // ─── Show language selector modal ───
  showLangModal() {
    // Remove existing modal
    document.getElementById('lang-modal')?.remove();

    const modal = document.createElement('div');
    modal.id = 'lang-modal';
    modal.className = 'tool-modal open';
    modal.innerHTML = `
      <div class="tool-modal-inner" style="max-width:640px">
        <div class="tool-modal-header">
          <h2>🌍 ${this.t('languages.title')}</h2>
          <button id="lang-modal-close" class="modal-close-btn" aria-label="Close">✕</button>
        </div>
        <div style="padding:16px 24px 8px">
          <input type="text" id="lang-search"
            placeholder="Search / Buscar / بحث / 搜索..."
            style="width:100%;padding:10px 16px;border:1px solid var(--border);border-radius:var(--radius-pill);font:inherit;background:var(--surface);color:var(--text-1)">
        </div>
        <div id="lang-grid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px;padding:16px 24px 24px;max-height:60vh;overflow-y:auto">
          ${this.languages.map(l => `
            <button class="lang-option ${l.code === this.currentLang ? 'active' : ''}"
              data-code="${l.code}"
              style="display:flex;align-items:center;gap:10px;padding:10px 14px;border-radius:var(--radius-sm);border:1px solid var(--border);background:${l.code === this.currentLang ? 'var(--primary)' : 'var(--surface)'};color:${l.code === this.currentLang ? 'white' : 'var(--text-1)'};cursor:pointer;transition:all 0.2s;text-align:left;font-size:0.88rem">
              <span style="font-size:1.3rem">${l.flag}</span>
              <div>
                <div style="font-weight:600">${l.name}</div>
                <div style="font-size:0.7rem;opacity:0.6">${l.code.toUpperCase()}${l.dir === 'rtl' ? ' · RTL' : ''}</div>
              </div>
            </button>
          `).join('')}
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Close button
    document.getElementById('lang-modal-close').addEventListener('click', () => modal.remove());
    modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
    document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { modal.remove(); document.removeEventListener('keydown', esc); } });

    // Language buttons
    modal.querySelectorAll('.lang-option').forEach(btn => {
      btn.addEventListener('click', () => {
        this.setLang(btn.dataset.code);
        modal.remove();
      });
    });

    // Search
    const searchInput = document.getElementById('lang-search');
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase();
      modal.querySelectorAll('.lang-option').forEach(btn => {
        const lang = this.languages.find(l => l.code === btn.dataset.code);
        const match = !q ||
          lang.name.toLowerCase().includes(q) ||
          lang.code.includes(q) ||
          lang.flag.includes(q);
        btn.style.display = match ? '' : 'none';
      });
    });

    searchInput.focus();
  },

  // ─── Text-to-Speech ───
  speak(key, rate = 0.9) {
    if (!('speechSynthesis' in window)) return;

    const text = typeof key === 'string' && key.includes('.') ? this.t(key) : key;
    if (!text || text === key) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const bcp47 = this.voiceMap[this.currentLang] || this.currentLang;
    utterance.lang = bcp47;
    utterance.rate = rate;
    utterance.pitch = 1;

    // Try to find a matching voice
    const voices = window.speechSynthesis.getVoices();
    const match = voices.find(v => v.lang.startsWith(bcp47.split('-')[0]));
    if (match) utterance.voice = match;

    window.speechSynthesis.speak(utterance);
  },

  // ─── Stop TTS ───
  stopSpeaking() {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }
};

// Auto-init when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => I18n.init());
} else {
  I18n.init();
}
