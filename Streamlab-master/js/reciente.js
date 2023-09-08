document.addEventListener("DOMContentLoaded", function() {
    // Llama a la API local para obtener los datos de las series
    fetch('http://localhost:8080/reciente')
        .then(response => response.json())
        .then(recientes => {
            // Procesa los datos de las series aquí
            console.log('Datos de series extraídos correctamente:', recientes);

            // Obtén una referencia al contenedor del carrusel
            const recientesCarousel = document.getElementById('reciente-carousel');

            // Variable para almacenar el HTML generado dinámicamente
            let dynamicHTML = '';


            recientes.forEach(reciente => {
                dynamicHTML += `
                    <div class="item">
                        <div class="box">
                            <div class="imgBox">
                                <img src="${reciente.imagen}" alt="">
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
                                <h3>${reciente.nombre} </h3>
                                <div class="time flex">
                                    <span>${reciente.duracion}</span>
                                    <i class="fas fa-circle"></i>
                                    <a>${reciente.genero}</a>
                                    
                                </div>
                                <button class="primary" onclick="window.loki.showModal();">Ver Más</button>
                            </div>
                        </div>
                    </div>
                `;
            });

            // Inserta el HTML generado dinámicamente en el marcador
            recientesCarousel.insertAdjacentHTML('beforeend', dynamicHTML);

        })
        .catch(error => {
            console.error('Error al obtener datos de series:', error);
        });
});