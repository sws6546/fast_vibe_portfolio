// Obsługa menu hamburger
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Zamknij menu po kliknięciu w link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Zmiana stylu nawigacji przy scrollu
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.9)';
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Animacja elementów przy scrollu
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Obserwuj karty umiejętności i zainteresowań
document.querySelectorAll('.skill-card, .interest-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Dodaj klasę animate
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .skill-card.animate, .interest-card.animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);

// Animacja pasków umiejętności
const skillBars = document.querySelectorAll('.skill-bar');
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.style.getPropertyValue('--level');
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    bar.style.width = '0';
    skillObserver.observe(bar);
});

// Obsługa formularza (demo)
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Symulacja wysłania
    const btn = contactForm.querySelector('button');
    const originalText = btn.textContent;
    
    btn.textContent = 'Wysyłanie...';
    btn.disabled = true;
    
    setTimeout(() => {
        btn.textContent = 'Wysłano! ✓';
        btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
        
        // Reset formularza
        contactForm.reset();
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.disabled = false;
        }, 3000);
    }, 1500);
});

// Płynne scrollowanie dla linków nawigacji
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Efekt pisania w bloku kodu
const codeContent = document.querySelector('.code-block code');
if (codeContent) {
    const originalHTML = codeContent.innerHTML;
    codeContent.innerHTML = '';
    
    let i = 0;
    const typeSpeed = 20;
    
    function typeCode() {
        if (i < originalHTML.length) {
            // Dodaj znak lub cały tag HTML
            if (originalHTML[i] === '<') {
                const tagEnd = originalHTML.indexOf('>', i);
                codeContent.innerHTML += originalHTML.substring(i, tagEnd + 1);
                i = tagEnd + 1;
            } else {
                codeContent.innerHTML += originalHTML[i];
                i++;
            }
            setTimeout(typeCode, typeSpeed);
        }
    }
    
    // Rozpocznij animację po załadowaniu strony
    setTimeout(typeCode, 500);
}

// Aktywny link w nawigacji
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${current}`) {
            item.style.color = '#6366f1';
        } else {
            item.style.color = '';
        }
    });
});

// Easter egg - Konami code
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            document.body.style.animation = 'rainbow 2s linear infinite';
            document.head.insertAdjacentHTML('beforeend', `
                <style>
                    @keyframes rainbow {
                        0% { filter: hue-rotate(0deg); }
                        100% { filter: hue-rotate(360deg); }
                    }
                </style>
            `);
            konamiIndex = 0;
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
        }
    } else {
        konamiIndex = 0;
    }
});

console.log('%c🚀 Portfolio Szymon Przeździęk', 'font-size: 24px; font-weight: bold; color: #6366f1;');
console.log('%cDziękuję za odwiedzenie mojego portfolio!', 'font-size: 14px; color: #10b981;');
