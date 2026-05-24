const API_BASE_URL = '/api';

async function obtenerEmpleados() {
    try {
        const respuesta = await fetch(`${API_BASE_URL}/empleados`);
        const data = await respuesta.json();
        return data.exito ? data.datos : [];
    } catch (error) {
        console.error("Error de conexión:", error);
        return [];
    }
}

async function obtenerDashboardStats() {
    try {
        const respuesta = await fetch(`${API_BASE_URL}/dashboard`);
        const data = await respuesta.json();
        return data.exito ? data.datos : null;
    } catch (error) {
        console.error("Error de conexión:", error);
        return null;
    }
}

async function despedirEmpleado(idEmpleado, idAdmin) {
    try {
        const respuesta = await fetch(`${API_BASE_URL}/transaccion/despedir`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_empleado: idEmpleado, id_admin_ejecutor: idAdmin })
        });
        return await respuesta.json();
    } catch (error) {
        console.error("Error de conexión:", error);
        return { exito: false, mensaje: "Error de red" };
    }
}