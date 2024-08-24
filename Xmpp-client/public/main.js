// public/main.js
document.getElementById('login-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    fetch(`/connect/${username}/${password}`)
        .then(response => response.text())
        .then(text => {
            document.getElementById('status').textContent = text;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('status').textContent = 'Error connecting';
        });
});

document.getElementById('register-form').addEventListener('submit', function (event) {
    event.preventDefault();
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;

    fetch(`/connect/${username}/${password}`)
        .then(response => response.text())
        .then(text => {
            document.getElementById('status').textContent = text;
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('status').textContent = 'Error connecting';
        });
});
