document.addEventListener(
    "DOMContentLoaded",
    () => {


        /* =====================================================
           EL SEMINARIO
           -----------------------------------------------------
           main.js continúa manejando:

           - page-ready
           - intro-complete
           - menú
           - hamburguesa
           - dirección del scroll
           - reveals
           - partículas
           - footer
           - buscador
           - volver arriba

           Aquí solo manejamos funciones propias
           de la página del Seminario.
        ====================================================== */



        /* =====================================================
           EVITAR SCROLL INTERNO
        ====================================================== */

        const pageContainers =
            document.querySelectorAll(
                [
                    ".seminario-main",
                    ".seminario-stats",
                    ".seminario-stats__grid",
                    ".seminario-about",
                    ".seminario-about__container",
                    ".seminario-line",
                    ".seminario-line__grid",
                    ".seminario-subline",
                    ".seminario-subline__grid",
                    ".seminario-collaborators",
                    ".seminario-collaborators__grid",
                    ".seminario-publications",
                    ".seminario-publications__grid"
                ].join(",")
            );



        function removeInternalScroll() {


            pageContainers.forEach(
                element => {


                    element.style.maxHeight =
                        "none";


                    element.style.overflowY =
                        "visible";


                }
            );


        }


        removeInternalScroll();



        /* =====================================================
           LINKS INTERNOS
        ====================================================== */

        const header =
            document.getElementById(
                "header"
            );


        const internalLinks =
            document.querySelectorAll(
                '.seminario-page a[href^="#"]'
            );



        internalLinks.forEach(
            link => {


                link.addEventListener(
                    "click",
                    event => {


                        const targetId =
                            link.getAttribute(
                                "href"
                            );


                        if (
                            !targetId ||
                            targetId === "#"
                        ) {

                            return;

                        }


                        const target =
                            document.querySelector(
                                targetId
                            );


                        if (
                            !target
                        ) {

                            return;

                        }


                        event.preventDefault();


                        const headerHeight =
                            header
                                ? header.offsetHeight
                                : 0;


                        const position =
                            target
                                .getBoundingClientRect()
                                .top
                            +
                            window.scrollY
                            -
                            headerHeight
                            -
                            12;


                        window.scrollTo(
                            {

                                top:
                                    position,

                                behavior:
                                    "smooth"

                            }
                        );


                    }
                );


            }
        );



        /* =====================================================
           FLOTACIÓN DESFASE DE ICONOS
           -----------------------------------------------------
           Los delays también están en CSS.

           Aquí simplemente agregamos una pequeña
           variación automática para evitar que todos
           parezcan moverse al mismo tiempo.
        ====================================================== */

        const floatingIcons =
            document.querySelectorAll(
                [
                    ".seminario-stat__icon",
                    ".seminario-card__icon",
                    ".seminario-placeholder-icon"
                ].join(",")
            );



        floatingIcons.forEach(
            (
                icon,
                index
            ) => {


                const variation =
                    (
                        index %
                        6
                    ) *
                    -.32;


                icon.style.animationDelay =
                    `${variation}s`;


            }
        );



        /* =====================================================
           RESIZE
        ====================================================== */

        let resizeTimer;


        window.addEventListener(
            "resize",
            () => {


                clearTimeout(
                    resizeTimer
                );


                resizeTimer =
                    setTimeout(
                        () => {


                            removeInternalScroll();


                        },
                        100
                    );


            },
            {
                passive: true
            }
        );


    }
);