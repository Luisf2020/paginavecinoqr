// Detecta si es Android
function esAndroid() {
  return /android/i.test(navigator.userAgent);
}

// Elementos
const claveInput = document.getElementById('clave');
const btnInstalar = document.getElementById('btn-instalar');
const msg = document.getElementById('msg');
const onlyAndroid = document.getElementById('only-android');

function actualizarEstado() {
  if (!esAndroid()) {
    btnInstalar.disabled = true;
    claveInput.disabled = true;
    onlyAndroid.textContent = "La app solo está disponible para Android. Accede desde tu teléfono Android para instalar.";
    onlyAndroid.style.display = "block";
    msg.textContent = '';
    return;
  } else {
    claveInput.disabled = false;
    onlyAndroid.textContent = "";
    onlyAndroid.style.display = "none";
  }

  if (claveInput.value === 'primavera') {
    btnInstalar.disabled = false;
    msg.textContent = '';
  } else {
    btnInstalar.disabled = true;
    if (claveInput.value.length > 0) {
      msg.textContent = 'Contraseña incorrecta';
    } else {
      msg.textContent = '';
    }
  }
}

// Eventos
claveInput.addEventListener('input', actualizarEstado);

// Click en instalar (petición al backend)
btnInstalar.addEventListener('click', function () {
  fetch('https://paginavecinoqr.onrender.com/api/get-apk-url', {   // Cambia el dominio si despliegas en otro lado
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ password: claveInput.value })
  })
  .then(resp => {
    if (!resp.ok) throw new Error('No autorizado');
    return resp.json();
  })
  .then(data => {
    window.open(data.url, '_blank');
  })
  .catch(err => {
    msg.textContent = 'Error al obtener enlace de descarga';
  });
});

// Al cargar la página, comprobar estado inicial
window.addEventListener('DOMContentLoaded', actualizarEstado);
