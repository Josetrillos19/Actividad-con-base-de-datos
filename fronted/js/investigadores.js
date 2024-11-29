document.addEventListener("DOMContentLoaded", () => {
    const tablaInvestigadores = document.getElementById("tablaInvestigadores");

    // Llamada a la API para obtener los investigadores
    fetch("http://localhost:5000/investigadores")
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener los investigadores");
            }
            return response.json();
        })
        .then(data => {
            const investigadores = data.investigadores;

            // Rellenar la tabla con los datos
            investigadores.forEach(investigador => {
                const fila = document.createElement("tr");

                fila.innerHTML = `
                    <td>${investigador[0]}</td>
                    <td>${investigador[1]}</td>
                    <td>${investigador[2]}</td>
                    <td>${investigador[3]}</td>
                    <td>${investigador[4] || "Sin Proyecto"}</td>
                    <td>
                        <button class="btn btn-primary btn-sm editar-btn" data-id="${investigador[0]}">Editar</button>
                        <button class="btn btn-danger btn-sm eliminar-btn" data-id="${investigador[0]}">Eliminar</button>
                    </td>
                `;

                tablaInvestigadores.appendChild(fila);
            });

            // Agregar eventos para los botones de editar y eliminar
            document.querySelectorAll(".editar-btn").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const id = e.target.getAttribute("data-id");
                    window.location.href = `editar_investigador.html?id=${id}`;
                });
            });

            document.querySelectorAll(".eliminar-btn").forEach(btn => {
                btn.addEventListener("click", (e) => {
                    const id = e.target.getAttribute("data-id");
                    confirmarEliminacion(id);
                });
            });
        })
        .catch(error => {
            console.error("Error:", error);
            alert("Hubo un problema al cargar la lista de investigadores.");
        });
});

// Función para mostrar confirmación de eliminación
function confirmarEliminacion(id) {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            eliminarInvestigador(id);
        }
    });
}

// Función para eliminar un investigador
function eliminarInvestigador(id) {
    fetch(`http://localhost:5000/investigadores/${id}`, {
        method: "DELETE",
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al eliminar el investigador");
            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                title: "¡Eliminado!",
                text: "El investigador ha sido eliminado exitosamente.",
                icon: "success",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar"
            }).then(() => {
                window.location.reload(); // Recargar la página para actualizar la tabla
            });
        })
        .catch(error => {
            console.error("Error:", error);
            Swal.fire({
                title: "Error",
                text: "Hubo un problema al eliminar el investigador.",
                icon: "error",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Aceptar"
            });
        });
}
