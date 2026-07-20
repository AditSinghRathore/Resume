(function() {
    'use strict';

    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    const hamburger = document.getElementById('hamburgerBtn');
    const closeBtn = document.getElementById('sidebarClose');
    const navLinks = document.querySelectorAll('.sidebar-nav a');

    function openSidebar() {
        sidebar.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeSidebar() {
        sidebar.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', openSidebar);
    closeBtn.addEventListener('click', closeSidebar);
    overlay.addEventListener('click', closeSidebar);

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            closeSidebar();
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const sections = document.querySelectorAll('section[id]');

    function updateActiveNav() {
        let currentId = '';
        const scrollY = window.scrollY + 120;
        sections.forEach(sec => {
            const top = sec.offsetTop;
            const height = sec.offsetHeight;
            if (scrollY >= top && scrollY < top + height) {
                currentId = sec.id;
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentId) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);
    window.addEventListener('load', updateActiveNav);

    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && sidebar.classList.contains('open')) {
            closeSidebar();
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                history.pushState(null, null, this.getAttribute('href'));
            }
        });
    });

    // ---- Project Carousel Navigation ----
    const carousel = document.querySelector('.projects-carousel');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');

    if (carousel && prevBtn && nextBtn) {
        // Get the first card to determine width + gap
        const firstCard = carousel.querySelector('.project-card');
        if (firstCard) {
            const cardWidth = firstCard.offsetWidth;
            const gap = 1.8 * 16; // 1.8rem in px (assuming 1rem = 16px)
            const scrollAmount = cardWidth + gap;

            prevBtn.addEventListener('click', function() {
                carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });

            nextBtn.addEventListener('click', function() {
                carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });

            // Disable buttons when at edges (optional)
            carousel.addEventListener('scroll', function() {
                const atStart = carousel.scrollLeft === 0;
                const atEnd = carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth - 2;
                prevBtn.style.opacity = atStart ? '0.3' : '1';
                nextBtn.style.opacity = atEnd ? '0.3' : '1';
                prevBtn.style.pointerEvents = atStart ? 'none' : 'auto';
                nextBtn.style.pointerEvents = atEnd ? 'none' : 'auto';
            });

            // Initial check
            carousel.dispatchEvent(new Event('scroll'));
        }
    }

    // ---- Project tilt (faster) ----
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            if (window.innerWidth < 768) return;
            const rect = this.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            const rotateY = x * 6;
            const rotateX = -y * 6;
            this.style.transition = 'transform 0.08s ease-out';
            this.style.transform =
                `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px) scale(1.01)`;
        });
        card.addEventListener('mouseleave', function() {
            this.style.transition = 'transform 0.25s ease-out';
            this.style.transform = '';
        });
    });

    // ---- Typing effect ----
    const textElement = document.getElementById('typing-text');
    if (textElement) {
        const text =
            `Computer Science undergraduate with strong foundations in <strong>Java, C++, Data Structures & Algorithms</strong>, and backend development. Experienced in building Java-based applications and problem-solving through projects, hackathons, and machine learning coursework. Interested in <strong>software development</strong> and <strong>scalable backend systems</strong>.`;
        let index = 0;
        let isTag = false;
        let tagBuffer = '';

        function typeWriter() {
            if (index < text.length) {
                const char = text.charAt(index);
                if (char === '<') {
                    isTag = true;
                    tagBuffer = '<';
                } else if (char === '>') {
                    isTag = false;
                    tagBuffer += '>';
                    textElement.innerHTML += tagBuffer;
                    tagBuffer = '';
                } else if (isTag) {
                    tagBuffer += char;
                } else {
                    textElement.innerHTML += char;
                }
                index++;
                setTimeout(typeWriter, Math.random() * 18 + 8);
            } else {
                const cursor = document.querySelector('.cursor');
                if (cursor) cursor.style.display = 'none';
            }
        }
        setTimeout(typeWriter, 400);
    }

    // ---- Speech bubble entrance ----
    const bubble = document.querySelector('.speech-bubble');
    if (bubble) {
        setTimeout(() => {
            bubble.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
        }, 300);
    }

    console.log('🚀 Adit Singh Rathore — Black & Yellow Portfolio');
})();