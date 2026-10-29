document.addEventListener(
    'DOMContentLoaded',
    () => {

        const $ = (
            selector,
            parent = document
        ) => parent.querySelector(selector);


        const $$ = (
            selector,
            parent = document
        ) => [
            ...parent.querySelectorAll(selector)
        ];


        const body =
            document.body;

        const root =
            document.documentElement;

        const header =
            $('#header');

        const nav =
            $('#navigation');

        const menu =
            $('#menuButton');


        /* =====================================================
           ENTRADA
        ====================================================== */

        requestAnimationFrame(
            () => {

                setTimeout(
                    () => {

                        body.classList.add(
                            'page-ready'
                        );

                    },
                    120
                );

            }
        );


        /* =====================================================
           PARTICULAS
        ====================================================== */

        const particles =
            $('#particles');


        if (particles) {

            const mobile =
                innerWidth < 650;

            const ambientAmount =
                mobile
                    ? 48
                    : 82;

            const riseAmount =
                mobile
                    ? 14
                    : 24;


            const rnd = (
                a,
                b
            ) =>
                Math.random() *
                (b - a) +
                a;


            /* PARTICULAS AMBIENTALES */

            for (
                let i = 0;
                i < ambientAmount;
                i++
            ) {

                const p =
                    document.createElement(
                        'span'
                    );


                p.className =
                    `particle${
                        Math.random() < .14
                            ? ' particle--large'
                            : ''
                    }`;


                const size =
                    rnd(
                        mobile ? 3.5 : 4.5,
                        mobile ? 7.5 : 10
                    );


                p.style.setProperty(
                    '--particle-left',
                    `${rnd(1,99)}%`
                );


                p.style.setProperty(
                    '--particle-top',
                    `${rnd(4,96)}%`
                );


                p.style.setProperty(
                    '--particle-size',
                    `${size}px`
                );


                p.style.setProperty(
                    '--particle-duration',
                    `${rnd(10,19)}s`
                );


                p.style.setProperty(
                    '--particle-delay',
                    `${rnd(-19,0)}s`
                );


                p.style.setProperty(
                    '--particle-opacity',
                    rnd(.42,.82)
                );


                p.style.setProperty(
                    '--particle-blur',
                    `${rnd(.05,1.1)}px`
                );


                p.style.setProperty(
                    '--particle-drift',
                    `${rnd(-55,55)}px`
                );


                particles.appendChild(p);

            }


            /* PARTICULAS QUE SUBEN */

            for (
                let i = 0;
                i < riseAmount;
                i++
            ) {

                const p =
                    document.createElement(
                        'span'
                    );


                p.className =
                    'particle particle--rise';


                const size =
                    rnd(
                        mobile ? 4 : 5,
                        mobile ? 8 : 11
                    );


                p.style.setProperty(
                    '--particle-left',
                    `${rnd(1,99)}%`
                );


                p.style.setProperty(
                    '--particle-size',
                    `${size}px`
                );


                p.style.setProperty(
                    '--particle-duration',
                    `${rnd(13,23)}s`
                );


                p.style.setProperty(
                    '--particle-delay',
                    `${rnd(-23,0)}s`
                );


                p.style.setProperty(
                    '--particle-opacity',
                    rnd(.48,.86)
                );


                p.style.setProperty(
                    '--particle-blur',
                    `${rnd(.05,1)}px`
                );


                p.style.setProperty(
                    '--particle-drift',
                    `${rnd(-65,65)}px`
                );


                particles.appendChild(p);

            }

        }


        /* =====================================================
           HEADER / SCROLL
        ====================================================== */

        let lastScroll =
            scrollY;


        addEventListener(
            'scroll',
            () => {

                const y =
                    scrollY;


                header?.classList.toggle(
                    'is-blurred',
                    y > 30
                );


                if (
                    y > 150 &&
                    y > lastScroll + 2 &&
                    !nav?.classList.contains(
                        'open'
                    )
                ) {

                    header?.classList.add(
                        'is-hidden'
                    );

                }

                else if (
                    y < lastScroll - 2 ||
                    y < 30
                ) {

                    header?.classList.remove(
                        'is-hidden'
                    );

                }


                lastScroll =
                    y;


                $('#backToTop')
                    ?.classList
                    .toggle(
                        'show',
                        y > 600
                    );

            },
            {
                passive:true
            }
        );


        /* =====================================================
           MENU RESPONSIVE
        ====================================================== */

        function closeMenu() {

            nav?.classList.remove(
                'open'
            );


            menu?.classList.remove(
                'active'
            );


            menu?.setAttribute(
                'aria-expanded',
                'false'
            );


            body.classList.remove(
                'menu-open'
            );

        }


        menu?.addEventListener(
            'click',
            () => {

                const open =
                    !nav.classList.contains(
                        'open'
                    );


                nav.classList.toggle(
                    'open',
                    open
                );


                menu.classList.toggle(
                    'active',
                    open
                );


                menu.setAttribute(
                    'aria-expanded',
                    String(open)
                );


                body.classList.toggle(
                    'menu-open',
                    open
                );


                if (open) {

                    header?.classList.remove(
                        'is-hidden'
                    );

                }

            }
        );


        $$('.navigation__link')
            .forEach(
                link => {

                    link.addEventListener(
                        'click',
                        closeMenu
                    );

                }
            );


        addEventListener(
            'resize',
            () => {

                if (
                    innerWidth > 1450
                ) {

                    closeMenu();

                }

            }
        );


        /* =====================================================
           BUSCADOR GLOBAL
           IGUAL AL DE LAS OTRAS PAGINAS
        ====================================================== */

        const overlay =
            $('#searchOverlay');


        const search =
            $('#searchInput');


        const searchResults =
            $$('#searchResults a');


        function openSearch() {

            /* Cerramos el menú */

            closeMenu();


            /* Abrimos el buscador */

            overlay?.classList.add(
                'open'
            );


            /* Bloqueamos el scroll */

            body.classList.add(
                'no-scroll'
            );


            /* Mostramos nuevamente
               el header */

            header?.classList.remove(
                'is-hidden'
            );


            /* Activamos el input */

            setTimeout(
                () => {

                    search?.focus();

                },
                180
            );

        }


        function closeSearch() {

            overlay?.classList.remove(
                'open'
            );


            body.classList.remove(
                'no-scroll'
            );

        }


        /* BOTON BUSCAR */

        $('#searchButton')
            ?.addEventListener(
                'click',
                openSearch
            );


        /* CERRAR X */

        $('#closeSearch')
            ?.addEventListener(
                'click',
                closeSearch
            );


        /* CERRAR HACIENDO CLICK
           FUERA DEL CUADRO */

        overlay?.addEventListener(
            'click',
            event => {

                if (
                    event.target ===
                    overlay
                ) {

                    closeSearch();

                }

            }
        );


        /* BUSQUEDA EN TIEMPO REAL */

        search?.addEventListener(
            'input',
            () => {

                const value =
                    search.value
                        .toLowerCase()
                        .trim();


                searchResults.forEach(
                    result => {

                        const text =
                            (
                                result.textContent +
                                ' ' +
                                (
                                    result.dataset.search ||
                                    ''
                                )
                            )
                                .toLowerCase();


                        result.style.display =
                            text.includes(
                                value
                            )
                                ? 'block'
                                : 'none';

                    }
                );

            }
        );


        /* ESC PARA CERRAR */

        addEventListener(
            'keydown',
            event => {

                if (
                    event.key ===
                    'Escape'
                ) {

                    closeSearch();

                    closeMenu();

                    if (
                        modal?.classList.contains(
                            'open'
                        )
                    ) {

                        closePublication();

                    }

                }

            }
        );


        /* =====================================================
           ANIMACIONES AL ENTRAR
        ====================================================== */

        const reveal =
            $$('.reveal,.footer-reveal');


        if (
            'IntersectionObserver'
            in window
        ) {

            const io =
                new IntersectionObserver(
                    entries => {

                        entries.forEach(
                            entry => {

                                if (
                                    entry.isIntersecting
                                ) {

                                    entry.target
                                        .classList
                                        .add(
                                            'in-view'
                                        );


                                    io.unobserve(
                                        entry.target
                                    );

                                }

                            }
                        );

                    },
                    {
                        threshold:.12,

                        rootMargin:
                            '0px 0px -40px'
                    }
                );


            reveal.forEach(
                (
                    element,
                    index
                ) => {

                    if (
                        element.classList.contains(
                            'publication-card'
                        ) ||
                        element.classList.contains(
                            'chapter-card'
                        )
                    ) {

                        element.style.transitionDelay =
                            `${
                                .05 +
                                (index % 5) *
                                .08
                            }s`;

                    }


                    io.observe(
                        element
                    );

                }
            );

        }

        else {

            reveal.forEach(
                element => {

                    element.classList.add(
                        'in-view'
                    );

                }
            );

        }


        /* =====================================================
           FILTROS
        ====================================================== */

        const filters =
            $$('.filter-button');


        const cards =
            $$('.publication-card,.chapter-card');


        const sections =
            $$('.publication-section');


        let current =
            'all';


        let query =
            '';


        function update() {

            const q =
                query
                    .trim()
                    .toLowerCase();


            cards.forEach(
                card => {

                    const type =
                        card.dataset.type ||
                        '';


                    const title =
                        (
                            card.dataset.title ||
                            ''
                        )
                            .toLowerCase();


                    const ok =
                        (
                            current ===
                            'all' ||
                            type ===
                            current
                        )
                        &&
                        (
                            !q ||
                            title.includes(q)
                        );


                    card.style.display =
                        ok
                            ? ''
                            : 'none';

                }
            );


            sections.forEach(
                section => {

                    section.style.display =
                        (
                            current ===
                            'all' ||
                            section.dataset.section ===
                            current
                        )
                            ? ''
                            : 'none';

                }
            );

        }


        filters.forEach(
            button => {

                button.addEventListener(
                    'click',
                    () => {

                        filters.forEach(
                            item =>
                                item.classList.remove(
                                    'active'
                                )
                        );


                        button.classList.add(
                            'active'
                        );
                        filters.forEach(item => item.setAttribute('aria-pressed', String(item === button)));


                        current =
                            button.dataset.filter;


                        update();

                    }
                );

            }
        );


        $('#publicationSearch')
            ?.addEventListener(
                'input',
                event => {

                    query =
                        event.target.value;


                    update();

                }
            );


        $$('[data-filter-target]')
            .forEach(
                button => {

                    button.addEventListener(
                        'click',
                        () => {

                            current =
                                button.dataset
                                    .filterTarget;


                            query =
                                '';


                            $('#publicationSearch')
                                .value =
                                '';


                            filters.forEach(
                                item => {

                                    item.classList.toggle(
                                        'active',
                                        item.dataset.filter ===
                                        current
                                    );

                                }
                            );


                            update();


                            $('#publicaciones')
                                ?.scrollIntoView({
                                    behavior:'smooth'
                                });

                        }
                    );

                }
            );


        /* =====================================================
           MODAL DE PUBLICACIONES
        ====================================================== */

        const modal =
            $('#publicationModal');


        const modalTitle =
            $('#modalTitle');


        const modalCategory =
            $('#modalCategory');


        const modalYear =
            $('#modalYear');


        const modalDescription =
            $('#modalDescription');

        const modalImage =
            $('#modalImage');

        const modalExternalLink =
            $('#modalExternalLink');


        function openPublication(
            card
        ) {

            modalTitle.textContent =
                card.dataset.title || 'Publicación';


            modalCategory.textContent =
                card.dataset.category || '';


            modalYear.textContent =
                card.dataset.year || '';


            modalDescription.textContent =
                card.dataset.description || 'Consulta la ficha de la publicación en el catálogo editorial.';

            const cardImage = card.querySelector('.publication-cover');
            const expandedImage = modalImage?.querySelector('img');
            if (expandedImage && cardImage) {
                expandedImage.src = cardImage.currentSrc || cardImage.src;
                expandedImage.alt = cardImage.alt || `Imagen relacionada con ${card.dataset.title || 'la publicación'}`;
            }

            const targetUrl = card.dataset.url;
            if (modalExternalLink) {
                if (targetUrl) {
                    modalExternalLink.href = targetUrl;
                    modalExternalLink.hidden = false;
                    modalExternalLink.style.display = 'inline-flex';
                } else {
                    modalExternalLink.hidden = true;
                    modalExternalLink.style.display = 'none';
                }
            }

            modal.classList.add(
                'open'
            );


            body.classList.add(
                'no-scroll'
            );

        }


        function closePublication() {

            modal?.classList.remove(
                'open'
            );


            body.classList.remove(
                'no-scroll'
            );

        }


        $$('.publication-open')
            .forEach(
                button => {

                    button.addEventListener(
                        'click',
                        () => {

                            const card =
                                button.closest(
                                    '.publication-card,.chapter-card'
                                );


                            if (card) {

                                openPublication(
                                    card
                                );

                            }

                        }
                    );

                }
            );


        $('#closePublicationModal')
            ?.addEventListener(
                'click',
                closePublication
            );


        $('#closeModalButton')
            ?.addEventListener(
                'click',
                closePublication
            );


        $('.modal-backdrop')
            ?.addEventListener(
                'click',
                closePublication
            );

        document.addEventListener('keydown', event => {
            if (event.key === 'Escape' && modal?.classList.contains('open')) closePublication();
        });


        /* =====================================================
           VOLVER ARRIBA
        ====================================================== */

        $('#backToTop')
            ?.addEventListener(
                'click',
                () => {

                    scrollTo({
                        top:0,
                        behavior:'smooth'
                    });

                }
            );


        /* =====================================================
           AÑO AUTOMATICO
        ====================================================== */

        const year =
            $('#year');


        if (year) {

            year.textContent =
                new Date()
                    .getFullYear();

        }

    }
);