// Navigation and Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavClose = document.querySelector('.mobile-nav-close');
    const overlay = document.querySelector('.overlay');
    
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', function() {
            mobileNav.classList.add('active');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    }
    
    if (mobileNavClose) {
        mobileNavClose.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    if (overlay) {
        overlay.addEventListener('click', function() {
            mobileNav.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
    
    // Mobile Dropdown Toggle
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach(link => {
        if (link.nextElementSibling && link.nextElementSibling.classList.contains('mobile-dropdown')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const dropdown = this.nextElementSibling;
                dropdown.classList.toggle('active');
                
                // Rotate icon if present
                const icon = this.querySelector('i');
                if (icon) {
                    icon.style.transform = dropdown.classList.contains('active') ? 'rotate(180deg)' : 'rotate(0)';
                }
            });
        }
    });
    
    // Active Link Highlighting
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const dropdownItems = document.querySelectorAll('.dropdown-item, .mobile-dropdown-item');
    
    // Highlight main navigation links
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
            
            // Also highlight parent in mobile dropdown
            if (link.classList.contains('mobile-nav-link')) {
                const dropdown = link.nextElementSibling;
                if (dropdown && dropdown.classList.contains('mobile-dropdown')) {
                    dropdown.classList.add('active');
                    const icon = link.querySelector('i');
                    if (icon) {
                        icon.style.transform = 'rotate(180deg)';
                    }
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
            const parentLink = item.closest('.nav-item')?.querySelector('.nav-link') || 
                              item.closest('.mobile-nav-item')?.querySelector('.mobile-nav-link');
            if (parentLink) {
                parentLink.classList.add('active');
            }
        }
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
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .researcher-profile, .form-group, .grid-2 > div, .grid-3 > div');
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simple form validation
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            if (name && email && message) {
                // In a real application, you would send the form data to a server here
                alert('Thank you for your message! We will get back to you soon.');
                contactForm.reset();
            } else {
                alert('Please fill in all required fields.');
            }
        });
    }
    
    // Add loading animation to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            if (this.getAttribute('type') !== 'submit') {
                this.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    this.style.pointerEvents = 'auto';
                }, 1000);
            }
        });
    });
});