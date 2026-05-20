checkAuth();

var user = localStorage.getItem("nexora-user");
document.getElementById("nav-user-name").textContent = user;

document.getElementById("btn-salir").onclick = function() {
  localStorage.clear();
  window.location.href = "../index.html";
};

async function cargarDashboard() {
  var metricas = METRICAS;

  try {
    var data = await apiFetch("/api/dashboard");
    if (data.exito && data.datos) {
      var d = data.datos;
      metricas = [
        { label: "Empleados Activos", valor: d.total_empleados,   sub: "en plantilla", cambio: null },
        { label: "Proyectos Activos", valor: d.proyectos_activos, sub: "en curso",      cambio: null },
        { label: "Tickets Abiertos",  valor: d.tickets_abiertos,  sub: "incidencias",   cambio: null },
        { label: "Departamentos",     valor: "4",                 sub: "áreas activas", cambio: null },
      ];
    }
  } catch(e) {}

  renderMetricas(metricas);
  renderActividad();
  renderDeptos();
}

function renderMetricas(items) {
  document.getElementById("metrics-grid").innerHTML = items.map(function(m) {
    return '<div class="metric-card">' +
      '<div class="metric-label">' + m.label + '</div>' +
      '<div class="metric-valor">' + m.valor + '</div>' +
      '<div class="metric-sub">' + m.sub +
        (m.cambio ? ' &middot; <span class="cambio">' + m.cambio + '</span>' : '') +
      '</div>' +
    '</div>';
  }).join('');
}

function renderActividad() {
  document.getElementById("activity-list").innerHTML = ACTIVIDAD.map(function(a) {
    return '<li><span>' + a.texto + '</span><small>' + a.tiempo + '</small></li>';
  }).join('');
}

function renderDeptos() {
  document.getElementById("dept-tbody").innerHTML = DEPTOS.map(function(d) {
    return '<tr>' +
      '<td>' + d.nombre + '</td>' +
      '<td>' + d.empleados + '</td>' +
      '<td><span class="badge ' + (d.activo ? 'badge-on">Activo' : 'badge-off">Inactivo') + '</span></td>' +
    '</tr>';
  }).join('');
}

cargarDashboard();