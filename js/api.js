var API = "http://localhost:3000";

/* ---- AUTH ---- */
function checkAuth() {
  if (!localStorage.getItem("nx-user")) {
    window.location.href = "../index.html";
  }
}

function getUser()   { return localStorage.getItem("nx-user")   || ""; }
function getRol()    { return localStorage.getItem("nx-rol")    || ""; }
function getNombre() { return localStorage.getItem("nx-nombre") || ""; }

function logout() {
  localStorage.clear();
  window.location.href = "../index.html";
}

/* ---- TOAST ---- */
function showToast(msg, tipo) {
  var t = document.getElementById("toast");
  t.textContent = msg;
  t.className = "show " + (tipo || "success");
  setTimeout(function() { t.className = ""; }, 3000);
}

/* ---- FETCH WRAPPER ---- */
async function apiFetch(path, opts) {
  var r = await fetch(API + path, opts);
  var d = await r.json();
  if (!r.ok) throw new Error(d.mensaje || "Error " + r.status);
  return d;
}

/* ---- NAV INIT ---- */
function initNav() {
  var el = document.getElementById("nav-user-name");
  if (el) el.textContent = getNombre() || getUser();
  var btn = document.getElementById("btn-salir");
  if (btn) btn.onclick = logout;
}