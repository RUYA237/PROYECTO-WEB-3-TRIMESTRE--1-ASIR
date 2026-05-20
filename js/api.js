var USUARIOS = {
  admin: { pass: "1234", rol: "Administrador" },
  rrhh:  { pass: "1234", rol: "Recursos Humanos" },
};

var METRICAS = [
  { label: "Empleados Activos", valor: "38",   sub: "en plantilla",  cambio: "+2 este mes" },
  { label: "Departamentos",     valor: "4",    sub: "áreas activas", cambio: null },
  { label: "Proyectos",         valor: "9",    sub: "en curso",      cambio: "+1 nuevo" },
  { label: "Ingresos Mes",      valor: "€62K", sub: "brutos",        cambio: "+5.1%" },
];

var ACTIVIDAD = [
  { texto: "Nóminas de mayo procesadas",          tiempo: "hace 1 h" },
  { texto: "Alta de empleado: Sara Llopis",        tiempo: "hace 3 h" },
  { texto: "Proyecto «App Móvil» marcado activo", tiempo: "hace 1 d" },
  { texto: "Backup nocturno completado",           tiempo: "hace 1 d" },
  { texto: "Transferencia: Raúl → Desarrollo",    tiempo: "hace 2 d" },
];

var DEPTOS = [
  { nombre: "Desarrollo", empleados: 15 },
  { nombre: "Marketing",  empleados: 9  },
  { nombre: "Soporte",    empleados: 8  },
  { nombre: "Dirección",  empleados: 6  },
];

var EMPLEADOS = [
  { nombre: "Sara Llopis",  cargo: "Frontend Dev",      depto: "Desarrollo", email: "s.llopis@nexora.io", activo: true  },
  { nombre: "Raúl Medina",  cargo: "Backend Dev",       depto: "Desarrollo", email: "r.medina@nexora.io", activo: true  },
  { nombre: "Lucía Vega",   cargo: "UX Designer",       depto: "Marketing",  email: "l.vega@nexora.io",   activo: true  },
  { nombre: "Carlos Ramos", cargo: "Tech Lead",         depto: "Desarrollo", email: "c.ramos@nexora.io",  activo: true  },
  { nombre: "Elena Pons",   cargo: "Agente Soporte",    depto: "Soporte",    email: "e.pons@nexora.io",   activo: true  },
  { nombre: "Marcos Gil",   cargo: "Marketing Manager", depto: "Marketing",  email: "m.gil@nexora.io",    activo: false },
  { nombre: "Ana Ferrer",   cargo: "CEO",               depto: "Dirección",  email: "a.ferrer@nexora.io", activo: true  },
  { nombre: "Tomás Ibáñez", cargo: "DevOps",            depto: "Desarrollo", email: "t.ibanez@nexora.io", activo: true  },
];

function showToast(msg, tipo) {
  var t = document.getElementById("toast");
  t.textContent = msg;
  t.className = "show " + (tipo || "success");
  setTimeout(function() { t.className = ""; }, 3000);
}