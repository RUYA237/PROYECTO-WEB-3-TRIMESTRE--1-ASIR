checkAuth();
initNav();

/* ---- ALTA (POST /api/transaccion/contratar) ----
   Params: dni, nombre, apellidos, id_departamento, email, salario  */
async function altaEmpleado() {
  var dni       = v("n-dni");
  var nombre    = v("n-nombre");
  var apellidos = v("n-apellido");
  var dpto      = document.getElementById("n-dept").value;
  var email     = v("n-email");
  var salario   = v("n-salario");

  if (!dni || !nombre || !apellidos || !email || !salario) {
    showToast("Rellena todos los campos.", "error");
    return;
  }

  var btn = document.getElementById("btn-alta");
  setLoading(btn, true);

  try {
    await apiFetch("/api/transaccion/contratar", post({
      dni, nombre, apellidos,
      id_departamento: Number(dpto),
      email,
      salario: Number(salario),
    }));
    showToast("Empleado dado de alta.");
    ["n-dni","n-nombre","n-apellido","n-email","n-salario"].forEach(clear);
  } catch (e) {
    showToast(e.message || "Error al dar de alta.", "error");
  } finally {
    setLoading(btn, false);
  }
}

/* ---- BAJA (POST /api/transaccion/despedir) ----
   Params: id_empleado, id_admin_ejecutor  */
async function bajaEmpleado() {
  var id = v("b-id");
  if (!id) { showToast("Introduce el ID del empleado.", "error"); return; }

  var btn = document.getElementById("btn-baja");
  setLoading(btn, true);

  try {
    await apiFetch("/api/transaccion/despedir", post({
      id_empleado: Number(id),
      id_admin_ejecutor: getUser(),
    }));
    showToast("Empleado dado de baja.");
    clear("b-id");
  } catch (e) {
    showToast(e.message || "Error al dar de baja.", "error");
  } finally {
    setLoading(btn, false);
  }
}

/* ---- TRASLADO (POST /api/transaccion/trasladar) ----
   Params: id_empleado, id_departamento_nuevo  */
async function transferenciaDepto() {
  var id   = v("t-emp");
  var dest = document.getElementById("t-dest").value;
  if (!id) { showToast("Introduce el ID del empleado.", "error"); return; }

  var btn = document.getElementById("btn-traslado");
  setLoading(btn, true);

  try {
    await apiFetch("/api/transaccion/trasladar", post({
      id_empleado: Number(id),
      id_departamento_nuevo: Number(dest),
    }));
    showToast("Empleado trasladado correctamente.");
    clear("t-emp");
  } catch (e) {
    showToast(e.message || "Error en la transferencia.", "error");
  } finally {
    setLoading(btn, false);
  }
}

/* ---- CIERRE PROYECTO (POST /api/transaccion/cerrar-proyecto) ----
   Params: id_proyecto, id_empleado, incentivo  */
async function cierreProyecto() {
  var id_p = v("p-proyecto");
  var id_e = v("p-empleado");
  var inc  = v("p-incentivo");
  if (!id_p || !id_e || !inc) { showToast("Rellena todos los campos.", "error"); return; }

  var btn = document.getElementById("btn-cierre");
  setLoading(btn, true);

  try {
    await apiFetch("/api/transaccion/cerrar-proyecto", post({
      id_proyecto: Number(id_p),
      id_empleado: Number(id_e),
      incentivo:   Number(inc),
    }));
    showToast("Proyecto cerrado correctamente.");
    ["p-proyecto","p-empleado","p-incentivo"].forEach(clear);
  } catch (e) {
    showToast(e.message || "Error al cerrar el proyecto.", "error");
  } finally {
    setLoading(btn, false);
  }
}

/* ---- HELPERS ---- */
function v(id)  { return document.getElementById(id).value.trim(); }
function clear(id) { document.getElementById(id).value = ""; }
function post(body) {
  return { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) };
}
function setLoading(btn, on) {
  btn.disabled    = on;
  btn.textContent = on ? "Enviando..." : btn.dataset.label;
}

/* Guardar texto original de cada botón */
window.addEventListener("DOMContentLoaded", function() {
  ["btn-alta","btn-baja","btn-traslado","btn-cierre"].forEach(function(id) {
    var el = document.getElementById(id);
    if (el) el.dataset.label = el.textContent;
  });
});