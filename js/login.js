// js/login.js
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Evita que la página se recargue

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            // Reemplaza esta URL con la ruta real de tu API Backend
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            if (response.ok) {
                const data = await response.json();
                // Si el login es correcto, guardamos el token (si la API lo devuelve) y redirigimos
                localStorage.setItem('token', data.token);
                window.location.href = 'dashboard.html';
            } else {
                // Manejo de credenciales incorrectas
                errorMessage.textContent = 'Usuario o contraseña incorrectos.';
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            console.error('Error de conexión con la API:', error);
            errorMessage.textContent = 'Error de conexión con el servidor.';
            errorMessage.style.display = 'block';
        }
    });
});