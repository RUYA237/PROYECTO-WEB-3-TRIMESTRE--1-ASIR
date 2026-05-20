function altaEmpleado() {
  var nombre   = document.getElementById("n-nombre").value.trim();
  var apellido = document.getElementById("n-apellido").value.trim();
  var cargo    = document.getElementById("n-cargo").value.trim();
  var email    = document.getElementById("n-email").value.trim();
  var salario  = document.getElementById("n-salario").value;

  if (!nombre || !apellido || !cargo || !email || !salario) {
    showToast("Rellena todos los campos", "error");
    return;
  }

  showToast("✓ " + nombre + " " + apellido + " dado de alta correctamente");
  document.getElementById("n-nombre").value   = "";
  document.getElementById("n-apellido").value = "";
  document.getElementById("n-cargo").value    = "";
  document.getElementById("n-email").value    = "";
  document.getElementById("n-salario").value  = "";
}

function bajaEmpleado() {
  var id     = document.getElementById("b-id").value.trim();
  var motivo = document.getElementById("b-motivo").value;

  if (!id) {
    showToast("Introduce el nombre o ID del empleado", "error");
    return;
  }

  showToast("✓ Baja procesada. Motivo: " + motivo);
  document.getElementById("b-id").value  = "";
  document.getElementById("b-obs").value = "";
}

function transferenciaDepto() {
  var empId = document.getElementById("t-emp").value;
  var dest  = document.getElementById("t-dest");

  if (!empId) {
    showToast("Introduce el ID del empleado", "error");
    return;
  }

  showToast("✓ Empleado #" + empId + " transferido a " + dest.options[dest.selectedIndex].text);
  document.getElementById("t-emp").value = "";
}

function cierreProyecto() {
  var id    = document.getElementById("p-id").value.trim();
  var coste = document.getElementById("p-coste").value;

  if (!id || !coste) {
    showToast("Introduce el proyecto y el coste", "error");
    return;
  }

  showToast("✓ Proyecto «" + id + "» cerrado. Coste: €" + Number(coste).toLocaleString("es-ES"));
  document.getElementById("p-id").value    = "";
  document.getElementById("p-coste").value = "";
}