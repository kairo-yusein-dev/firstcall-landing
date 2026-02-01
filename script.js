// FirstCall.ai - Landing Page Scripts

document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const href = this.getAttribute('href');

            // Handle logo click (href="#") - scroll to top
            if (href === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }

            // Close mobile menu if open
            navLinks.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        });
    });

    // Navbar background on scroll
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Animate elements on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.feature-card, .problem-card, .pricing-card, .step').forEach(el => {
        el.classList.add('animate-target');
        observer.observe(el);
    });

    // Add animation styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        .animate-target {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .animate-target.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        .nav.scrolled {
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        @media (max-width: 768px) {
            .nav-links.active {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: white;
                padding: 20px;
                gap: 16px;
                box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
            }
            .mobile-menu-btn.active span:nth-child(1) {
                transform: rotate(45deg) translate(5px, 5px);
            }
            .mobile-menu-btn.active span:nth-child(2) {
                opacity: 0;
            }
            .mobile-menu-btn.active span:nth-child(3) {
                transform: rotate(-45deg) translate(5px, -5px);
            }
        }
    `;
    document.head.appendChild(style);

    // Typing effect for hero (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.classList.add('animate-in');
    }
});

// Track button clicks (for analytics)
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function () {
        const text = this.textContent.trim();
        console.log('Button clicked:', text);
        // Add your analytics tracking here
        // gtag('event', 'click', { 'event_category': 'CTA', 'event_label': text });
    });
});
