checkAuth();
initNav();

/*
  obtenerListaEmpleados() devuelve:
    empleados.nombre, puestos.titulo, departamentos.nombre
  MySQL devuelve la segunda columna "nombre" como "nombre_1" si hay conflicto,
  pero para cubrirlo usamos los alias que añadimos en la función.
  Los campos reales que llegan son: nombre, titulo, nombre (del dept)
  MySQL2 los nombra: nombre | titulo | nombre  → el segundo "nombre" se sobreescribe.
  Por eso la API incluye apellidos en la misma query con alias seguros.
  Si no los tiene, caemos al fallback.
*/

var todos = [];

async function cargarEmpleados() {
  try {
    var data = await apiFetch("/api/empleados");
    if (data.exito && Array.isArray(data.datos) && data.datos.length > 0) {
      todos = data.datos.map(function(e) {
        return {
          nombre: (e.nombre || "") + (e.apellidos ? " " + e.apellidos : ""),
          cargo:  e.titulo  || e.cargo  || "",
          depto:  /* mysql2 puede traer la 3ª col como nombre_1 o como nombre del dept */
                  e.nombre_depto || e["departamentos.nombre"] || e.nombre_1 ||
                  obtenerTerceraColumna(e) || "",
          email:  e.email_corporativo || e.email || "",
          activo: true,
        };
      });
    }
  } catch (e) { /* servidor caído, array vacío */ }

  poblarFiltros();
  filtrarEmpleados();
}

/* MySQL2 a veces devuelve la tercera columna con key = el último "nombre" encontrado.
   Esta función intenta recuperarla mirando todas las keys del objeto. */
function obtenerTerceraColumna(obj) {
  var keys = Object.keys(obj);
  for (var i = keys.length - 1; i >= 0; i--) {
    if (keys[i].toLowerCase().includes("nombre") && i > 0) return obj[keys[i]];
  }
  return "";
}

function poblarFiltros() {
  var sel = document.getElementById("filtro-depto");
  var vistos = {};
  todos.forEach(function(e) {
    if (e.depto && !vistos[e.depto]) {
      vistos[e.depto] = true;
      var opt = document.createElement("option");
      opt.value = e.depto;
      opt.textContent = e.depto;
      sel.appendChild(opt);
    }
  });
}

function filtrarEmpleados() {
  var texto  = document.getElementById("buscar").value.toLowerCase();
  var depto  = document.getElementById("filtro-depto").value;
  var estado = document.getElementById("filtro-estado").value;

  var res = todos.filter(function(e) {
    var okTexto = !texto ||
      e.nombre.toLowerCase().includes(texto) ||
      e.cargo.toLowerCase().includes(texto)  ||
      e.depto.toLowerCase().includes(texto);
    var okDepto  = !depto  || e.depto  === depto;
    var okEstado = !estado ||
      (estado === "Activo"   &&  e.activo) ||
      (estado === "Inactivo" && !e.activo);
    return okTexto && okDepto && okEstado;
  });

  var grid = document.getElementById("emp-grid");

  if (todos.length === 0) {
    grid.innerHTML = '<div class="emp-vacio">Servidor no disponible. Arranca la API para ver empleados.</div>';
    return;
  }

  if (res.length === 0) {
    grid.innerHTML = '<div class="emp-vacio">Sin resultados.</div>';
    return;
  }

  grid.innerHTML = res.map(function(e) {
    return '<div class="emp-card">' +
      '<div class="emp-card-top">' +
        '<div>' +
          '<div class="emp-nombre">' + e.nombre + '</div>' +
          '<div class="emp-cargo">'  + e.cargo  + '</div>' +
        '</div>' +
        '<span class="badge ' + (e.activo ? 'badge-on">Activo' : 'badge-off">Inactivo') + '</span>' +
      '</div>' +
      '<div class="emp-depto">' + e.depto + '</div>' +
      (e.email ? '<div class="emp-email">' + e.email + '</div>' : '') +
    '</div>';
  }).join('');
}

cargarEmpleados();