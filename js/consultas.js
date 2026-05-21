import pool from './database.js';

/**
 * =================================================================
 * BLOQUE A: LAS 15 CONSULTAS DE LECTURA (SELECT y JOINS de tu MySQL)
 * =================================================================
 */

// 1. Muestra el nombre del empleado y su puesto 
export async function consulta1NombreYPuesto() {
    const sql = `
        SELECT empleados.nombre, puestos.titulo FROM empleados 
        INNER JOIN puestos ON empleados.id_puesto = puestos.id_puesto;
    `;
    const [filas] = await pool.query(sql);
    return filas;
}

// 2. Muestra los nombres de los empleados junto con el nombre del departamento al que pertenecen
export async function consulta2EmpleadosYDepartamento() {
    const sql = `
        SELECT empleados.nombre, departamentos.nombre FROM empleados 
        INNER JOIN departamentos ON empleados.id_departamento = departamentos.id_departamento 
        ORDER BY departamentos.nombre ASC;
    `;
    const [filas] = await pool.query(sql);
    return filas;
}

// 3. Muestra el nombre de los empleados que trabajan en la ubicación 'Planta 1' junto con el nombre de su departamento.
export async function consulta3EmpleadosPlanta1() {
    const sql = `
        SELECT empleados.nombre, departamentos.nombre FROM empleados 
        INNER JOIN departamentos ON empleados.id_departamento = departamentos.id_departamento 
        WHERE departamentos.ubicacion LIKE '%Planta 1%';
    `;
    const [filas] = await pool.query(sql);
    return filas;
}

// 4. Muestra el nombre del empleado, su puesto y su departamento. solo salgan los 'ACTIVO'.
// (Es la función requerida por server.js para la ruta /api/empleados)
export async function obtenerListaEmpleados() {
    const sql = `
        SELECT empleados.nombre, puestos.titulo, departamentos.nombre FROM empleados 
        INNER JOIN puestos ON empleados.id_puesto = puestos.id_puesto 
        INNER JOIN departamentos ON empleados.id_departamento = departamentos.id_departamento 
        WHERE empleados.estado = 'ACTIVO';
    `;
    const [filas] = await pool.query(sql);
    return filas;
}

// 5. Muestra el nombre de los empleados y que pertenezcan a el departamento de sistemas
export async function consulta5EmpleadosSistemas() {
    const sql = `
        SELECT empleados.nombre, departamentos.nombre FROM empleados 
        INNER JOIN departamentos ON empleados.id_departamento = departamentos.id_departamento 
        WHERE departamentos.nombre LIKE '%Sistemas%';
    `;
    const [filas] = await pool.query(sql);
    return filas;
}

// 6. Muestra el nombre del empleado, su email y el salario anual actual
export async function consulta6EmpleadosYSalarios() {
    const sql = `
        SELECT empleados.nombre, empleados.email_corporativo, historial_salarial.salario_anual FROM empleados 
        INNER JOIN historial_salarial ON empleados.id_empleado = historial_salarial.id_empleado 
        WHERE historial_salarial.fecha_fin IS NULL;
    `;
    const [filas] = await pool.query(sql);
    return filas;
}

// 7. empleados que están asignados al proyecto número 1. Muestra el nombre del proyecto y el nombre del empleado.
export async function consulta7EmpleadosProyecto1() {
    const sql = `
        SELECT proyectos.nombre_proyecto, empleados.nombre FROM proyectos 
        INNER JOIN asignaciones_proyectos ON proyectos.id_proyecto = asignaciones_proyectos.id_proyecto 
        INNER JOIN empleados ON asignaciones_proyectos.id_empleado = empleados.id_empleado 
        WHERE proyectos.id_proyecto = 1;
    `;
    const [filas] = await pool.query(sql);
    return filas;
}

// 8. Muestra los departamentos y sus proyectos. 
export async function consulta8DepartamentosYProyectos() {
    const sql = `
        SELECT departamentos.nombre, proyectos.nombre_proyecto FROM departamentos 
        LEFT JOIN proyectos ON departamentos.id_departamento = proyectos.id_departamento_responsable;
    `;
    const [filas] = await pool.query(sql);
    return filas;
}

