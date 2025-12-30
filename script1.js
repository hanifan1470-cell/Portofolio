// Portfolio Feminin - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== THEME TOGGLE =====
    const themeToggle = document.querySelector('.theme-toggle');
    
    function initTheme() {
        const savedTheme = localStorage.getItem('portfolio-theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        updateThemeToggle(savedTheme);
    }
    
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
        updateThemeToggle(newTheme);
        
        // Add transition effect
        document.documentElement.style.transition = 'all 0.3s ease';
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 300);
    }
    
    function updateThemeToggle(theme) {
        const toggleCircle = document.querySelector('.toggle-circle');
        if (toggleCircle) {
            if (theme === 'dark') {
                toggleCircle.style.left = '28px';
            } else {
                toggleCircle.style.left = '2px';
            }
        }
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    initTheme();
    
    // ===== NAVIGATION =====
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.nav-menu');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Active nav link on scroll
        const sections = document.querySelectorAll('section');
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            mobileMenu.classList.toggle('show');
            
            // Animate hamburger
            const spans = menuToggle.querySelectorAll('span');
            if (menuToggle.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });
    }
    
    // Close mobile menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle.classList.contains('active')) {
                menuToggle.click();
            }
        });
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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
    
    // ===== TYPEWRITER EFFECT =====
    function initTypewriter() {
        const typewriterElement = document.getElementById('typewriter');
        if (!typewriterElement) return;
        
        const words = [
            'UI/UX Designer',
            'Frontend Developer',
            'Creative Thinker',
            'Problem Solver',
            'Detail Oriented'
        ];
        
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;
        
        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 1500; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pause before next word
            }
            
            setTimeout(type, typeSpeed);
        }
        
        setTimeout(type, 1000);
    }
    
    initTypewriter();
    
    // ===== ANIMATE COUNTERS =====
    function animateCounter(element) {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        function update() {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(update);
            } else {
                element.textContent = target;
            }
        }
        
        update();
    }
    
    const counters = document.querySelectorAll('.stat-number');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
    
    // ===== ANIMATE SKILL BARS =====
    function animateSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 300);
        });
    }
    
    const skillsSection = document.getElementById('skills');
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // ===== PROJECT FILTERING =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const categories = card.getAttribute('data-category');
                
                if (filterValue === 'all' || categories.includes(filterValue)) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // ===== FORM SUBMISSION =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                // Show success message
                showSuccessMessage();
                
                // Reset form
                this.reset();
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    function showSuccessMessage() {
        // Create success message element
        const successEl = document.createElement('div');
        successEl.className = 'success-message';
        successEl.innerHTML = `
            <div class="success-content">
                <i class="fas fa-check-circle"></i>
                <div>
                    <h4>Message Sent!</h4>
                    <p>Thank you for your message. I'll get back to you soon.</p>
                </div>
            </div>
        `;
        
        // Add styles
        successEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(249, 168, 212, 0.3);
            border-radius: 15px;
            padding: 1rem 1.5rem;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            z-index: 9999;
            animation: slideIn 0.5s ease;
        `;
        
        document.body.appendChild(successEl);
        
        // Remove after 3 seconds
        setTimeout(() => {
            successEl.style.animation = 'slideOut 0.5s ease';
            setTimeout(() => successEl.remove(), 500);
        }, 3000);
    }
    
    // Add success message animations to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
        
        .success-content {
            display: flex;
            align-items: center;
            gap: 1rem;
        }
        
        .success-content i {
            font-size: 2rem;
            color: #10b981;
        }
        
        .success-content h4 {
            margin: 0;
            color: #5A4B5C;
        }
        
        .success-content p {
            margin: 0.25rem 0 0 0;
            color: #8B7B8B;
            font-size: 0.9rem;
        }
    `;
    document.head.appendChild(style);
    
    // ===== BACK TO TOP =====
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ===== FLOATING ELEMENTS ANIMATION =====
    const floatingElements = document.querySelectorAll('.floating-element');
    floatingElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 2}s`;
    });
    
    // ===== INITIAL ANIMATIONS =====
    // Add fade-in animation to all sections
    const sections = document.querySelectorAll('section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        sectionObserver.observe(section);
    });
    
    // ===== CURRENT YEAR =====
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = new Date().getFullYear();
    });
});