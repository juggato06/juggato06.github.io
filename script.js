document.addEventListener('DOMContentLoaded', () => {
    const viewport = document.querySelector('.projects-viewport');
    const track = document.querySelector('.projects-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (!viewport || !track) return;

    // We no longer need the cloning logic for this simplified loop. 
    // You can remove the cloned elements from your index.html if you want, 
    // but the script will ignore them.
    
    const projectBoxes = Array.from(track.querySelectorAll('.project-box'));
    const gap = 32;       // 2rem gap = 32px (Based on your CSS)
    const cardWidth = 380; // Project Box Width (380px)
    const scrollStep = cardWidth + gap; 
    const autoScrollDelay = 4000; 

    let intervalId = null;

    // --- Core Scrolling Function ---
    const updateScroll = (amount, behavior = 'smooth') => {
        viewport.scroll({
            left: amount,
            behavior: behavior
        });
    };
    
    // --- Autoscroll Logic: Scroll forward, then snap back to start ---
    const autoScroll = () => {
        const currentScroll = viewport.scrollLeft;
        const maxScroll = track.scrollWidth - viewport.clientWidth;
        
        // Check if we are near or at the end of the scrollable content
        if (currentScroll >= maxScroll - 5) { // -5 safety margin
            
            // 1. Instantly snap back to the beginning (Position 0)
            updateScroll(0, 'instant');
            
            // 2. Restart the smooth scroll from the beginning
            updateScroll(scrollStep);

        } else {
            // Smoothly scroll forward by one project card length
            updateScroll(currentScroll + scrollStep);
        }
    };

    // --- Autoplay Controls ---
    const startAutoScroll = () => {
        if (!intervalId) {
            intervalId = setInterval(autoScroll, autoScrollDelay);
        }
    };
    
    const stopAutoScroll = () => {
        clearInterval(intervalId);
        intervalId = null;
    };

    // --- Manual Button Controls (Simple scroll) ---
    
    nextBtn.addEventListener('click', () => {
        stopAutoScroll(); 
        viewport.scrollBy({ left: scrollStep, behavior: 'smooth' });
        startAutoScroll();
    });
    
    prevBtn.addEventListener('click', () => {
        stopAutoScroll(); 
        viewport.scrollBy({ left: -scrollStep, behavior: 'smooth' });
        startAutoScroll();
    });
    
    // Pause on interaction
    viewport.addEventListener('mouseenter', stopAutoScroll);
    viewport.addEventListener('mouseleave', startAutoScroll);

    // Initial start
    startAutoScroll();
});