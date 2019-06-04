module.exports = {
  apps : [{
    name: 'bruce',
    script: 'dist/app.compiled.js',

    // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
  }],
};
