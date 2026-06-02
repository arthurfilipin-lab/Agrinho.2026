document.addEventListener('DOMContentLoaded', () => {
    
    // Elementos da Interface
    const header = document.getElementById('main-header');
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');

    /* ==========================================
       1. Controle do Menu Hambúrguer (Mobile)
       ========================================== */
    const toggleMenu = () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Fecha o menu ao clicar em qualquer link (estratégia comum para Single Pages)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMenu();
            }
        });
    });


    /* ==========================================
       2. Efeito Sticky Header (Mudar cor ao rolar)
       ========================================== */
    const handleHeaderScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleHeaderScroll);


    /* ==========================================
       3. Scroll Suave Fino com Ajuste de Header
       ========================================== */
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            
            // Verifica se o link aponta de fato para uma âncora interna
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    // Calcula a altura exata do header para não cobrir o título da seção
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
