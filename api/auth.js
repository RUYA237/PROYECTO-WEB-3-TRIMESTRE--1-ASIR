import express from 'express';
const router = express.Router();

// Lista simulada (o podrías consultar tu tabla de usuarios en la BBDD)
const usuariosValidos = {
    "admin": { pass: "1234", rol: "admin" },
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