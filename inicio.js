// Wayfinding Digital - H. Ayuntamiento de Atizapán de Zaragoza
// inicio.js

document.addEventListener('DOMContentLoaded', function() {
    console.log('🏛️ Sistema de Wayfinding Digital - H. Ayuntamiento de Atizapán de Zaragoza');
    
    // Inicialización
    initializeWayfinding();
    setupEventListeners();
    addAccessibilityFeatures();
    
    // Mostrar mensaje de bienvenida después de las animaciones
    setTimeout(() => {
        console.log('✨ Sistema listo para la navegación');
    }, 2000);
});

/**
 * Inicializa el sistema de wayfinding
 */
function initializeWayfinding() {
    // Configurar efectos visuales
    setupVisualEffects();
    
    // Configurar animaciones de entrada
    setupEntryAnimations();
    
    // Verificar compatibilidad del navegador
    checkBrowserCompatibility();
}

/**
 * Configura los event listeners para los botones
 */
function setupEventListeners() {
    const levelButtons = document.querySelectorAll('.level-button');
    
    levelButtons.forEach((button, index) => {
        // Click para navegación
        button.addEventListener('click', handleLevelNavigation);
        
        // Efectos hover mejorados
        button.addEventListener('mouseenter', handleButtonHover);
        button.addEventListener('mouseleave', handleButtonLeave);
        
        // Soporte para teclado (accesibilidad)
        button.addEventListener('keydown', handleKeyNavigation);
        
        // Efectos táctiles para dispositivos móviles
        button.addEventListener('touchstart', handleTouchStart, { passive: true });
        button.addEventListener('touchend', handleTouchEnd, { passive: true });
        
        console.log(`🔘 Botón configurado: ${button.dataset.level}`);
    });
    
    // Event listener para el logo (easter egg)
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', handleLogoClick);
    }
}

/**
 * Maneja la navegación entre niveles
 */
function handleLevelNavigation(event) {
    const button = event.currentTarget;
    const level = button.dataset.level;
    
    console.log(`🎯 Navegando a: ${level}`);
    
    // Animación de salida
    button.style.transform = 'scale(0.95)';
    
    // Efecto de carga
    showLoadingEffect(button);
    
    // Simular tiempo de carga y navegar
    setTimeout(() => {
        navigateToLevel(level);
    }, 800);
}

/**
 * Navega al nivel seleccionado
 */
function navigateToLevel(level) {
    const routes = {
        'sotano': 'sotano.html',
        'planta-baja': 'planta-baja.html',
        'primer-piso': 'primer-piso.html'
    };
    
    const targetUrl = routes[level];
    
    if (targetUrl) {
        // Efecto de transición suave
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.5s ease-out';
        
        setTimeout(() => {
            window.location.href = targetUrl;
        }, 500);
        
        console.log(`🚪 Redirigiendo a: ${targetUrl}`);
    } else {
        console.error(`❌ Ruta no encontrada para el nivel: ${level}`);
        showErrorMessage('Nivel no disponible');
    }
}

/**
 * Efectos hover para botones
 */
function handleButtonHover(event) {
    const button = event.currentTarget;
    const icon = button.querySelector('.level-icon');
    
    // Efecto de partículas sutiles
    createHoverParticles(button);
    
    // Vibración sutil en dispositivos compatibles
    if (navigator.vibrate) {
        navigator.vibrate(10);
    }
}

function handleButtonLeave(event) {
    const button = event.currentTarget;
    
    // Limpiar efectos de hover
    removeHoverParticles(button);
}

/**
 * Navegación con teclado para accesibilidad
 */
function handleKeyNavigation(event) {
    if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        event.currentTarget.click();
    }
}

/**
 * Efectos táctiles para móviles
 */
function handleTouchStart(event) {
    const button = event.currentTarget;
    button.style.transform = 'scale(0.98)';
    
    // Feedback háptico en dispositivos compatibles
    if (navigator.vibrate) {
        navigator.vibrate(20);
    }
}

function handleTouchEnd(event) {
    const button = event.currentTarget;
    setTimeout(() => {
        button.style.transform = '';
    }, 150);
}

/**
 * Easter egg del logo
 */
function handleLogoClick() {
    console.log('🎉 ¡Easter egg activado!');
    
    const logo = document.querySelector('.logo');
    logo.style.animation = 'none';
    logo.offsetHeight; // Trigger reflow
    logo.style.animation = 'logoSpin 1s ease-in-out';
    
    // Mostrar mensaje especial
    showSpecialMessage('¡Gracias por usar nuestro sistema de navegación! 🏛️');
}

/**
 * Configura efectos visuales adicionales
 */
