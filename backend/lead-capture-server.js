// Lead Capture Server v2 — ManosAbiertas
// PM2: pm2 start backend/lead-capture-server.js --name leads-api
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const app = express();
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

const LEADS_FILE = path.join(__dirname, 'leads.json');
const LEADS_ARCHIVE = path.join(__dirname, `leads-archive-${new Date().getFullYear()}.jsonl`);

// Load or init leads
function getLeads() {
  try {
    return JSON.parse(fs.readFileSync(LEADS_FILE, 'utf8'));
  } catch {
    return { leads: [], stats: { total: 0, converted: 0, emailed: 0 }, lastUpdate: new Date().toISOString() };
  }
}

// Save lead
function saveLead(email, data) {
  const leads = getLeads();
  const newLead = {
    id: `lead_${crypto.randomBytes(8).toString('hex')}`,
    email,
    ...data,
    timestamp: new Date().toISOString(),
    status: 'new',
    score: calculateLeadScore(data),
    tags: extractTags(data)
  };
  
  leads.leads.push(newLead);
  leads.stats.total = leads.leads.length;
  leads.lastUpdate = new Date().toISOString();
  
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
  
  // Archive to JSONL
  fs.appendFileSync(LEADS_ARCHIVE, JSON.stringify(newLead) + '\n');
  
  // Webhook to n8n (non-blocking)
  fetch('http://localhost:5678/webhook/leads', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newLead)
  }).catch(() => console.warn('[WEBHOOK] n8n unreachable'));
  
  return newLead;
}

// Score lead quality
function calculateLeadScore(data) {
  let score = 0;
  if (data.email) score += 30;
  if (data.phone) score += 20;
  if (data.course) score += 15;
  if (data.city) score += 10;
  if (data.interests && data.interests.length > 0) score += 15;
  if (data.unemployed) score += 10;
  return Math.min(100, score);
}

// Extract tags from data
function extractTags(data) {
  const tags = [];
  if (data.unemployed) tags.push('unemployed');
  if (data.interests) tags.push(...data.interests);
  if (data.city) tags.push(`city:${data.city}`);
  return tags;
}

// API: POST /api/leads
app.post('/api/leads', (req, res) => {
  const { email, phone, name, course, city, interests, unemployed } = req.body;
  
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }
  
  const lead = saveLead(email, { phone, name, course, city, interests, unemployed });
  
  res.json({
    success: true,
    message: '✅ Lead registrado. Recibirás un email pronto.',
    lead: { id: lead.id, score: lead.score }
  });
});

// API: GET /api/leads (admin)
app.get('/api/leads', (req, res) => {
  const { key } = req.query;
  if (key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  const leads = getLeads();
  res.json(leads);
});

// API: PATCH /api/leads/:id (update status)
app.patch('/api/leads/:id', (req, res) => {
  const { key } = req.query;
  if (key !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  const { status, notes } = req.body;
  const leads = getLeads();
  const lead = leads.leads.find(l => l.id === req.params.id);
  
  if (!lead) return res.status(404).json({ error: 'Lead not found' });
  
  lead.status = status || lead.status;
  lead.notes = notes || lead.notes;
  lead.updatedAt = new Date().toISOString();
  
  fs.writeFileSync(LEADS_FILE, JSON.stringify(leads, null, 2));
  res.json({ success: true, lead });
});

// API: GET /api/stats
app.get('/api/stats', (req, res) => {
  const leads = getLeads();
  const stats = {
    total: leads.leads.length,
    new: leads.leads.filter(l => l.status === 'new').length,
    contacted: leads.leads.filter(l => l.status === 'contacted').length,
    converted: leads.leads.filter(l => l.status === 'converted').length,
    avgScore: (leads.leads.reduce((sum, l) => sum + l.score, 0) / leads.leads.length || 0).toFixed(1),
    topCourses: [...new Set(leads.leads.map(l => l.course))].slice(0, 5),
    topCities: [...new Set(leads.leads.map(l => l.city))].slice(0, 5)
  };
  res.json(stats);
});

const PORT = process.env.PORT || 3847;
app.listen(PORT, () => {
  console.log(`✅ Lead Capture API running on :${PORT}`);
  console.log(`📊 Leads DB: ${LEADS_FILE}`);
  console.log(`🔗 Webhook to n8n: http://localhost:5678/webhook/leads`);
});
