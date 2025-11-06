/* ===========================
   JAVASCRIPT PARA FOOTER MODERNO
   Interações e Animações Avançadas
========================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================
    // VARIÁVEIS E ELEMENTOS
    // ===========================
    const footer = document.querySelector('.footer-modern');
    const socialLinks = document.querySelectorAll('.social-link');
    const contactItems = document.querySelectorAll('.contact-item');
    const footerLinks = document.querySelectorAll('.footer-links-modern a');
    
    // ===========================
    // ANIMAÇÃO DE ENTRADA DO FOOTER
    // ===========================
    function initFooterAnimations() {
        // Observador de interseção para animar quando o footer entra na tela
        const footerObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('footer-animate-in');
                    animateFooterElements();
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });
        
        if (footer) {
            footerObserver.observe(footer);
        }
    }
    
    function animateFooterElements() {
        // Animar widgets do footer com delay escalonado
        const widgets = document.querySelectorAll('.footer-widget-modern');
        widgets.forEach((widget, index) => {
            setTimeout(() => {
                widget.style.opacity = '1';
                widget.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // ===========================
    // EFEITOS DE HOVER AVANÇADOS
    // ===========================
    function initHoverEffects() {
        // Efeito ripple para links sociais
        socialLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                createRippleEffect(e, this);
            });
            
            // Efeito de paralaxe suave
            link.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const deltaX = (x - centerX) / centerX;
                const deltaY = (y - centerY) / centerY;
                
                this.style.transform = `perspective(1000px) rotateX(${deltaY * 5}deg) rotateY(${deltaX * 5}deg) translateZ(10px)`;
            });
            
            link.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
            });
        });
        
        // Efeitos para itens de contato
        contactItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.boxShadow = '0 15px 35px rgba(37, 149, 145, 0.2)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.boxShadow = '';
            });
        });
    }
    
    function createRippleEffect(event, element) {
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
            animation: rippleAnimation 0.6s ease-out;
            pointer-events: none;
        `;
        
        element.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }
    
    // ===========================
    // NAVEGAÇÃO SUAVE
    // ===========================
    function initSmoothNavigation() {
        footerLinks.forEach(link => {
            const href = link.getAttribute('href');
            
            // Navegação suave para âncoras internas
            if (href && href.startsWith('#')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetElement = document.querySelector(href);
                    if (targetElement) {
                        const headerHeight = document.querySelector('header')?.offsetHeight || 0;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                        
                        // Adicionar classe de destaque temporário
                        targetElement.classList.add('highlight-section');
                        setTimeout(() => {
                            targetElement.classList.remove('highlight-section');
                        }, 2000);
                    }
                });
            }
        });
    }
    
    // ===========================
    // PARTÍCULAS FLUTUANTES
    // ===========================
    function createFloatingParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'footer-particles';
        particlesContainer.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
        `;
        
        footer.appendChild(particlesContainer);
        
        // Criar partículas
        for (let i = 0; i < 15; i++) {
            setTimeout(() => {
                createParticle(particlesContainer);
            }, i * 300);
        }
        
        // Recriar partículas periodicamente
        setInterval(() => {
            if (particlesContainer.children.length < 15) {
                createParticle(particlesContainer);
            }
        }, 2000);
    }
    
    function createParticle(container) {
        const particle = document.createElement('div');
        const size = Math.random() * 6 + 2;
        const startX = Math.random() * 100;
        const duration = Math.random() * 20000 + 15000;
        
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: radial-gradient(circle, rgba(37, 149, 145, 0.6) 0%, rgba(37, 149, 145, 0.1) 70%, transparent 100%);
            border-radius: 50%;
            left: ${startX}%;
            bottom: 0;
            animation: floatUp ${duration}ms linear infinite;
            opacity: 0;
        `;
        
        container.appendChild(particle);
        
        // Remover partícula após animação
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, duration);
    }
    
    // ===========================
    // EFEITO DE TYPING PARA COPYRIGHT
    // ===========================
    function initTypingEffect() {
        const copyrightElement = document.querySelector('.footer-copyright p');
        if (copyrightElement) {
            const originalText = copyrightElement.textContent;
            copyrightElement.textContent = '';
            
            let index = 0;
            const typingInterval = setInterval(() => {
                if (index < originalText.length) {
                    copyrightElement.textContent += originalText.charAt(index);
                    index++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 50);
        }
    }
    
    // ===========================
    // CONTADOR DE VISITANTES (SIMULADO)
    // ===========================
    function addVisitorCounter() {
        const footerBottom = document.querySelector('.footer-bottom .container .row');
        if (footerBottom) {
            const counterDiv = document.createElement('div');
            counterDiv.className = 'col-12 text-center mt-3';
            counterDiv.innerHTML = `
                <div class="visitor-counter" style="
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 12px;
                    border-top: 1px solid rgba(255, 255, 255, 0.1);
                    padding-top: 15px;
                ">
                    <span id="visitorCount">Carregando...</span> visitantes únicos
                </div>
            `;
            
            footerBottom.appendChild(counterDiv);
            
            // Simular contador
            setTimeout(() => {
                const count = Math.floor(Math.random() * 5000) + 10000;
                document.getElementById('visitorCount').textContent = count.toLocaleString();
                animateCounter(count);
            }, 1000);
        }
    }
    
    function animateCounter(finalCount) {
        const counterElement = document.getElementById('visitorCount');
        let currentCount = 0;
        const increment = finalCount / 100;
        
        const counterInterval = setInterval(() => {
            currentCount += increment;
            if (currentCount >= finalCount) {
                counterElement.textContent = finalCount.toLocaleString();
                clearInterval(counterInterval);
            } else {
                counterElement.textContent = Math.floor(currentCount).toLocaleString();
            }
        }, 20);
    }
    
    // ===========================
    // EFEITO DE PARALLAX NO BACKGROUND
    // ===========================
    function initParallaxEffect() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const footerTop = footer.getBoundingClientRect().top + window.pageYOffset;
            
            if (scrolled > footerTop - window.innerHeight) {
                const parallaxSpeed = (scrolled - (footerTop - window.innerHeight)) * 0.1;
                footer.style.backgroundPosition = `center ${parallaxSpeed}px`;
            }
        });
    }
    
    // ===========================
    // ADICIONAR ESTILOS CSS DINÂMICOS
    // ===========================
    function addDynamicStyles() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rippleAnimation {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            @keyframes floatUp {
                0% {
                    opacity: 0;
                    transform: translateY(0) rotate(0deg);
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    opacity: 0;
                    transform: translateY(-100vh) rotate(360deg);
                }
            }
            
            .footer-widget-modern {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1);
            }
            
            .highlight-section {
                background: rgba(37, 149, 145, 0.1);
                transition: background 0.3s ease;
                border-radius: 10px;
                padding: 20px;
            }
            
            .footer-animate-in .footer-widget-modern {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    // ===========================
    // INICIALIZAÇÃO
    // ===========================
    function init() {
        addDynamicStyles();
        initFooterAnimations();
        initHoverEffects();
        initSmoothNavigation();
        createFloatingParticles();
        initTypingEffect();
        addVisitorCounter();
        initParallaxEffect();
        
        // Adicionar classe de carregamento completo
        setTimeout(() => {
            footer.classList.add('footer-loaded');
        }, 500);
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
            // Reajustar efeitos baseados no tamanho da tela
            const isMobile = window.innerWidth <= 768;
            
            socialLinks.forEach(link => {
                if (isMobile) {
                    link.style.transform = 'none';
                }
            });
        }, 250);
    });
    
    // ===========================
    // PREVENÇÃO DE SPAM EM LINKS DE CONTATO
    // ===========================
    const contactLinks = document.querySelectorAll('.contact-details a');
    contactLinks.forEach(link => {
        let clickCount = 0;
        let lastClickTime = 0;
        
        link.addEventListener('click', function(e) {
            const currentTime = Date.now();
            
            if (currentTime - lastClickTime < 1000) {
                clickCount++;
                if (clickCount > 3) {
                    e.preventDefault();
                    
                    // Mostrar mensagem temporária
                    const message = document.createElement('div');
                    message.style.cssText = `
                        position: fixed;
                        top: 20px;
                        right: 20px;
                        background: rgba(231, 76, 60, 0.9);
                        color: white;
                        padding: 10px 20px;
                        border-radius: 5px;
                        z-index: 9999;
                        font-size: 14px;
                    `;
                    message.textContent = 'Aguarde um momento antes de clicar novamente';
                    document.body.appendChild(message);
                    
                    setTimeout(() => {
                        message.remove();
                        clickCount = 0;
                    }, 3000);
                    
                    return;
                }
            } else {
                clickCount = 1;
            }
            
            lastClickTime = currentTime;
        });
    });
});