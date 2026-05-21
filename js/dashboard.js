checkAuth();
initNav();

/* Datos de reserva para cuando el servidor no está arriba */
var fallbackMetricas = [
  { label: "Empleados Activos", valor: "—" },
  { label: "Proyectos en Curso", valor: "—" },
  { label: "Tickets Abiertos",  valor: "—" },
];

var fallbackDeptos = [
  { nombre: "Sistemas y Redes (IT)",           presupuesto: "450.000 €" },
  { nombre: "Desarrollo de Software",           presupuesto: "850.000 €" },
  { nombre: "Ciberseguridad y Riesgos",         presupuesto: "600.000 €" },
  { nombre: "Soporte y Atención al Cliente",    presupuesto: "150.000 €" },
  { nombre: "Recursos Humanos (HR)",            presupuesto: "120.000 €" },
  { nombre: "Administración y Finanzas",        presupuesto: "180.000 €" },
  { nombre: "Marketing y Ventas",               presupuesto: "300.000 €" },
  { nombre: "Operaciones y Logística",          presupuesto: "250.000 €" },
  { nombre: "I+D+i",                            presupuesto: "750.000 €" },
  { nombre: "Asuntos Legales y Compliance",     presupuesto: "90.000 €"  },
];

async function cargarDashboard() {
  try {
    var data = await apiFetch("/api/dashboard");
    if (data.exito && data.datos) {
      var d = data.datos;
      renderMetricas([
        { label: "Empleados Activos", valor: d.total_empleados,   sub: "estado ACTIVO"       },
        { label: "Proyectos en Curso", valor: d.proyectos_activos, sub: "estado EN_CURSO"     },
        { label: "Tickets Abiertos",   valor: d.tickets_abiertos,  sub: "abiertos / en curso" },
      ]);
    } else {
      renderMetricas(fallbackMetricas);
    }
  } catch (e) {
    renderMetricas(fallbackMetricas);
    mostrarAvisoServidor();
  }

  renderDeptos(fallbackDeptos);
}

function renderMetricas(items) {
  document.getElementById("metrics-grid").innerHTML = items.map(function(m) {
    return '<div class="metric-card">' +
      '<div class="metric-label">' + m.label + '</div>' +
      '<div class="metric-valor">'  + m.valor + '</div>' +
      (m.sub ? '<div class="metric-sub">' + m.sub + '</div>' : '') +
    '</div>';
  }).join('');
}

function renderDeptos(deptos) {
  document.getElementById("dept-tbody").innerHTML = deptos.map(function(d) {
    return '<tr>' +
      '<td>' + d.nombre + '</td>' +
      '<td>' + d.presupuesto + '</td>' +
      '<td><span class="badge badge-on">Activo</span></td>' +
    '</tr>';
  }).join('');
}

function mostrarAvisoServidor() {
  var a = document.getElementById("aviso-servidor");
  if (a) a.style.display = "block";
}

cargarDashboard();