// 9. muestra el nombre y apellido de los empleados que tienen incidencias con estado 'EN_PROGRESO'.
export async function consulta9EmpleadosIncidenciasEnProgreso() {
    const sql = `
        SELECT empleados.nombre, empleados.apellidos FROM empleados WHERE empleados.id_empleado IN (
        SELECT incidencias_soporte.id_empleado_reporta FROM incidencias_soporte WHERE incidencias_soporte.estado = 'EN_PROGRESO');
    `;
    const [filas] = await pool.query(sql);
    return filas;
}

// 10. Muestra el nombre del empleado, su departamento, el proyecto asignado y su rol.
export async function consulta10EmpleadosDepartamentosYProyectos() {
    const sql = `
        SELECT empleados.nombre, departamentos.nombre, proyectos.nombre_proyecto FROM empleados 
        INNER JOIN departamentos ON empleados.id_departamento = departamentos.id_departamento 
        INNER JOIN asignaciones_proyectos ON empleados.id_empleado = asignaciones_proyectos.id_empleado 
        INNER JOIN proyectos ON asignaciones_proyectos.id_proyecto = proyectos.id_proyecto LIMIT 15;
    `;
    const [filas] = await pool.query(sql);
    return filas;
}

// 11. Muestra el nombre de los proyectos que tienen un presupuesto mayor al presupuesto medio de todos los proyectos de la empresa.
export async function consulta11ProyectosPresupuestoMayorMedia() {
    const sql = `
        SELECT proyectos.nombre_proyecto, proyectos.presupuesto_asignado FROM proyectos 
        WHERE proyectos.presupuesto_asignado > (SELECT AVG(proyectos.presupuesto_asignado) FROM proyectos);
    `;
    const [filas] = await pool.query(sql);
    return filas;
}

// 12. Empleados sin equipo informatico
export async function consulta12EmpleadosSinEquipo() {
    const sql = `
        SELECT empleados.id_empleado, empleados.nombre FROM empleados 
        LEFT JOIN equipos_informaticos ON empleados.id_empleado = equipos_informaticos.id_empleado_asignado 
        WHERE equipos_informaticos.id_equipo IS NULL;
    `;
    const [filas] = await pool.query(sql);
    return filas;
}

// 13. El empleado ID 2 quiere ver sus proyectos. Muestra el nombre del empleado, el proyecto, su fecha de inicio y el presupuesto.
export async function consulta13ProyectosEmpleado2() {
    const sql = `
        SELECT empleados.nombre, proyectos.nombre_proyecto, proyectos.fecha_inicio, proyectos.presupuesto_asignado 
        FROM empleados INNER JOIN asignaciones_proyectos ON empleados.id_empleado = asignaciones_proyectos.id_empleado 
        INNER JOIN proyectos ON asignaciones_proyectos.id_proyecto = proyectos.id_proyecto WHERE empleados.id_empleado = 2;
    `;
    const [filas] = await pool.query(sql);
    return filas;
}

// 14. Muestra el Título de cada departamento y cuantos empleados tienen
// (Es la función requerida por server.js para la ruta /api/dashboard)
export async function obtenerDashboardStats() {
    const [filas_empleados] = await pool.query(
        `SELECT COUNT(id_empleado) AS total FROM empleados WHERE estado = 'ACTIVO'`
    );
    const [filas_proyectos] = await pool.query(
        `SELECT COUNT(id_proyecto) AS total FROM proyectos WHERE estado = 'EN_CURSO'`
    );
    const [filas_tickets] = await pool.query(
        `SELECT COUNT(id_incidencia) AS total FROM incidencias_soporte WHERE estado IN ('ABIERTA', 'EN_PROGRESO')`
    );

    return {
        total_empleados: filas_empleados[0].total,
        proyectos_activos: filas_proyectos[0].total,
        tickets_abiertos: filas_tickets[0].total
    };
}

// 15. Muestra el nombre del departamento y la suma total del presupuesto de sus proyectos asociados
export async function consulta15PresupuestoTotalPorDepartamento() {
    const sql = `
        SELECT departamentos.nombre, SUM(proyectos.presupuesto_asignado) AS PresupuestoTotal FROM departamentos 
        INNER JOIN proyectos ON departamentos.id_departamento = proyectos.id_departamento_responsable GROUP BY departamentos.id_departamento;
    `;
    const [filas] = await pool.query(sql);
    return filas;
}


