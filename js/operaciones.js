checkAuth();

var user = localStorage.getItem("nexora-user");
document.getElementById("nav-user-name").textContent = user;

document.getElementById("btn-salir").onclick = function() {
  localStorage.clear();
  window.location.href = "../index.html";
};

async function altaEmpleado() {
  var dni       = document.getElementById("n-dni").value.trim();
  var nombre    = document.getElementById("n-nombre").value.trim();
  var apellidos = document.getElementById("n-apellido").value.trim();
  var id_dept   = document.getElementById("n-dept").value;
  var email     = document.getElementById("n-email").value.trim();
  var salario   = document.getElementById("n-salario").value;

  if (!dni || !nombre || !apellidos || !email || !salario) {
    showToast("Rellena todos los campos.", "error");
    return;
  }

  try {
    await apiFetch("/api/transaccion/contratar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        dni,
        nombre,
        apellidos,
        id_departamento: Number(id_dept),
        email,
        salario: Number(salario),
      }),
    });
    showToast("Empleado dado de alta correctamente.");
    ["n-dni","n-nombre","n-apellido","n-email","n-salario"].forEach(function(id) {
      document.getElementById(id).value = "";
    });
  } catch(e) {
    showToast(e.message || "Error al dar de alta.", "error");
  }
}

async function bajaEmpleado() {
  var id = document.getElementById("b-id").value.trim();

  if (!id) {
    showToast("Introduce el ID del empleado.", "error");
    return;
  }

  try {
    await apiFetch("/api/transaccion/despedir", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_empleado: Number(id), id_admin_ejecutor: user }),
    });
    showToast("Empleado dado de baja.");
    document.getElementById("b-id").value = "";
  } catch(e) {
    showToast(e.message || "Error al dar de baja.", "error");
  }
}

async function transferenciaDepto() {
  var id_emp  = document.getElementById("t-emp").value;
  var id_dest = document.getElementById("t-dest").value;

  if (!id_emp) {
    showToast("Introduce el ID del empleado.", "error");
    return;
  }

  try {
    await apiFetch("/api/transaccion/trasladar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_empleado: Number(id_emp),
        id_departamento_nuevo: Number(id_dest),
      }),
    });
    showToast("Empleado trasladado correctamente.");
    document.getElementById("t-emp").value = "";
  } catch(e) {
    showToast(e.message || "Error en la transferencia.", "error");
  }
}

async function cierreProyecto() {
  var id_proyecto = document.getElementById("p-proyecto").value;
  var id_empleado = document.getElementById("p-empleado").value;
  var incentivo   = document.getElementById("p-incentivo").value;

  if (!id_proyecto || !id_empleado || !incentivo) {
    showToast("Rellena todos los campos.", "error");
    return;
  }

  try {
    await apiFetch("/api/transaccion/cerrar-proyecto", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id_proyecto: Number(id_proyecto),
        id_empleado: Number(id_empleado),
        incentivo:   Number(incentivo),
      }),
    });
    showToast("Proyecto cerrado correctamente.");
    ["p-proyecto","p-empleado","p-incentivo"].forEach(function(id) {
      document.getElementById(id).value = "";
    });
  } catch(e) {
    showToast(e.message || "Error al cerrar el proyecto.", "error");
  }
}