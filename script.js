 document.getElementById('currentYear').textContent = new Date().getFullYear();

  // --- Script para o Menu Hambúrguer ---
  const menuToggle = document.querySelector('.menu-toggle')
  const mainNav = document.querySelector('.main-nav')

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('is-open');
        const isExpanded = mainNav.classList.contains('is-open');
        menuToggle.setAttribute('aria-expanded', isExpanded);

        const icon = menuToggle.querySelector('i');

        // --- INÍCIO DA DEPURAÇÃO ---
            console.log('Elemento do ícone encontrado:', icon);
            console.log('O menu está aberto?', isExpanded);
        // --- FIM DA DEPURAÇÃO ---

        if (isExpanded) {
            console.log('Tentando trocar para o ícone X (fa-times)');
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times')
        } else {
            console.log('Tentando trocar para o ícone de barras (fa-bars)');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        };
    });
  };

  const track = document.querySelector('.carousel-track');
  const slides = Array.from(track.children);
  const nextButton = document.querySelector('.carousel-button--right');
  const prevButton = document.querySelector('.carousel-button--left');
  const dotsNav = document.querySelector('.carousel-nav');
  const dots = Array.from(dotsNav.children);

  // Checa se os elementos do carrossel existem antes de rodar o script
  if (track) {
    const slideWidth = slides[0].getBoundingClientRect().width;

    // 1. Organiza os slides um ao lado do outro (JÁ FEITO PELO FLEXBOX NO CSS)
    // slides.forEach((slide, index) => {
    //     slide.style.left = slideWidth * index + 'px';
    // });

    const moveToSlide = (currentSlide, targetSlide) => {
        track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
        currentSlide.classList.remove('current-slide');
        targetSlide.classList.add('current-slide');
    };

    const updateDots = (currentDot, targetDot) => {
        currentDot.classList.remove('current-slide');
        targetDot.classList.add('current-slide');
    };

    const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
        if (targetIndex === 0) {
            prevButton.classList.add('is-hidden');
            nextButton.classList.remove('is-hidden');
        } else if (targetIndex === slides.length - 1) {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.add('is-hidden');
        } else {
            prevButton.classList.remove('is-hidden');
            nextButton.classList.add('is-hidden');
        }
    };

    // Quando clico na seta da direita, movo para o próximo slide
    nextButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const nextSlide = currentSlide.nextElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        const nextDot = currentDot.nextElementSibling;
        const nextIndex = slides.findIndex(slide => slide === nextSlide);

        if (nextSlide) {
            //move para o próximo slide
            moveToSlide(currentSlide, nextSlide);
            updateDots(currentDot, nextDot);
        }
    });

    prevButton.addEventListener('click', e => {
        const currentSlide = track.querySelector('.current-slide');
        const prevSlide = currentSlide.previousElementSibling;
        const currentDot = dotsNav.querySelector('.current-slide');
        const prevDot = currentDot.previousElementSibling;
        const prevIndex = slides.findIndex(slide => slide === prevSlide);

        if (prevSlide) {
            // move para o slide anterior
            moveToSlide(currentSlide, prevSlide);
            updateDots(currentDot, prevDot);
        }
    });

    dotsNav.addEventListener('click', e => {
        const targetDot = e.target.closest('button.carousel-indicator');

        if (!targetDot) return;

        const currentSlide = track.querySelector('.current-slide');
        const currentDot = dotsNav.querySelector('.current-slide');
        const targetIndex = dots.findIndex(dot => dot === targetDot);
        const targetSlide = slides[targetIndex];

        moveToSlide(currentSlide, targetSlide);
        updateDots(currentDot, targetDot);
    });

    // Reorganize o posicionamento dos slides para o JS funcionar
    const setSlidePosition = (slide, index) => {
        slide.style.left = slideWidth * index + 'px';
    };
    slides.forEach(setSlidePosition);
  }