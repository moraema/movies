// Obtener elementos del DOM
var mostrarModalBtn = document.getElementById('mostrarModalBtn');
var miModal = document.getElementById('miModal');
var cerrarModal = document.getElementById('cerrarModal');

// Mostrar modal al hacer clic en el botón
mostrarModalBtn.addEventListener('click', function() {
    miModal.style.display = 'block';
});

// Cerrar modal al hacer clic en el botón de cerrar
cerrarModal.addEventListener('click', function() {
    miModal.style.display = 'none';
});

// Cerrar modal al hacer clic en cualquier parte fuera del modal
window.addEventListener('click', function(event) {
    if (event.target == miModal) {
        miModal.style.display = 'none';
    }
});