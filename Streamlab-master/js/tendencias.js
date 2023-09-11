document.addEventListener("DOMContentLoaded", function() {
    // Llama a la API local para obtener los datos de las series
    fetch('http://localhost:8080/tendencias')
        .then(response => response.json())
        .then(tendencias => {

            console.log('Datos de series extraídos correctamente:', tendencias);

            // Obtén una referencia al contenedor del carrusel
            const tendenciasCarousel = document.getElementById('tendencias-carousel');

            // Variable para almacenar el HTML generado dinámicamente
            let dynamicHTML = '';


            tendencias.forEach(tendencias => {
                dynamicHTML += `
                    <div class="item">
                        <div class="box">
                            <div class="imgBox">
                                <img src="${tendencias.imagen}" alt="">
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
                                <h3>${tendencias.nombre} </h3>
                                <div class="time flex">
                                    <span>${tendencias.duracion}</span>
                                    <i class="fas fa-circle"></i>
                                    <a>${tendencias.genero}</a>
                                   
                                </div>

                            </div>
                        </div>
                    </div>
                `;
            });

            // Inserta el HTML generado dinámicamente en el marcador
            tendenciasCarousel.insertAdjacentHTML('beforeend', dynamicHTML);




        })
        .catch(error => {
            console.error('Error al obtener datos de series:', error);
        });
});