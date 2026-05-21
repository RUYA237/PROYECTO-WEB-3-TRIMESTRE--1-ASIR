import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { 
    verificarLogin,
    obtenerListaEmpleados, 
    obtenerDashboardStats, 
    transaccionDespedirEmpleado,
    transaccionTrasladarEmpleado,
    transaccionCrearProyecto,
    transaccionEntregarEquipo,
    transaccionEliminarProyecto,
    transaccionCrearDepartamento,
    transaccionContratarConEquipo,
    transaccionActualizarDepartamento,
    transaccionContratarEmpleado,
    transaccionCerrarProyecto
} from './consultas_estudiantes.js';

dotenv.config();
const app = express();

// Middlewares obligatorios
app.use(cors()); // Permite que la web HTML conecte con la API
app.use(express.json()); // Permite recibir datos por POST en formato JSON

// ==========================================
// RUTAS (ENDPOINTS) DE LA API
// ==========================================

// Ruta GET: Obtener todos los empleados (Para la cuadrícula de la Intranet)
app.get('/api/empleados', async (req, res) => {
    try {
        const datos = await obtenerListaEmpleados();
        res.json({ exito: true, datos: datos });
    } catch (error) {
        console.error("Error en API /api/empleados:", error);
        res.status(500).json({ exito: false, mensaje: "Error interno del servidor", error: error.message });
    }
});

// Ruta GET: Obtener contadores para el Dashboard
app.get('/api/dashboard', async (req, res) => {
    try {
        const stats = await obtenerDashboardStats();
        res.json({ exito: true, datos: stats });
    } catch (error) {
        res.status(500).json({ exito: false, error: error.message });
    }
});

// Ruta POST: Ejecutar Transacción Crítica (Ej: Despido)
app.post('/api/transaccion/despedir', async (req, res) => {
    // La intranet enviará el ID del empleado por POST
    const { id_empleado, id_admin_ejecutor } = req.body;

    if (!id_empleado) {
        return res.status(400).json({ exito: false, mensaje: "Falta el ID del empleado" });
    }

    try {
        await transaccionDespedirEmpleado(id_empleado, id_admin_ejecutor);
        res.json({ exito: true, mensaje: "Transacción de despido ejecutada y guardada correctamente." });
    } catch (error) {
        res.status(500).json({ exito: false, mensaje: "LA TRANSACCIÓN FUE REVERTIDA (ROLLBACK)", error: error.message });
    }
});

// Ruta POST: Trasladar empleado a otro departamento
app.post('/api/transaccion/trasladar', async (req, res) => {
    const { id_empleado, id_departamento_nuevo } = req.body;
    if (!id_empleado || !id_departamento_nuevo) {
        return res.status(400).json({ exito: false, mensaje: "Faltan datos" });
    }
    try {
        await transaccionTrasladarEmpleado(id_empleado, id_departamento_nuevo);
        res.json({ exito: true, mensaje: "Empleado trasladado correctamente." });
    } catch (error) {
        res.status(500).json({ exito: false, mensaje: "LA TRANSACCIÓN FUE REVERTIDA (ROLLBACK)", error: error.message });
    }
});

// Ruta POST: Crear nuevo proyecto
app.post('/api/transaccion/crear-proyecto', async (req, res) => {
    const { nombre_proyecto, presupuesto, id_departamento } = req.body;
    if (!nombre_proyecto || !presupuesto || !id_departamento) {
        return res.status(400).json({ exito: false, mensaje: "Faltan datos" });
    }
    try {
        await transaccionCrearProyecto(nombre_proyecto, presupuesto, id_departamento);
        res.json({ exito: true, mensaje: "Proyecto creado correctamente." });
    } catch (error) {
        res.status(500).json({ exito: false, mensaje: "LA TRANSACCIÓN FUE REVERTIDA (ROLLBACK)", error: error.message });
    }
});

// Ruta POST: Contratar nuevo empleado
app.post('/api/transaccion/contratar', async (req, res) => {
    const { dni, nombre, apellidos, id_departamento, email, salario } = req.body;
    if (!dni || !nombre || !apellidos || !id_departamento || !email || !salario) {
        return res.status(400).json({ exito: false, mensaje: "Faltan datos" });
    }
    try {
        const resultado = await transaccionContratarEmpleado(dni, nombre, apellidos, id_departamento, email, salario);
        res.json({ exito: true, mensaje: "Empleado contratado correctamente.", datos: resultado });
    } catch (error) {
        res.status(500).json({ exito: false, mensaje: "LA TRANSACCIÓN FUE REVERTIDA (ROLLBACK)", error: error.message });
    }
});

// Ruta POST: Cerrar proyecto con incentivo
app.post('/api/transaccion/cerrar-proyecto', async (req, res) => {
    const { id_proyecto, id_empleado, incentivo } = req.body;
    if (!id_proyecto || !id_empleado || !incentivo) {
        return res.status(400).json({ exito: false, mensaje: "Faltan datos" });
    }
    try {
        await transaccionCerrarProyecto(id_proyecto, id_empleado, incentivo);
        res.json({ exito: true, mensaje: "Proyecto cerrado correctamente." });
    } catch (error) {
        res.status(500).json({ exito: false, mensaje: "LA TRANSACCIÓN FUE REVERTIDA (ROLLBACK)", error: error.message });
    }
});

// Ruta POST: Login con credenciales de la base de datos
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ exito: false, mensaje: 'Faltan credenciales' });
    }
    try {
        const user = await verificarLogin(username, password);
        if (!user) {
            return res.status(401).json({ exito: false, mensaje: 'Usuario o contraseña incorrectos' });
        }
        res.json({ exito: true, datos: user });
    } catch (error) {
        res.status(500).json({ exito: false, mensaje: 'Error interno', error: error.message });
    }
});

// ==========================================
// RUTA RAÍZ (Para evitar el Cannot GET /)
// ==========================================
app.get('/', (req, res) => {
    res.send('🚀 El servidor de la API está funcionando perfectamente. Usa los endpoints como /api/empleados');
});

// ==========================================
// ARRANQUE DEL SERVIDOR
// ==========================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor API de la Empresa corriendo en: http://localhost:${PORT}`);
    console.log(`🔌 Conectando a Base de Datos en: ${process.env.DB_HOST}...`);
});