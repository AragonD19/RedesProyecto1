import { register, connect } from './xmpp.js';

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('register-button').addEventListener('click', () => {
        const username = document.getElementById('register-username').value;
        const password = document.getElementById('register-password').value;
        register(username, password);
    });

    document.getElementById('connect-button').addEventListener('click', connect);
});
