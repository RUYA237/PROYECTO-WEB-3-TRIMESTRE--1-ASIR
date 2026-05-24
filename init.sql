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

-- Datos Básicos para pruebas
INSERT INTO departamentos (nombre, ubicacion, presupuesto_anual) VALUES 
('Sistemas y Redes (IT)', 'Planta 1', 150000.00),
('Administración y Finanzas', 'Planta 2', 120000.00);

INSERT INTO puestos (titulo, nivel_acceso) VALUES 
('Administrador de Sistemas Junior', 2),
('Desarrollador Backend Senior', 3);

INSERT INTO empleados (dni, nombre, apellidos, id_departamento, id_puesto, email_corporativo, fecha_contratacion, estado) VALUES 
('12345678A', 'Carlos', 'Gomez', 1, 1, 'cgomez@empresa_core.local', CURDATE(), 'ACTIVO'),
('87654321B', 'Ana', 'Perez', 2, 2, 'aperez@empresa_core.local', CURDATE(), 'ACTIVO');