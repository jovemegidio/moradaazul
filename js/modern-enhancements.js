/* ===========================
   JAVASCRIPT PARA MELHORIAS VISUAIS MODERNAS
   Espaço Terapêutico Morada Azul
========================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================
    // OBSERVADOR DE SCROLL PARA ANIMAÇÕES
    // ===========================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);

    // Observar todos os elementos com animação
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // ===========================
    // EFEITO PARALLAX SUAVE
    // ===========================
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        const backgrounds = document.querySelectorAll('.modern-container::before');
        
        backgrounds.forEach(bg => {
            bg.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    }

    // ===========================
    // HOVER EFFECTS PARA CARDS
    // ===========================
    function addCardHoverEffects() {
        const cards = document.querySelectorAll('.feature-box-modern, .timeline-card-modern, .portfolio-item-wrapper-modern, .contact-item-modern');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
                this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    // ===========================
    // EFEITO TYPEWRITER PARA TÍTULOS
    // ===========================
    function typewriterEffect(element, text, speed = 100) {
        element.innerHTML = '';
        let i = 0;
        
        function typeChar() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeChar, speed);
            }
        }
        
        typeChar();
    }

    // ===========================
    // ANIMAÇÃO DE NÚMEROS (CONTADOR)
    // ===========================
    function animateNumbers() {
        const counters = document.querySelectorAll('.count');
        
        counters.forEach(counter => {
            const updateCounter = () => {
                const target = parseInt(counter.getAttribute('cup-end'));
                const current = parseInt(counter.innerText);
                const increment = target / 100;
                
                if (current < target) {
                    counter.innerText = Math.ceil(current + increment);
                    setTimeout(updateCounter, 30);
                } else {
                    counter.innerText = target + (counter.getAttribute('cup-append') || '');
                }
            };
            
            // Iniciar animação quando o elemento entrar na tela
            const counterObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        updateCounter();
                        counterObserver.unobserve(entry.target);
                    }
                });
            });
            
            counterObserver.observe(counter);
        });
    }

    // ===========================
    // SMOOTH SCROLL APRIMORADO
    // ===========================
    function smoothScrollLinks() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const headerHeight = document.querySelector('.navbar-area').offsetHeight;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===========================
    // VALIDAÇÃO VISUAL DO FORMULÁRIO
    // ===========================
    function enhanceFormValidation() {
        const formInputs = document.querySelectorAll('.form-control-modern');
        
        formInputs.forEach(input => {
            // Adicionar efeito de foco
            input.addEventListener('focus', function() {
                this.style.borderColor = 'var(--primary-color)';
                this.style.boxShadow = '0 0 0 3px rgba(37, 149, 145, 0.1)';
            });
            
            input.addEventListener('blur', function() {
                if (this.value.trim() === '') {
                    this.style.borderColor = 'rgba(37, 149, 145, 0.1)';
                    this.style.boxShadow = 'none';
                } else {
                    this.style.borderColor = '#28a745';
                    this.style.boxShadow = '0 0 0 3px rgba(40, 167, 69, 0.1)';
                }
            });
            
            // Validação em tempo real
            input.addEventListener('input', function() {
                if (this.type === 'email') {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (emailRegex.test(this.value)) {
                        this.style.borderColor = '#28a745';
                    } else {
                        this.style.borderColor = '#dc3545';
                    }
                }
            });
        });
    }

    // ===========================
    // EFEITO DE LOADING PARA BOTÕES
    // ===========================
    function addButtonLoadingEffect() {
        const buttons = document.querySelectorAll('.theme-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                if (this.type === 'submit') {
                    this.innerHTML = '<i class="lni lni-spinner-solid" style="animation: spin 1s linear infinite; margin-right: 0.5rem;"></i>Enviando...';
                    this.disabled = true;
                    
                    // Simular loading (remover em produção se não necessário)
                    setTimeout(() => {
                        this.innerHTML = '<i class="lni lni-checkmark-circle" style="margin-right: 0.5rem;"></i>Enviado!';
                        this.style.background = '#28a745';
                    }, 2000);
                }
            });
        });
    }

    // ===========================
    // CURSOR PERSONALIZADO
    // ===========================
    function createCustomCursor() {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
            opacity: 0;
        `;
        document.body.appendChild(cursor);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX - 10 + 'px';
            cursor.style.top = e.clientY - 10 + 'px';
            cursor.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = '0';
        });
        
        // Efeito hover em elementos interativos
        const interactiveElements = document.querySelectorAll('a, button, .feature-box-modern, .portfolio-item-wrapper-modern');
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(2)';
                cursor.style.background = 'var(--secondary-color)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                cursor.style.background = 'var(--primary-color)';
            });
        });
    }

    // ===========================
    // EFEITO DE PARTÍCULAS INTERATIVAS
    // ===========================
    function createInteractiveParticles() {
        const particleContainers = document.querySelectorAll('.particles-background');
        
        particleContainers.forEach(container => {
            container.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    width: 4px;
                    height: 4px;
                    background: var(--primary-color);
                    border-radius: 50%;
                    opacity: 0.7;
                    pointer-events: none;
                    animation: particleFloat 2s ease-out forwards;
                `;
                
                this.appendChild(particle);
                
                setTimeout(() => {
                    particle.remove();
                }, 2000);
            });
        });
    }

    // ===========================
    // NAVBAR SCROLL EFFECT
    // ===========================
    function enhanceNavbarScroll() {
        const navbar = document.querySelector('.navbar-area');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                navbar.classList.add('navbar-scrolled');
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            } else {
                navbar.classList.remove('navbar-scrolled');
                navbar.style.backdropFilter = 'none';
                navbar.style.background = 'white';
            }
            
            // Auto-hide navbar on scroll down
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // ===========================
    // INICIALIZAR TODAS AS FUNÇÕES
    // ===========================
    function initializeEnhancements() {
        addCardHoverEffects();
        animateNumbers();
        smoothScrollLinks();
        enhanceFormValidation();
        addButtonLoadingEffect();
        createCustomCursor();
        createInteractiveParticles();
        enhanceNavbarScroll();
        
        // Adicionar CSS personalizado para animações
        const style = document.createElement('style');
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            
            @keyframes particleFloat {
                0% {
                    transform: translateY(0) scale(1);
                    opacity: 0.7;
                }
                100% {
                    transform: translateY(-50px) scale(0);
                    opacity: 0;
                }
            }
            
            .navbar-area {
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            }
            
            .feature-box-modern,
            .timeline-card-modern,
            .portfolio-item-wrapper-modern,
            .contact-item-modern {
                cursor: pointer;
            }
            
            .form-control-modern:focus {
                outline: none !important;
            }
            
            .theme-btn:disabled {
                opacity: 0.7;
                cursor: not-allowed;
            }
        `;
        document.head.appendChild(style);
    }

    // ===========================
    // PERFORMANCE OPTIMIZATION
    // ===========================
    let ticking = false;
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(handleParallax);
            ticking = true;
            setTimeout(() => { ticking = false; }, 16);
        }
    });

    // Inicializar tudo
    initializeEnhancements();
    
    // Reinicializar animações após carregamento completo
    window.addEventListener('load', function() {
        setTimeout(() => {
            const elements = document.querySelectorAll('.animate-on-scroll');
            elements.forEach(element => {
                if (element.getBoundingClientRect().top < window.innerHeight) {
                    element.classList.add('animated');
                }
            });
        }, 500);
    });
});

// ===========================
// SERVICE WORKER PARA PWA (OPCIONAL)
// ===========================
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(function(registration) {
                console.log('ServiceWorker registration successful');
            })
            .catch(function(err) {
                console.log('ServiceWorker registration failed');
            });
    });
}