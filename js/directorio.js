/* =========================================
   directorio.js — Lógica del Directorio
   ========================================= */

let empleados = [];

function cargarDirectorio() {
  const grid = document.getElementById('employee-grid');
  grid.innerHTML = '<div class="loading" style="grid-column:1/-1"><div class="spinner"></div>Cargando empleados…</div>';

  // Simula: GET /api/empleados
  setTimeout(() => {
    empleados = MOCK_EMPLEADOS;
    poblarFiltros();
    renderEmpleados(empleados);
  }, 500);
}

function poblarFiltros() {
  const sel = document.getElementById('filter-dept');
  const deptos = [...new Set(empleados.map(e => e.depto))].sort();
  sel.innerHTML = '<option value="">Todos los departamentos</option>' +
    deptos.map(d => `<option value="${d}">${d}</option>`).join('');
}

function filtrarEmpleados() {
  const q    = document.getElementById('search-input').value.toLowerCase();
  const dept = document.getElementById('filter-dept').value;
  const stat = document.getElementById('filter-status').value;

  const filtrados = empleados.filter(e => {
    const matchQ    = !q    || (e.nombre + e.cargo + e.email).toLowerCase().includes(q);
    const matchDept = !dept || e.depto   === dept;
    const matchStat = !stat || e.estado  === stat;
    return matchQ && matchDept && matchStat;
  });
  renderEmpleados(filtrados);
}

function renderEmpleados(lista) {
  const grid = document.getElementById('employee-grid');
  if (!lista.length) {
    grid.innerHTML = '<div class="no-results">· Sin resultados ·</div>';
    return;
  }
  grid.innerHTML = lista.map(e => {
    const initials = e.nombre.split(' ').map(w => w[0]).join('').slice(0, 2);
    return `
      <div class="employee-card">
        <div class="employee-avatar">${initials}</div>
        <div class="employee-name">${e.nombre}</div>
        <div class="employee-role">${e.cargo}</div>
        <div class="employee-meta">
          <span>📁 ${e.depto}</span>
          <span>✉ ${e.email}</span>
          <span style="margin-top:0.4rem">
            <span class="badge ${e.estado === 'Activo' ? 'badge-active' : 'badge-inactive'}">${e.estado}</span>
          </span>
        </div>
      </div>
    `;
  }).join('');
}