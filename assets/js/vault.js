document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('vault-search');
    const filterBtns = document.querySelectorAll('.pill');
    const cards = document.querySelectorAll('.asset-card');


        // --- CINEMATIC TRANSITION ENGINE (EXIT ONLY) ---
    // Target all links that go to the villa or vault
    const transitionLinks = document.querySelectorAll('a[href^="villa.html"], a[href^="vault.html"]');

    transitionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            const targetUrl = link.getAttribute('href');
            const transitionOverlay = document.getElementById('page-transition');
            
            if (transitionOverlay) {
                transitionOverlay.classList.add('fade-out'); 
                
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 500); 
            } else {
                window.location.href = targetUrl; 
            }
        });
    });



    // --- TYPEWRITER PLACEHOLDER EFFECT ---
    const phrases = ["Search 'Banana Island'...", "Search 'Penthouses'...", "Search 'Cinematic Tours'...", "Search 'Lekki Phase 1'..."];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeWriter() {
        if (document.activeElement === searchInput) {
            searchInput.setAttribute('placeholder', 'Type here...');
            setTimeout(typeWriter, 1000); 
            return;
        }

        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            searchInput.setAttribute('placeholder', currentPhrase.substring(0, charIndex - 1));
            charIndex--;
        } else {
            searchInput.setAttribute('placeholder', currentPhrase.substring(0, charIndex + 1));
            charIndex++;
        }

        let typingSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typingSpeed = 2000; 
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typingSpeed = 500; 
        }

        setTimeout(typeWriter, typingSpeed);
    }
    
    typeWriter();

    // --- FILTER & SEARCH LOGIC ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            cards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();

        filterBtns.forEach(b => b.classList.remove('active'));
        document.querySelector('[data-filter="all"]').classList.add('active');

        cards.forEach(card => {
            const searchData = card.getAttribute('data-search').toLowerCase();
            if (searchData.includes(searchTerm)) {
                card.classList.remove('hidden');
            } else {
                card.classList.add('hidden');
            }
        });
    });
});


// --- INTERACTIVE BLUEPRINT ENGINE ---
document.addEventListener('mousemove', (e) => {
    const blueprint = document.querySelector('.interactive-blueprint');
    if (blueprint) {
        blueprint.style.setProperty('--mouse-x', `${e.clientX}px`);
        blueprint.style.setProperty('--mouse-y', `${e.clientY}px`);
    }
});


// =========================================
// MAKE ENTIRE CARD CLICKABLE
// =========================================
const assetCards = document.querySelectorAll('.asset-card');

assetCards.forEach(card => {
    card.addEventListener('click', (e) => {
        e.preventDefault();

        const link = card.querySelector('a');
        if (!link) return;
        
        const targetUrl = link.getAttribute('href');
        const transitionOverlay = document.getElementById('page-transition');
        
        if (transitionOverlay) {
            transitionOverlay.classList.add('fade-out'); 
            
            setTimeout(() => {
                window.location.href = targetUrl;
            }, 500); 
        } else {
            window.location.href = targetUrl; 
        }
    });
});


// =========================================
// BFCache (BACK BUTTON) RESTORE FIX
// =========================================
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        const transitionOverlay = document.getElementById('page-transition');
        if (transitionOverlay) {
            transitionOverlay.classList.remove('fade-out');
        }
    }
});