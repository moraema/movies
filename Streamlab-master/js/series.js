document.addEventListener("DOMContentLoaded", function() {
    // Llama a la API local para obtener los datos de las series
    fetch('http://localhost:8080/serie')
        .then(response => response.json())
        .then(series => {

            console.log('Datos de series extraídos correctamente:', series);

            // Obtén una referencia al contenedor del carrusel
            const seriesCarousel = document.getElementById('series-carousel');

            // Variable para almacenar el HTML generado dinámicamente
            let dynamicHTML = '';

            // Recorre el arreglo 'series' y genera elementos para cada serie
            series.forEach(serie => {
                dynamicHTML += `
                    <div class="item">
                        <div class="box">
                            <div class="imgBox">
                                <img src="${serie.imagen}" alt="">
                                <div class="icon">
                                    <i class="far fa-heart"></i>
                                    <i class="fas fa-share-alt"></i>
                                    <i class="fas fa-plus"></i>
                                </div>
                            </div>

                            <div class="content">
                                <i id="playbtn" class="fas fa-play"></i>
                            </div>
                            <div class="text">
                                <h3>${serie.nombre} </h3>
                                <div class="time flex">
                                    <span>${serie.duracion}</span>
                                    <i class="fas fa-circle"></i>
                                    <a>${serie.genero}</a>
                            
                                </div>
                                <button class="primary" data-nombre="${serie.nombre}" data-descripcion="${serie.descripcion}" data-duracion="${serie.duracion}" data-genero="${serie.genero}" data-imagen="${serie.imagen}" data-popularidad="${serie.popularidad}" >Ver Más</button>
                                </div>
                            </div>
                        </div>
                    `;
            });

            // Inserta el HTML generado dinámicamente en el marcador
            seriesCarousel.insertAdjacentHTML('beforeend', dynamicHTML);


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

                // referencia al botón de cierre del modal recién creado
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