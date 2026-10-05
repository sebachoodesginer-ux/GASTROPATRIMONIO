/* =========================================================
   LÍNEA DE INVESTIGACIÓN
========================================================= */

document.documentElement.classList.add("js");


document.addEventListener("DOMContentLoaded", () => {


    /* =====================================================
       ELEMENTOS
    ====================================================== */

    const revealElements =
        document.querySelectorAll(".linea-reveal");

    const floatingIcons =
        document.querySelectorAll(
            ".linea-page .floating-icon"
        );

    const reduceMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    /* =====================================================
       INTRO DE PÁGINA
    ====================================================== */

    if (reduceMotion) {

        document.documentElement
            .classList.add("linea-ready");

    } else {

        requestAnimationFrame(() => {

            requestAnimationFrame(() => {

                document.documentElement
                    .classList.add("linea-ready");

            });

        });

    }


    /* =====================================================
       ICONOS FLOTANTES
    ====================================================== */

    floatingIcons.forEach((icon, index) => {

        const delay =
            -((index % 7) * .47);

        icon.style.animationDelay =
            `${delay}s`;

        const duration =
            4.2 + ((index % 4) * .35);

        icon.style.animationDuration =
            `${duration}s`;

    });


    /* =====================================================
       ANIMACIONES AL HACER SCROLL
    ====================================================== */

    if (reduceMotion) {

        revealElements.forEach(element => {

            element.classList.add(
                "linea-visible"
            );

        });

    } else {

        const revealObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        const element =
                            entry.target;

                        if (entry.isIntersecting) {

                            element.classList.add(
                                "linea-visible"
                            );

                        } else {

                            element.classList.remove(
                                "linea-visible"
                            );

                        }

                    });

                },
                {
                    threshold: 0.12,
                    rootMargin:
                        "-20px 0px -25px 0px"
                }
            );


        revealElements.forEach(element => {

            revealObserver.observe(
                element
            );

        });

    }


    /* =====================================================
       MOVIMIENTO SUAVE DEL HERO
    ====================================================== */

    const hero =
        document.querySelector(
            ".linea-hero"
        );

    const heroContent =
        document.querySelector(
            ".linea-hero__content"
        );

    let ticking = false;


    function updateHero() {

        if (
            !hero ||
            !heroContent ||
            reduceMotion
        ) {

            ticking = false;

            return;
        }


        const scrollY =
            window.scrollY;

        const heroHeight =
            hero.offsetHeight;


        if (scrollY <= heroHeight) {

            const movement =
                Math.min(
                    scrollY * .055,
                    22
                );

            heroContent.style.translate =
                `0 ${movement}px`;

        } else {

            heroContent.style.translate =
                "0 22px";

        }


        ticking = false;

    }


    window.addEventListener(
        "scroll",
        () => {

            if (!ticking) {

                requestAnimationFrame(
                    updateHero
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );


    /* =====================================================
       SCROLL INTERNO
    ====================================================== */

    const internalLinks =
        document.querySelectorAll(
            '.linea-page a[href^="#"]'
        );

    const header =
        document.getElementById(
            "header"
        );


    internalLinks.forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const id =
                    link.getAttribute(
                        "href"
                    );


                if (
                    !id ||
                    id === "#"
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        id
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;


                const targetPosition =
                    target
                        .getBoundingClientRect()
                        .top
                    +
                    window.scrollY
                    -
                    headerHeight
                    -
                    15;


                window.scrollTo(
                    {
                        top: targetPosition,

                        behavior:
                            reduceMotion
                                ? "auto"
                                : "smooth"
                    }
                );

            }
        );

    });


    /* =====================================================
       VISOR DE IMÁGENES
    ====================================================== */

    const zoomableImages =
        document.querySelectorAll(
            ".zoomable"
        );

    const lightbox =
        document.getElementById(
            "imageLightbox"
        );

    const lightboxImage =
        document.getElementById(
            "lightboxImage"
        );

    const lightboxCaption =
        document.getElementById(
            "lightboxCaption"
        );

    const lightboxClose =
        document.getElementById(
            "lightboxClose"
        );


    function openLightbox(image) {

        if (
            !lightbox ||
            !lightboxImage
        ) {
            return;
        }


        lightboxImage.src =
            image.currentSrc ||
            image.src;


        lightboxImage.alt =
            image.alt || "";


        if (lightboxCaption) {

            lightboxCaption.textContent =
                image.alt || "";

        }


        lightbox.classList.add(
            "is-open"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "false"
        );


        document.body.classList.add(
            "lightbox-open"
        );

    }


    function closeLightbox() {

        if (!lightbox) {
            return;
        }


        lightbox.classList.remove(
            "is-open"
        );


        lightbox.setAttribute(
            "aria-hidden",
            "true"
        );


        document.body.classList.remove(
            "lightbox-open"
        );


        setTimeout(() => {

            if (
                !lightbox.classList.contains(
                    "is-open"
                )
            ) {

                lightboxImage.src = "";

            }

        }, 350);

    }


    zoomableImages.forEach(image => {

        image.setAttribute(
            "tabindex",
            "0"
        );


        image.setAttribute(
            "role",
            "button"
        );


        image.setAttribute(
            "aria-label",
            `Ampliar imagen: ${image.alt || "imagen"}`
        );


        image.addEventListener(
            "click",
            event => {

                event.preventDefault();
                event.stopPropagation();

                openLightbox(image);

            }
        );


        image.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    openLightbox(image);

                }

            }
        );

    });


    if (lightboxClose) {

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );

    }


    if (lightbox) {

        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {

                    closeLightbox();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                lightbox &&
                lightbox.classList.contains(
                    "is-open"
                )
            ) {

                closeLightbox();

            }

        }
    );


    /* =====================================================
       EVITAR ARRASTRAR IMÁGENES
    ====================================================== */

    const pageImages =
        document.querySelectorAll(
            ".linea-page img"
        );


    pageImages.forEach(image => {

        image.setAttribute(
            "draggable",
            "false"
        );

    });


    /* =====================================================
       AÑO DEL FOOTER
    ====================================================== */

    const year =
        document.getElementById(
            "year"
        );


    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

});