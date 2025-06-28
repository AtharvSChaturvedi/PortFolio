document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Screen Animation
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        window.addEventListener('load', () => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.remove();
                document.body.style.overflow = 'auto';
            }, 1000);
        });
        setTimeout(() => {
            if (loadingScreen.parentNode) {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.remove();
                    document.body.style.overflow = 'auto';
                }, 1000);
            }
        }, 3000);
    } else {
        document.body.style.overflow = 'auto';
    }

    // 2. Smooth Scrolling for Navigation
    document.querySelectorAll('.nav-link').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const header = document.querySelector('.header');
                const headerOffset = header ? header.offsetHeight : 0;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Project Video Hover Functionality
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        const videoElement = card.querySelector('.project-video-preview');
        const videoSrc = card.getAttribute('data-video-src');
        // const thumbnailElement = card.querySelector('.project-thumbnail'); // Not directly used in JS logic here

        if (videoSrc) {
            videoElement.preload = 'metadata';
            videoElement.src = videoSrc;

            card.addEventListener('mouseenter', () => {
                if (videoElement.src && videoElement.paused) {
                    videoElement.play().catch(error => {
                        console.warn("Video autoplay prevented:", error);
                    });
                }
            });

            card.addEventListener('mouseleave', () => {
                if (!videoElement.paused) {
                    videoElement.pause();
                    videoElement.currentTime = 0;
                }
            });
        }
    });

    // 4. Konami Code (Easter Egg) - No changes needed to this logic itself
    let konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', (e) => {
        if (e.key === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateEasterEgg();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    function activateEasterEgg() {
        alert('ACCESS GRANTED: WELCOME, AGENT! Initiating secret protocol...');
        document.body.style.backgroundImage = 'url("images/hacker-bg.gif")';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundAttachment = 'fixed';
        document.body.style.backgroundPosition = 'center';
    }

    // 5. Section Visibility Observer (Data Stream Effect)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section').forEach(section => {
        sectionObserver.observe(section);
    });

    // Clean up: Remove the now unused video modal from previous iteration
    const videoModal = document.getElementById('video-modal');
    if (videoModal) {
        videoModal.remove();
    }

    // No need for contact form validation functions or listeners as the form is removed.
});

window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen && loadingScreen.classList.contains('hidden')) {
        loadingScreen.remove();
    }
});