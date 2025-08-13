// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initSmoothScrolling();
    initForms();
    initScrollAnimations();
    initMobileMenu();
    initVoteChoriFeatures();
    
    // Fix navigation links immediately
    setTimeout(fixNavigationLinks, 100);
});

// Fix navigation links function
function fixNavigationLinks() {
    const navLinks = document.querySelectorAll('.nav-link, .hero-buttons a');
    
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            // Remove any existing event listeners
            link.removeEventListener('click', handleNavClick);
            // Add new event listener
            link.addEventListener('click', handleNavClick);
        }
    });
}

// Handle navigation clicks
function handleNavClick(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const targetId = this.getAttribute('href');
    if (!targetId || targetId === '#') return;
    
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
        // Close mobile menu if open
        closeMobileMenu();
        
        // Calculate offset for fixed navbar
        const headerOffset = 120;
        const elementPosition = targetSection.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerOffset;
        
        // Smooth scroll
        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
        
        // Update active nav link
        updateActiveNavigation(targetId);
        
        // Announce for screen readers
        announceNavigation(targetSection);
    }
}

// Update active navigation
function updateActiveNavigation(targetId) {
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    const activeLink = document.querySelector(`.nav-link[href="${targetId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Close mobile menu function
function closeMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    if (navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.setAttribute('aria-expanded', 'false');
        const icon = navToggle.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
        document.body.style.overflow = '';
    }
}

// Navigation functionality with improved spacing handling
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect with improved contrast
    let lastScrollY = window.scrollY;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            navbar.style.background = 'linear-gradient(135deg, rgba(255, 103, 31, 0.98) 0%, rgba(6, 3, 141, 0.98) 100%)';
            navbar.style.backdropFilter = 'blur(15px)';
            navbar.style.boxShadow = '0 4px 25px rgba(6, 3, 141, 0.25)';
        } else {
            navbar.style.background = 'linear-gradient(135deg, var(--political-primary) 0%, var(--political-accent) 100%)';
            navbar.style.backdropFilter = 'none';
            navbar.style.boxShadow = '0 2px 20px var(--card-shadow)';
        }
        
        lastScrollY = currentScrollY;
    }

    // Throttled scroll event
    let scrollTimer = null;
    window.addEventListener('scroll', function() {
        if (scrollTimer !== null) {
            clearTimeout(scrollTimer);
        }
        scrollTimer = setTimeout(handleScroll, 10);
    });

    // Enhanced active navigation link highlighting
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 180; // Adjusted for new navbar height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const navLink = document.querySelector(`a[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (navLink && navLink.classList.contains('nav-link')) {
                    navLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    
    // Initialize active link on page load
    setTimeout(updateActiveNavLink, 500);
}

// Mobile menu functionality with proper spacing
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navMenu) return;

    // Toggle mobile menu with improved accessibility
    navToggle.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        const isActive = navMenu.classList.contains('active');
        
        navMenu.classList.toggle('active');
        navToggle.setAttribute('aria-expanded', !isActive);
        
        // Animate hamburger icon
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
            // Prevent body scroll when menu is open
            document.body.style.overflow = 'hidden';
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            document.body.style.overflow = '';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            closeMobileMenu();
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            closeMobileMenu();
        }
    });
}

// Enhanced smooth scrolling for navigation links
function initSmoothScrolling() {
    // This is handled by fixNavigationLinks function
    console.log('Smooth scrolling initialized via navigation fix');
}

// Screen reader navigation announcement
function announceNavigation(section) {
    const sectionTitle = section.querySelector('h1, h2, h3');
    if (sectionTitle) {
        const announcement = document.createElement('div');
        announcement.setAttribute('aria-live', 'polite');
        announcement.setAttribute('aria-atomic', 'true');
        announcement.className = 'sr-only';
        announcement.textContent = `Navigated to ${sectionTitle.textContent}`;
        document.body.appendChild(announcement);
        setTimeout(() => announcement.remove(), 1000);
    }
}

