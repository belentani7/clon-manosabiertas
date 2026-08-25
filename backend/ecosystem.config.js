module.exports = {
  apps: [
    {
      name: 'leads-api',
      script: './lead-capture-server.js',
      cwd: __dirname,
      instances: 1,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3847,
        ADMIN_KEY: process.env.ADMIN_KEY || 'changeme'
      },
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_file: './logs/combined.log',
      time_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_memory_restart: '200M',
      max_restarts: 10,
      min_uptime: '10s',
      listen_timeout: 3000
    }
  ]
};
