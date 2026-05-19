document.addEventListener('DOMContentLoaded', () => {
    const formContratar = document.getElementById('formContratar');

    formContratar.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Simulación de envío a tu API de transacciones
        try {
            alert('Enviando transacción a la base de datos...');
            // Aquí iría tu fetch con método POST para la transacción
        } catch (error) {
            alert('Error en la operación');
        }
    });
});