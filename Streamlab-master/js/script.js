document.addEventListener("DOMContentLoaded", function() {
    var menuitem = document.getElementById("menuitem");
    menuitem.style.maxHeight = "0px";

    function menutoggle() {
        if (menuitem.style.maxHeight == '0px') {
            menuitem.style.maxHeight = "200px";
        } else {
            menuitem.style.maxHeight = "0px";
        }
    }

    window.addEventListener("scroll", function() {
        var header = document.querySelector("header");
        header.classList.toggle("sticky", window.scrollY > 50);
    });

    $('.owl-carousel').owlCarousel({
        loop: true,
        margin: 20,
        nav: true,
        dots: false,
        responsive: {
            414: {
                items: 1
            },
            600: {
                items: 2
            },
            1000: {
                items: 4
            }
        }
    });
});