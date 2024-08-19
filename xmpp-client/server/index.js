const express = require('express');
const cors = require('cors');
const Strophe = require('strophe.js').Strophe;

const app = express();
const port = 3000;

app.use(cors()); // Permite todas las solicitudes CORS
app.use(express.json());

app.post('/register', (req, res) => {
  const { username, password } = req.body;
  // Lógica para registrar una nueva cuenta en el servidor XMPP
  // Ejemplo simplificado: almacenar usuario en una base de datos o enviar IQ de registro a servidor XMPP
  res.status(200).send('Account registered');
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Lógica para iniciar sesión en el servidor XMPP
  res.status(200).send('Logged in');
});

app.post('/logout', (req, res) => {
  // Lógica para cerrar sesión en el servidor XMPP
  res.status(200).send('Logged out');
});

app.post('/delete', (req, res) => {
  const { username } = req.body;
  // Lógica para eliminar una cuenta del servidor XMPP
  res.status(200).send('Account deleted');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
