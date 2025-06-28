// spy-script.js

document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    const closeBtn = document.querySelector('.close-btn');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-links .mobile-nav-link');

    menuToggle.addEventListener('click', () => {
        mobileNavMenu.classList.add('active');
    });

    closeBtn.addEventListener('click', () => {
        mobileNavMenu.classList.remove('active');
    });

    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavMenu.classList.remove('active');
        });
    });

    // --- Smooth Scroll ---
    document.querySelectorAll('a.smooth-scroll, .nav-link, .mobile-nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Spy-style Typing Effect ---
    const roleTypingTextElement = document.getElementById('role-typing-text');
    const roles = [
        "Codename: AK-01 - Recon Specialist",
        "Intel Analysis - Vision & Language",
        "Python Operative, Trained in TensorFlow",
        "Strategist in Deep Learning Deployment",
        "Threat Prediction Specialist",
        "Zero-Day Vulnerability Tracker"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 40;
    const pauseAfterTyping = 1200;
    const pauseAfterDeleting = 300;

    function typeRole() {
        const current = roles[roleIndex];
        let displayedText = isDeleting
            ? current.substring(0, charIndex - 1)
            : current.substring(0, charIndex + 1);

        roleTypingTextElement.textContent = displayedText;

        if (!isDeleting && charIndex === current.length) {
            isDeleting = true;
            setTimeout(typeRole, pauseAfterTyping);
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(typeRole, pauseAfterDeleting);
        } else {
            charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
            setTimeout(typeRole, isDeleting ? deletingSpeed : typingSpeed);
        }
    }

    if (roleTypingTextElement) {
        typeRole();
    }

    // --- Active Section Highlighting ---
    const sections = document.querySelectorAll('section[id]');
    const desktopNavLinks = document.querySelectorAll('.nav-links .nav-link');

    function setActiveLink() {
        let activeSectionId = 'home';

        sections.forEach(section => {
            const top = section.offsetTop - 100;
            const bottom = top + section.offsetHeight;
            if (window.scrollY >= top && window.scrollY < bottom) {
                activeSectionId = section.id;
            }
        });

        desktopNavLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === activeSectionId);
        });

        mobileNavLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.section === activeSectionId);
        });
    }

    setActiveLink();
    window.addEventListener('scroll', () => {
        clearTimeout(window._scrollTimeout);
        window._scrollTimeout = setTimeout(setActiveLink, 50);
    });

    // --- Escape Key Closes Mobile Nav ---
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileNavMenu.classList.contains('active')) {
            mobileNavMenu.classList.remove('active');
        }
    });
});
