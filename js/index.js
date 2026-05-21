import express from 'express';
import dotenv from 'dotenv';
import pool from './database.js';

dotenv.config();

const router = express.Router();

const IDENT_RE = /^[A-Za-z0-9_]+$/;

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ exito: false, mensaje: 'Faltan credenciales (email/password)' });

    const table = process.env.AUTH_TABLE || 'usuarios';
    const emailField = process.env.AUTH_EMAIL_FIELD || 'email';
    const passField = process.env.AUTH_PASS_FIELD || 'password';

    if (!IDENT_RE.test(table) || !IDENT_RE.test(emailField) || !IDENT_RE.test(passField)) {
        return res.status(500).json({ exito: false, mensaje: 'Configuración de autenticación inválida' });
    }

    try {
        const sql = `SELECT id, \`${emailField}\` as email, \`${passField}\` as password FROM \`${table}\` WHERE \`${emailField}\` = ? LIMIT 1`;
        const [rows] = await pool.query(sql, [email]);
        if (!rows || rows.length === 0) return res.status(401).json({ exito: false, mensaje: 'Credenciales inválidas' });

        const user = rows[0];

        // Intentamos usar bcrypt si está instalado; si no, hacemos comparación directa (útil para bases de datos con contraseñas en claro)
        let bcryptModule = null;
        try {
            bcryptModule = (await import('bcrypt')).default;
        } catch (e) {
            bcryptModule = null;
        }

        let ok = false;
        if (bcryptModule) {
            ok = await bcryptModule.compare(password, user.password);
        } else {
            ok = password === user.password;
        }

        if (!ok) return res.status(401).json({ exito: false, mensaje: 'Credenciales inválidas' });

        delete user.password;
        res.json({ exito: true, mensaje: 'Autenticación correcta', usuario: user });
    } catch (error) {
        console.error('Error en /api/auth/login:', error);
        res.status(500).json({ exito: false, mensaje: 'Error interno', error: error.message });
    }
});

export default router;
