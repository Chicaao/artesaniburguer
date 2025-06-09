 document.getElementById('currentYear').textContent = new Date().getFullYear();

  // --- Script para o Menu Hambúrguer ---
  const menuToggle = document.querySelector('.menu-toggle')
  const mainNav = document.querySelector('.main-nav')

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function() {
        mainNav.classList.toggle('is-open')

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
    })
  }