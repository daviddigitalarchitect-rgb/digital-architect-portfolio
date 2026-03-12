document.addEventListener('DOMContentLoaded', () => {
    



    // --- CINEMATIC TRANSITION ENGINE (EXIT ONLY) ---
    // Target all links that go to the villa or vault
    const transitionLinks = document.querySelectorAll('a[href^="villa.html"], a[href^="vault.html"]');

    transitionLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Stop the instant jump
            const targetUrl = link.getAttribute('href');
            const transitionOverlay = document.getElementById('page-transition');
            
            if (transitionOverlay) {
                // Drop the black curtain
                transitionOverlay.classList.add('fade-out'); 
                
                // Wait 500ms for it to turn black, then load next page
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 500); 
            } else {
                // Failsafe
                window.location.href = targetUrl; 
            }
        });
    });



    // --- INTERACTIVE BLUEPRINT ENGINE ---
    document.addEventListener('mousemove', (e) => {
        const blueprint = document.querySelector('.interactive-blueprint');
        if (blueprint) {
            // Updates the CSS variables with the exact mouse location
            blueprint.style.setProperty('--mouse-x', `${e.clientX}px`);
            blueprint.style.setProperty('--mouse-y', `${e.clientY}px`);
        }
    });



    // --- 1. THE PROPERTY DATABASE ---
    const propertyDatabase = {
        "shadow-estate": {
            title: "The Shadow Estate",
            price: "$12,500,000",
            beds: "05", 
            baths: "07", 
            sqft: "8,200", 
            acres: "2.4",
            headline: "Architectural <em>Masterpiece.</em>",
            description: `
                <p>Set against the exclusive backdrop of Lekki Phase 1, The Shadow Estate redefines modern luxury. Designed with seamless indoor-outdoor living in mind, this property features floor-to-ceiling glass paneling, allowing natural light to sweep across the imported Italian marble floors.</p>
                <p>The state-of-the-art smart home integration provides absolute control over the climate, security, and ambient lighting. Whether entertaining in the sunken living room or retreating to the panoramic master suite, every inch of this 8,200 sqft estate has been curated for the elite.</p>`,
            amenities: [
                "Infinity Edge Pool & Spa", 
                "Temperature-Controlled Wine Cellar", 
                "Smart Home Automation System", 
                "12-Seat Private Cinema",
                "Executive Home Office",
                "Secure 4-Car Subterranean Garage"
            ],
            media: [
                { type: "image", src: "https://images.pexels.com/photos/1732414/pexels-photo-1732414.jpeg?auto=compress&cs=tinysrgb&w=1260" },
                { type: "image", src: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260" },
                { type: "video", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
                { type: "image", src: "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1260" },
                { type: "image", src: "https://images.pexels.com/photos/1571469/pexels-photo-1571469.jpeg?auto=compress&cs=tinysrgb&w=1260" },
            ]
        },
        "glass-villa": {
            title: "The Glass Villa",
            price: "$8,200,000",
            beds: "04", 
            baths: "05", 
            sqft: "6,500", 
            acres: "1.2",
            headline: "Panoramic <em>Perfection.</em>",
            description: `
                <p>Elevated above Abuja's skyline, The Glass Villa offers 360-degree panoramic views. The striking minimalist architecture is defined by its massive glass facades and industrial steel framework.</p>
                <p>The interior features a sunken conversation pit, a floating staircase, and a master suite that feels suspended in the clouds. This is urban luxury redefined.</p>`,
            amenities: [
                "Rooftop Infinity Pool", 
                "Private Glass Elevator", 
                "Floor-to-Ceiling Glass Walls", 
                "Automated Blackout Shades",
                "Zen Garden"
            ],
            media: [
                { type: "video", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
                { type: "image", src: "https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg?auto=compress&cs=tinysrgb&w=1260" },
                { type: "image", src: "https://images.pexels.com/photos/1571469/pexels-photo-1571469.jpeg?auto=compress&cs=tinysrgb&w=1260" },
                { type: "image", src: "https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=1260" }
            ]
        },
        "skyline-penthouse": {
            title: "Skyline Reserve",
            price: "$5,100,000",
            beds: "03", 
            baths: "04", 
            sqft: "4,200", 
            acres: "N/A",
            headline: "Elevated <em>Living.</em>",
            description: `
                <p>Perched high above Ikoyi, the Skyline Reserve offers an unparalleled view of the city. This penthouse is wrapped in floor-to-ceiling glass, ensuring you never miss a sunset.</p>
                <p>The open-concept layout flows seamlessly onto a massive wrap-around terrace, complete with an outdoor kitchen and a private plunge pool.</p>`,
            amenities: [
                "Wrap-Around Observation Terrace", 
                "Private Plunge Pool", 
                "Direct Elevator Access", 
                "Imported Italian Marble",
                "24/7 Concierge Service"
            ],
            media: [
                { type: "image", src: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260" },
                { type: "video", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
                { type: "image", src: "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1260" }
            ]
        },
        "zenith-interiors": {
            title: "Zenith Interiors",
            price: "$4,100,000",
            beds: "04", baths: "05", sqft: "4,500", acres: "N/A",
            headline: "Cinematic <em>Elegance.</em>",
            description: `
                <p>Located in the heart of Maitama, Zenith Interiors is a masterclass in modern staging and lighting. Designed for the ultimate entertainer, the living spaces flow effortlessly into a state-of-the-art cinematic viewing area.</p>
                <p>Featuring custom millwork, ambient mood lighting, and imported European fixtures, this asset is move-in ready for the elite buyer who demands perfection.</p>`,
            amenities: ["Cinematic Viewing Area", "Custom Millwork", "Smart Ambient Lighting", "Imported European Fixtures", "Private Terrace"],
            media: [
                { type: "video", src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
                { type: "image", src: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1260" }
            ]
        },
        "quartz-manor": {
            title: "Quartz Manor",
            price: "$15,000,000",
            beds: "06", baths: "08", sqft: "12,000", acres: "1.5",
            headline: "Unrivaled <em>Prestige.</em>",
            description: `
                <p>Quartz Manor stands as a monument to luxury in Banana Island. The imposing modern architecture is softened by lush, manicured landscaping and a striking quartz-clad facade.</p>
                <p>This estate boasts a double-height grand foyer, a commercial-grade chef's kitchen, and a resort-style pool deck designed for lavish private events.</p>`,
            amenities: ["Resort-Style Pool Deck", "Commercial-Grade Kitchen", "Double-Height Foyer", "Quartz-Clad Facade", "Staff Quarters (3 Rooms)"],
            media: [
                { type: "image", src: "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260" }
            ]
        },
        "aurora-loft": {
            title: "Aurora Loft",
            price: "$3,400,000",
            beds: "03", baths: "03", sqft: "3,200", acres: "N/A",
            headline: "Urban <em>Sanctuary.</em>",
            description: `
                <p>Perched above Victoria Island, the Aurora Loft is a sleek, ultra-modern penthouse. The open-plan design maximizes space, while floor-to-ceiling windows flood the interior with natural light and panoramic city views.</p>
                <p>Minimalist finishes, polished concrete floors, and a private sky-garden make this the ultimate urban retreat.</p>`,
            amenities: ["Panoramic City Views", "Private Sky-Garden", "Polished Concrete Floors", "Smart Climate Control", "24/7 Concierge"],
            media: [
                { type: "image", src: "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1260" }
            ]
        },
        "onyx-estate": {
            title: "The Onyx Estate",
            price: "$22,000,000",
            beds: "07", baths: "09", sqft: "15,500", acres: "2.1",
            headline: "Coastal <em>Supremacy.</em>",
            description: `
                <p>The crown jewel of Eko Atlantic. The Onyx Estate is a waterfront masterpiece that redefines ultra-luxury living. Boasting a massive infinity pool that blends seamlessly with the ocean horizon, this property is without equal.</p>
                <p>Inside, find a 20-seat private theater, a subterranean car gallery for 8 vehicles, and a master wing that rivals the world's finest 5-star suites.</p>`,
            amenities: ["Oceanfront Infinity Pool", "Subterranean Car Gallery", "20-Seat Private Theater", "Heli-Pad Access", "Private Dock"],
            media: [
                { type: "image", src: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg?auto=compress&cs=tinysrgb&w=1260" }
            ]
        },
        "veranda-suite": {
            title: "The Veranda Suite",
            price: "$2,800,000",
            beds: "03", baths: "04", sqft: "2,800", acres: "N/A",
            headline: "Minimalist <em>Retreat.</em>",
            description: `
                <p>A masterclass in understated luxury located in Lekki Phase 1. The Veranda Suite features a massive wrap-around balcony that extends the living space outdoors, perfect for evening entertaining.</p>
                <p>The interior is finished with warm woods, soft neutral tones, and imported stone, creating a serene environment above the city noise.</p>`,
            amenities: ["Wrap-Around Veranda", "Imported Stone Finishes", "Chef's Kitchen", "Spa-Inspired Bathrooms", "Dedicated Parking"],
            media: [
                { type: "image", src: "https://images.pexels.com/photos/1571469/pexels-photo-1571469.jpeg?auto=compress&cs=tinysrgb&w=1260" }
            ]
        },
        "lumina-residence": {
            title: "Lumina Residence",
            price: "$11,000,000",
            beds: "05", baths: "06", sqft: "9,000", acres: "1.1",
            headline: "Bathed in <em>Light.</em>",
            description: `
                <p>Lumina Residence in Banana Island is an architectural triumph defined by its massive vertical glass panels. The property is designed to capture natural light from dawn until dusk.</p>
                <p>Featuring an interior courtyard, a floating glass staircase, and a serene infinity pool, this estate blurs the line between indoor and outdoor living.</p>`,
            amenities: ["Interior Courtyard", "Floating Glass Staircase", "Zen Garden", "Infinity Lap Pool", "Automated Shading System"],
            media: [
                { type: "image", src: "https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg?auto=compress&cs=tinysrgb&w=1260" }
            ]
        },
        "monarch-penthouse": {
            title: "The Monarch",
            price: "$6,200,000",
            beds: "04", baths: "05", sqft: "5,500", acres: "N/A",
            headline: "The Crown <em>Jewel.</em>",
            description: `
                <p>Commanding the skyline of Ikoyi, The Monarch is a penthouse built for royalty. The vast interior living room features 14-foot ceilings and unparalleled detailing.</p>
                <p>Exclusive amenities include a private elevator landing, a temperature-controlled wine vault, and a rooftop terrace with a private jacuzzi overlooking the lagoon.</p>`,
            amenities: ["Private Elevator Landing", "14-Foot Ceilings", "Rooftop Jacuzzi", "Wine Vault", "Billiard Room"],
            media: [
                { type: "image", src: "https://images.pexels.com/photos/2724749/pexels-photo-2724749.jpeg?auto=compress&cs=tinysrgb&w=1260" }
            ]
        },
        "crescent-villa": {
            title: "Crescent Villa",
            price: "$8,900,000",
            beds: "06", baths: "07", sqft: "8,500", acres: "1.8",
            headline: "Private <em>Oasis.</em>",
            description: `
                <p>Hidden away in Gwarinpa, Crescent Villa offers absolute privacy. The estate is surrounded by mature, landscaped gardens, creating a lush sanctuary.</p>
                <p>The sprawling property includes a detached guest house, an oversized swimming pool, and grand interior spaces perfect for hosting large gatherings.</p>`,
            amenities: ["Lush Landscaped Gardens", "Detached Guest House", "Oversized Swimming Pool", "Grand Entertaining Halls", "High-Security Perimeter"],
            media: [
                { type: "image", src: "https://images.pexels.com/photos/1115804/pexels-photo-1115804.jpeg?auto=compress&cs=tinysrgb&w=1260" }
            ]
        },
        "slate-residence": {
            title: "Slate Residence",
            price: "$5,500,000",
            beds: "05", baths: "06", sqft: "6,000", acres: "0.8",
            headline: "Modernist <em>Edge.</em>",
            description: `
                <p>A striking example of brutalist-inspired modern architecture in Abuja. Slate Residence uses bold geometric lines, dark natural stone, and heavy timber accents to create a powerful visual statement.</p>
                <p>The interior contrasts the sharp exterior with warm, inviting living spaces, a gourmet kitchen, and a master suite designed for ultimate comfort.</p>`,
            amenities: ["Natural Stone Facade", "Gourmet Chef's Kitchen", "Smart Home Integration", "Outdoor Fire Pit", "Home Gym"],
            media: [
                { type: "image", src: "https://images.pexels.com/photos/209296/pexels-photo-209296.jpeg?auto=compress&cs=tinysrgb&w=1260" }
            ]
        }
    };

    // --- 2. GET THE ID FROM THE URL ---
    const urlParams = new URLSearchParams(window.location.search);
    const propertyId = urlParams.get('id') || 'shadow-estate'; // Defaults to shadow-estate if no ID
    const data = propertyDatabase[propertyId];

    if (!data) {
        document.getElementById('prop-title').textContent = "Asset Not Found";
        return; 
    }

    // --- 3. INJECT DATA INTO HTML ---
    document.getElementById('prop-title').textContent = data.title;
    document.getElementById('prop-price').textContent = data.price;
    document.getElementById('prop-beds').textContent = data.beds;
    document.getElementById('prop-baths').textContent = data.baths;
    document.getElementById('prop-sqft').textContent = data.sqft;
    document.getElementById('prop-acres').textContent = data.acres;
    document.getElementById('prop-headline').innerHTML = data.headline;
    document.getElementById('prop-desc').innerHTML = data.description;

    // Inject Amenities
    const amenitiesList = document.getElementById('prop-amenities');
    amenitiesList.innerHTML = '';
    data.amenities.forEach(item => {
        amenitiesList.innerHTML += `<li><span>✔</span> ${item}</li>`;
    });

    // --- 4. INJECT MEDIA & SETUP GALLERY LOGIC ---
    const thumbnailStrip = document.getElementById('thumbnail-strip');
    const featureContainer = document.getElementById('feature-container');
    thumbnailStrip.innerHTML = ''; // Clear old thumbnails

    // Load main media (first item in the array)
    loadMainMedia(data.media[0]);

    // Create thumbnails
    data.media.forEach((item, index) => {
        const thumb = document.createElement('div');
        thumb.className = `thumb-wrapper ${index === 0 ? 'active' : ''}`;
        thumb.setAttribute('data-type', item.type);
        thumb.setAttribute('data-src', item.src);

        if (item.type === 'image') {
            thumb.innerHTML = `<img src="${item.src}" alt="Thumbnail">`;
        } else if (item.type === 'video') {
            thumb.innerHTML = `<video muted loop playsinline><source src="${item.src}" type="video/mp4"></video><div class="play-icon">▶</div>`;
        }

        // Add click event to change main media
        thumb.addEventListener('click', () => {
            document.querySelectorAll('.thumb-wrapper').forEach(t => t.classList.remove('active'));
            thumb.classList.add('active');
            loadMainMedia(item);
        });

        thumbnailStrip.appendChild(thumb);
    });

    // Helper function to load main media
    function loadMainMedia(item) {
        featureContainer.innerHTML = '';
        if (item.type === 'image') {
            const img = document.createElement('img');
            img.src = item.src;
            img.className = 'main-media fade-in';
            featureContainer.appendChild(img);
        } else if (item.type === 'video') {
            const video = document.createElement('video');
            video.className = 'main-media fade-in';
            video.autoplay = true; video.muted = true; video.loop = true; video.playsInline = true;
            const source = document.createElement('source');
            source.src = item.src; source.type = 'video/mp4';
            video.appendChild(source);
            featureContainer.appendChild(video);
        }
    }
});