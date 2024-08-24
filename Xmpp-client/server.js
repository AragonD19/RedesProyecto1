const express = require('express');
const { client, xml } = require('@xmpp/client');

const app = express();
const port = 3000;

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

let xmpp = null;

function createRegisterStanza(username, password) {
    return xml('iq', { type: 'set', id: 'register1' },
        xml('query', { xmlns: 'jabber:iq:register' },
            xml('username', {}, username),
            xml('password', {}, password)
        )
    );
}

function connect(username, password) {
    xmpp = client({
        service: 'xmpp://alumchat.lol:5222',
        domain: 'alumchat.lol',
        username: username,
        password: password,
    });

    xmpp.on('error', (err) => {
        console.error('Error:', err);
    });

    xmpp.on('status', (status) => {
        console.log('Status:', status);
    });

    xmpp.on('online', async (address) => {
        console.log('Connected as', address.toString());
    });

    return xmpp.start();
}

function register(username, password) {
    return new Promise(async (resolve, reject) => {
        try {
            await connect(username, password);
            const registerStanza = createRegisterStanza(username, password);

            xmpp.send(registerStanza).then(() => {
                console.log("Registro exitoso!");
                resolve();
            }).catch((err) => {
                console.error("Error durante el registro:", err);
                reject(new Error("Error al registrarse: " + err.message));
            });
        } catch (err) {
            reject(new Error("Usuario ya registrado o error de conexión: " + err.message));
        }
    });
}

app.use(express.static('public'));

app.get('/register/:username/:password', async (req, res) => {
    const { username, password } = req.params;
    try {
        await register(username, password);
        res.send('Registro exitoso.');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