/**
 * =================================================================
 * BLOQUE B: TRANSACCIONES CON LOS NOMBRES EXACTOS DE SERVER.JS
 * =================================================================
 */

// Transacción: Despedir Empleado (Ruta: /api/transaccion/despedir)
export async function transaccionDespedirEmpleado(id_empleado, id_admin) {
    const conexion = await pool.getConnection();
    try {
        await conexion.beginTransaction();

        await conexion.query(
            `UPDATE empleados SET estado = 'BAJA_TEMPORAL' WHERE id_empleado = ?`,
            [id_empleado]
        );

        await conexion.query(
            `UPDATE historial_salarial SET fecha_fin = CURDATE() WHERE id_empleado = ? AND fecha_fin IS NULL`,
            [id_empleado]
        );

        await conexion.query(
            `INSERT INTO registro_auditoria (tabla_afectada, accion, detalles) VALUES ('empleados', 'UPDATE', ?)`,
            [`Baja del empleado ID: ${id_empleado} por Administrador ID: ${id_admin}`]
        );

        await conexion.commit();
    } catch (error) {
        await conexion.rollback();
        throw error;
    } finally {
        conexion.release();
    }
}

// Transacción: Trasladar Empleado (Ruta: /api/transaccion/trasladar)
export async function transaccionTrasladarEmpleado(id_empleado, id_departamento_nuevo) {
    const conexion = await pool.getConnection();
    try {
        await conexion.beginTransaction();

        await conexion.query(
            `UPDATE empleados SET id_departamento = ? WHERE id_empleado = ?`,
            [id_departamento_nuevo, id_empleado]
        );

        await conexion.query(
            `INSERT INTO registro_auditoria (tabla_afectada, accion, detalles) VALUES ('empleados', 'UPDATE', ?)`,
            [`Empleado ${id_empleado} movido al departamento ${id_departamento_nuevo}`]
        );

        await conexion.commit();
    } catch (error) {
        await conexion.rollback();
        throw error;
    } finally {
        conexion.release();
    }
}

// Transacción: Crear Proyecto (Ruta: /api/transaccion/crear-proyecto)
export async function transaccionCrearProyecto(nombre_proyecto, presupuesto, id_departamento) {
    const conexion = await pool.getConnection();
    try {
        await conexion.beginTransaction();

        await conexion.query(
            `INSERT INTO proyectos (nombre_proyecto, presupuesto_asignado, id_departamento_responsable, estado, fecha_inicio, fecha_fin_estimada)
             VALUES (?, ?, ?, 'EN_CURSO', CURDATE(), DATE_ADD(CURDATE(), INTERVAL 1 YEAR))`,
            [nombre_proyecto, presupuesto, id_departamento]
        );

        await conexion.commit();
    } catch (error) {
        await conexion.rollback();
        throw error;
    } finally {
        conexion.release();
    }
}

// Transacción: Entregar Equipo (Requerida en los imports de server.js)
export async function transaccionEntregarEquipo(marca_modelo, id_empleado, numero_serie) {
    const conexion = await pool.getConnection();
    try {
        await conexion.beginTransaction();

        await conexion.query(
            `INSERT INTO equipos_informaticos (marca_modelo, id_empleado_asignado, fecha_adquisicion, numero_serie, tipo_dispositivo, estado) 
             VALUES (?, ?, CURDATE(), ?, 'PORTATIL', 'OPERATIVO')`,
            [marca_modelo, id_empleado, numero_serie || 'Generado-API']
        );

        await conexion.commit();
    } catch (error) {
        await conexion.rollback();
        throw error;
    } finally {
        conexion.release();
    }
}

// Transacción: Eliminar Proyecto (Requerida en los imports de server.js)
export async function transaccionEliminarProyecto(id_proyecto) {
    const conexion = await pool.getConnection();
    try {
        await conexion.beginTransaction();

        await conexion.query(`DELETE FROM asignaciones_proyectos WHERE id_proyecto = ?`, [id_proyecto]);
        await conexion.query(`DELETE FROM proyectos WHERE id_proyecto = ?`, [id_proyecto]);

        await conexion.commit();
    } catch (error) {
        await conexion.rollback();
        throw error;
    } finally {
        conexion.release();
    }
}

