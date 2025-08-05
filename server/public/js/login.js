document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const result = await response.json();

                if (result.success) {
                    alert('¡Login exitoso!');
                    //window.href = "/home"; // Redirigir a la página de inicio
                } else {
                    alert(`Error: ${result.message}`);
                }
            } catch (error) {
                console.error('Error en el login:', error);
                alert('Ocurrió un error al intentar iniciar sesión.');
            }
        });
    }
});
