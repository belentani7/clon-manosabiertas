/* ═══════════════════════════════════════════════════════════════
   MANOS ABIERTAS — Lead Capture API Server
   Port: 3847 (configurable via PORT env)

   Endpoints:
   - GET  /api/leads          → List all leads
   - POST /api/leads          → Create a new lead
   - GET  /api/health         → Health check
   - GET  /api/stats          → Basic stats

   Run: node lead-capture-server.js
   PM2:  pm2 start lead-capture-server.js --name leads-api
   ═══════════════════════════════════════════════════════════════ */

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3847;
const LEADS_FILE = path.join(__dirname, 'leads.json');
const N8N_WEBHOOK = process.env.N8N_WEBHOOK || 'http://localhost:5678/webhook/leads';

// ── Helpers ──
function readLeads() {
  try { return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8')); }
  catch { return []; }
}

function writeLeads(leads) {
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2), 'utf8');
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; if (body.length > 1e5) reject(new Error('Too large')); });
    req.on('end', () => { try { resolve(JSON.parse(body)); } catch { reject(new Error('Invalid JSON')); } });
    req.on('error', reject);
  });
}

function cors(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function json(res, data, status = 200) {
  cors(res);
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(data));
}

// ── Forward to n8n (fire-and-forget) ──
function forwardToN8n(lead) {
  try {
    const url = new URL(N8N_WEBHOOK);
    const postData = JSON.stringify(lead);
    const options = {
      hostname: url.hostname,
      port: url.port || (url.protocol === 'https:' ? 443 : 80),
      path: url.pathname,
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(postData) }
    };
    const req = http.request(options, () => {});
    req.on('error', err => console.warn('[n8n] webhook failed:', err.message));
    req.write(postData);
    req.end();
  } catch (e) { console.warn('[n8n] forward error:', e.message); }
}

// ── Server ──
const server = http.createServer(async (req, res) => {
  const { method, url: reqUrl } = req;

  // CORS preflight
  if (method === 'OPTIONS') { cors(res); res.writeHead(204); res.end(); return; }

  // Routes
  if (reqUrl === '/api/health' && method === 'GET') {
    return json(res, { status: 'ok', uptime: process.uptime(), timestamp: new Date().toISOString() });
  }

  if (reqUrl === '/api/leads' && method === 'GET') {
    const leads = readLeads();
    return json(res, { total: leads.length, leads });
  }

  if (reqUrl === '/api/leads' && method === 'POST') {
    try {
      const body = await parseBody(req);
      if (!body.email) return json(res, { error: 'Email is required' }, 400);

      const lead = {
        id: `lead_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        email: body.email,
        name: body.name || '',
        source: body.source || 'website',
        interest: body.interest || '',
        language: body.language || 'es',
        city: body.city || '',
        created: new Date().toISOString(),
        status: 'new'
      };

      const leads = readLeads();
      // Prevent duplicate emails within 24h
      const recent = leads.find(l => l.email === lead.email && (Date.now() - new Date(l.created).getTime()) < 86400000);
      if (recent) return json(res, { error: 'Lead already registered recently', lead: recent }, 409);

      leads.push(lead);
      writeLeads(leads);
      forwardToN8n(lead);

      console.log(`[Lead] New: ${lead.email} (${lead.source})`);
      return json(res, { success: true, lead }, 201);
    } catch (e) {
      return json(res, { error: e.message }, 400);
    }
  }

  if (reqUrl === '/api/stats' && method === 'GET') {
    const leads = readLeads();
    const today = new Date().toISOString().slice(0, 10);
    const todayLeads = leads.filter(l => l.created.startsWith(today));
    const bySrc = {};
    leads.forEach(l => { bySrc[l.source] = (bySrc[l.source] || 0) + 1; });
    return json(res, { total: leads.length, today: todayLeads.length, bySource: bySrc });
  }

  // 404
  json(res, { error: 'Not found' }, 404);
});

server.listen(PORT, () => {
  console.log(`\n🤲 Manos Abiertas — Lead Capture API`);
  console.log(`   Port: ${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   n8n webhook: ${N8N_WEBHOOK}\n`);
});
