// Direct fix for mobile slider styling and popular products
document.addEventListener('DOMContentLoaded', function() {
    console.log('Applying direct fixes for slider and product components');
    
    // Force immediate execution and check again after a delay
    applyFixes();
    setTimeout(applyFixes, 1000);
    setTimeout(applyFixes, 2000);
    
    function applyFixes() {
        // Find the home slider container
        const homeSliders = document.querySelectorAll('home-slider');
        if (homeSliders.length > 0) {
            console.log('Found home-slider component tags:', homeSliders.length);
            
            // For each home slider, inject the necessary elements
            homeSliders.forEach(function(sliderElement) {
                // Only inject if not already processed
                if (!sliderElement.hasAttribute('data-fixed')) {
                    console.log('Fixing a slider element');
                    
                    // Create a container with the proper structure
                    const container = document.createElement('div');
                    container.className = 'home-slider-container';
                    
                    // Create the swiper structure
                    const swiperContainer = document.createElement('div');
                    swiperContainer.className = 'swiper-container swiper-initialized';
                    
                    // Create the pagination element
                    const pagination = document.createElement('div');
                    pagination.className = 'swiper-pagination';
                    pagination.style.display = 'flex';
                    pagination.style.justifyContent = 'center';
                    pagination.style.position = 'absolute';
                    pagination.style.bottom = '10px';
                    pagination.style.width = '100%';
                    
                    // Add pagination bullets
                    for (let i = 0; i < 3; i++) {
                        const bullet = document.createElement('span');
                        bullet.className = 'swiper-pagination-bullet';
                        if (i === 0) bullet.className += ' swiper-pagination-bullet-active';
                        bullet.style.width = '8px';
                        bullet.style.height = '8px';
                        bullet.style.margin = '0 4px';
                        bullet.style.borderRadius = '50%';
                        bullet.style.background = '#fff';
                        bullet.style.opacity = i === 0 ? '1' : '0.5';
                        bullet.style.cursor = 'pointer';
                        pagination.appendChild(bullet);
                    }
                    
                    // Add pagination to the swiper container
                    swiperContainer.appendChild(pagination);
                    
                    // Add navigation buttons
                    const prevButton = document.createElement('div');
                    prevButton.className = 'swiper-button-prev';
                    prevButton.id = 'home-slide-prev';
                    
                    const nextButton = document.createElement('div');
                    nextButton.className = 'swiper-button-next';
                    nextButton.id = 'home-slide-next';
                    
                    swiperContainer.appendChild(prevButton);
                    swiperContainer.appendChild(nextButton);
                    
                    // Mark as processed
                    sliderElement.setAttribute('data-fixed', 'true');
                    
                    // Try to find the real Vue-rendered content
                    const swiperElement = sliderElement.querySelector('.swiper-container');
                    if (swiperElement) {
                        console.log('Found swiper container, adding pagination');
                        // If Vue did render the component, just add our pagination
                        if (!swiperElement.querySelector('.swiper-pagination')) {
                            swiperElement.appendChild(pagination.cloneNode(true));
                        }
                    } else {
                        console.log('No swiper container found, injecting complete structure');
                        // Otherwise inject our structure after the slider tag
                        const parent = sliderElement.parentNode;
                        parent.insertBefore(container, sliderElement.nextSibling);
                        container.appendChild(swiperContainer);
                    }
                }
            });
        } else {
            console.log('No home-slider elements found');
        }
        
        // Fix for mobile-specific styles
        if (window.innerWidth <= 767) {
            // Add a style element with the mobile-specific CSS
            const styleElement = document.getElementById('mobile-slider-styles');
            if (!styleElement) {
                const newStyle = document.createElement('style');
                newStyle.id = 'mobile-slider-styles';
                newStyle.textContent = `
                    .home-slider-container {
                        padding-bottom: 30px;
                    }
                    
                    .slider-content {
                        height: 400px !important;
                        align-items: center;
                        text-align: center;
                    }
                    
                    .slider-content h2 {
                        font-size: 36px !important;
                        padding: 10px 20px;
                        text-align: center;
                        max-width: 100%;
                    }
                    
                    .slider-content p {
                        font-size: 24px !important;
                        padding: 10px 20px 20px;
                        text-align: center;
                        max-width: 100%;
                    }
                    
                    .slider-cta-button {
                        font-weight: bold;
                        padding: 15px 25px !important;
                    }
                    
                    .swiper-pagination {
                        position: absolute;
                        bottom: 10px !important;
                        display: flex !important;
                        justify-content: center;
                        width: 100%;
                    }
                `;
                document.head.appendChild(newStyle);
                console.log('Added mobile-specific styles');
            }
        }
        
        // Fix for popular products component
        const popularProducts = document.querySelectorAll('popular-products');
        if (popularProducts.length > 0) {
            console.log('Found popular-products component tags:', popularProducts.length);
            
            // For each popular products component, add mobile-friendly styling
            popularProducts.forEach(function(productElement) {
                // Only process if not already fixed
                if (!productElement.hasAttribute('data-fixed')) {
                    console.log('Fixing a popular products element');
                    
                    // Add mobile-specific styles for product cards if on mobile
                    if (window.innerWidth <= 767) {
                        const styleElement = document.getElementById('mobile-product-styles');
                        if (!styleElement) {
                            const newStyle = document.createElement('style');
                            newStyle.id = 'mobile-product-styles';
                            newStyle.textContent = `
                                /* Mobile styles for product cards */
                                .swiper-container.products-swiper {
                                    padding: 0 20px;
                                    overflow: visible;
                                }
                                
                                .swiper-slide.product-card {
                                    width: calc(100% - 20px) !important;
                                    margin-right: 20px;
                                }
                                
                                @media (max-width: 480px) {
                                    .swiper-container.products-swiper {
                                        padding: 0 10px;
                                    }
                                    
                                    .swiper-slide.product-card {
                                        width: calc(100% - 10px) !important;
                                        margin-right: 10px;
                                    }
                                    
                                    .product-card-image {
                                        height: 220px !important;
                                    }
                                    
                                    .product-card-title {
                                        font-size: 18px !important;
                                    }
                                    
                                    .product-card-price {
                                        font-size: 16px !important;
                                    }
                                }
                            `;
                            document.head.appendChild(newStyle);
                            console.log('Added mobile-specific product styles');
                        }
                    }
                    
                    // Mark as processed
                    productElement.setAttribute('data-fixed', 'true');
                }
            });
        } else {
            console.log('No popular-products elements found');
        }
    }
});