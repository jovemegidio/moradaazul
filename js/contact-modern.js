/* ===========================
   JAVASCRIPT PARA SEÇÃO DE CONTATO MODERNA
   Funcionalidades avançadas e validações
========================== */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===========================
    // VARIÁVEIS E ELEMENTOS
    // ===========================
    const contactForm = document.getElementById('modernContactForm');
    const submitBtn = document.getElementById('submitBtn');
    const inputs = document.querySelectorAll('.form-control-modern');
    const phoneInput = document.getElementById('telefone');
    
    // ===========================
    // MÁSCARAS DE ENTRADA
    // ===========================
    function addPhoneMask() {
        if (phoneInput) {
            phoneInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length >= 11) {
                    value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                } else if (value.length >= 7) {
                    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
                } else if (value.length >= 3) {
                    value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
                } else if (value.length >= 1) {
                    value = value.replace(/(\d{0,2})/, '($1');
                }
                
                e.target.value = value;
            });
        }
    }

    // ===========================
    // VALIDAÇÕES EM TEMPO REAL
    // ===========================
    function addRealTimeValidation() {
        inputs.forEach(input => {
            // Validação ao sair do campo
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Remover estados de erro ao digitar
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    this.classList.remove('error');
                    removeErrorMessage(this);
                }
            });
            
            // Efeito focus moderno
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (this.value === '') {
                    this.parentElement.classList.remove('focused');
                }
            });
        });
    }

    function validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        const fieldName = field.name;
        
        // Remover mensagens de erro anteriores
        removeErrorMessage(field);
        
        // Validação de campo obrigatório
        if (field.hasAttribute('required') && value === '') {
            showFieldError(field, 'Este campo é obrigatório');
            return false;
        }
        
        // Validações específicas
        switch (fieldType) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (value && !emailRegex.test(value)) {
                    showFieldError(field, 'Digite um e-mail válido');
                    return false;
                }
                break;
                
            case 'tel':
                const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
                if (value && !phoneRegex.test(value)) {
                    showFieldError(field, 'Digite um telefone válido');
                    return false;
                }
                break;
        }
        
        // Validações por nome do campo
        if (fieldName === 'nome' && value.length < 2) {
            showFieldError(field, 'Nome deve ter pelo menos 2 caracteres');
            return false;
        }
        
        if (fieldName === 'mensagem' && value.length < 10) {
            showFieldError(field, 'Mensagem deve ter pelo menos 10 caracteres');
            return false;
        }
        
        // Campo válido
        showFieldSuccess(field);
        return true;
    }

    function showFieldError(field, message) {
        field.classList.remove('success');
        field.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        errorDiv.style.cssText = `
            color: #e74c3c;
            font-size: 0.85rem;
            margin-top: 0.5rem;
            animation: fadeInError 0.3s ease;
        `;
        
        field.parentElement.appendChild(errorDiv);
    }

    function showFieldSuccess(field) {
        field.classList.remove('error');
        field.classList.add('success');
    }

    function removeErrorMessage(field) {
        const errorMsg = field.parentElement.querySelector('.error-message');
        if (errorMsg) {
            errorMsg.remove();
        }
    }

    // ===========================
    // ENVIO DO FORMULÁRIO MODERNO
    // ===========================
    function handleFormSubmit() {
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validar todos os campos
                let isValid = true;
                inputs.forEach(input => {
                    if (!validateField(input)) {
                        isValid = false;
                    }
                });
                
                if (isValid) {
                    submitFormWithAnimation();
                } else {
                    showFormError('Por favor, corrija os erros antes de enviar');
                    // Scroll para o primeiro erro
                    const firstError = document.querySelector('.form-control-modern.error');
                    if (firstError) {
                        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        firstError.focus();
                    }
                }
            });
        }
    }

    function submitFormWithAnimation() {
        // Botão de loading
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        const originalText = submitBtn.querySelector('span').textContent;
        submitBtn.querySelector('span').textContent = 'Enviando...';
        
        // Simular envio (substituir pela lógica real de envio)
        const formData = new FormData(contactForm);
        
        // Aqui você implementaria o envio real
        setTimeout(() => {
            showSuccessMessage();
            resetForm();
        }, 2000);
        
        // Para envio real com fetch:
        /*
        fetch('enviar_email.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showSuccessMessage();
                resetForm();
            } else {
                showFormError(data.message || 'Erro ao enviar mensagem');
            }
        })
        .catch(error => {
            showFormError('Erro de conexão. Tente novamente.');
        })
        .finally(() => {
            submitBtn.classList.remove('loading');
            submitBtn.disabled = false;
            submitBtn.querySelector('span').textContent = originalText;
        });
        */
    }

    function showSuccessMessage() {
        // Criar overlay de sucesso
        const successOverlay = document.createElement('div');
        successOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(37, 149, 145, 0.95);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            animation: fadeIn 0.5s ease;
        `;
        
        successOverlay.innerHTML = `
            <div style="
                background: white;
                padding: 3rem;
                border-radius: 20px;
                text-align: center;
                max-width: 400px;
                animation: scaleIn 0.5s ease;
            ">
                <div style="
                    width: 80px;
                    height: 80px;
                    background: #27ae60;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 1.5rem;
                ">
                    <i class="lni lni-checkmark" style="font-size: 2rem; color: white;"></i>
                </div>
                <h3 style="color: #2c3e50; margin-bottom: 1rem;">Mensagem enviada!</h3>
                <p style="color: #7f8c8d; margin-bottom: 2rem;">
                    Obrigado pelo contato. Retornaremos em breve!
                </p>
                <button onclick="this.parentElement.parentElement.remove()" style="
                    background: var(--gradient-primary);
                    border: none;
                    padding: 0.8rem 2rem;
                    border-radius: 10px;
                    color: white;
                    font-weight: 600;
                    cursor: pointer;
                ">Fechar</button>
            </div>
        `;
        
        document.body.appendChild(successOverlay);
        
        // Remover automaticamente após 5 segundos
        setTimeout(() => {
            if (successOverlay.parentElement) {
                successOverlay.remove();
            }
        }, 5000);
    }

    function showFormError(message) {
        // Criar notificação de erro
        const errorNotification = document.createElement('div');
        errorNotification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #e74c3c;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            z-index: 9999;
            animation: slideInRight 0.5s ease;
            max-width: 300px;
        `;
        errorNotification.textContent = message;
        
        document.body.appendChild(errorNotification);
        
        setTimeout(() => {
            errorNotification.remove();
        }, 5000);
    }

    function resetForm() {
        contactForm.reset();
        inputs.forEach(input => {
            input.classList.remove('error', 'success');
            input.parentElement.classList.remove('focused');
            removeErrorMessage(input);
        });
        
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        submitBtn.querySelector('span').textContent = 'Enviar mensagem';
    }

    // ===========================
    // ANIMAÇÕES CUSTOMIZADAS CSS
    // ===========================
    function addCustomAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInError {
                from { opacity: 0; transform: translateY(-10px); }
                to { opacity: 1; transform: translateY(0); }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes scaleIn {
                from { transform: scale(0.8); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
            }
            
            @keyframes slideInRight {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
            }
            
            .form-group-modern.focused label {
                color: var(--primary-color);
                font-weight: 600;
            }
        `;
        document.head.appendChild(style);
    }

    // ===========================
    // INICIALIZAÇÃO
    // ===========================
    function init() {
        addPhoneMask();
        addRealTimeValidation();
        handleFormSubmit();
        addCustomAnimations();
        
        // Adicionar classes para campos já preenchidos
        inputs.forEach(input => {
            if (input.value !== '') {
                input.parentElement.classList.add('focused');
            }
        });
    }

    // Inicializar todas as funcionalidades
    init();
    
    // ===========================
    // UTILS EXTRAS
    // ===========================
    
    // Contador de caracteres para textarea
    const messageTextarea = document.getElementById('mensagem');
    if (messageTextarea) {
        const charCounter = document.createElement('div');
        charCounter.style.cssText = `
            text-align: right;
            font-size: 0.8rem;
            color: #7f8c8d;
            margin-top: 0.5rem;
        `;
        messageTextarea.parentElement.appendChild(charCounter);
        
        messageTextarea.addEventListener('input', function() {
            const count = this.value.length;
            charCounter.textContent = `${count}/500 caracteres`;
            
            if (count > 500) {
                charCounter.style.color = '#e74c3c';
            } else {
                charCounter.style.color = '#7f8c8d';
            }
        });
    }
    
    // Auto-resize para textarea
    if (messageTextarea) {
        messageTextarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
});

// ===========================
// FUNÇÕES GLOBAIS UTILITÁRIAS
// ===========================

// Função para validar CPF (caso necessário)
function validateCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    
    let sum = 0;
    for (let i = 0; i < 9; i++) {
        sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let digit = 11 - (sum % 11);
    if (digit === 10 || digit === 11) digit = 0;
    if (digit !== parseInt(cpf.charAt(9))) return false;
    
    sum = 0;
    for (let i = 0; i < 10; i++) {
        sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    digit = 11 - (sum % 11);
    if (digit === 10 || digit === 11) digit = 0;
    if (digit !== parseInt(cpf.charAt(10))) return false;
    
    return true;
}

// Função para detectar dispositivo móvel
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}