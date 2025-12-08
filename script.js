document.addEventListener('DOMContentLoaded', () => {
    const viewport = document.querySelector('.projects-viewport');
    const track = document.querySelector('.projects-track');
    const prevBtn = document.querySelector('.carousel-btn.prev');
    const nextBtn = document.querySelector('.carousel-btn.next');
    
    if (!viewport || !track) return;

    let scrollAmount = 0;
    const scrollStep = 350 + 32; // Project Box Width (350px) + Gap (2rem = 32px)
    const autoScrollDelay = 4000; // Time in ms before auto-scrolling

    // --- Core Scrolling Function ---
    const updateScroll = () => {
        // Use smooth scrolling behavior for a nicer look
        viewport.scroll({
            left: scrollAmount,
            behavior: 'smooth'
        });
    };
    
    // --- Autoscroll Functionality ---
    const autoScroll = () => {
        // Check if we are near the end of the track
        if (viewport.scrollLeft + viewport.clientWidth >= track.scrollWidth) {
            // Scroll back to the beginning seamlessly
            scrollAmount = 0;
        } else {
            // Move forward by one project card
            scrollAmount += scrollStep;
        }
        updateScroll();
    };

    // Start auto-scrolling
    let intervalId = setInterval(autoScroll, autoScrollDelay);

    // --- Pause Autoscroll on Hover ---
    const stopAutoScroll = () => {
        clearInterval(intervalId);
        intervalId = null;
    };
    
    const startAutoScroll = () => {
        if (!intervalId) {
            intervalId = setInterval(autoScroll, autoScrollDelay);
        }
    };
    
    viewport.addEventListener('mouseenter', stopAutoScroll);
    viewport.addEventListener('mouseleave', startAutoScroll);

    // --- Manual Button Functionality ---
    prevBtn.addEventListener('click', () => {
        scrollAmount = Math.max(0, viewport.scrollLeft - scrollStep);
        updateScroll();
        stopAutoScroll(); // Stop auto-scroll after manual interaction
        startAutoScroll();
    });

    nextBtn.addEventListener('click', () => {
        scrollAmount = viewport.scrollLeft + scrollStep;
        // Limit scroll to the end of the content
        const maxScroll = track.scrollWidth - viewport.clientWidth;
        if (scrollAmount > maxScroll) {
            scrollAmount = 0; // Loop back to start
        }
        updateScroll();
        stopAutoScroll(); // Stop auto-scroll after manual interaction
        startAutoScroll();
    });
    
    // Ensure scrollAmount is correctly set on initialization
    scrollAmount = viewport.scrollLeft;
});