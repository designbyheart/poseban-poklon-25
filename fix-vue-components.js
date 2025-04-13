// Helper script to fix Vue component issues
document.addEventListener('DOMContentLoaded', function() {
    console.log('Checking for Vue components');
    
    // Timeout to ensure Vue has time to initialize
    setTimeout(function() {
        // Check for pagination
        const pagination = document.querySelector('.swiper-pagination');
        if (pagination) {
            console.log('Found pagination element:', pagination);
            
            // Force display for testing
            pagination.style.display = 'flex';
            pagination.style.justifyContent = 'center';
            pagination.style.position = 'absolute';
            pagination.style.bottom = '10px';
            pagination.style.width = '100%';
            
            // If no bullets, add them
            if (pagination.children.length === 0) {
                const swiperSlides = document.querySelectorAll('.swiper-slide');
                const slideCount = swiperSlides.length;
                
                console.log('Adding pagination bullets for', slideCount, 'slides');
                
                for (let i = 0; i < slideCount; i++) {
                    const bullet = document.createElement('span');
                    bullet.className = 'swiper-pagination-bullet';
                    if (i === 0) bullet.className += ' swiper-pagination-bullet-active';
                    pagination.appendChild(bullet);
                }
            }
        } else {
            console.warn('Pagination element not found');
        }
        
        // Check for mobile styling
        const sliderContent = document.querySelectorAll('.slider-content');
        if (sliderContent.length > 0) {
            console.log('Found slider content elements:', sliderContent.length);
            
            // Force apply mobile styles for testing on small screens
            if (window.innerWidth <= 767) {
                sliderContent.forEach(element => {
                    element.style.height = '400px';
                    element.style.alignItems = 'center';
                    element.style.textAlign = 'center';
                });
                
                const titles = document.querySelectorAll('.slider-content h2');
                titles.forEach(title => {
                    title.style.fontSize = '36px';
                    title.style.padding = '10px 20px';
                    title.style.textAlign = 'center';
                    title.style.maxWidth = '100%';
                });
                
                const descriptions = document.querySelectorAll('.slider-content p');
                descriptions.forEach(desc => {
                    desc.style.fontSize = '24px';
                    desc.style.padding = '10px 20px 20px';
                    desc.style.textAlign = 'center';
                    desc.style.maxWidth = '100%';
                });
                
                const buttons = document.querySelectorAll('.slider-cta-button');
                buttons.forEach(button => {
                    button.style.fontWeight = 'bold';
                    button.style.padding = '15px 25px';
                });
            }
        } else {
            console.warn('Slider content elements not found');
        }
    }, 500); // Give Vue time to render
});