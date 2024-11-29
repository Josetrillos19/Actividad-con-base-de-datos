// Función para abrir o cerrar el menú lateral
function toggleMenu() {
    const menu = document.getElementById('menu-lateral');
    if (menu.style.left === '0px') {
        menu.style.left = '-300px'; // Ocultar menú
    } else {
        menu.style.left = '0px'; // Mostrar menú
    }
}

// Asignar evento al botón del menú
document.getElementById('menuButton').addEventListener('click', toggleMenu);
