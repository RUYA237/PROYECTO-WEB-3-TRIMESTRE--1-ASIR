// =============================================
// NEXORA TECH · api.js
// Contiene: usuarios demo, lógica de login
// y comunicación con la API backend
// =============================================

// --- Usuarios demo (en producción esto lo valida el servidor) ---
const USUARIOS = {
  admin: { pass: "1234", rol: "Administrador" },
  rrhh:  { pass: "1234", rol: "RecursosHumanos" }
};

// --- Login ---
function doLogin() {
  var u   = document.getElementById("login-user").value.trim().toLowerCase();
  var p   = document.getElementById("login-pass").value;
  var err = document.getElementById("login-error");

  if (USUARIOS[u] && USUARIOS[u].pass === p) {
    localStorage.setItem("nexora-user", u);
    localStorage.setItem("nexora-rol", USUARIOS[u].rol);
    window.location.href = "routes/dashboard.html";
  } else {
    err.style.display = "block";
  }
}

// Enviar con Enter en el campo contraseña
document.addEventListener("DOMContentLoaded", function () {
  var passInput = document.getElementById("login-pass");
  if (passInput) {
    passInput.addEventListener("keydown", function (e) {
      if (e.key === "Enter") doLogin();
    });
  }
});

// =============================================
// Funciones de comunicación con la API
// =============================================

const API_URL = "http://localhost:3000"; // Cambia el puerto si tu API usa otro

// GET genérico — llama a un endpoint y devuelve los datos
async function apiGet(endpoint) {
  try {
    const response = await fetch(API_URL + endpoint);
    if (!response.ok) throw new Error("Error " + response.status);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("apiGet error:", error);
    return null;
  }
}

// POST genérico — envía datos a un endpoint
async function apiPost(endpoint, body) {
  try {
    const response = await fetch(API_URL + endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!response.ok) throw new Error("Error " + response.status);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("apiPost error:", error);
    return null;
  }
}

// PUT genérico — actualiza un recurso existente
async function apiPut(endpoint, body) {
  try {
    const response = await fetch(API_URL + endpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    if (!response.ok) throw new Error("Error " + response.status);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("apiPut error:", error);
    return null;
  }
}

// Comprueba si hay sesión activa; si no, redirige al login
function checkSesion() {
  var user = localStorage.getItem("nexora-user");
  if (!user) {
    window.location.href = "../index.html";
  }
  return user;
}

// Cierra sesión y vuelve al login
function cerrarSesion() {
  localStorage.removeItem("nexora-user");
  localStorage.removeItem("nexora-rol");
  window.location.href = "../index.html";
}