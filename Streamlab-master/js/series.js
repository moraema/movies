document.addEventListener("DOMContentLoaded", function() {
    // Llama a la API local para obtener los datos de las series
    fetch('http://localhost:8080/serie')
        .then(response => response.json())
        .then(series => {
            // Procesa los datos de las series aquí
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
                                    <a class="ver-detalles" href="#" data-serie-id="${serie.id}">detalles</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            // Inserta el HTML generado dinámicamente en el marcador
            seriesCarousel.insertAdjacentHTML('beforeend', dynamicHTML);

            // Agrega un evento click a los enlaces "detalles"
            const detallesLinks = document.querySelectorAll('.ver-detalles');
            detallesLinks.forEach(link => {
                link.addEventListener('click', function(event) {
                    event.preventDefault();
                    const serieId = this.getAttribute('data-serie-id');
                    mostrarCuadroDialogo(serieId);
                });
            });

            // Función para mostrar el cuadro de diálogo
            function mostrarCuadroDialogo(serieId) {
                window.alert('Hola');
                // Aquí puedes personalizar el cuadro de diálogo como desees.
            }

        })
        .catch(error => {
            console.error('Error al obtener datos de series:', error);
        });
});