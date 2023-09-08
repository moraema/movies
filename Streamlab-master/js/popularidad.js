document.addEventListener("DOMContentLoaded", function() {
    // Llama a la API local para obtener los datos de las series
    fetch('http://localhost:8080/populares')
        .then(response => response.json())
        .then(populares => {
            // Procesa los datos de las series aquí
            console.log('Datos de series extraídos correctamente:', populares);

            // Obtén una referencia al contenedor del carrusel
            const popularesCarousel = document.getElementById('populares-carousel');

            // Variable para almacenar el HTML generado dinámicamente
            let dynamicHTML = '';

            // Recorre el arreglo 'series' y genera elementos para cada serie
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
                                    <a class="ver-detalles" href="/peliculasuno.html" id=${popular.id}>detalles</a>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            });

            // Inserta el HTML generado dinámicamente en el marcador
            popularesCarousel.insertAdjacentHTML('beforeend', dynamicHTML);


        })
        .catch(error => {
            console.error('Error al obtener datos de series:', error);
        });
});