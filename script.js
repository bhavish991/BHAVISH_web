document.addEventListener('DOMContentLoaded', () => {
    // ============================================
    // NAVIGATION & HAMBURGER MENU
    // ============================================
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when a link is clicked
    if (navLinks && navLinks.length) {
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu) navMenu.classList.remove('active');
                if (hamburger) hamburger.classList.remove('active');
            });
        });
    }

    // ============================================
    // SCROLL TO SECTION
    // ============================================
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // expose to global for inline onclick in HTML
    window.scrollToSection = scrollToSection;

    // ============================================
    // CONTACT FORM HANDLING
    // ============================================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form values
            const nameEl = this.querySelector('input[type="text"]');
            const emailEl = this.querySelector('input[type="email"]');
            const phoneEl = this.querySelector('input[type="tel"]');
            const textareaEl = this.querySelector('textarea');

            const name = nameEl ? nameEl.value.trim() : '';
            const email = emailEl ? emailEl.value.trim() : '';
            const phone = phoneEl ? phoneEl.value.trim() : '';
            const message = textareaEl ? textareaEl.value.trim() : '';

            // Validate form
            if (!name || !email || !phone || !message) {
                alert('Please fill out all fields');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }

            // Validate phone format
            const phoneNumbers = phone.replace(/\D/g, '');
            if (phoneNumbers.length < 10) {
                alert('Please enter a valid phone number');
                return;
            }

            // Create mailto link with prefilled subject and body
            const subject = `Inquiry from ${name} - BHAVISH YADAV ACCOMMODATION`;
            const body = `Hello,\n\nI am interested in your accommodation services.\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}\n\nBest regards,\n${name}`;

            const mailtoLink = `mailto:bhavish.kumar240@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;

            // Reset form
            setTimeout(() => {
                this.reset();
            }, 500);
        });
    }

    // ============================================
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // ANIMATION ON SCROLL
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe room cards and amenity cards
        document.querySelectorAll('.room-card, .amenity-card').forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(element);
        });

        // Lazy loading for images
        const imageObserver = new IntersectionObserver((entries, imageObserver) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.style.opacity = '1';
                    imageObserver.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img').forEach(img => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease-in';
            imageObserver.observe(img);
        });
    }

    // ============================================
    // ACTIVE NAVIGATION LINK HIGHLIGHTING
    // ============================================
    window.addEventListener('scroll', () => {
        let current = '';
        
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') && link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // ADD ACTIVE CLASS STYLES DYNAMICALLY
    // ============================================
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--secondary-color);
            border-bottom: 2px solid var(--secondary-color);
            padding-bottom: 5px;
        }
    `;
    document.head.appendChild(style);

    // ============================================
    // BUTTON RIPPLE EFFECT
    // ============================================
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            const getButton = (element) => {
                return element.closest('button');
            };

            const btn = getButton(e.target);
            if (!btn) return;

            const ripple = document.createElement('span');
            const diameter = Math.max(btn.clientWidth, btn.clientHeight);
            const radius = diameter / 2;

            ripple.style.width = ripple.style.height = diameter + 'px';
            ripple.style.left = e.offsetX - radius + 'px';
            ripple.style.top = e.offsetY - radius + 'px';
            ripple.classList.add('ripple');

            const rippleEl = btn.querySelector('.ripple');
            if (rippleEl) {
                rippleEl.remove();
            }

            btn.appendChild(ripple);
        });
    });

    // Add ripple styles
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        button {
            position: relative;
            overflow: hidden;
        }
        
        button .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s ease-out;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // ============================================
    // FORM INPUT FOCUS EFFECTS
    // ============================================
    const formInputs = document.querySelectorAll('input, textarea');
    formInputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.style.backgroundColor = 'rgba(52, 152, 219, 0.05)';
        });

        input.addEventListener('blur', function() {
            this.style.backgroundColor = 'white';
        });
    });

    // ============================================
    // RESPONSIVE MENU CLOSE ON WINDOW RESIZE
    // ============================================
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });

    // ============================================
    // PAGE LOAD ANIMATIONS
    // ============================================
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        }
    });

    // ============================================
    // WHATSAPP INTEGRATION (Optional)
    // ============================================
    window.sendWhatsAppMessage = function() {
        const phoneNumber = '918709188179';
        const message = 'Hello! I am interested in your accommodation services. Please provide more information.';
        const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, '_blank');
    };

    // ============================================
    // PHONE AND EMAIL CLICK HANDLERS
    // ============================================
    document.querySelectorAll('a[href^="tel:"]').forEach(link => {
        link.addEventListener('click', (e) => {
            if (!navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)) {
                e.preventDefault();
                alert('To call, please use your phone or a calling application.');
            }
        });
    });

    // ============================================
    // CONSOLE WELCOME MESSAGE
    // ============================================
    console.log('%cWelcome to BHAVISH YADAV LODGE', 'font-size: 20px; color: #2c3e50; font-weight: bold;');
    console.log('%cBest Student Lodge for Boys', 'font-size: 14px; color: #e74c3c;');
    console.log('%cContact: +91-8709188179', 'font-size: 12px; color: #3498db;');
    console.log('%cEmail: bhavish.kumar240@gmail.com', 'font-size: 12px; color: #3498db;');
});
