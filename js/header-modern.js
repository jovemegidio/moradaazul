/* ===========================
   JAVASCRIPT PARA HEADER MODERNO
   Navegação inteligente e efeitos avançados
========================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================
    // VARIÁVEIS E ELEMENTOS
    // ===========================
    const header = document.getElementById('headerModern');
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const sections = document.querySelectorAll('section[id]');
    
    let lastScrollTop = 0;
    let isScrolling = false;
    
    // ===========================
    // EFEITO DE SCROLL NO HEADER
    // ===========================
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Calcular opacidade baseada no scroll
        const maxScroll = 300;
        const scrollProgress = Math.min(scrollTop / maxScroll, 1);
        const initialOpacity = 0.75;
        const finalOpacity = 0.95;
        const currentOpacity = initialOpacity + (finalOpacity - initialOpacity) * scrollProgress;
        
        // Aplicar efeito de transparência gradual
        if (scrollTop > 50) {
            header.classList.add('scrolled');
            header.style.background = `rgba(255, 255, 255, ${currentOpacity})`;
        } else {
            header.classList.remove('scrolled');
            header.style.background = `rgba(255, 255, 255, ${initialOpacity})`;
        }
        
        // Header sempre visível - código de ocultar/mostrar removido
        // Mantém o header fixo e sempre visível
        header.style.transform = 'translateY(0)';
        
        lastScrollTop = scrollTop;
        
        // Atualizar progresso do scroll
        updateScrollProgress();
        
        // Atualizar navegação ativa
        updateActiveNavigation();
    }
    
    // Throttle para otimizar performance
    function throttledScroll() {
        if (!isScrolling) {
            requestAnimationFrame(() => {
                handleScroll();
                isScrolling = false;
            });
            isScrolling = true;
        }
    }
    
    window.addEventListener('scroll', throttledScroll);
    
    // ===========================
    // BARRA DE PROGRESSO DO SCROLL
    // ===========================
    function updateScrollProgress() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        
        let progressBar = document.querySelector('.scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.className = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 79px;
                left: 0;
                width: 0%;
                height: 3px;
                background: var(--gradient-primary);
                z-index: 9999;
                transition: width 0.1s ease;
            `;
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = `${Math.min(scrollPercent, 100)}%`;
    }
    
    // ===========================
    // NAVEGAÇÃO ATIVA INTELIGENTE
    // ===========================
    function updateActiveNavigation() {
        let current = '';
        const scrollPosition = window.pageYOffset + 100;
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        // Atualizar links ativos
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // ===========================
    // NAVEGAÇÃO SUAVE
    // ===========================
    function initSmoothNavigation() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    // Fechar menu mobile se estiver aberto
                    closeMobileMenu();
                    
                    // Scroll suave
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Atualizar URL sem recarregar página
                    history.pushState(null, null, targetId);
                    
                    // Adicionar efeito de destaque na seção
                    highlightSection(targetSection);
                }
            });
        });
    }
    
    function highlightSection(section) {
        section.style.transition = 'background-color 0.3s ease';
        section.style.backgroundColor = 'rgba(37, 149, 145, 0.05)';
        
        setTimeout(() => {
            section.style.backgroundColor = '';
            setTimeout(() => {
                section.style.transition = '';
            }, 300);
        }, 1000);
    }
    
    // ===========================
    // MENU MOBILE
    // ===========================
    function openMobileMenu() {
        mobileMenuOverlay.classList.add('active');
        mobileMenuToggle.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animar links do menu mobile
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach((link, index) => {
            link.style.opacity = '0';
            link.style.transform = 'translateX(-30px)';
            setTimeout(() => {
                link.style.transition = 'all 0.3s ease';
                link.style.opacity = '1';
                link.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }
    
    function closeMobileMenu() {
        mobileMenuOverlay.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset animações
        const mobileLinks = document.querySelectorAll('.mobile-nav-link');
        mobileLinks.forEach(link => {
            link.style.transition = '';
            link.style.opacity = '';
            link.style.transform = '';
        });
    }
    
    // Event listeners para menu mobile
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', function() {
            if (mobileMenuOverlay.classList.contains('active')) {
                closeMobileMenu();
            } else {
                openMobileMenu();
            }
        });
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }
    
    // Fechar menu ao clicar fora
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                closeMobileMenu();
            }
        });
    }
    
    // Fechar menu com ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenuOverlay.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // ===========================
    // EFEITOS VISUAIS AVANÇADOS
    // ===========================
    function initAdvancedEffects() {
        // Logo fixa - efeito parallax removido para manter a logo estática
        
        // Efeito de hover nos links de navegação
        const navLinksDesktop = document.querySelectorAll('.nav-link');
        navLinksDesktop.forEach(link => {
            link.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
        
        // Efeito ripple no botão WhatsApp
        const whatsappBtn = document.querySelector('.whatsapp-btn');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', function(e) {
                createRipple(e, this);
            });
        }
    }
    
    function createRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // ===========================
    // DETECÇÃO DE SEÇÃO ATIVA
    // ===========================
    function initSectionObserver() {
        const observerOptions = {
            threshold: 0.3,
            rootMargin: '-80px 0px -80px 0px'
        };
        
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.getAttribute('id');
                    updateActiveLink(sectionId);
                }
            });
        }, observerOptions);
        
        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    }
    
    function updateActiveLink(activeSectionId) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === `#${activeSectionId}`) {
                link.classList.add('active');
            }
        });
    }
    
    // ===========================
    // MODO ESCURO (FUTURO)
    // ===========================
    function initDarkModeToggle() {
        // Placeholder para futuras implementações de modo escuro
        const darkModeBtn = document.querySelector('.dark-mode-toggle');
        if (darkModeBtn) {
            darkModeBtn.addEventListener('click', function() {
                document.body.classList.toggle('dark-mode');
                localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
            });
        }
        
        // Verificar preferência salva
        if (localStorage.getItem('darkMode') === 'true') {
            document.body.classList.add('dark-mode');
        }
    }
    
    // ===========================
    // OTIMIZAÇÃO DE PERFORMANCE
    // ===========================
    function optimizePerformance() {
        // Preload de imagens críticas
        const criticalImages = [
            'img/morada-azul00.webp'
        ];
        
        criticalImages.forEach(src => {
            const img = new Image();
            img.src = src;
        });
        
        // Lazy loading para elementos não críticos
        if ('IntersectionObserver' in window) {
            const lazyElements = document.querySelectorAll('[data-lazy]');
            const lazyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        element.src = element.dataset.lazy;
                        element.removeAttribute('data-lazy');
                        lazyObserver.unobserve(element);
                    }
                });
            });
            
            lazyElements.forEach(element => {
                lazyObserver.observe(element);
            });
        }
    }
    
    // ===========================
    // ADICIONAR ESTILOS DINÂMICOS
    // ===========================
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            .header-modern {
                will-change: transform;
            }
            
            .nav-link {
                will-change: transform;
            }
            
            /* Scroll behavior suave para navegadores que não suportam */
            html {
                scroll-behavior: smooth;
            }
            
            /* Ajuste específico para primeira seção */
            #home {
                padding-top: 80px;
            }
            
            @media (max-width: 768px) {
                #home {
                    padding-top: 70px;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===========================
    // INICIALIZAÇÃO
    // ===========================
    function init() {
        addDynamicStyles();
        initSmoothNavigation();
        initAdvancedEffects();
        initSectionObserver();
        initDarkModeToggle();
        optimizePerformance();
        
        // Executar uma vez para configurar estado inicial
        handleScroll();
        
        // Marcar header como carregado
        setTimeout(() => {
            header.classList.add('loaded');
        }, 100);
    }
    
    // Inicializar todas as funcionalidades
    init();
    
    // ===========================
    // EVENTOS DE REDIMENSIONAMENTO
    // ===========================
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Fechar menu mobile em telas grandes
            if (window.innerWidth > 992) {
                closeMobileMenu();
            }
            
            // Recalcular posições se necessário
            updateActiveNavigation();
        }, 250);
    });
    
    // ===========================
    // TRATAMENTO DE ERROS
    // ===========================
    window.addEventListener('error', function(e) {
        console.warn('Header: Erro capturado:', e.message);
    });
    
    // ===========================
    // FALLBACK PARA NAVEGADORES ANTIGOS
    // ===========================
    if (!('IntersectionObserver' in window)) {
        // Fallback para navegadores sem suporte a IntersectionObserver
        console.warn('IntersectionObserver não suportado, usando fallback');
        window.addEventListener('scroll', throttledScroll);
    }
});