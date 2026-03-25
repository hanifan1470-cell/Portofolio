// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    
    // Toggle Mobile Menu
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) {
                navMenu.classList.remove('active');
            }
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });

    // Theme Toggle
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            if (themeToggle) {
                themeToggle.textContent = '☀️';
            }
        } else {
            body.classList.remove('dark-mode');
            if (themeToggle) {
                themeToggle.textContent = '🌙';
            }
        }
    }

    // Initialize theme on page load
    initTheme();

    if (themeToggle) {
        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            body.classList.toggle('dark-mode');
            const isDark = body.classList.contains('dark-mode');
            themeToggle.textContent = isDark ? '☀️' : '🌙';
            
            // Save theme preference
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            console.log('Theme toggled to:', isDark ? 'dark' : 'light');
        });
    } else {
        console.warn('Theme toggle button not found');
    }

    // Back to Top Button
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            if (backToTop) {
                backToTop.classList.add('show');
            }
        } else {
            if (backToTop) {
                backToTop.classList.remove('show');
            }
        }
    });

    if (backToTop) {
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Initialize EmailJS
    emailjs.init('YOUR_PUBLIC_KEY'); // Ganti dengan Public Key EmailJS Anda

    // Contact Form Handler
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const userName = document.getElementById('user_name').value;
            const userEmail = document.getElementById('user_email').value;
            const message = document.getElementById('message').value;
            
            // Show loading message
            formMessage.style.display = 'block';
            formMessage.style.color = '#4CAF50';
            formMessage.textContent = 'Mengirim pesan...';
            
            emailjs.send('SERVICE_ID', 'TEMPLATE_ID', {
                user_name: userName,
                user_email: userEmail,
                message: message
            }).then(function(response) {
                // Success
                formMessage.style.color = '#4CAF50';
                formMessage.textContent = 'Pesan berhasil dikirim! Terima kasih telah menghubungi saya.';
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }).catch(function(error) {
                // Error
                formMessage.style.color = '#f44336';
                formMessage.textContent = 'Gagal mengirim pesan. Silakan coba lagi atau hubungi saya langsung.';
                console.error('EmailJS error:', error);
            });
        });
    }

});
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        alert('Pesan berhasil dikirim! Saya akan membalas segera.');
        contactForm.reset();
    });
}

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 1s ease ${entry.target.dataset.delay || '0s'} forwards`;
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all section elements
document.querySelectorAll('section').forEach((section, index) => {
    section.style.opacity = '0';
    section.dataset.delay = `${index * 0.1}s`;
    observer.observe(section);
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});