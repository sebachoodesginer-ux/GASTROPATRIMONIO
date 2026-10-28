document.addEventListener('DOMContentLoaded',()=>{


  const $=(s,p=document)=>
    p.querySelector(s);


  const $$=(s,p=document)=>
    [...p.querySelectorAll(s)];


  const body=document.body;

  const header=$('#header');

  const nav=$('#navigation');

  const menu=$('#menuButton');



  /* =========================================
     ENTRADA GENERAL
  ========================================= */

  requestAnimationFrame(()=>{

    setTimeout(()=>{

      body.classList.add(
        'page-ready'
      );

    },120);

  });



  /* =========================================
     PARTICULAS
  ========================================= */

  const particles=$('#particles');


  if(particles){

    const mobile=
      innerWidth<650;


    const ambientAmount=
      mobile
      ? 48
      : 82;


    const riseAmount=
      mobile
      ? 14
      : 24;


    const rnd=(a,b)=>
      Math.random()*(b-a)+a;



    /* PARTICULAS AMBIENTALES */

    for(
      let i=0;
      i<ambientAmount;
      i++
    ){

      const p=
        document.createElement(
          'span'
        );


      p.className=
        `particle${
          Math.random()<.14
          ? ' particle--large'
          : ''
        }`;


      const size=
        rnd(
          mobile?3.5:4.5,
          mobile?7.5:10
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



    /* PARTICULAS ASCENDENTES */

    for(
      let i=0;
      i<riseAmount;
      i++
    ){

      const p=
        document.createElement(
          'span'
        );


      p.className=
        'particle particle--rise';


      const size=
        rnd(
          mobile?4:5,
          mobile?8:11
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



  /* =========================================
     HEADER + SCROLL
  ========================================== */

  let lastScroll=scrollY;


  addEventListener(
    'scroll',
    ()=>{

      const y=scrollY;


      header?.classList.toggle(
        'is-blurred',
        y>30
      );


      if(
        y>150 &&
        y>lastScroll+2 &&
        !nav?.classList.contains('open')
      ){

        header?.classList.add(
          'is-hidden'
        );

      }

      else if(
        y<lastScroll-2 ||
        y<30
      ){

        header?.classList.remove(
          'is-hidden'
        );

      }


      lastScroll=y;


      $('#backToTop')?.classList.toggle(
        'show',
        y>600
      );

    },
    {
      passive:true
    }
  );



  /* =========================================
     MENU
  ========================================== */

  function closeMenu(){

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
    ()=>{

      const open=
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


      if(open){

        header?.classList.remove(
          'is-hidden'
        );

      }

    }
  );


  $$('.navigation__link')
    .forEach(
      a=>
        a.addEventListener(
          'click',
          closeMenu
        )
    );


  addEventListener(
    'resize',
    ()=>{

      if(innerWidth>1450){

        closeMenu();

      }

    }
  );



  /* =========================================
     BUSCADOR
  ========================================== */

  const overlay=
    $('#searchOverlay');


  const search=
    $('#searchInput');


  const searchResults=
    $$('#searchResults a');



  const openSearch=()=>{

    closeMenu();


    overlay?.classList.add(
      'open'
    );


    body.classList.add(
      'no-scroll'
    );


    header?.classList.remove(
      'is-hidden'
    );


    setTimeout(
      ()=>search?.focus(),
      180
    );

  };


  const closeSearch=()=>{

    overlay?.classList.remove(
      'open'
    );


    body.classList.remove(
      'no-scroll'
    );

  };


  $('#searchButton')
    ?.addEventListener(
      'click',
      openSearch
    );


  $('#closeSearch')
    ?.addEventListener(
      'click',
      closeSearch
    );


  overlay?.addEventListener(
    'click',
    e=>{

      if(e.target===overlay){

        closeSearch();

      }

    }
  );


  search?.addEventListener(
    'input',
    ()=>{

      const value=
        search.value
          .toLowerCase()
          .trim();


      searchResults.forEach(
        result=>{

          const text=
            (
              result.textContent+
              ' '+
              (
                result.dataset.search ||
                ''
              )
            )
            .toLowerCase();


          result.style.display=
            text.includes(value)
            ? 'block'
            : 'none';

        }
      );

    }
  );



  /* =========================================
     REVEAL
  ========================================== */

  const reveal=
    $$('.reveal,.footer-reveal');


  if(
    'IntersectionObserver'
    in window
  ){

    const io=
      new IntersectionObserver(
        entries=>{

          entries.forEach(
            entry=>{

              if(
                entry.isIntersecting
              ){

                entry.target.classList.add(
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
      el=>
        io.observe(el)
    );

  }

  else{

    reveal.forEach(
      el=>
        el.classList.add(
          'in-view'
        )
    );

  }



  /* =========================================
     PERFIL
  ========================================== */

  const viewer=
    $('#profileViewer');


  const profileName=
    $('#profileName');


  const profileRole=
    $('#profileRole');


  const profileSince=
    $('#profileSince');


  const profileHours=
    $('#profileHours');


  const profileType=
    $('#profileType');


  const profileDescription=
    $('#profileDescription');


  const profileImage=
    $('#profileImage');


  let activeCard=null;



  function openProfile(card){

    if(!viewer){

      return;

    }


    /*
      Quitamos selección anterior.
    */

    if(
      activeCard &&
      activeCard!==card
    ){

      activeCard.classList.remove(
        'selected'
      );

    }


    activeCard=card;


    card.classList.add(
      'selected'
    );


    /*
      Datos.
    */

    profileName.textContent=
      card.dataset.name ||
      'Investigador';


    profileRole.textContent=
      card.dataset.role ||
      'Integrante';


    profileSince.textContent=
      card.dataset.since ||
      '—';


    profileHours.textContent=
      card.dataset.hours ||
      '—';


    profileType.textContent=
      card.dataset.type ||
      '—';


    profileDescription.textContent=
      card.dataset.description ||
      'Integrante del grupo Patrimonio Cultural y Gastronómico de Colombia.';



    /*
      Retrato asociado a la tarjeta seleccionada.
      Si no existe una imagen, conservamos un marcador accesible.
    */

    profileImage.innerHTML = '';
    const imageSource = card.dataset.image;

    if (imageSource) {
      const portrait = document.createElement('img');
      portrait.src = imageSource;
      portrait.alt = `Retrato de ${card.dataset.name || 'investigador'}`;
      portrait.loading = 'lazy';
      portrait.decoding = 'async';
      portrait.addEventListener('error', () => {
        profileImage.textContent = 'Imagen no disponible';
      }, { once: true });
      profileImage.appendChild(portrait);
      profileImage.classList.remove('placeholder-image');
      profileImage.classList.add('has-photo');
    } else {
      const placeholder = document.createElement('span');
      placeholder.textContent = 'FOTO DEL INVESTIGADOR';
      profileImage.appendChild(placeholder);
      profileImage.classList.add('placeholder-image');
      profileImage.classList.remove('has-photo');
    }



    /*
      Abrimos.
    */

    requestAnimationFrame(()=>{

      viewer.classList.add(
        'open'
      );


      viewer.setAttribute(
        'aria-hidden',
        'false'
      );

    });



    /*
      Llevamos el perfil hacia
      una posición cómoda.
    */

    setTimeout(()=>{

      viewer.scrollIntoView({

        behavior:'smooth',

        block:'center'

      });

    },120);

  }



  function closeProfile(){

    viewer?.classList.remove(
      'open'
    );


    viewer?.setAttribute(
      'aria-hidden',
      'true'
    );


    if(activeCard){

      activeCard.classList.remove(
        'selected'
      );


      activeCard=null;

    }

  }



  /*
    Abrir perfil.
  */

  $$('.profile-card')
    .forEach(
      card=>{

        card.addEventListener(
          'click',
          ()=>openProfile(card)
        );

      }
    );



  /*
    Cerrar.
  */

  $('#closeProfile')
    ?.addEventListener(
      'click',
      closeProfile
    );



  /* =========================================
     ESCAPE
  ========================================== */

  addEventListener(
    'keydown',
    e=>{

      if(
        e.key==='Escape'
      ){

        closeSearch();

        closeMenu();

        closeProfile();

      }

    }
  );



  /* =========================================
     VOLVER ARRIBA
  ========================================== */

  $('#backToTop')
    ?.addEventListener(
      'click',
      ()=>{

        scrollTo({

          top:0,

          behavior:'smooth'

        });

      }
    );



  /* =========================================
     AÑO
  ========================================== */

  const year=
    $('#year');


  if(year){

    year.textContent=
      new Date().getFullYear();

  }

});