"""Deploy to Vercel using their REST API directly (bypasses Node.js memory issues)"""
import json, os, sys, hashlib, urllib.request, urllib.error

BASE = "C:\\Users\\Administrador\\projects\\ManosAbiertas-Optimizacion"
TEAM_ID = "team_PW8qfFcgLWackpqpCQfifest"

# Files to deploy
DEPLOY_FILES = []
SKIP_NAMES = {'optimization-script.js','run-lighthouse.bat','sample-optimized-index.html',
              'verify.js','package.json','netlify.toml','_headers','_redirects',
              '.gitignore','.vercelignore','deploy.py','gen_langs.py'}
SKIP_DIRS = {'.git','.vercel','backend','reports','educativo','node_modules'}

for root, dirs, files in os.walk(BASE):
    dirs[:] = [d for d in dirs if d not in SKIP_DIRS]
    for f in files:
        if f in SKIP_NAMES or f.endswith('.md') or f.endswith('.bat') or f.endswith('.report.html'):
            continue
        full = os.path.join(root, f)
        rel = os.path.relpath(full, BASE).replace('\\', '/')
        DEPLOY_FILES.append((rel, full))

print(f"Collecting {len(DEPLOY_FILES)} files...")

# Build file list for Vercel API
files_payload = []
for rel, full in sorted(DEPLOY_FILES):
    with open(full, 'r', encoding='utf-8', errors='replace') as fh:
        data = fh.read()
    files_payload.append({"file": rel, "data": data})
    print(f"  {rel} ({len(data)} chars)")

# Create deployment via Vercel API
payload = {
    "name": "manos-abiertas",
    "files": files_payload,
    "target": "production",
    "projectSettings": {
        "framework": None,
        "buildCommand": "",
        "outputDirectory": "."
    }
}

payload_json = json.dumps(payload).encode('utf-8')
print(f"\nPayload size: {len(payload_json) / 1024:.0f} KB")
print("Deploying to Vercel...")

# We need a token - check if there's one in env or .vercel config
token = os.environ.get('VERCEL_TOKEN', '')
if not token:
    # Try to read from vercel config
    config_path = os.path.expanduser('~/.config/com.vercel.cli/auth.json')
    if not os.path.exists(config_path):
        config_path = os.path.join(os.environ.get('APPDATA',''), 'com.vercel.cli', 'auth.json')
    if os.path.exists(config_path):
        with open(config_path) as f:
            auth = json.load(f)
            token = auth.get('token', '')

if not token:
    print("ERROR: No Vercel token found.")
    print("Set VERCEL_TOKEN env var or login via vercel CLI first.")
    sys.exit(1)

url = f"https://api.vercel.com/v13/deployments?teamId={TEAM_ID}"
req = urllib.request.Request(url, data=payload_json, method='POST')
req.add_header('Authorization', f'Bearer {token}')
req.add_header('Content-Type', 'application/json')

try:
    with urllib.request.urlopen(req, timeout=120) as resp:
        result = json.loads(resp.read())
        print(f"\n✅ Deployed successfully!")
        print(f"   URL: https://{result.get('url', 'unknown')}")
        print(f"   ID: {result.get('id', 'unknown')}")
        aliases = result.get('alias', [])
        if aliases:
            print(f"   Aliases: {', '.join(aliases)}")
except urllib.error.HTTPError as e:
    body = e.read().decode()
    print(f"\n❌ Deploy failed: {e.code}")
    print(body[:2000])
except Exception as e:
    print(f"\n❌ Error: {e}")