function setupVisualEffects() {
    // Efecto parallax sutil en el fondo
    window.addEventListener('scroll', handleParallaxEffect);
    
    // Efectos de mouse tracking
    document.addEventListener('mousemove', handleMouseTracking);
    
    // Configurar partículas de fondo
    createBackgroundParticles();
}

/**
 * Efecto parallax
 */
function handleParallaxEffect() {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    const background = document.querySelector('body::before');
    if (background) {
        document.documentElement.style.setProperty('--scroll-offset', `${rate}px`);
    }
}

/**
 * Tracking del mouse para efectos interactivos
 */
function handleMouseTracking(event) {
    const x = event.clientX / window.innerWidth;
    const y = event.clientY / window.innerHeight;
    
    // Efecto sutil en el gradiente de fondo
    document.documentElement.style.setProperty('--mouse-x', x);
    document.documentElement.style.setProperty('--mouse-y', y);
}

/**
 * Animaciones de entrada escalonadas
 */
function setupEntryAnimations() {
    const buttons = document.querySelectorAll('.level-button');
    
    buttons.forEach((button, index) => {
        button.style.setProperty('--delay', index + 1);
    });
}

/**
 * Verifica compatibilidad del navegador
 */
function checkBrowserCompatibility() {
    const features = {
        'CSS Grid': 'CSS.supports("display", "grid")',
        'Backdrop Filter': 'CSS.supports("backdrop-filter", "blur(10px)")',
        'CSS Variables': 'window.CSS && CSS.supports("color", "var(--test)")'
    };
    
    console.log('🔍 Verificando compatibilidad del navegador:');
    
    Object.entries(features).forEach(([feature, test]) => {
        const isSupported = eval(test);
        console.log(`${isSupported ? '✅' : '❌'} ${feature}: ${isSupported ? 'Soportado' : 'No soportado'}`);
    });
}

/**
 * Agrega características de accesibilidad
 */
function addAccessibilityFeatures() {
    // Configurar ARIA labels
    const buttons = document.querySelectorAll('.level-button');
    buttons.forEach(button => {
        const level = button.dataset.level;
        const levelName = button.querySelector('.level-name').textContent;
        const description = button.querySelector('.level-description').textContent;
        
        button.setAttribute('aria-label', `Navegar a ${levelName}: ${description}`);
        button.setAttribute('role', 'button');
        button.setAttribute('tabindex', '0');
    });
    
    // Configurar navegación por teclado
    setupKeyboardNavigation();
    
    console.log('♿ Características de accesibilidad configuradas');
}

/**
 * Configuración de navegación por teclado
 */
function setupKeyboardNavigation() {
    const buttons = document.querySelectorAll('.level-button');
    
    document.addEventListener('keydown', (event) => {
        const focusedElement = document.activeElement;
        const currentIndex = Array.from(buttons).indexOf(focusedElement);
        
        if (currentIndex === -1) return;
        
        let nextIndex;
        
        switch (event.key) {
            case 'ArrowDown':
                event.preventDefault();
                nextIndex = (currentIndex + 1) % buttons.length;
                buttons[nextIndex].focus();
                break;
            case 'ArrowUp':
                event.preventDefault();
                nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
                buttons[nextIndex].focus();
                break;
        }
    });
}

/**
 * Efectos de partículas hover
 */
function createHoverParticles(button) {
    // Implementación simple de partículas
    if (button.querySelector('.particles')) return;
    
    const particles = document.createElement('div');
    particles.className = 'particles';
    particles.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
        opacity: 0.3;
    `;
    
    button.style.position = 'relative';
    button.appendChild(particles);
}

function removeHoverParticles(button) {
    const particles = button.querySelector('.particles');
    if (particles) {
        particles.remove();
    }
}

/**
 * Partículas de fondo animadas
 */
function createBackgroundParticles() {
    // Crear partículas sutiles en el fondo
    const particleCount = window.innerWidth > 768 ? 20 : 10;
    
    for (let i = 0; i < particleCount; i++) {
        setTimeout(() => {
            createFloatingParticle();
        }, i * 200);
    }
}

function createFloatingParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: rgba(255,255,255,0.1);
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        animation: float ${5 + Math.random() * 10}s linear infinite;
        left: ${Math.random() * 100}vw;
        top: 100vh;
    `;
    
    document.body.appendChild(particle);
    
    // Remover partícula después de la animación
    setTimeout(() => {
        if (particle.parentNode) {
            particle.parentNode.removeChild(particle);
        }
    }, 15000);
}

/**
 * Efecto de carga para botones
 */
