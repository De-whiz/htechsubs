/* ============================================
   HTECHSUBS - JavaScript Functionality
   Premium VTU Platform
   ============================================ */

// PAGE TRANSITION & LOADER
function navigateTo(page) {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        loader.style.display = 'flex';
        loader.style.opacity = '1';
        loader.style.pointerEvents = 'auto';
        setTimeout(() => {
            window.location.href = page;
        }, 400);
    }
}

// NOTIFICATIONS
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// SMOOTH SCROLL TO SECTIONS
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// MOBILE MENU HANDLER
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
});

// FORM VALIDATION
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function validatePhone(phone) {
    const regex = /^[0-9]{10,11}$/;
    return regex.test(phone.replace(/\D/g, ''));
}

function validatePassword(password) {
    return password.length >= 8;
}

// RIPPLE EFFECT ON BUTTONS
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.5)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'ripple 0.6s ease-out';
            ripple.style.pointerEvents = 'none';

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}

// SCROLL ANIMATIONS
function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.service-card, .testimonial-card, .stat-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
}

// INPUT FIELD ANIMATIONS
function setupInputAnimations() {
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.boxShadow = '0 0 0 3px rgba(108, 59, 255, 0.1)';
        });

        input.addEventListener('blur', function() {
            this.style.boxShadow = '';
        });
    });
}

// DASHBOARD ANIMATIONS
function setupDashboardAnimations() {
    const cards = document.querySelectorAll('.balance-card, .dashboard-section');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease-out';
        card.style.transitionDelay = `${index * 0.1}s`;
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    });
}

// CARD HOVER EFFECTS
function setupCardHoverEffects() {
    const cards = document.querySelectorAll('.service-card, .dashboard-service-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// COUNTER ANIMATION
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// INITIALIZE ALL
document.addEventListener('DOMContentLoaded', function() {
    // Remove page loader after page load
    const loader = document.getElementById('pageLoader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.pointerEvents = 'none';
        }, 800);
    }

    addRippleEffect();
    setupInputAnimations();
    setupDashboardAnimations();
    setupCardHoverEffects();
    observeElements();

    // Animate counters on stats section if visible
    const statNumbers = document.querySelectorAll('.stat-number');
    if (statNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = entry.target.textContent;
                    const number = parseInt(text.replace(/\D/g, ''));
                    if (!isNaN(number)) {
                        animateCounter(entry.target, number);
                        observer.unobserve(entry.target);
                    }
                }
            });
        });

        statNumbers.forEach(num => observer.observe(num));
    }

    // Setup keyboard navigation
    setupKeyboardNavigation();
});

// KEYBOARD NAVIGATION
function setupKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        // ESC to close modal
        if (e.key === 'Escape') {
            const modal = document.getElementById('confirmModal');
            if (modal && modal.style.display !== 'none') {
                closeModal();
            }
        }

        // ENTER to submit form
        if (e.key === 'Enter' && e.ctrlKey) {
            const form = document.querySelector('form');
            if (form) {
                form.dispatchEvent(new Event('submit'));
            }
        }
    });
}

// LOCAL STORAGE FOR USER DATA
const UserData = {
    save: (key, value) => {
        localStorage.setItem(`htechsubs_${key}`, JSON.stringify(value));
    },
    get: (key) => {
        const data = localStorage.getItem(`htechsubs_${key}`);
        return data ? JSON.parse(data) : null;
    },
    remove: (key) => {
        localStorage.removeItem(`htechsubs_${key}`);
    },
    clear: () => {
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('htechsubs_')) {
                localStorage.removeItem(key);
            }
        });
    }
};

// PAGE TRANSITION HANDLER
window.addEventListener('beforeunload', function() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        loader.style.display = 'flex';
        loader.style.opacity = '1';
    }
});

// SMOOTH PAGE LOAD
window.addEventListener('load', function() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        setTimeout(() => {
            loader.style.opacity = '0';
            loader.style.pointerEvents = 'none';
        }, 800);
    }
});

// PREVENT MEMORY LEAKS
window.addEventListener('unload', function() {
    document.querySelectorAll('*').forEach(el => {
        el.removeEventListener = function() {};
    });
});

// ADD RIPPLE ANIMATION KEYFRAMES
if (!document.querySelector('style[data-ripple]')) {
    const style = document.createElement('style');
    style.setAttribute('data-ripple', 'true');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// UTILITY FUNCTIONS
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func(...args), delay);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func(...args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// PERFORMANCE MONITORING
if (window.performance && window.performance.timing) {
    window.addEventListener('load', function() {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log('Page load time:', pageLoadTime + 'ms');
    });
}

// DARK MODE DETECTION (Optional)
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
if (prefersDarkMode) {
    // Optional: Add dark mode variables
    console.log('Dark mode preference detected');
}

// SERVICE WORKER REGISTRATION (Optional)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => {
        console.log('Service Worker registration failed:', err);
    });
}

// TOUCH SUPPORT FOR MOBILE
if ('ontouchstart' in window) {
    document.body.classList.add('touch-enabled');
    
    document.addEventListener('touchstart', function(e) {
        if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
            const btn = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
            btn.style.opacity = '0.8';
        }
    });

    document.addEventListener('touchend', function(e) {
        if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
            const btn = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
            btn.style.opacity = '1';
        }
    });
}

// RESPONSIVE BEHAVIOR
const mediaQuery = window.matchMedia('(max-width: 768px)');
function handleMediaChange(e) {
    if (e.matches) {
        // Mobile view
        console.log('Switched to mobile view');
    } else {
        // Desktop view
        const sidebar = document.getElementById('sidebar');
        if (sidebar) {
            sidebar.classList.remove('active');
        }
    }
}

mediaQuery.addEventListener('change', handleMediaChange);

// ACCESSIBILITY IMPROVEMENTS
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('tab-focused');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('tab-focused');
});

// EXPORT FOR EXTERNAL USE
window.HTECHSUBS = {
    navigateTo,
    showNotification,
    UserData,
    validateEmail,
    validatePhone,
    validatePassword
};