// Transacción: Crear Departamento (Requerida en los imports de server.js)
export async function transaccionCrearDepartamento(nombre, ubicacion, presupuesto_anual) {
    const conexion = await pool.getConnection();
    try {
        await conexion.beginTransaction();

        await conexion.query(
            `INSERT INTO departamentos (nombre, ubicacion, presupuesto_anual) VALUES (?, ?, ?)`,
            [nombre, ubicacion, presupuesto_anual]
        );

        await conexion.commit();
    } catch (error) {
        await conexion.rollback();
        throw error;
    } finally {
        conexion.release();
    }
}

// Transacción: Contratar Con Equipo (Requerida en los imports de server.js / Caso Ainhoa)
export async function transaccionContratarConEquipo(dni, nombre, apellidos, id_departamento, email, id_equipo) {
    const conexion = await pool.getConnection();
    try {
        await conexion.beginTransaction();

        await conexion.query(
            `INSERT INTO empleados (dni, nombre, apellidos, id_departamento, email_corporativo, fecha_contratacion, estado) 
             VALUES (?, ?, ?, ?, ?, CURDATE(), 'ACTIVO')`,
            [dni, nombre, apellidos, id_departamento, email]
        );

        const [resultado] = await conexion.query(`SELECT LAST_INSERT_ID() AS id`);
        const id_empleado_nuevo = resultado[0].id;

        await conexion.query(
            `UPDATE equipos_informaticos SET id_empleado_asignado = ? WHERE id_equipo = ?`,
            [id_empleado_nuevo, id_equipo]
        );

        await conexion.commit();
    } catch (error) {
        await conexion.rollback();
        throw error;
    } finally {
        conexion.release();
    }
}

// Transacción: Actualizar Departamento (Requerida en los imports de server.js)
export async function transaccionActualizarDepartamento(id_departamento, nueva_ubicacion) {
    const conexion = await pool.getConnection();
    try {
        await conexion.beginTransaction();

        await conexion.query(
            `UPDATE departamentos SET ubicacion = ? WHERE id_departamento = ?`,
            [nueva_ubicacion, id_departamento]
        );

        await conexion.query(
            `INSERT INTO registro_auditoria (tabla_afectada, accion, detalles) 
             VALUES ('departamentos', 'UPDATE', ?)`,
            [`Traslado individual departamento ${id_departamento} a la ubicación ${nueva_ubicacion}`]
        );

        await conexion.commit();
    } catch (error) {
        await conexion.rollback();
        throw error;
    } finally {
        conexion.release();
    }
}

// Transacción: Contratar Empleado (Ruta: /api/transaccion/contratar)
export async function transaccionContratarEmpleado(dni, nombre, apellidos, id_departamento, email, salario) {
    const conexion = await pool.getConnection();
    try {
        await conexion.beginTransaction();
        
        await conexion.query(
            `INSERT INTO empleados (dni, nombre, apellidos, id_departamento, estado, email_corporativo, fecha_contratacion)
             VALUES (?, ?, ?, ?, 'ACTIVO', ?, CURDATE())`,
            [dni, nombre, apellidos, id_departamento, email]
        );
        
        const [resultado] = await conexion.query(`SELECT LAST_INSERT_ID() AS id`);
        const id_empleado = resultado[0].id;
        
        await conexion.query(
            `INSERT INTO historial_salarial (id_empleado, salario_anual, fecha_inicio, motivo_cambio) 
             VALUES (?, ?, CURDATE(), 'Alta inicial contratacion')`,
            [id_empleado, salario]
        );
        
        await conexion.commit();
        return { exito: true, id_empleado };
    } catch (error) {
        await conexion.rollback();
        throw error;
    } finally {
        conexion.release();
    }
}

// Transacción: Cerrar Proyecto (Ruta: /api/transaccion/cerrar-proyecto)
export async function transaccionCerrarProyecto(id_proyecto, id_empleado, incentivo) {
    const conexion = await pool.getConnection();
    try {
        await conexion.beginTransaction();

        await conexion.query(`UPDATE proyectos SET estado = 'FINALIZADO' WHERE id_proyecto = ?`, [id_proyecto]);
        await conexion.query(
            `UPDATE historial_salarial 
             SET salario_anual = salario_anual + ?, motivo_cambio = ?
             WHERE id_empleado = ? AND fecha_fin IS NULL`,
            [incentivo, `Incentivo exito Proyecto ${id_proyecto}`, id_empleado]
        );

        await conexion.commit();
    } catch (error) {
        await conexion.rollback();
        throw error;
    } finally {
        conexion.release();
    }
}