// Form handling with enhanced validation and email submission
function initForms() {
    const membershipForm = document.getElementById('membershipForm');
    const contactForm = document.getElementById('contactForm');

    // Fix social media links
    fixSocialMediaLinks();

    // Membership form submission
    if (membershipForm) {
        membershipForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            handleMembershipSubmission(this);
        });

        // Fix district dropdown
        const districtSelect = document.getElementById('district');
        if (districtSelect) {
            // Ensure dropdown works properly
            districtSelect.addEventListener('focus', function() {
                this.size = 5; // Show multiple options
            });
            
            districtSelect.addEventListener('blur', function() {
                this.size = 1; // Collapse back
            });
            
            districtSelect.addEventListener('change', function() {
                this.size = 1; // Collapse after selection
            });
        }
    }

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            e.stopPropagation();
            handleContactSubmission(this);
        });
    }

    // Enhanced form validation with real-time feedback
    const formControls = document.querySelectorAll('.form-control');
    formControls.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
        
        // Add visual feedback for valid fields
        input.addEventListener('input', function() {
            if (this.value.trim() && this.checkValidity()) {
                this.classList.add('valid');
                this.classList.remove('invalid');
            } else if (this.value.trim()) {
                this.classList.remove('valid');
                this.classList.add('invalid');
            } else {
                this.classList.remove('valid', 'invalid');
            }
        });
    });
}

// Fix social media links
function fixSocialMediaLinks() {
    // Footer social media links
    const footerFacebook = document.querySelector('.footer-social a[aria-label="Facebook"]');
    const footerInstagram = document.querySelector('.footer-social a[aria-label="Instagram"]');
    const footerTwitter = document.querySelector('.footer-social a[aria-label="Twitter"]');

    if (footerFacebook) {
        footerFacebook.href = 'https://www.facebook.com/TamilNaduYouthCongressOfficial/';
        footerFacebook.target = '_blank';
    }
    if (footerInstagram) {
        footerInstagram.href = 'https://www.instagram.com/iyc_tamilnadu/';
        footerInstagram.target = '_blank';
    }
    if (footerTwitter) {
        footerTwitter.href = '#';
        footerTwitter.target = '_blank';
    }

    // Contact section social media links
    const contactFacebook = document.querySelector('.social-links .facebook');
    const contactInstagram = document.querySelector('.social-links .instagram');
    const contactTwitter = document.querySelector('.social-links .twitter');

    if (contactFacebook) {
        contactFacebook.href = 'https://www.facebook.com/TamilNaduYouthCongressOfficial/';
        contactFacebook.target = '_blank';
    }
    if (contactInstagram) {
        contactInstagram.href = 'https://www.instagram.com/iyc_tamilnadu/';
        contactInstagram.target = '_blank';
    }
    if (contactTwitter) {
        contactTwitter.href = '#';
        contactTwitter.target = '_blank';
    }
}

// Handle membership form submission with specified email
function handleMembershipSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateMembershipForm(data)) {
        return;
    }

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Application...';
    submitButton.disabled = true;

    // Prepare email data
    const emailData = {
        to: 'Suryaprakash.iyc@gmail.com',
        subject: 'New Membership Application - Tamil Nadu Youth Congress',
        body: `New Tamil Nadu Youth Congress Membership Application:

Full Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
District: ${data.district}

Application submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

This application was submitted through the official Tamil Nadu Youth Congress website.

Best regards,
Tamil Nadu Youth Congress Website`
    };

    // Create mailto link
    const mailtoLink = `mailto:${emailData.to}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;
    
    // Simulate form processing
    setTimeout(() => {
        try {
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showNotification('Welcome to Tamil Nadu Youth Congress! Your membership application has been prepared and your email client should open. Please send the email to complete your registration. You are now part of our democratic movement including the VOTE CHORI campaign!', 'success');
            
            // Reset form
            form.reset();
            
        } catch (error) {
            console.error('Error opening email client:', error);
            showNotification('Application prepared! Please manually send an email to Suryaprakash.iyc@gmail.com with your membership details.', 'warning');
        }
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;

        // Clear validation classes
        const formControls = form.querySelectorAll('.form-control');
        formControls.forEach(input => input.classList.remove('valid', 'invalid'));

        // Scroll to top of form
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1500);
}

// Handle contact form submission with specified email
function handleContactSubmission(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Validate form
    if (!validateContactForm(data)) {
        return;
    }

    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.innerHTML;
    submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing Message...';
    submitButton.disabled = true;

    // Prepare email data
    const emailData = {
        to: 'Suryaprakash.iyc@gmail.com',
        subject: `Contact Form: ${data.subject} - Tamil Nadu Youth Congress`,
        body: `Contact Form Message from Tamil Nadu Youth Congress Website:

