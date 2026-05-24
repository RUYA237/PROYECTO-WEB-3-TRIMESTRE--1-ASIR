-- Creación de la base de datos e inicialización
CREATE DATABASE IF NOT EXISTS empresa_core;
USE empresa_core;

-- Tabla Departamentos
CREATE TABLE IF NOT EXISTS departamentos (
    id_departamento INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(100),
    presupuesto_anual DECIMAL(15, 2)
);

-- Tabla Puestos
CREATE TABLE IF NOT EXISTS puestos (
    id_puesto INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(100) NOT NULL,
    nivel_acceso INT
);

-- Tabla Empleados
CREATE TABLE IF NOT EXISTS empleados (
    id_empleado INT PRIMARY KEY AUTO_INCREMENT,
    dni VARCHAR(15) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    id_departamento INT,
    id_puesto INT,
    email_corporativo VARCHAR(100),
    fecha_contratacion DATE,
    estado VARCHAR(50) DEFAULT 'ACTIVO',
    FOREIGN KEY (id_departamento) REFERENCES departamentos(id_departamento),
    FOREIGN KEY (id_puesto) REFERENCES puestos(id_puesto)
);

-- Tabla Historial Salarial
CREATE TABLE IF NOT EXISTS historial_salarial (
    id_historial INT PRIMARY KEY AUTO_INCREMENT,
    id_empleado INT,
    salario_anual DECIMAL(10, 2),
    fecha_inicio DATE,
    fecha_fin DATE NULL,
    motivo_cambio VARCHAR(255),
    FOREIGN KEY (id_empleado) REFERENCES empleados(id_empleado) ON DELETE CASCADE
);

-- Tabla Proyectos (FALTABA)
CREATE TABLE IF NOT EXISTS proyectos (
    id_proyecto INT PRIMARY KEY AUTO_INCREMENT,
    nombre_proyecto VARCHAR(100) NOT NULL,
    presupuesto_asignado DECIMAL(15, 2),
    id_departamento_responsable INT,
    estado VARCHAR(50) DEFAULT 'EN_CURSO',
    fecha_inicio DATE,
    fecha_fin_estimada DATE,
    FOREIGN KEY (id_departamento_responsable) REFERENCES departamentos(id_departamento)
);

-- Tabla Asignaciones de Proyectos (FALTABA)
CREATE TABLE IF NOT EXISTS asignaciones_proyectos (
    id_asignacion INT PRIMARY KEY AUTO_INCREMENT,
    id_empleado INT,
    id_proyecto INT,
    rol_en_proyecto VARCHAR(100),
    FOREIGN KEY (id_empleado) REFERENCES empleados(id_empleado),
    FOREIGN KEY (id_proyecto) REFERENCES proyectos(id_proyecto)
);

-- Tabla Equipos Informáticos (FALTABA)
CREATE TABLE IF NOT EXISTS equipos_informaticos (
    id_equipo INT PRIMARY KEY AUTO_INCREMENT,
    marca_modelo VARCHAR(100),
    id_empleado_asignado INT NULL,
    fecha_adquisicion DATE,
    numero_serie VARCHAR(100),
    tipo_dispositivo VARCHAR(50),
    estado VARCHAR(50) DEFAULT 'OPERATIVO',
    FOREIGN KEY (id_empleado_asignado) REFERENCES empleados(id_empleado) ON DELETE SET NULL
);

-- Tabla Incidencias de Soporte (FALTABA)
CREATE TABLE IF NOT EXISTS incidencias_soporte (
    id_incidencia INT PRIMARY KEY AUTO_INCREMENT,
    id_empleado_reporta INT,
    descripcion TEXT,
    estado VARCHAR(50) DEFAULT 'ABIERTA',
    fecha_apertura DATE,
    FOREIGN KEY (id_empleado_reporta) REFERENCES empleados(id_empleado)
);

-- Tabla Registro de Auditoría (FALTABA - se usaba en transacciones)
CREATE TABLE IF NOT EXISTS registro_auditoria (
    id_registro INT PRIMARY KEY AUTO_INCREMENT,
    tabla_afectada VARCHAR(100),
    accion VARCHAR(50),
    detalles TEXT,
    fecha_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
-- DATOS DE PRUEBA
-- ============================================================

INSERT INTO departamentos (nombre, ubicacion, presupuesto_anual) VALUES 
('Sistemas y Redes (IT)', 'Planta 1', 150000.00),
('Administración y Finanzas', 'Planta 2', 120000.00),
('Desarrollo de Software', 'Planta 3', 200000.00),
('Recursos Humanos', 'Planta 1', 80000.00);

INSERT INTO puestos (titulo, nivel_acceso) VALUES 
('Administrador de Sistemas Junior', 2),
('Desarrollador Backend Senior', 3),
('Analista de Datos', 2),
('Responsable de RRHH', 3);

INSERT INTO empleados (dni, nombre, apellidos, id_departamento, id_puesto, email_corporativo, fecha_contratacion, estado) VALUES 
('12345678A', 'Carlos',   'Gómez López',    1, 1, 'cgomez@nexora.local',   '2023-01-15', 'ACTIVO'),
('87654321B', 'Ana',      'Pérez Martín',   2, 2, 'aperez@nexora.local',   '2022-06-01', 'ACTIVO'),
('11223344C', 'Luis',     'Torres Ruiz',    3, 3, 'ltorres@nexora.local',  '2023-09-10', 'ACTIVO'),
('44332211D', 'Marta',    'Sánchez Gil',    4, 4, 'msanchez@nexora.local', '2021-03-20', 'ACTIVO'),
('55667788E', 'Javier',   'Molina Vega',    1, 1, 'jmolina@nexora.local',  '2020-11-05', 'BAJA_TEMPORAL');

INSERT INTO historial_salarial (id_empleado, salario_anual, fecha_inicio, motivo_cambio) VALUES
(1, 28000.00, '2023-01-15', 'Alta inicial contratacion'),
(2, 42000.00, '2022-06-01', 'Alta inicial contratacion'),
(3, 35000.00, '2023-09-10', 'Alta inicial contratacion'),
(4, 38000.00, '2021-03-20', 'Alta inicial contratacion'),
(5, 30000.00, '2020-11-05', 'Alta inicial contratacion');

INSERT INTO proyectos (nombre_proyecto, presupuesto_asignado, id_departamento_responsable, estado, fecha_inicio, fecha_fin_estimada) VALUES
('Migración Cloud', 50000.00, 1, 'EN_CURSO', '2024-01-01', '2024-12-31'),
('Sistema ERP', 80000.00, 3, 'EN_CURSO', '2023-06-01', '2025-06-01'),
('Auditoría Interna', 15000.00, 2, 'FINALIZADO', '2023-01-01', '2023-12-31');

INSERT INTO asignaciones_proyectos (id_empleado, id_proyecto, rol_en_proyecto) VALUES
(1, 1, 'Responsable Técnico'),
(3, 2, 'Desarrollador Principal'),
(2, 2, 'Analista Funcional');