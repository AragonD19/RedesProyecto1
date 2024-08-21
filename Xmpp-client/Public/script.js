document.addEventListener('DOMContentLoaded', () => {
    const server = 'wss://alumchat.lol:5222/xmpp-websocket';
    let client;

    // Conectar al servidor XMPP
    async function connect(username, password) {
        try {
            client = new XMPP.Client({
                service: server,
                domain: 'alumchat.lol',
                resource: 'web',
                username,
                password
            });

            client.on('error', (err) => {
                console.error('Connection Error:', err);
            });

            client.on('session:started', () => {
                console.log('Session Started');
            });

            client.on('message', (msg) => {
                const body = msg.body;
                if (body) {
                    const messagesDiv = document.getElementById('messages');
                    messagesDiv.innerHTML += `<p>${body}</p>`;
                    messagesDiv.scrollTop = messagesDiv.scrollHeight;
                }
            });

            await client.start();
        } catch (err) {
            console.error('Connection Failed:', err);
            throw err;
        }
    }

    // Registro de usuario
    if (document.getElementById('register-form')) {
        document.getElementById('register-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('register-username').value;
            const password = document.getElementById('register-password').value;
            try {
                await connect(username, password);
                // Implementa aquí el registro de cuenta
                document.getElementById('register-message').textContent = 'Registration successful!';
            } catch (err) {
                document.getElementById('register-message').textContent = 'Registration failed.';
            }
        });

        // Eliminar cuenta
        if (document.getElementById('delete-account')) {
            document.getElementById('delete-account').addEventListener('click', async () => {
                const username = prompt('Enter your username');
                const password = prompt('Enter your password');
                try {
                    await connect(username, password);
                    // Implementa aquí la eliminación de cuenta
                    document.getElementById('register-message').textContent = 'Account deleted successfully!';
                } catch (err) {
                    document.getElementById('register-message').textContent = 'Account deletion failed.';
                }
            });
        }
    }

    // Inicio de sesión
    if (document.getElementById('login-form')) {
        document.getElementById('login-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            try {
                await connect(username, password);
                document.getElementById('login-message').textContent = 'Logged in!';
                window.location.href = 'chat.html';
            } catch (err) {
                document.getElementById('login-message').textContent = 'Login failed.';
            }
        });
    }

    // Chat y cierre de sesión
    if (document.getElementById('messages')) {
        const username = prompt('Enter your username');
        const password = prompt('Enter your password');
        connect(username, password);

        // Enviar mensajes
        document.getElementById('send-message').addEventListener('click', () => {
            const message = document.getElementById('message-input').value;
            client.sendMessage({
                to: 'recipient@alumchat.lol',
                body: message
            });
            document.getElementById('message-input').value = '';
        });

        // Cerrar sesión
        document.getElementById('logout').addEventListener('click', () => {
            client.stop();
            window.location.href = 'login.html';
        });
    }
});
