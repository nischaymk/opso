// Navigation and Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    const overlay = document.querySelector('.overlay');
    
    // Create overlay if it doesn't exist
    if (!overlay) {
        const newOverlay = document.createElement('div');
        newOverlay.className = 'overlay';
        document.body.appendChild(newOverlay);
    }
    
    // Mobile menu functionality
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
            
            // Show/hide overlay
            if (document.querySelector('.overlay')) {
                document.querySelector('.overlay').classList.toggle('active');
            }
        });
        
        // Close mobile menu when clicking on overlay
        document.addEventListener('click', function(e) {
            if (mainNav.classList.contains('active') && 
                !mainNav.contains(e.target) && 
                !mobileMenuToggle.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        // Close mobile menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && mainNav.classList.contains('active')) {
                closeMobileMenu();
            }
        });
        
        function closeMobileMenu() {
            mobileMenuToggle.classList.remove('active');
            mainNav.classList.remove('active');
            document.body.style.overflow = '';
            if (document.querySelector('.overlay')) {
                document.querySelector('.overlay').classList.remove('active');
            }
        }
        
        // Mobile dropdown functionality
        const navItemsWithDropdown = document.querySelectorAll('.nav-item:has(.dropdown-menu)');
        navItemsWithDropdown.forEach(item => {
            const navLink = item.querySelector('.nav-link');
            const dropdown = item.querySelector('.dropdown-menu');
            
            navLink.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Close other open dropdowns
                    document.querySelectorAll('.dropdown-menu.active').forEach(otherDropdown => {
                        if (otherDropdown !== dropdown) {
                            otherDropdown.classList.remove('active');
                        }
                    });
                    
                    // Toggle current dropdown
                    dropdown.classList.toggle('active');
                    
                    // Rotate icon
                    const icon = this.querySelector('i');
                    if (icon) {
                        icon.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
                    }
                }
            });
        });
        
        // Close dropdowns when clicking outside on mobile
        document.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                if (!e.target.closest('.nav-item')) {
                    document.querySelectorAll('.dropdown-menu.active').forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
                    document.querySelectorAll('.nav-link i').forEach(icon => {
                        icon.style.transform = 'rotate(0)';
                    });
                }
            }
        });
    }
    
    // Desktop dropdown hover functionality
    function handleDesktopDropdowns() {
        const navItems = document.querySelectorAll('.nav-item');
        
        navItems.forEach(item => {
            const dropdown = item.querySelector('.dropdown-menu');
            
            if (dropdown) {
                item.addEventListener('mouseenter', function() {
                    if (window.innerWidth > 768) {
                        dropdown.style.opacity = '1';
                        dropdown.style.visibility = 'visible';
                        dropdown.style.transform = 'translateX(-50%) translateY(8px)';
                    }
                });
                
                item.addEventListener('mouseleave', function() {
                    if (window.innerWidth > 768) {
                        dropdown.style.opacity = '0';
                        dropdown.style.visibility = 'hidden';
                        dropdown.style.transform = 'translateX(-50%) translateY(15px)';
                    }
                });
            }
        });
    }
    
    // Initialize desktop dropdowns
    handleDesktopDropdowns();
    
    // Update dropdown behavior on window resize
    window.addEventListener('resize', function() {
        handleDesktopDropdowns();
        
        // Close mobile menu when switching to desktop
        if (window.innerWidth > 768 && mainNav) {
            mainNav.classList.remove('active');
            if (mobileMenuToggle) {
                mobileMenuToggle.classList.remove('active');
            }
            document.body.style.overflow = '';
            if (document.querySelector('.overlay')) {
                document.querySelector('.overlay').classList.remove('active');
            }
            
            // Reset all dropdowns
            document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
            document.querySelectorAll('.nav-link i').forEach(icon => {
                icon.style.transform = 'rotate(0)';
            });
        }
    });
    
    // Active Link Highlighting
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    
    // Highlight main navigation links
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === 'index.html' && (linkHref === '#' || linkHref === './' || !linkHref))) {
            link.classList.add('active');
            
            // If it's a dropdown parent, keep the dropdown open on mobile
            const dropdown = link.closest('.nav-item')?.querySelector('.dropdown-menu');
            if (dropdown && window.innerWidth <= 768) {
                dropdown.classList.add('active');
                const icon = link.querySelector('i');
                if (icon) {
                    icon.style.transform = 'rotate(180deg)';
                }
            }
        }
    });
    
    // Highlight dropdown items
    dropdownItems.forEach(item => {
        const itemHref = item.getAttribute('href');
        if (itemHref === currentPage) {
            item.classList.add('active');
            
            // Also highlight parent in main navigation
            const parentLink = item.closest('.nav-item')?.querySelector('.nav-link');
            if (parentLink) {
                parentLink.classList.add('active');
                
                // Keep dropdown open on mobile
                const dropdown = item.closest('.dropdown-menu');
                if (dropdown && window.innerWidth <= 768) {
                    dropdown.classList.add('active');
                    const icon = parentLink.querySelector('i');
                    if (icon) {
                        icon.style.transform = 'rotate(180deg)';
                    }
                }
            }
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (mainNav && mainNav.classList.contains('active')) {
                    mainNav.classList.remove('active');
                    if (mobileMenuToggle) {
                        mobileMenuToggle.classList.remove('active');
                    }
                    document.body.style.overflow = '';
                    if (document.querySelector('.overlay')) {
                        document.querySelector('.overlay').classList.remove('active');
                    }
                }
                
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .researcher-profile, .form-group, .grid-2 > div, .grid-3 > div, .grid-4 > div');
    animateElements.forEach(el => {
        el.classList.add('fade-element');
        observer.observe(el);
    });
    
    // Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            
            let isValid = true;
            
            // Reset previous error states
            contactForm.querySelectorAll('.error').forEach(error => error.remove());
            contactForm.querySelectorAll('.form-control').forEach(input => {
                input.classList.remove('error');
            });
            
            // Validate name
            if (!name.value.trim()) {
                showError(name, 'Please enter your name');
                isValid = false;
            }
            
            // Validate email
            if (!email.value.trim()) {
                showError(email, 'Please enter your email');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Validate message
            if (!message.value.trim()) {
                showError(message, 'Please enter your message');
                isValid = false;
            }
            
            if (isValid) {
                // Show loading state
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>Sending...</span>';
                submitBtn.disabled = true;
                
                // Simulate form submission
                setTimeout(() => {
                    // In a real application, you would send the form data to a server here
                    showNotification('Thank you for your message! We will get back to you soon.', 'success');
                    contactForm.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 2000);
            }
            
            function showError(input, message) {
                input.classList.add('error');
                const errorElement = document.createElement('div');
                errorElement.className = 'error';
                errorElement.style.color = 'var(--accent)';
                errorElement.style.fontSize = '0.9rem';
                errorElement.style.marginTop = '5px';
                errorElement.textContent = message;
                input.parentNode.appendChild(errorElement);
            }
            
            function isValidEmail(email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailRegex.test(email);
            }
        });
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;
        
        // Add styles if not already added
        if (!document.querySelector('#notification-styles')) {
            const styles = document.createElement('style');
            styles.id = 'notification-styles';
            styles.textContent = `
                .notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: white;
                    padding: 15px 20px;
                    border-radius: var(--border-radius);
                    box-shadow: var(--shadow-lg);
                    border-left: 4px solid var(--primary);
                    z-index: 10000;
                    max-width: 400px;
                    transform: translateX(150%);
                    transition: transform 0.3s ease;
                }
                .notification-success {
                    border-left-color: #48bb78;
                }
                .notification-error {
                    border-left-color: var(--accent);
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    justify-content: between;
                }
                .notification-close {
                    background: none;
                    border: none;
                    font-size: 1.2rem;
                    cursor: pointer;
                    margin-left: 15px;
                    color: var(--text-light);
                }
                .notification.show {
                    transform: translateX(0);
                }
            `;
            document.head.appendChild(styles);
        }
        
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Close button
        notification.querySelector('.notification-close').addEventListener('click', () => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }
        }, 5000);
    }
    
    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn:not([type="submit"])');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.href || this.getAttribute('href') === '#' || this.getAttribute('href').startsWith('#')) {
                this.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    this.style.pointerEvents = 'auto';
                }, 1000);
            }
        });
    });
    
    // Sticky header enhancement
    let lastScrollY = window.scrollY;
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        }
        
        lastScrollY = window.scrollY;
    });
    
    // Add CSS for fade elements
    if (!document.querySelector('#fade-styles')) {
        const fadeStyles = document.createElement('style');
        fadeStyles.id = 'fade-styles';
        fadeStyles.textContent = `
            .fade-element {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            .fade-element.fade-in-up {
                opacity: 1;
                transform: translateY(0);
            }
            .form-control.error {
                border-color: var(--accent) !important;
            }
            .overlay {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                z-index: 999;
                opacity: 0;
                visibility: hidden;
                transition: var(--transition);
            }
            .overlay.active {
                opacity: 1;
                visibility: visible;
            }
        `;
        document.head.appendChild(fadeStyles);
    }
});

// Initialize when everything is loaded
window.addEventListener('load', function() {
    // Add loaded class for any additional animations
    document.body.classList.add('loaded');
});