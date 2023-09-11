document.addEventListener("DOMContentLoaded", function() {
    // Llama a la API local para obtener los datos de las series
    fetch('http://localhost:8080/populares')
        .then(response => response.json())
        .then(populares => {

            console.log('Datos de series extraídos correctamente:', populares);

            // Obtén una referencia al contenedor del carrusel
            const popularesCarousel = document.getElementById('populares-carousel');

            // Variable para almacenar el HTML generado dinámicamente
            let dynamicHTML = '';


            populares.forEach(popular => {
                dynamicHTML += `
                    <div class="item">
                        <div class="box">
                            <div class="imgBox">
                                <img src="${popular.imagen}" alt="">
                                <div class="icon">
                                    <i class="far fa-heart"></i>
                                    <i class="fas fa-share-alt"></i>
                                    <i class="fas fa-plus"></i>
                                </div>
                            </div>

                            <div class="content">
                                <i id="palybtn" class="fas fa-play"></i>
                            </div>
                            <div class="text">
                                <h3>${popular.nombre} </h3>
                                <div class="time flex">
                                    <span>${popular.duracion}</span>
                                    <i class="fas fa-circle"></i>
                                    <a>${popular.genero}</a>
                                    
                                </div>
                                <button class="primary" data-nombre="${popular.nombre}" data-descripcion="${popular.descripcion}" data-duracion="${popular.duracion}" data-genero="${popular.genero}" data-imagen="${popular.imagen}" data-popularidad ="${popular.popularidad}">Ver Más</button>
                                </div>
                            </div>
                        </div>
                    `;
            });

            // Inserta el HTML generado dinámicamente en el marcador
            popularesCarousel.insertAdjacentHTML('beforeend', dynamicHTML);


            const verMasBotones = document.querySelectorAll('.text button.primary');
            verMasBotones.forEach(boton => {
                boton.addEventListener('click', function() {
                    const nombre = this.getAttribute('data-nombre');
                    const descripcion = this.getAttribute('data-descripcion');
                    const duracion = this.getAttribute('data-duracion');
                    const genero = this.getAttribute('data-genero');
                    const imagen = this.getAttribute('data-imagen');
                    const popularidad = this.getAttribute('data-popularidad');
                    showSerieDetails(nombre, descripcion, duracion, genero, imagen, popularidad);
                });
            });

            // Función para mostrar el modal con los detalles de la serie
            function showSerieDetails(nombre, descripcion, duracion, genero, imagen, popularidad) {
                // Crea el modal dinámicamente
                const modalHTML = `
                          <dialog class="modal-dialog">
                          <h2>${nombre}</h2>
                          <img src="${imagen}" alt="Imagen de la serie">
                          <div class="details">
                          <h3>Calificacion: ${popularidad}</h3>
                          <h3>Duracion: ${duracion}</h3>
                          <h3>Genero: ${genero}</h3>
                          </div>
                          <p>${descripcion}</p>
                          <button class="ver-button">Ver</button>
                          <button class="descargar-button">Descargar</button>
                          <button aria-label="close" class="x">❌</button>
                          </dialog>
    
        `;

                // Agrega el modal al final del cuerpo del documento
                document.body.insertAdjacentHTML('beforeend', modalHTML);

                // Obtén una referencia al botón de cierre del modal recién creado
                const closeButton = document.querySelector('.modal-dialog button.x');

                // Muestra el modal
                const modal = document.querySelector('.modal-dialog');
                modal.showModal();

                // evento click al botón de cierre para cerrar el modal
                closeButton.addEventListener('click', function() {
                    // Cierra el modal
                    modal.close();

                    // Elimina el modal del DOM después de cerrarlo
                    modal.remove();
                });
            }

        })
        .catch(error => {
            console.error('Error al obtener datos de series:', error);
        });
});