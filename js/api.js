/* =========================================
   api.js — Datos mock + utilidades de red
   En producción: reemplazar por fetch() real
   ========================================= */

const MOCK_METRICAS = [
  { label: 'Empleados Activos', value: '47', sub: 'total en plantilla',  change: '+3 este mes',       up: true  },
  { label: 'Departamentos',     value: '5',  sub: 'unidades operativas', change: 'sin cambios',        up: null  },
  { label: 'Proyectos Activos', value: '12', sub: 'en curso',            change: '+2 nuevos',          up: true  },
  { label: 'Ventas Mes',        value: '€84K', sub: 'ingresos brutos',   change: '+8.3% vs anterior',  up: true  },
];

const MOCK_ACTIVIDAD = [
  { texto: 'Nóminas de mayo procesadas correctamente',         tiempo: 'hace 2 h' },
  { texto: 'Alta de empleado: Beatriz Solano — Diseño',        tiempo: 'hace 5 h' },
  { texto: 'Proyecto «Campaña Verano» marcado como activo',    tiempo: 'hace 1 d' },
  { texto: 'Copia de seguridad nocturna completada',           tiempo: 'hace 1 d' },
  { texto: 'Transferencia: Luis Mora → Dpto. Ventas',          tiempo: 'hace 2 d' },
];

const MOCK_DEPTOS = [
  { nombre: 'Ventas',    empleados: 14, estado: 'Activo' },
  { nombre: 'Almacén',   empleados: 11, estado: 'Activo' },
  { nombre: 'Diseño',    empleados:  8, estado: 'Activo' },
  { nombre: 'RRHH',      empleados:  5, estado: 'Activo' },
  { nombre: 'Dirección', empleados:  9, estado: 'Activo' },
];

const MOCK_EMPLEADOS = [
  { nombre: 'Beatriz Solano',  cargo: 'Diseñadora Senior',      depto: 'Diseño',     email: 'b.solano@lumiere.es',  estado: 'Activo'   },
  { nombre: 'Carlos López',    cargo: 'Responsable de Almacén', depto: 'Almacén',    email: 'c.lopez@lumiere.es',   estado: 'Activo'   },
  { nombre: 'Marta Vidal',     cargo: 'Directora Comercial',    depto: 'Ventas',     email: 'm.vidal@lumiere.es',   estado: 'Activo'   },
  { nombre: 'Luis Mora',       cargo: 'Asesor de Ventas',       depto: 'Ventas',     email: 'l.mora@lumiere.es',    estado: 'Activo'   },
  { nombre: 'Elena Torres',    cargo: 'Técnica de RRHH',        depto: 'RRHH',       email: 'e.torres@lumiere.es',  estado: 'Activo'   },
  { nombre: 'Jorge Ruiz',      cargo: 'Logística',              depto: 'Almacén',    email: 'j.ruiz@lumiere.es',    estado: 'Activo'   },
  { nombre: 'Ana Blanco',      cargo: 'Diseñadora Junior',      depto: 'Diseño',     email: 'a.blanco@lumiere.es',  estado: 'Activo'   },
  { nombre: 'Pedro Sanz',      cargo: 'Director General',       depto: 'Dirección',  email: 'p.sanz@lumiere.es',    estado: 'Activo'   },
  { nombre: 'Nuria Gil',       cargo: 'Contabilidad',           depto: 'Dirección',  email: 'n.gil@lumiere.es',     estado: 'Inactivo' },
  { nombre: 'Pablo Ortega',    cargo: 'Vendedor',               depto: 'Ventas',     email: 'p.ortega@lumiere.es',  estado: 'Activo'   },
  { nombre: 'Sandra Ferrer',   cargo: 'Visual Merchandising',   depto: 'Diseño',     email: 's.ferrer@lumiere.es',  estado: 'Activo'   },
  { nombre: 'Miguel Ramos',    cargo: 'Soporte IT',             depto: 'Dirección',  email: 'm.ramos@lumiere.es',   estado: 'Activo'   },
];

// Usuarios del sistema
const USERS = {
  admin: { pass: '1234', role: 'Administrador'    },
  rrhh:  { pass: '1234', role: 'Recursos Humanos' },
};

// Helper: muestra toast
function showToast(msg, tipo = 'success') {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.className = 'show ' + tipo;
  setTimeout(() => t.className = '', 3500);
}