/* =========================================
   operaciones.js — Transacciones críticas
   ========================================= */

function altaEmpleado() {
  const nombre   = document.getElementById('new-nombre').value.trim();
  const apellido = document.getElementById('new-apellido').value.trim();
  const cargo    = document.getElementById('new-cargo').value.trim();
  const email    = document.getElementById('new-email').value.trim();
  const salario  = document.getElementById('new-salario').value;
  const deptId   = document.getElementById('new-dept').value;

  if (!nombre || !apellido || !cargo || !email || !salario) {
    showToast('⚠ Por favor, completa todos los campos.', 'error'); return;
  }

  /* FETCH REAL (descomentar en producción):
  fetch('/api/transacciones/alta-empleado', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, apellido, cargo, email, salario, deptId })
  }).then(r => r.json()).then(data => {
    if (data.ok) showToast('✓ Empleado dado de alta correctamente.');
    else showToast('✗ Error: ' + data.error, 'error');
  }).catch(() => showToast('✗ Error de conexión.', 'error')); */

  setTimeout(() => {
    showToast(`✓ Empleado ${nombre} ${apellido} dado de alta. Transacción confirmada (COMMIT).`);
    empleados.push({ nombre: `${nombre} ${apellido}`, cargo,
      depto: ['Ventas','Almacén','Diseño','Dirección','RRHH'][deptId - 1], email, estado: 'Activo' });
    ['new-nombre','new-apellido','new-cargo','new-email','new-salario']
      .forEach(id => document.getElementById(id).value = '');
  }, 700);
}

function bajaEmpleado() {
  const id     = document.getElementById('baja-id').value.trim();
  const motivo = document.getElementById('baja-motivo').value;
  if (!id) { showToast('⚠ Introduce el ID o nombre del empleado.', 'error'); return; }

  /* FETCH REAL:
  fetch('/api/transacciones/baja-empleado', { method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ empleadoId: id, motivo })
  }).then(...); */

  setTimeout(() => {
    showToast(`✓ Baja procesada. Motivo: ${motivo}. ROLLBACK disponible 24h.`);
    document.getElementById('baja-id').value  = '';
    document.getElementById('baja-obs').value = '';
  }, 700);
}

function transferenciaDepto() {
  const empId = document.getElementById('trans-emp').value;
  const dest  = document.getElementById('trans-dest').value;
  if (!empId) { showToast('⚠ Introduce el ID del empleado.', 'error'); return; }

  /* FETCH REAL:
  fetch('/api/transacciones/transferencia', { method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ empleadoId: empId, nuevoDept: dest,
      fecha: document.getElementById('trans-fecha').value })
  }).then(...); */

  setTimeout(() => {
    const depts = ['Ventas','Almacén','Diseño','Dirección','RRHH'];
    showToast(`✓ Empleado #${empId} transferido a ${depts[dest - 1]}. Historial actualizado.`);
    document.getElementById('trans-emp').value = '';
  }, 700);
}

function cierreProyecto() {
  const id    = document.getElementById('proj-id').value.trim();
  const coste = document.getElementById('proj-coste').value;
  const result= document.getElementById('proj-resultado').value;
  if (!id || !coste) { showToast('⚠ Introduce el proyecto y el coste final.', 'error'); return; }

  /* FETCH REAL:
  fetch('/api/transacciones/cierre-proyecto', { method:'POST',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({ proyectoId: id, costeFinal: coste,
      fechaCierre: document.getElementById('proj-fecha').value, resultado: result })
  }).then(...); */

  setTimeout(() => {
    showToast(`✓ Proyecto «${id}» cerrado. Coste €${Number(coste).toLocaleString('es-ES')} descontado del presupuesto.`);
    document.getElementById('proj-id').value    = '';
    document.getElementById('proj-coste').value = '';
  }, 700);
}