function showLoadingEffect(button) {
    const originalContent = button.innerHTML;
    
    button.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;">
            <div style="width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top: 2px solid white; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <span>Cargando...</span>
        </div>
    `;
    
    // Agregar animación de spinner
    if (!document.getElementById('spinner-style')) {
        const style = document.createElement('style');
        style.id = 'spinner-style';
        style.textContent = `
            @keyframes spin {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
            }
            @keyframes logoSpin {
                0% { transform: rotate(0deg) scale(1); }
                50% { transform: rotate(180deg) scale(1.1); }
                100% { transform: rotate(360deg) scale(1); }
            }
            @keyframes float {
                0% { transform: translateY(0) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Mensajes de error y especiales
 */
function showErrorMessage(message) {
    console.error(`❌ Error: ${message}`);
    
    // Crear notificación visual
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(255, 107, 107, 0.9);
        color: white;
        padding: 1rem;
        border-radius: 10px;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showSpecialMessage(message) {
    console.log(`🎉 ${message}`);
    
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(78, 205, 196, 0.95);
        color: white;
        padding: 2rem;
        border-radius: 15px;
        z-index: 1000;
        text-align: center;
        font-size: 1.2rem;
        font-weight: 500;
        box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        animation: specialPop 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        max-width: 90vw;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Agregar animación especial
    if (!document.getElementById('special-animations')) {
        const style = document.createElement('style');
        style.id = 'special-animations';
        style.textContent = `
            @keyframes specialPop {
                0% { 
                    transform: translate(-50%, -50%) scale(0) rotate(-180deg); 
                    opacity: 0; 
                }
                50% { 
                    transform: translate(-50%, -50%) scale(1.1) rotate(-90deg); 
                    opacity: 0.8; 
                }
                100% { 
                    transform: translate(-50%, -50%) scale(1) rotate(0deg); 
                    opacity: 1; 
                }
            }
            @keyframes slideInRight {
                0% { 
                    transform: translateX(100%); 
                    opacity: 0; 
                }
                100% { 
                    transform: translateX(0); 
                    opacity: 1; 
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    setTimeout(() => {
        notification.style.animation = 'specialPop 0.3s ease-in reverse';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 2500);
}

/**
 * Utilidades de rendimiento
 */
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

/**
 * Manejo de errores globales
 */
window.addEventListener('error', function(event) {
    console.error('🚨 Error en el sistema:', event.error);
    showErrorMessage('Ha ocurrido un error inesperado');
});

/**
 * Manejo de cambios de orientación en dispositivos móviles
 */
window.addEventListener('orientationchange', function() {
    setTimeout(() => {
        // Recalcular efectos después del cambio de orientación
        setupVisualEffects();
        console.log('📱 Orientación cambiada, efectos recalculados');
    }, 500);
});

/**
 * Detección de dispositivo para optimizaciones
 */
function detectDevice() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isTablet = /(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(navigator.userAgent);
    const isDesktop = !isMobile && !isTablet;
    
    document.body.classList.add(
        isMobile ? 'device-mobile' : 
        isTablet ? 'device-tablet' : 
        'device-desktop'
    );
    
    console.log(`📱 Dispositivo detectado: ${isMobile ? 'Móvil' : isTablet ? 'Tablet' : 'Escritorio'}`);
    
    return { isMobile, isTablet, isDesktop };
}

/**
 * Optimizaciones de rendimiento
 */
function optimizePerformance() {
    const device = detectDevice();
    
    // Reducir efectos en dispositivos móviles para mejor rendimiento
    if (device.isMobile) {
        document.documentElement.style.setProperty('--animation-duration', '0.3s');
        console.log('📱 Optimizaciones móviles aplicadas');
    }
    
    // Usar Intersection Observer para animaciones
    if ('IntersectionObserver' in window) {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        // Observar elementos que necesitan animación
        document.querySelectorAll('.level-button').forEach(button => {
            observer.observe(button);
        });
    }
}

/**
 * Inicialización final
 */
document.addEventListener('DOMContentLoaded', function() {
    // Aplicar optimizaciones
    optimizePerformance();
    
    // Configurar métricas de rendimiento
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log(`⚡ Tiempo de carga: ${loadTime}ms`);
            
            if (loadTime > 3000) {
                console.warn('⚠️ Tiempo de carga elevado, considera optimizaciones');
            }
        });
    }
    
    console.log('🎯 Sistema de Wayfinding completamente inicializado');
});

/**
 * Service Worker para caché (opcional)
 */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('🔧 Service Worker registrado:', registration.scope);
            })
            .catch(error => {
                console.log('❌ Error al registrar Service Worker:', error);
            });
    });
}