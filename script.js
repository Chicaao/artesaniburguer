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
    const track = carousel.querySelector('.carousel-track');
    const prevButton = carousel.querySelector('.carousel-button--left');
    const nextButton = carousel.querySelector('.carousel-button--right');
    const dotsNav = carousel.querySelector('.carousel-nav');

    if (track && prevButton && nextButton && dotsNav) {
        const slides = Array.from(track.children);
        const dots = Array.from(dotsNav.children);

         // Função centralizada para mover para um slide específico
        const moveToSlide = (targetIndex) => {
            const currentSlide = track.querySelector('.current-slide'); 
            const currentDot = dotsNav.querySelector('.current-slide');
            const targetSlide = slides[targetIndex];
            const targetDot = dots[targetIndex];
            
            if (!targetSlide || !targetDot) return;

            // Calcula a posição do slide alvo e move o trilho
            const amountToMove = targetSlide.offsetLeft;
            track.style.transform = 'translateX(-' + amountToMove + 'px)';

             // Atualiza as classes nos slides e nos pontos
            currentSlide.classList.remove('current-slide');
            targetSlide.classList.add('current-slide');
            currentDot.classList.remove('current-slide')
            targetDot.classList.add('current-slide')
        };
      
        // Evento para o botão "Próximo"
        nextButton.addEventListener('click', () => {
            const currentSlide = track.querySelector('.current-slide');
            let nextIndex = slides.findIndex(slide => slide === currentSlide) + 1;
            if (nextIndex >= slides.length)  {
                nextIndex = 0; // Volta para o início
            }
            moveToSlide(nextIndex); 
        });

        // Evento para o botão "Anterior"
        prevButton.addEventListener('click', () => {
            const currentSlide = track.querySelector('.current-slide');
            let prevIndex = slides.findIndex(slide => slide === currentSlide) - 1;
            if (prevIndex < 0) {
                prevIndex = slides.length -1; // Vai para o fim
            }
                moveToSlide(prevIndex);
        });

        // Evento para os pontos de navegação
        dotsNav.addEventListener('click', e => {
            const targetDot = e.target.closest('button.carousel-indicator');
            if (!targetDot) return;
            const targetIndex = dots.findIndex(dot => dot === targetDot);
            moveToSlide(targetIndex);
        });

        // --- Lógica de toque / swipe ---
        let isDragging = false, startPos = 0, currentTranslate = 0, prevTranslate = 0, animationID;

        slides.forEach((slide, index) => {

            // Eventos de toque
            slide.addEventListener('touchstart', touchStart);
            slide.addEventListener('touchend', touchEnd);
            slide.addEventListener('touchmove', touchMove);

            // Eventos de mouse
            slide.addEventListener('mousedown', touchStart);
            slide.addEventListener('mouseup', touchEnd);
            slide.addEventListener('mouseleave', touchEnd);
            slide.addEventListener('mousemove', touchMove);
        });

        function touchStart(event) {
            if (event.type.includes('mouse')) event.preventDefault();
            isDragging = true;
            startPos = getPositionX(event);
            track.style.transition = 'none';
            const transformMatrix = window.getComputedStyle(track).transform;
            if (transformMatrix !== 'none') {
                prevTranslate = parseInt(transformMatrix.split(',')[4].trim());
            } else {
                prevTranslate = 0;
            }
        }

        function touchMove(event) {
            if (isDragging) {
                const currentPosition = getPositionX(event);
                currentTranslate = prevTranslate + currentPosition - startPos;
                track.style.transform = `translateX(${currentTranslate}px)`;
            }
        }

        function touchEnd() {
            if (!isDragging) return;
            isDragging = false;

            const movedBy = currentTranslate - prevTranslate;
            track.style.transition = 'transform 0.5s ease-in-out';

            // Se o arrasto for maior que 50px, muda de slide
            if (movedBy < -50) {
                nextButton.click();
            } else if (movedBy > 50) {
                prevButton.click();
            } else {
                track.style.transform = `translateX(${prevTranslate}px)`;
            }

        }

        function getPositionX(event) {
            return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        }
    }

  }