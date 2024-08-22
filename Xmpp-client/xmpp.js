import * as Strophe from 'strophe.js';

const domain = "alumchat.lol";
const service = `xmpp://${domain}:5222`;

let xmpp = null;

export function register(username, password) {
    // Ensure that Strophe.Connection is available
    if (!Strophe.Connection) {
        console.error("Strophe.Connection is not available");
        return;
    }
    
    xmpp = new Strophe.Connection(service);

    xmpp.connect(username + "@" + domain, password, function (status) {
        const statusElement = document.getElementById('status');
        switch (status) {
            case Strophe.Status.CONNECTING:
                statusElement.innerText = 'Status: Connecting';
                break;
            case Strophe.Status.CONNFAIL:
                statusElement.innerText = 'Status: Connection failed';
                break;
            case Strophe.Status.CONNECTED:
                statusElement.innerText = 'Status: Connected';
                // Attempt to register the user
                registerUser(username, password);
                break;
            case Strophe.Status.DISCONNECTING:
                statusElement.innerText = 'Status: Disconnecting';
                break;
            case Strophe.Status.DISCONNECTED:
                statusElement.innerText = 'Status: Disconnected';
                break;
            default:
                statusElement.innerText = 'Status: ' + status;
                break;
        }
    });
}

function registerUser(username, password) {
    const registerIQ = $iq({ type: 'set', to: domain })
        .c('query', { xmlns: 'jabber:iq:register' })
        .c('username').t(username).up()
        .c('password').t(password);
    
    xmpp.sendIQ(registerIQ, function (response) {
        console.log("Registration successful");
        document.getElementById('status').innerText = 'Registration successful';
    }, function (error) {
        console.error("Registration failed", error);
        document.getElementById('status').innerText = 'Registration failed';
    });
}

export function connect() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    register(username, password);
}
