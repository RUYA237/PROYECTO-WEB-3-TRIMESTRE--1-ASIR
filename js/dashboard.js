function cargarDashboard() {
  document.getElementById("metrics-grid").innerHTML = METRICAS.map(function(m) {
    return '<div class="metric-card">' +
      '<div class="metric-label">' + m.label + '</div>' +
      '<div class="metric-value">' + m.valor + '</div>' +
      '<div class="metric-sub">'   + m.sub   + '</div>' +
      (m.cambio ? '<div class="metric-up">↑ ' + m.cambio + '</div>' : '') +
    '</div>';
  }).join("");

  document.getElementById("activity-list").innerHTML = ACTIVIDAD.map(function(a) {
    return '<li class="activity-item">' +
      '<div class="dot"></div>' +
      '<div><div>' + a.texto + '</div><div class="act-time">' + a.tiempo + '</div></div>' +
    '</li>';
  }).join("");

  document.getElementById("dept-tbody").innerHTML = DEPTOS.map(function(d) {
    return '<tr><td>' + d.nombre + '</td><td>' + d.empleados + '</td>' +
      '<td><span class="badge badge-on">Activo</span></td></tr>';
  }).join("");
}