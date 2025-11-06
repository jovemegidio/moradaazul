/**
 * Botão Scroll-to-Top Moderno
 * Funcionalidade avançada com animações suaves
 */

document.addEventListener('DOMContentLoaded', function() {
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    if (!scrollTopBtn) return;
    
    let scrollProgress = 0;
    let ticking = false;
    
    // Função para mostrar/ocultar o botão baseado no scroll
    function updateScrollTopButton() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        
        // Calcular progresso do scroll
        scrollProgress = scrollTop / (documentHeight - windowHeight);
        
        // Mostrar botão após 300px de scroll
        if (scrollTop > 300) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
        
        ticking = false;
    }
    
    // Throttle do scroll para performance
    function requestScrollUpdate() {
        if (!ticking) {
            requestAnimationFrame(updateScrollTopButton);
            ticking = true;
        }
    }
    
    // Event listener para scroll
    window.addEventListener('scroll', requestScrollUpdate, { passive: true });
    
    // Função de scroll suave ao topo
    function smoothScrollToTop() {
        const duration = 800;
        const start = window.pageYOffset;
        const startTime = performance.now();
        
        function scrollStep(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function (ease-out cubic)
            const easeOut = 1 - Math.pow(1 - progress, 3);
            
            window.scrollTo(0, start * (1 - easeOut));
            
            if (progress < 1) {
                requestAnimationFrame(scrollStep);
            }
        }
        
        requestAnimationFrame(scrollStep);
    }
    
    // Event listener para clique
    scrollTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Adicionar feedback visual
        this.style.transform = 'translateY(-1px) scale(0.95)';
        
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
        
        // Executar scroll suave
        smoothScrollToTop();
    });
    
    // Adicionar indicador de progresso (opcional)
    function createProgressIndicator() {
        const progressRing = document.createElement('div');
        progressRing.className = 'scroll-progress-ring';
        progressRing.innerHTML = `
            <svg width="56" height="56" viewBox="0 0 56 56">
                <circle 
                    cx="28" 
                    cy="28" 
                    r="26" 
                    stroke="rgba(255,255,255,0.2)" 
                    stroke-width="2" 
                    fill="transparent"
                />
                <circle 
                    cx="28" 
                    cy="28" 
                    r="26" 
                    stroke="#fff" 
                    stroke-width="2" 
                    fill="transparent"
                    stroke-dasharray="163.36"
                    stroke-dashoffset="163.36"
                    class="progress-circle"
                    style="transition: stroke-dashoffset 0.3s ease;"
                />
            </svg>
        `;
        
        // Inserir o anel de progresso
        scrollTopBtn.appendChild(progressRing);
        
        // Atualizar progresso
        function updateProgress() {
            const circle = progressRing.querySelector('.progress-circle');
            const circumference = 163.36;
            const offset = circumference - (scrollProgress * circumference);
            circle.style.strokeDashoffset = offset;
        }
        
        // Event listener para atualização do progresso
        const originalUpdate = updateScrollTopButton;
        updateScrollTopButton = function() {
            originalUpdate();
            updateProgress();
        };
        
        // CSS para o anel de progresso
        const style = document.createElement('style');
        style.textContent = `
            .scroll-progress-ring {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                transform: rotate(-90deg);
            }
            
            .scroll-top:hover .progress-circle {
                stroke: #e3f2fd;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Ativar indicador de progresso (descomente se desejar)
    // createProgressIndicator();
    
    // Adicionar suporte a teclado
    scrollTopBtn.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
    
    // Adicionar atributos de acessibilidade
    scrollTopBtn.setAttribute('aria-label', 'Voltar ao topo da página');
    scrollTopBtn.setAttribute('role', 'button');
    scrollTopBtn.setAttribute('tabindex', '0');
    
    // Inicializar
    updateScrollTopButton();
});