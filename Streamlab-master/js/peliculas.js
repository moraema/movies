document.addEventListener("DOMContentLoaded", function() {
    // Llama a la API local para obtener los datos de las series
    fetch('http://localhost:8080/pelicula')
        .then(response => response.json())
        .then(peliculas => {
            // Procesa los datos de las series aquí
            console.log('Datos de series extraídos correctamente:', peliculas);

            // Obtén una referencia al contenedor del carrusel
            const peliculasCarousel = document.getElementById('peliculas-carousel');

            // Variable para almacenar el HTML generado dinámicamente
            let dynamicHTML = '';


            peliculas.forEach(pelicula => {
                dynamicHTML += `
                    <div class="item">
                        <div class="box">
                            <div class="imgBox">
                                <img src="${pelicula.imagen}" alt="">
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
                                <h3>${pelicula.nombre} </h3>
                                <div class="time flex">
                                    <span>${pelicula.duracion}</span>
                                    <i class="fas fa-circle"></i>
                                    <a>${pelicula.genero}</a>
                                    <a class="ver-detalles" href="/peliculasuno.html" id=${pelicula.id}>detalles</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            // Inserta el HTML generado dinámicamente en el marcador
            peliculasCarousel.insertAdjacentHTML('beforeend', dynamicHTML);

        })
        .catch(error => {
            console.error('Error al obtener datos de series:', error);
        });
});