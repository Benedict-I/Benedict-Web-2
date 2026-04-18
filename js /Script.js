document.addEventListener('DOMContentLoaded', function() {
    // --- Scroll-Triggered Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the animation class
                entry.target.style.animation = `slideFadeIn 0.8s ease-out forwards ${entry.target.dataset.animationDelay || '0s'}`;
                // Once animated, we don't need to observe it anymore (optional)
                observer.unobserve(entry.target);
            }
        });
    };
    const observer = new IntersectionObserver(observerCallback, observerOptions);
    animatedElements.forEach(el => {
        // Add a data-animation-delay attribute if needed for staggering
        // Example: <div class="animate-on-scroll" data-animation-delay="0.3s">...</div>
        observer.observe(el);
    });
    // --- Mobile Menu Toggle ---
    const nav = document.querySelector('nav ul');
    const headerContainer = document.querySelector('header .container');
    const menuButton = document.querySelector('.menu-toggle'); // Get the button
    // Ensure menu button exists before adding event listener
    if (menuButton) {
        menuButton.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuButton.classList.toggle('active');
        });
        // Close menu when a link is clicked
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuButton.classList.remove('active');
                }
            });
        });
    }
    // Re-check for mobile menu on window resize
    window.addEventListener('resize', function() {
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            if (!headerContainer.contains(menuButton)) {
                headerContainer.insertBefore(menuButton, nav);
            }
        } else {
            if (headerContainer.contains(menuButton)) {
                headerContainer.removeChild(menuButton);
            }
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuButton.classList.remove('active');
            }
        }
    });
    // Initial check on load
    if (window.innerWidth <= 768) {
        if (!headerContainer.contains(menuButton)) {
            headerContainer.insertBefore(menuButton, nav);
        }
    } else {
        if (headerContainer.contains(menuButton)) {
            headerContainer.removeChild(menuButton);
        }
    }
    // --- Subtle Image Zoom on Portfolio Items ---
    // Handled directly in CSS: .portfolio-item:hover img { transform: scale(1.05); }
    // --- Smooth Scrolling ---
    // Handled by CSS: scroll-behavior: smooth; in body styles.
    // --- Hero Animation ---
    // This is handled by CSS animations defined in the stylesheet.
    // The .hero-content, .hero h1, .hero p, .hero-cta have their animations set.
}); // End DOMContentLoaded
3. HTML Modifications
You need to add the .animate-on-scroll class to elements you want to animate as they scroll into view. You can also add data-animation-delay for staggering.
Example:
In index.html (Hero section): The .hero-content, .hero h1, .hero p, and .hero-cta already have their animations defined directly in CSS.
In index.html (Services Overview):
html
<section class="services-overview">
    <div class="container">
        <h2 class="animate-on-scroll">Your Services at a Glance</h2> <!-- Added class -->
        <div class="service-icons">
            <div class="service-item animate-on-scroll" data-animation-delay="0.3s"> <!-- Added class and delay -->
                <h3>Ghostwriting</h3>
                <p>Your voice, my pen.</p>
            </div>
            <div class="service-item animate-on-scroll" data-animation-delay="0.5s"> <!-- Added class and delay -->
                <h3>Publishing</h3>
                <p>Navigate the path to print.</p>
            </div>
            <div class="service-item animate-on-scroll" data-animation-delay="0.7s"> <!-- Added class and delay -->
                <h3>Promotion</h3>
                <p>Connect with your audience.</p>
            </div>
        </div>
    </div>
</section>
