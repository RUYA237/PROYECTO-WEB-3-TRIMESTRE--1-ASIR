checkAuth();

var user = localStorage.getItem("nexora-user");
document.getElementById("nav-user-name").textContent = user;

document.getElementById("btn-salir").onclick = function() {
  localStorage.clear();
  window.location.href = "../index.html";
};

var empleados = [];

async function cargarEmpleados() {
  try {
    var data = await apiFetch("/api/empleados");
    if (data.exito && Array.isArray(data.datos) && data.datos.length > 0) {
      empleados = data.datos.map(function(e) {
        return {
          nombre: e.nombre_empleado || e.nombre || "",
          cargo:  e.titulo          || e.cargo  || "",
          depto:  e.nombre_depto    || e.depto   || "",
          email:  e.email_corporativo || e.email || "",
          activo: true,
        };
      });
    } else {
      empleados = EMPLEADOS;
    }
  } catch(e) {
    empleados = EMPLEADOS;
  }

  poblarFiltroDeptos();
  filtrarEmpleados();
}

function poblarFiltroDeptos() {
  var select = document.getElementById("filtro-depto");
  var vistos = {};
  empleados.forEach(function(e) {
    if (e.depto && !vistos[e.depto]) {
      vistos[e.depto] = true;
      var opt = document.createElement("option");
      opt.value = e.depto;
      opt.textContent = e.depto;
      select.appendChild(opt);
    }
  });
}

function filtrarEmpleados() {
  var texto  = document.getElementById("buscar").value.toLowerCase();
  var depto  = document.getElementById("filtro-depto").value;
  var estado = document.getElementById("filtro-estado").value;

  var resultado = empleados.filter(function(e) {
    var matchTexto = !texto ||
      e.nombre.toLowerCase().includes(texto) ||
      e.cargo.toLowerCase().includes(texto)  ||
      e.depto.toLowerCase().includes(texto);
    var matchDepto  = !depto  || e.depto  === depto;
    var matchEstado = !estado ||
      (estado === "Activo"   &&  e.activo) ||
      (estado === "Inactivo" && !e.activo);
    return matchTexto && matchDepto && matchEstado;
  });

  var grid = document.getElementById("emp-grid");

  if (resultado.length === 0) {
    grid.innerHTML = '<div class="no-results">Sin resultados.</div>';
    return;
  }

  grid.innerHTML = resultado.map(function(e) {
    return '<div class="emp-card">' +
      '<div class="emp-card-top">' +
        '<div>' +
          '<div class="emp-nombre">' + e.nombre + '</div>' +
          '<div class="emp-cargo">'  + e.cargo  + '</div>' +
        '</div>' +
        '<span class="badge ' + (e.activo ? 'badge-on">Activo' : 'badge-off">Inactivo') + '</span>' +
      '</div>' +
      '<div class="emp-depto">' + e.depto + '</div>' +
      '<div class="emp-email">' + e.email + '</div>' +
    '</div>';
  }).join('');
}

cargarEmpleados();