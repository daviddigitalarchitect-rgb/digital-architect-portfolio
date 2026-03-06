/* =========================================
   PROJECT: THE DIGITAL ESTATE
   TYPE: PREMIUM PORTFOLIO JAVASCRIPT
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Precision Cursor Tracking ---
    const cursor = document.getElementById('custom-cursor');
    if (cursor && window.matchMedia("(pointer: fine)").matches) {
        document.addEventListener('mousemove', (e) => {
            window.requestAnimationFrame(() => {
                cursor.style.left = `${e.clientX}px`;
                cursor.style.top = `${e.clientY}px`;
            });
        });

        const interactables = document.querySelectorAll('a, button, input, select, textarea, .dropdown-trigger, .accordion-panel');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('hover-state'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('hover-state'));
        });
    }

    // --- 2. Smart Preloader Logic ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        if (!sessionStorage.getItem('hasSeenPreloader')) {
            const loaderPercentage = document.getElementById('loader-percentage');
            const loaderProgress = document.getElementById('loader-progress');
            let progress = 0;

            const loadingInterval = setInterval(() => {
                if (progress < 90) {
                    progress += Math.floor(Math.random() * 10) + 1;
                    if (progress > 90) progress = 90;
                    if (loaderPercentage) loaderPercentage.textContent = `${progress}%`;
                    if (loaderProgress) loaderProgress.style.width = `${progress}%`;
                }
            }, 100);

            window.addEventListener('load', () => {
                clearInterval(loadingInterval);
                if (loaderPercentage) loaderPercentage.textContent = '100%';
                if (loaderProgress) loaderProgress.style.width = '100%';
                
                setTimeout(() => {
                    preloader.classList.add('loaded');
                    sessionStorage.setItem('hasSeenPreloader', 'true');
                    setTimeout(() => preloader.style.display = 'none', 800);
                }, 500); 
            });
        } else {
            preloader.style.display = 'none';
        }
    }

    // --- 3. Unified Theme Engine ---
    const themeBtn = document.getElementById('theme-toggle');
    
    // Check local storage on load
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-mode');
    }

    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
        });
    }

    // --- 4. Mobile Menu Takeover ---
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const closeMenuBtn = document.querySelector('.close-mobile-menu');
    const mobileMenu = document.querySelector('.mobile-nav-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    const toggleMobileMenu = () => {
        if (!mobileMenu) return;
        const isActive = mobileMenu.classList.toggle('active');
        if (hamburgerBtn) hamburgerBtn.classList.toggle('active');
        document.body.style.overflow = isActive ? 'hidden' : 'auto';
    };

    if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMobileMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMobileMenu);
    mobileLinks.forEach(link => link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        if (hamburgerBtn) hamburgerBtn.classList.remove('active');
        document.body.style.overflow = 'auto';
    }));

    // --- 5. Scroll Dynamics (Parallax & Back to Top) ---
    const topBtn = document.getElementById('backToTop');
    const heroContent = document.querySelector('.hero-content');

    window.addEventListener('scroll', () => {
        const scroll = window.scrollY;
        
        // Back to top visibility
        if (topBtn) topBtn.style.display = scroll > 500 ? "block" : "none";

        // Parallax safety check
        if (heroContent) {
            heroContent.style.transform = `translateY(${scroll * 0.4}px)`;
            heroContent.style.opacity = 1 - (scroll / 700);
        }
    });

    if (topBtn) {
        topBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }

    // --- 6. Scroll Reveal Observer ---
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Stop observing once revealed for performance
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // --- 7. Accordion Logic ---
    const panels = document.querySelectorAll('.accordion-panel');
    panels.forEach(panel => {
        panel.addEventListener('click', () => {
            panels.forEach(p => p.classList.remove('active-panel'));
            panel.classList.add('active-panel');
        });
    });

    // --- 8. Editable Dropdown ---
    const dropdown = document.getElementById('project-dropdown');
    const displayInput = document.getElementById('nl-project-display');
    const hiddenInput = document.getElementById('nl-project-hidden');
    
    if (dropdown && displayInput && hiddenInput) {
        const options = dropdown.querySelectorAll('.dropdown-options li');
        const chevron = dropdown.querySelector('.chevron');

        const toggleDropdown = (e) => { e.stopPropagation(); dropdown.classList.toggle('open'); };
        
        if (chevron) chevron.addEventListener('click', toggleDropdown);
        displayInput.addEventListener('click', (e) => { e.stopPropagation(); dropdown.classList.add('open'); });
        displayInput.addEventListener('input', (e) => hiddenInput.value = e.target.value);

        options.forEach(opt => {
            opt.addEventListener('click', () => {
                displayInput.value = opt.textContent;
                hiddenInput.value = opt.getAttribute('data-value') || opt.textContent;
                dropdown.classList.remove('open');
            });
        });

        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
        });
    }

    // --- 9. Magnetic Button ---
    const submitWrapper = document.querySelector('.nl-submit-wrapper');
    const magBtn = document.querySelector('.magnetic-btn');

    if (submitWrapper && magBtn) {
        submitWrapper.addEventListener('mousemove', (e) => {
            if (magBtn.classList.contains('success-state')) return;
            const pos = submitWrapper.getBoundingClientRect();
            const x = e.clientX - pos.left - pos.width / 2;
            const y = e.clientY - pos.top - pos.height / 2;
            
            magBtn.style.transition = 'none';
            magBtn.style.transform = `translate(${x * 0.3}px, ${y * 0.4}px)`;
        });

        submitWrapper.addEventListener('mouseleave', () => {
            if (magBtn.classList.contains('success-state')) return;
            magBtn.style.transition = 'transform 0.5s cubic-bezier(0.2, 1, 0.3, 1), background 0.3s ease, color 0.3s ease';
            magBtn.style.transform = 'translate(0px, 0px)';
        });
    }

    // --- 10. Node.js Form Submission ---
    const leadForm = document.getElementById('lead-generation-form');
    if (leadForm) {
        const btnTextDisplay = document.getElementById('btn-text-display');
        const btnIconDisplay = document.getElementById('btn-icon-display');

        leadForm.addEventListener('submit', async (e) => {
            e.preventDefault(); 
            
            const nameVal = document.getElementById('nl-name')?.value;
            const emailVal = document.getElementById('nl-email')?.value;
            const projectVal = hiddenInput?.value || displayInput?.value;

            if (nameVal && emailVal && projectVal && magBtn) {
                btnTextDisplay.textContent = 'Routing...';
                magBtn.style.pointerEvents = 'none'; 
                
                try {
                    // NOTE: Change this URL to your live backend URL when deploying!
                    // Strictly point to Port 5001 using the IPv4 address
                    const apiUrl = '/api/contact';

                    const response = await fetch(apiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ name: nameVal, email: emailVal, project: projectVal })
                    });

                    if (response.ok) {
                        // 1. Trigger the Success UI
                        magBtn.classList.add('success-state');
                        btnTextDisplay.textContent = 'Inquiry Secured';
                        if (btnIconDisplay) btnIconDisplay.innerHTML = `<polyline points="20 6 9 17 4 12"></polyline>`;
                        magBtn.style.transform = 'translate(0px, 0px)';

                        // 2. Wait 2.5 seconds, then reload the page fresh
                        setTimeout(() => {
                            window.location.reload();
                        }, 2500);
                        
                    } else {
                        throw new Error('Server rejected request');
                    }
                } catch (error) {
                    console.error("Fetch failed:", error);
                    btnTextDisplay.textContent = 'Failed. Try Again.';
                    magBtn.style.pointerEvents = 'auto';
                }
            }
        });
    }

    // --- 11. Page Transitions ---
    const pageLinks = document.querySelectorAll('.sr-link');
    pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if(this.getAttribute('target') !== '_blank' && this.getAttribute('href').startsWith('/')) {
                e.preventDefault(); 
                const targetUrl = this.getAttribute('href');
                
                document.body.style.transition = 'opacity 0.5s cubic-bezier(0.2, 1, 0.3, 1)';
                document.body.style.opacity = '0';
                
                setTimeout(() => window.location.href = targetUrl, 500);
            }
        });
    });

});

// Safari/Mobile back-button fix for page transitions
window.addEventListener('pageshow', (e) => {
    if (e.persisted) document.body.style.opacity = '1';
});