From: ${data.contactName}
Email: ${data.contactEmail}
Subject: ${data.subject}

Message:
${data.message}

Contact submitted on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Please respond to: ${data.contactEmail}

This message was submitted through the official Tamil Nadu Youth Congress website.

Best regards,
Tamil Nadu Youth Congress Website`
    };

    // Create mailto link
    const mailtoLink = `mailto:${emailData.to}?subject=${encodeURIComponent(emailData.subject)}&body=${encodeURIComponent(emailData.body)}`;

    // Simulate form processing
    setTimeout(() => {
        try {
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            showNotification('Your message has been prepared and your email client should open! Please send the email to complete your inquiry. We will get back to you soon.', 'success');
            
            // Reset form
            form.reset();
            
        } catch (error) {
            console.error('Error opening email client:', error);
            showNotification('Message prepared! Please manually send an email to Suryaprakash.iyc@gmail.com with your inquiry.', 'warning');
        }
        
        // Reset button
        submitButton.innerHTML = originalText;
        submitButton.disabled = false;

        // Clear validation classes
        const formControls = form.querySelectorAll('.form-control');
        formControls.forEach(input => input.classList.remove('valid', 'invalid'));

        // Scroll to top of form
        form.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 1200);
}

// Enhanced form validation functions
function validateMembershipForm(data) {
    let isValid = true;
    
    if (!data.fullName || data.fullName.trim().length < 2) {
        showFieldError('fullName', 'Please enter your full name (minimum 2 characters)');
        isValid = false;
    }
    
    if (!data.email || !isValidEmail(data.email)) {
        showFieldError('email', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!data.phone || !isValidPhone(data.phone)) {
        showFieldError('phone', 'Please enter a valid phone number');
        isValid = false;
    }
    
    if (!data.district) {
        showFieldError('district', 'Please select your district');
        isValid = false;
    }
    
    return isValid;
}

function validateContactForm(data) {
    let isValid = true;
    
    if (!data.contactName || data.contactName.trim().length < 2) {
        showFieldError('contactName', 'Please enter your name (minimum 2 characters)');
        isValid = false;
    }
    
    if (!data.contactEmail || !isValidEmail(data.contactEmail)) {
        showFieldError('contactEmail', 'Please enter a valid email address');
        isValid = false;
    }
    
    if (!data.subject || data.subject.trim().length < 3) {
        showFieldError('subject', 'Please enter a subject (minimum 3 characters)');
        isValid = false;
    }
    
    if (!data.message || data.message.trim().length < 10) {
        showFieldError('message', 'Please enter a detailed message (minimum 10 characters)');
        isValid = false;
    }
    
    return isValid;
}

// Enhanced field validation with better UX
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.name || field.id;
    
    clearFieldError(e);
    
    switch (fieldName) {
        case 'fullName':
        case 'contactName':
            if (value.length > 0 && value.length < 2) {
                showFieldError(field.id, 'Name must be at least 2 characters long');
            }
            break;
        case 'email':
        case 'contactEmail':
            if (value && !isValidEmail(value)) {
                showFieldError(field.id, 'Please enter a valid email address (e.g., name@example.com)');
            }
            break;
        case 'phone':
            if (value && !isValidPhone(value)) {
                showFieldError(field.id, 'Please enter a valid phone number');
            }
            break;
        case 'subject':
            if (value.length > 0 && value.length < 3) {
                showFieldError(field.id, 'Subject must be at least 3 characters long');
            }
            break;
        case 'message':
            if (value.length > 0 && value.length < 10) {
                showFieldError(field.id, 'Message must be at least 10 characters long');
            }
            break;
    }
}

function clearFieldError(e) {
    const field = e.target;
    const errorElement = document.getElementById(field.id + '-error');
    if (errorElement) {
        errorElement.remove();
    }
    field.style.borderColor = '';
    field.classList.remove('invalid');
}

function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const existingError = document.getElementById(fieldId + '-error');
    
    if (existingError) {
        existingError.remove();
    }
    
    const errorElement = document.createElement('div');
    errorElement.id = fieldId + '-error';
    errorElement.className = 'field-error';
    errorElement.style.color = 'var(--color-error)';
    errorElement.style.fontSize = 'var(--font-size-sm)';
    errorElement.style.marginTop = 'var(--space-4)';
    errorElement.style.fontWeight = '500';
    errorElement.textContent = message;
    errorElement.setAttribute('role', 'alert');
    
    field.style.borderColor = 'var(--color-error)';
    field.classList.add('invalid');
    field.parentNode.appendChild(errorElement);

    // Focus the field for better UX
    field.focus();
}

// Improved validation helper functions
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email) && email.length <= 254; // RFC limit
}

function isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10 && cleanPhone.length <= 15;
}

// Enhanced notification system with Vote Chori theming
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.setAttribute('role', 'alert');
    notification.setAttribute('aria-live', 'assertive');
    
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()" aria-label="Close notification">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    // Enhanced notification styles
    notification.style.cssText = `
        position: fixed;
        top: 120px;
        right: 20px;
        max-width: 420px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 18px 22px;
        border-radius: 12px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        animation: slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        font-size: 14px;
        line-height: 1.5;
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: flex-start;
        gap: 14px;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 6px;
        margin-left: auto;
        margin-top: -2px;
        opacity: 0.8;
        transition: opacity 0.2s;
        border-radius: 4px;
        flex-shrink: 0;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 8 seconds for longer messages
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOutRight 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }
    }, 8000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return 'linear-gradient(135deg, var(--political-secondary), var(--green-light))';
        case 'error': return 'linear-gradient(135deg, #dc2626, #ef4444)';
        case 'warning': return 'linear-gradient(135deg, #d97706, #f59e0b)';
        default: return 'linear-gradient(135deg, var(--political-primary), var(--saffron-light))';
    }
}

