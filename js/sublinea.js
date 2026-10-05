document.addEventListener(
    "DOMContentLoaded",
    () => {


        const root =
            document.documentElement;


        const header =
            document.getElementById(
                "header"
            );


        const navigation =
            document.getElementById(
                "navigation"
            );


        const menuButton =
            document.getElementById(
                "menuButton"
            );


        const menuBackdrop =
            document.getElementById(
                "menuBackdrop"
            );


        const searchButton =
            document.getElementById(
                "searchButton"
            );


        const searchOverlay =
            document.getElementById(
                "searchOverlay"
            );


        const closeSearch =
            document.getElementById(
                "closeSearch"
            );


        const searchInput =
            document.getElementById(
                "searchInput"
            );


        const searchResults =
            document.querySelectorAll(
                "#searchResults a"
            );


        const backToTop =
            document.getElementById(
                "backToTop"
            );


        const particlesContainer =
            document.getElementById(
                "particles"
            );


        const year =
            document.getElementById(
                "year"
            );


        const reduceMotion =
            window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;



        /* =====================================================
           INTRO
        ====================================================== */

        let introStarted = false;


        function startPageIntro() {

            if (
                introStarted
            ) {

                return;

            }


            introStarted = true;


            if (
                reduceMotion
            ) {

                root.classList.add(
                    "page-ready",
                    "intro-complete"
                );

                return;

            }


            requestAnimationFrame(
                () => {

                    requestAnimationFrame(
                        () => {

                            root.classList.add(
                                "page-ready"
                            );


                            setTimeout(
                                () => {

                                    root.classList.add(
                                        "intro-complete"
                                    );

                                },
                                1700
                            );

                        }
                    );

                }
            );

        }



        if (
            document.fonts &&
            document.fonts.ready
        ) {

            Promise.race(
                [

                    document.fonts.ready,

                    new Promise(
                        resolve => {

                            setTimeout(
                                resolve,
                                550
                            );

                        }
                    )

                ]
            )
            .then(
                () => {

                    setTimeout(
                        startPageIntro,
                        50
                    );

                }
            );

        }

        else {

            setTimeout(
                startPageIntro,
                90
            );

        }



        /* =====================================================
           MENÚ
        ====================================================== */

        function menuIsOpen() {

            return (
                navigation &&
                navigation.classList.contains(
                    "open"
                )
            );

        }



        function openMenu() {

            if (
                !navigation ||
                !menuButton
            ) {

                return;

            }


            closeSearchPanel();


            navigation.classList.add(
                "open"
            );


            menuButton.classList.add(
                "active"
            );


            menuBackdrop?.classList.add(
                "active"
            );


            header?.classList.add(
                "menu-active"
            );


            header?.classList.remove(
                "is-hidden"
            );


            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );


            menuButton.setAttribute(
                "aria-label",
                "Cerrar menú"
            );


            document.body.classList.add(
                "menu-open"
            );

        }



        function closeMenu() {

            if (
                !navigation ||
                !menuButton
            ) {

                return;

            }


            navigation.classList.remove(
                "open"
            );


            menuButton.classList.remove(
                "active"
            );


            menuBackdrop?.classList.remove(
                "active"
            );


            header?.classList.remove(
                "menu-active"
            );


            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );


            menuButton.setAttribute(
                "aria-label",
                "Abrir menú"
            );


            document.body.classList.remove(
                "menu-open"
            );

        }



        menuButton?.addEventListener(
            "click",
            event => {

                event.stopPropagation();


                if (
                    menuIsOpen()
                ) {

                    closeMenu();

                }

                else {

                    openMenu();

                }

            }
        );



        menuBackdrop?.addEventListener(
            "click",
            closeMenu
        );



        document
            .querySelectorAll(
                ".navigation__link"
            )
            .forEach(
                link => {

                    link.addEventListener(
                        "click",
                        closeMenu
                    );

                }
            );



        /* =====================================================
           RESPONSIVE
        ====================================================== */

        let previousWidth =
            window.innerWidth;


        window.addEventListener(
            "resize",
            () => {

                const currentWidth =
                    window.innerWidth;


                if (
                    currentWidth >
                    1320
                ) {

                    closeMenu();

                }


                if (
                    Math.abs(
                        currentWidth -
                        previousWidth
                    ) >
                    120
                ) {

                    closeMenu();

                }


                previousWidth =
                    currentWidth;

            }
        );



        /* =====================================================
           SCROLL
        ====================================================== */

        let previousScroll =
            window.scrollY;


        let scrollDirection =
            "down";


        let ticking =
            false;



        function updateScrollUI() {

            const currentScroll =
                window.scrollY;



            if (
                currentScroll >
                previousScroll + 3
            ) {

                scrollDirection =
                    "down";

            }

            else if (
                currentScroll <
                previousScroll - 3
            ) {

                scrollDirection =
                    "up";

            }



            if (
                menuIsOpen()
            ) {

                header?.classList.remove(
                    "is-hidden"
                );


                header?.classList.add(
                    "is-blurred"
                );

            }

            else if (
                currentScroll <
                25
            ) {

                header?.classList.remove(
                    "is-blurred",
                    "is-hidden"
                );

            }

            else {

                header?.classList.add(
                    "is-blurred"
                );


                if (
                    scrollDirection ===
                    "down" &&
                    currentScroll >
                    150
                ) {

                    header?.classList.add(
                        "is-hidden"
                    );

                }


                if (
                    scrollDirection ===
                    "up"
                ) {

                    header?.classList.remove(
                        "is-hidden"
                    );

                }

            }



            if (
                currentScroll >
                480
            ) {

                backToTop?.classList.add(
                    "show"
                );

            }

            else {

                backToTop?.classList.remove(
                    "show"
                );

            }



            previousScroll =
                Math.max(
                    currentScroll,
                    0
                );


            ticking =
                false;

        }



        window.addEventListener(
            "scroll",
            () => {

                if (
                    ticking
                ) {

                    return;

                }


                requestAnimationFrame(
                    updateScrollUI
                );


                ticking =
                    true;

            },
            {
                passive: true
            }
        );


        updateScrollUI();



        /* =====================================================
           BUSCADOR
        ====================================================== */

        function openSearchPanel() {

            if (
                !searchOverlay
            ) {

                return;

            }


            closeMenu();


            searchOverlay.classList.add(
                "open"
            );


            document.body.classList.add(
                "no-scroll"
            );


            header?.classList.remove(
                "is-hidden"
            );


            setTimeout(
                () => {

                    searchInput?.focus();

                },
                180
            );

        }



        function closeSearchPanel() {

            searchOverlay?.classList.remove(
                "open"
            );


            document.body.classList.remove(
                "no-scroll"
            );

        }



        searchButton?.addEventListener(
            "click",
            openSearchPanel
        );


        closeSearch?.addEventListener(
            "click",
            closeSearchPanel
        );


        searchOverlay?.addEventListener(
            "click",
            event => {

                if (
                    event.target ===
                    searchOverlay
                ) {

                    closeSearchPanel();

                }

            }
        );



        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key ===
                    "Escape"
                ) {

                    closeMenu();

                    closeSearchPanel();

                }

            }
        );



        /* =====================================================
           BÚSQUEDA
        ====================================================== */

        searchInput?.addEventListener(
            "input",
            () => {

                const value =
                    searchInput
                        .value
                        .toLowerCase()
                        .trim();


                searchResults.forEach(
                    result => {

                        const content =
                            (
                                result.textContent +
                                " " +
                                (
                                    result.dataset.search ||
                                    ""
                                )
                            )
                            .toLowerCase();


                        result.style.display =
                            content.includes(
                                value
                            )
                                ? "block"
                                : "none";

                    }
                );

            }
        );



        /* =====================================================
           REVEAL
        ====================================================== */

        const revealElements =
            document.querySelectorAll(
                ".reveal"
            );


        if (
            reduceMotion
        ) {

            revealElements.forEach(
                element => {

                    element.classList.add(
                        "in-view"
                    );

                }
            );

        }

        else {

            const revealObserver =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target.classList.add(
                                        "in-view"
                                    );

                                }

                                else {

                                    entry.target.classList.remove(
                                        "in-view"
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold:
                            .12,

                        rootMargin:
                            "-25px 0px -25px 0px"
                    }
                );


            revealElements.forEach(
                element => {

                    revealObserver.observe(
                        element
                    );

                }
            );

        }



        /* =====================================================
           FOOTER
        ====================================================== */

        const footerElements =
            document.querySelectorAll(
                ".footer-reveal"
            );


        const footerObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(
                        entry => {

                            if (
                                entry.isIntersecting
                            ) {

                                entry.target.classList.add(
                                    "in-view"
                                );

                            }

                            else {

                                entry.target.classList.remove(
                                    "in-view"
                                );

                            }

                        }
                    );

                },
                {
                    threshold:
                        .14
                }
            );


        footerElements.forEach(
            element => {

                footerObserver.observe(
                    element
                );

            }
        );



        /* =====================================================
           PARTICULAS
        ====================================================== */

        function createParticles() {

            if (
                reduceMotion ||
                !particlesContainer
            ) {

                return;

            }


            particlesContainer.innerHTML =
                "";


            let amount;


            if (
                window.innerWidth <=
                600
            ) {

                amount = 22;

            }

            else if (
                window.innerWidth <=
                1050
            ) {

                amount = 32;

            }

            else {

                amount = 44;

            }



            for (
                let i = 0;
                i < amount;
                i++
            ) {

                const particle =
                    document.createElement(
                        "span"
                    );


                particle.classList.add(
                    "particle"
                );


                const size =
                    7 +
                    Math.random() *
                    17;


                const duration =
                    13 +
                    Math.random() *
                    13;


                const drift =
                    -90 +
                    Math.random() *
                    180;


                const opacity =
                    .24 +
                    Math.random() *
                    .25;


                particle.style.left =
                    `${Math.random() * 100}%`;


                particle.style.setProperty(
                    "--particle-size",
                    `${size}px`
                );


                particle.style.setProperty(
                    "--particle-duration",
                    `${duration}s`
                );


                particle.style.setProperty(
                    "--particle-delay",
                    `${-Math.random() * duration}s`
                );


                particle.style.setProperty(
                    "--particle-drift",
                    `${drift}px`
                );


                particle.style.setProperty(
                    "--particle-opacity",
                    opacity
                );


                particle.style.setProperty(
                    "--particle-blur",
                    `${
                        Math.random() >
                        .6
                            ? 1
                            : 0
                    }px`
                );


                particlesContainer.appendChild(
                    particle
                );

            }

        }


        createParticles();



        /* =====================================================
           VOLVER ARRIBA
        ====================================================== */

        backToTop?.addEventListener(
            "click",
            () => {

                closeMenu();


                window.scrollTo(
                    {

                        top: 0,

                        behavior:
                            reduceMotion
                                ? "auto"
                                : "smooth"

                    }
                );

            }
        );



        /* =====================================================
           AÑO
        ====================================================== */

        if (
            year
        ) {

            year.textContent =
                new Date()
                    .getFullYear();

        }

    }
);

