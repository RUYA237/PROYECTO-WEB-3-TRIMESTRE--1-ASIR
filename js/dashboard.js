/* =========================================
   dashboard.js — Lógica del Panel General
   ========================================= */

function cargarDashboard() {
  // Simula: GET /api/metricas  (latencia de red)
  setTimeout(() => {

    // Métricas
    document.getElementById('metrics-grid').innerHTML = MOCK_METRICAS.map(m => `
      <div class="metric-card">
        <div class="metric-label">${m.label}</div>
        <div class="metric-value">${m.value}</div>
        <div class="metric-sub">${m.sub}</div>
        ${m.change ? `<div class="metric-change ${m.up === true ? 'up' : m.up === false ? 'down' : ''}">${m.change}</div>` : ''}
      </div>
    `).join('');

    // Actividad reciente
    document.getElementById('activity-list').innerHTML = MOCK_ACTIVIDAD.map(a => `
      <li class="activity-item">
        <div class="activity-dot"></div>
        <div>
          <div class="activity-text">${a.texto}</div>
          <div class="activity-time">${a.tiempo}</div>
        </div>
      </li>
    `).join('');

    // Tabla departamentos
    document.getElementById('dept-tbody').innerHTML = MOCK_DEPTOS.map(d => `
      <tr>
        <td>${d.nombre}</td>
        <td>${d.empleados}</td>
        <td><span class="badge badge-active">${d.estado}</span></td>
      </tr>
    `).join('');

  }, 600);
}