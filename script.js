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
            icon.classList.add('fa-xmark')
        } else {
            console.log('Tentando trocar para o ícone de barras (fa-bars)');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-xmark');
        }
    })
  }