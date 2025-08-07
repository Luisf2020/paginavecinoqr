// server.js
const express = require('express');
const cors = require('cors');
const app = express();

// Solo acepta peticiones desde cualquier origen (puedes limitarlo a tu dominio en producción)
app.use(cors({
  origin: '*', // Cambia por tu dominio si publicas
}));
app.use(express.json());

// Clave y URL real (puedes cambiar la contraseña)
const PASSWORD = 'primavera';
const GOOGLE_DRIVE_URL = 'https://drive.google.com/uc?export=download&id=1kftW7m9LmBEUrmy0F87Xx4UsiqvChd2X';

// Endpoint seguro
app.post('/api/get-apk-url', (req, res) => {
  const { password } = req.body;
  if (password === PASSWORD) {
    return res.json({ url: GOOGLE_DRIVE_URL });
  } else {
    return res.status(401).json({ error: 'No autorizado' });
  }
});

// Puerto de escucha
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