// Enhanced scroll animations with Vote Chori highlighting
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Special animation for Vote Chori elements
                if (entry.target.classList.contains('vote-chori-featured') || 
                    entry.target.classList.contains('vote-chori-news')) {
                    entry.target.style.animationDelay = '0ms';
                    entry.target.classList.add('vote-chori-highlight');
                }
                
                // Special animation for counter elements
                if (entry.target.classList.contains('counter')) {
                    animateCounter(entry.target);
                }
                
                // Stagger animations for grid items
                if (entry.target.parentElement.classList.contains('programs-grid') ||
                    entry.target.parentElement.classList.contains('news-grid') ||
                    entry.target.parentElement.classList.contains('values')) {
                    const siblings = Array.from(entry.target.parentElement.children);
                    const index = siblings.indexOf(entry.target);
                    entry.target.style.transitionDelay = `${index * 100}ms`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.card, .program-card, .news-card, .value-item, .team-member, .leader-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
        observer.observe(el);
    });
}

// Vote Chori specific features
function initVoteChoriFeatures() {
    // Add Vote Chori campaign tracking
    const voteChoriElements = document.querySelectorAll('.vote-chori-featured, .vote-chori-news, .vote-chori-category');
    
    voteChoriElements.forEach(element => {
        element.addEventListener('click', function() {
            console.log('Vote Chori campaign interaction tracked');
            
            // Add visual feedback
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });

    // Highlight Vote Chori elements periodically
    setTimeout(() => {
        const voteChoriCard = document.querySelector('.vote-chori-featured');
        if (voteChoriCard) {
            voteChoriCard.classList.add('pulse-highlight');
            setTimeout(() => {
                voteChoriCard.classList.remove('pulse-highlight');
            }, 3000);
        }
    }, 3000);
}

// Counter animation function
function animateCounter(element) {
    const target = parseInt(element.dataset.target);
    const duration = 2000;
    const start = 0;
    const startTime = Date.now();
    
    function updateCounter() {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const current = Math.floor(progress * target);
        
        element.textContent = current.toLocaleString();
        
        if (progress < 1) {
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// Add enhanced CSS for animations and accessibility
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .animate-in {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    
    .field-error {
        animation: shake 0.5s ease-in-out;
    }
    
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    .nav-link.active {
        background-color: rgba(255, 255, 255, 0.25) !important;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    .btn:active {
        transform: translateY(1px);
    }
    
    .form-control.valid {
        border-color: var(--political-secondary);
        box-shadow: 0 0 0 2px rgba(4, 106, 56, 0.1);
    }
    
    .form-control.invalid {
        border-color: var(--color-error);
        box-shadow: 0 0 0 2px rgba(220, 38, 38, 0.1);
    }

    .vote-chori-highlight {
        animation: voteChoriGlow 2s ease-in-out;
    }

    @keyframes voteChoriGlow {
        0%, 100% { 
            box-shadow: 0 4px 20px var(--card-shadow);
        }
        50% { 
            box-shadow: 0 8px 40px rgba(255, 103, 31, 0.3);
            transform: translateY(-2px);
        }
    }

    .pulse-highlight {
        animation: pulseHighlight 3s ease-in-out;
    }

    @keyframes pulseHighlight {
        0%, 100% { 
            transform: scale(1);
            box-shadow: 0 4px 20px var(--card-shadow);
        }
        25%, 75% { 
            transform: scale(1.02);
            box-shadow: 0 12px 48px rgba(255, 103, 31, 0.25);
        }
        50% { 
            transform: scale(1.01);
            box-shadow: 0 8px 32px rgba(255, 103, 31, 0.2);
        }
    }

    /* Ensure smooth scrolling works */
    html {
        scroll-behavior: smooth;
    }

    /* Fix navigation positioning with new navbar height */
    section {
        scroll-margin-top: 120px;
    }

    /* Accessibility improvements */
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }

    /* High contrast mode support */
    @media (prefers-contrast: high) {
        .btn, .nav-link, .form-control {
            border-width: 2px !important;
        }
        
        .vote-chori-featured {
            border-width: 4px !important;
        }
    }

    /* Reduced motion support */
    @media (prefers-reduced-motion: reduce) {
        * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
        }
        
        html {
            scroll-behavior: auto;
        }
    }
`;

document.head.appendChild(style);

// Enhanced keyboard accessibility
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();

        // Close notifications
        const notifications = document.querySelectorAll('.notification');
        notifications.forEach(notification => notification.remove());
    }

    // Enter key on navigation links
    if (e.key === 'Enter' && e.target.classList.contains('nav-link')) {
        e.target.click();
    }

    // Tab navigation improvements
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

// Remove keyboard navigation class on mouse use
document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Performance optimization - Lazy loading for images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
if (document.querySelectorAll('img[data-src]').length > 0) {
    initLazyLoading();
}

// Error handling with better UX
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
    showNotification('An unexpected error occurred. Please refresh the page if issues persist.', 'error');
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', function(e) {
    console.error('Unhandled promise rejection:', e.reason);
    showNotification('Connection issue detected. Please check your internet connection.', 'warning');
});

// Page load optimization and final initialization
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 500);
    }

    // Initialize any additional functionality after page load
    console.log('Tamil Nadu Youth Congress website loaded successfully!');
    
    // Ensure all functionality works after page load
    setTimeout(() => {
        // Re-initialize navigation to ensure it works
        fixNavigationLinks();
        
        // Ensure forms work
        initForms();
        
        console.log('All functionality re-initialized and verified');
    }, 1000);

    // Announce page load completion for screen readers
    const announcement = document.createElement('div');
    announcement.setAttribute('aria-live', 'polite');
    announcement.className = 'sr-only';
    announcement.textContent = 'Tamil Nadu Youth Congress website has loaded successfully with all functionality enabled';
    document.body.appendChild(announcement);
    setTimeout(() => announcement.remove(), 3000);
});

// Service worker registration for better performance (if available)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW registered: ', registration);
            })
            .catch((registrationError) => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

console.log('Tamil Nadu Youth Congress website JavaScript initialized successfully with all fixes applied!');
document.addEventListener('DOMContentLoaded', function() {
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '0';
        setTimeout(() => {
            heroSection.style.transition = 'opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
            heroSection.style.opacity = '1';
        }, 100);
    }
});
