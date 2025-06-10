 document.getElementById('currentYear').textContent = new Date().getFullYear();

  // --- Script para o Menu Hambúrguer ---
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('is-open');

        const isExpanded = mainNav.classList.contains('is-open');
        menuToggle.setAttribute('aria-expanded', isExpanded);

        const icon = menuToggle.querySelector('i');

        if (isExpanded) {

            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times')
        } else {

            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
  }

  const carousel = document.querySelector('.carousel');

  if (carousel) {
    const track = document.querySelector('.carousel-track');
    const prevButton = document.querySelector('.carousel-button--left');
    const nextButton = document.querySelector('.carousel-button--right');
    const dotsNav = document.querySelector('.carousel-nav');

    if (track && prevButton && nextButton && dotsNav) {
        const slides = Array.from(track.children);
        const dots = Array.from(dotsNav.children);

        const moveToSlide = (targetSlide) => {
            if (!targetSlide) return;

            const amountToMove = targetSlide.offsetLeft;
            track.style.transform = 'translateX(-' + amountToMove + 'px)';

            // Atualiza a classe .current-slide nos slides
            const currentSlide = track.querySelector('.current-slide');
            currentSlide.classList.remove('.current-slide');
            targetSlide.classList.add('.current-slide');

             // Atualiza a classe .current-slide nos pontos de navegação
            const currentDot = dotsNav.querySelector('.current-slide');
            const targetIndex = slides.findIndex(slide => slide === targetSlide);
            const targetDot = dots[targetIndex];

            currentDot.classList.remove('.current-slide')
            targetDot.classList.add('.current-slide')
        };

        // Evento para o botão "Próximo"
        nextButton.addEventListener('click', () => {
            const currentSlide = track.querySelector('.current-slide');
            const nextSlide = currentSlide.nextElementSibling;

           // Se não houver próximo slide, volta para o primeiro (carrossel infinito)
           if (nextSlide)  {
            moveToSlide(nextSlide);
           } else {
            moveToSlide(slides[0]); // Volta para o início
           }
        });

        // Evento para o botão "Anterior"
        prevButton.addEventListener('click', () => {
            const currentSlide = track.querySelector('.current-slide');
            const prevSlide = currentSlide.previousElementSibling;

            // Se não houver slide anterior, vai para o último (carrossel infinito)
            if (prevSlide) {
                moveToSlide(prevSlide);
            } else {
                moveToSlide(slides[slides.length - 1]);
            }
        });

        // Evento para os pontos de navegação
        dotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('button.carousel-indicator');

            if (!targetDot) return;

            const targetIndex = dots.findIndex(dot => dot === targetDot);
            const targetSlide = slides[targetIndex];

            moveToSlide(targetSlide);
        });
    }

  }