// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.about-card, .game-card, .feature').forEach(element => {
    observer.observe(element);
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const inputs = contactForm.querySelectorAll('input, textarea');
        const data = {
            name: inputs[0].value,
            email: inputs[1].value,
            message: inputs[2].value
        };
        
        // Log form submission
        console.log('Form submitted:', data);
        
        // Show success feedback
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Message Sent! ✓';
        submitButton.style.backgroundColor = '#00d084';
        submitButton.disabled = true;
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.backgroundColor = '';
            submitButton.disabled = false;
        }, 3000);
    });
}

// Scroll animations for header
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.boxShadow = '0 5px 20px rgba(153, 69, 255, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// Counter animation for stats
const statsSection = document.querySelector('.stats');
let statsAnimated = false;

const animateCounter = (element, duration = 2000) => {
    const target = parseInt(element.textContent.replace(/\D/g, ''));
    if (isNaN(target)) return;
    
    let current = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        const suffix = element.textContent.includes('+') ? '+' : '';
        const prefix = element.textContent.match(/[KMB]/);
        element.textContent = Math.floor(current).toLocaleString() + (prefix ? prefix[0] : '') + suffix;
    }, 16);
};

const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !statsAnimated) {
        document.querySelectorAll('.stat-item h3').forEach(stat => {
            animateCounter(stat);
        });
        statsAnimated = true;
        statsObserver.unobserve(statsSection);
    }
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// Log that the website loaded successfully
console.log('%cExora Games', 'color: #9945FF; font-size: 20px; font-weight: bold;');
console.log('%cWebsite loaded successfully!', 'color: #B366FF; font-size: 14px;');