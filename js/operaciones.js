function altaEmpleado() {
  var nombre  = document.getElementById("n-nombre").value.trim();
  var apellido= document.getElementById("n-apellido").value.trim();
  var cargo   = document.getElementById("n-cargo").value.trim();
  var email   = document.getElementById("n-email").value.trim();
  var salario = document.getElementById("n-salario").value;

  if (!nombre || !apellido || !cargo || !email || !salario) {
    showToast("Rellena todos los campos", "error");
    return;
  }

  setTimeout(function() {
    showToast("✓ " + nombre + " " + apellido + " dado de alta correctamente");
    ["n-nombre","n-apellido","n-cargo","n-email","n-salario"].forEach(function(id) {
      document.getElementById(id).value = "";
    });
  }, 500);
}

function bajaEmpleado() {
  var id     = document.getElementById("b-id").value.trim();
  var motivo = document.getElementById("b-motivo").value;

  if (!id) { showToast("Introduce el nombre o ID del empleado", "error"); return; }

  setTimeout(function() {
    showToast("✓ Baja procesada. Motivo: " + motivo);
    document.getElementById("b-id").value  = "";
    document.getElementById("b-obs").value = "";
  }, 500);
}

function transferenciaDepto() {
  var empId = document.getElementById("t-emp").value;
  var dest  = document.getElementById("t-dest");

  if (!empId) { showToast("Introduce el ID del empleado", "error"); return; }

  setTimeout(function() {
    showToast("✓ Empleado #" + empId + " transferido a " + dest.options[dest.selectedIndex].text);
    document.getElementById("t-emp").value = "";
  }, 500);
}

function cierreProyecto() {
  var id    = document.getElementById("p-id").value.trim();
  var coste = document.getElementById("p-coste").value;

  if (!id || !coste) { showToast("Introduce el proyecto y el coste", "error"); return; }

  setTimeout(function() {
    showToast("✓ Proyecto «" + id + "» cerrado. Coste: €" + Number(coste).toLocaleString("es-ES"));
    document.getElementById("p-id").value    = "";
    document.getElementById("p-coste").value = "";
  }, 500);
}