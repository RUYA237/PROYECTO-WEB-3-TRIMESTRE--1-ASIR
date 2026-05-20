var listaEmpleados = [];

function cargarDirectorio() {
  listaEmpleados = EMPLEADOS;

  var sel = document.getElementById("filtro-depto");
  var deptos = [];
  listaEmpleados.forEach(function(e) {
    if (deptos.indexOf(e.depto) === -1) deptos.push(e.depto);
  });
  deptos.sort();
  sel.innerHTML = '<option value="">Todos los departamentos</option>';
  deptos.forEach(function(d) {
    sel.innerHTML += '<option value="' + d + '">' + d + '</option>';
  });

  renderEmpleados(listaEmpleados);
}

function filtrarEmpleados() {
  var q      = document.getElementById("buscar").value.toLowerCase();
  var depto  = document.getElementById("filtro-depto").value;
  var estado = document.getElementById("filtro-estado").value;

  var resultado = [];
  listaEmpleados.forEach(function(e) {
    var okQ     = !q     || (e.nombre + e.cargo + e.email).toLowerCase().indexOf(q) !== -1;
    var okDepto = !depto || e.depto === depto;
    var okEst   = !estado
      || (estado === "Activo"   &&  e.activo)
      || (estado === "Inactivo" && !e.activo);
    if (okQ && okDepto && okEst) resultado.push(e);
  });

  renderEmpleados(resultado);
}

function renderEmpleados(lista) {
  var grid = document.getElementById("emp-grid");
  if (lista.length === 0) {
    grid.innerHTML = '<div class="no-results">Sin resultados</div>';
    return;
  }
  grid.innerHTML = "";
  lista.forEach(function(e) {
    var partes = e.nombre.split(" ");
    var iniciales = (partes[0][0] + (partes[1] ? partes[1][0] : "")).toUpperCase();
    grid.innerHTML +=
      '<div class="emp-card">' +
        '<div class="emp-avatar">' + iniciales + '</div>' +
        '<div class="emp-name">'   + e.nombre  + '</div>' +
        '<div class="emp-role">'   + e.cargo   + '</div>' +
        '<div class="emp-info">' +
          '<span>📁 ' + e.depto + '</span>' +
          '<span>✉ '  + e.email + '</span>' +
          '<span style="margin-top:0.3rem">' +
            '<span class="badge ' + (e.activo ? 'badge-on' : 'badge-off') + '">' +
              (e.activo ? 'Activo' : 'Inactivo') +
            '</span>' +
          '</span>' +
        '</div>' +
      '</div>';
  });
}