/**
 * =================================================================
 * BLOQUE C: EDICIONES COMPLEJAS (Consultas Anidadas / Modificaciones masivas)
 * =================================================================
 */

// 1. Borrar asignaciones de empleados que están en departamentos sin presupuesto
export async function edicion1BorrarAsignacionesSinPresupuesto() {
    const conexion = await pool.getConnection();
    try {
        await conexion.beginTransaction();
        await conexion.query(`
            DELETE FROM asignaciones_proyectos 
            WHERE id_empleado IN (
                SELECT id_empleado FROM empleados 
                WHERE id_departamento IN (SELECT id_departamento FROM departamentos WHERE presupuesto_anual <= 0)
            );
        `);
        await conexion.commit();
    } catch (error) { await conexion.rollback(); throw error; } finally { conexion.release(); }
}

// 2. Marcar como "En Revisión" los equipos de empleados contratados hoy 
export async function edicion2MarcarEquiposNuevos() {
    const conexion = await pool.getConnection();
    try {
        await conexion.beginTransaction();
        await conexion.query(`
            UPDATE equipos_informaticos SET marca_modelo = CONCAT(marca_modelo, ' - [CONFIGURADO HOY]') 
            WHERE id_empleado_asignado IN (SELECT id_empleado FROM empleados WHERE fecha_contratacion = CURDATE());
        `);
        await conexion.commit();
    } catch (error) { await conexion.rollback(); throw error; } finally { conexion.release(); }
}

// 3. Quitar equipos a los empleados que están de baja temporal 
export async function edicion3QuitarEquiposBajaTemporal() {
    const conexion = await pool.getConnection();
    try {
        await conexion.beginTransaction();
        await conexion.query(`
            UPDATE equipos_informaticos SET id_empleado_asignado = NULL 
            WHERE id_empleado_asignado IN (SELECT id_empleado FROM empleados WHERE estado = 'BAJA_TEMPORAL');
        `);
        await conexion.commit();
    } catch (error) { await conexion.rollback(); throw error; } finally { conexion.release(); }
}

// 4. Borrar el historial salarial de empleados que no existen
export async function edicion4LimpiarHistorialHuerfano() {
    const conexion = await pool.getConnection();
    try {
        await conexion.beginTransaction();
        await conexion.query("SET SQL_SAFE_UPDATES = 0;");
        await conexion.query(`DELETE FROM historial_salarial WHERE id_empleado NOT IN (SELECT id_empleado FROM empleados);`);
        await conexion.query("SET SQL_SAFE_UPDATES = 1;");
        await conexion.commit();
    } catch (error) { await conexion.rollback(); throw error; } finally { conexion.release(); }
}

// 5. Asignar un proyecto a los nuevos contratados 
export async function edicion5AsignarProyectoNuevos() {
    const conexion = await pool.getConnection();
    try {
        await conexion.beginTransaction();
        await conexion.query(`
            UPDATE asignaciones_proyectos SET id_proyecto = 5 
            WHERE id_empleado IN (SELECT id_empleado FROM empleados WHERE fecha_contratacion = CURDATE());
        `);
        await conexion.commit();
    } catch (error) { await conexion.rollback(); throw error; } finally { conexion.release(); }
}

// Función usada por POST /api/login
export async function verificarLogin(username, password) {
    const [filas] = await pool.query(
        `SELECT c.id_credencial, c.username, c.password_hash, c.rol_sistema, c.cuenta_bloqueada,
                e.nombre, e.apellidos
         FROM credenciales_acceso c
         JOIN empleados e ON c.id_empleado = e.id_empleado
         WHERE c.username = ?`,
        [username]
    );

    if (filas.length === 0) return null;

    const user = filas[0];
    if (user.cuenta_bloqueada) return null;
    if (user.password_hash !== password) return null;

    await pool.query(
        'UPDATE credenciales_acceso SET fecha_ultimo_acceso = NOW() WHERE id_credencial = ?',
        [user.id_credencial]
    );

    return {
        username: user.username,
        rol:      user.rol_sistema,
        nombre:   user.nombre + ' ' + user.apellidos
    };
}