const { exec } = require('child_process');

// Inicia el backend (NestJS)
const backend = exec('npm start', { cwd: './backend' });

backend.stdout.on('data', (data) => {
  console.log(`[NestJS]: ${data}`);
});

backend.stderr.on('data', (data) => {
  console.error(`[NestJS]: ${data}`);
});

// Inicia el frontend (Next.js)
const frontend = exec('npm run dev', { cwd: './frontend' });

frontend.stdout.on('data', (data) => {
  console.log(`[Next.js]: ${data}`);

  // Cuando el servidor Frontend está escuchando, abre el navegador con la URL del Frontend
  if (data.includes('ready on')) {
    exec('start http://localhost:3000'); // Comando para abrir el navegador en Windows
  }
});

frontend.stderr.on('data', (data) => {
  console.error(`[Next.js]: ${data}`);
});

// Maneja cualquier cierre de proceso para detener las aplicaciones
process.on('SIGINT', () => {
  backend.kill();
  frontend.kill();
  process.exit();
});
