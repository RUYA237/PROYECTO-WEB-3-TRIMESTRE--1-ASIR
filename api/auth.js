import express from 'express';
const router = express.Router();

// Usuarios válidos para el login
// usuario: admin, contraseña: 1234
// usuario: carlos, contraseña: 1234
const usuariosValidos = {
    "admin":  { pass: "1234", rol: "admin" },
    "carlos": { pass: "1234", rol: "empleado" }
};

router.post('/login', (req, res) => {
    const { user, pass } = req.body;
    
    if (usuariosValidos[user] && usuariosValidos[user].pass === pass) {
        res.json({ exito: true, rol: usuariosValidos[user].rol });
    } else {
        res.status(401).json({ exito: false, mensaje: "Credenciales incorrectas" });
    }
});

export default router;
