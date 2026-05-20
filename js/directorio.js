var listaEmpleados = [];

function cargarDirectorio() {
  setTimeout(function() {
    listaEmpleados = EMPLEADOS;

    var sel = document.getElementById("filtro-depto");
    var deptos = [...new Set(listaEmpleados.map(function(e) { return e.depto; }))].sort();
    sel.innerHTML = '<option value="">Todos los departamentos</option>' +
      deptos.map(function(d) { return '<option value="' + d + '">' + d + '</option>'; }).join("");

    renderEmpleados(listaEmpleados);
  }, 400);
}

function filtrarEmpleados() {
  var q     = document.getElementById("buscar").value.toLowerCase();
  var depto = document.getElementById("filtro-depto").value;
  var estado= document.getElementById("filtro-estado").value;

  var resultado = listaEmpleados.filter(function(e) {
    var okQ     = !q     || (e.nombre + e.cargo + e.email).toLowerCase().includes(q);
    var okDepto = !depto || e.depto === depto;
    var okEst   = !estado
      || (estado === "Activo"   &&  e.activo)
      || (estado === "Inactivo" && !e.activo);
    return okQ && okDepto && okEst;
  });

  renderEmpleados(resultado);
}

function renderEmpleados(lista) {
  var grid = document.getElementById("emp-grid");
  if (!lista.length) {
    grid.innerHTML = '<div class="no-results">Sin resultados</div>';
    return;
  }
  grid.innerHTML = lista.map(function(e) {
    var iniciales = e.nombre.split(" ").map(function(p) { return p[0]; }).join("").slice(0, 2);
    return '<div class="emp-card">' +
      '<div class="emp-avatar">' + iniciales + '</div>' +
      '<div class="emp-name">'  + e.nombre  + '</div>' +
      '<div class="emp-role">'  + e.cargo   + '</div>' +
      '<div class="emp-info">' +
        '<span>📁 ' + e.depto + '</span>' +
        '<span>✉ '  + e.email + '</span>' +
        '<span style="margin-top:0.3rem"><span class="badge ' + (e.activo ? 'badge-on' : 'badge-off') + '">' + (e.activo ? 'Activo' : 'Inactivo') + '</span></span>' +
      '</div></div>';
  }).join("");
}