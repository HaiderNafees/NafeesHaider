// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Typing effect initialization
function initTypeWriter() {
    const typingText = document.querySelector('.typing-text');
    const phrases = [
        'Junior Web Developer',
        'WordPress Developer',
        'Front-end Developer',
        'UI/UX Enthusiast'
    ];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            charIndex--;
        } else {
            charIndex++;
        }
        
        const displayText = currentPhrase.substring(0, charIndex);
        typingText.innerHTML = `${displayText}<span class="cursor"></span>`;

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentPhrase.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before next word
        }

        setTimeout(type, typeSpeed);
    }

    type();
}

// Scroll reveal animation
function reveal() {
    const revealElements = document.querySelectorAll('.skill-card, .project-card, .contact-item');
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.classList.add('revealed');
        }
    });
}

// Form submission handler
function handleFormSubmit(e) {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    e.target.reset();
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize typing effect
    initTypeWriter();
    
    // Initialize AOS
    document.querySelectorAll('section').forEach(section => {
        section.setAttribute('data-aos', 'fade-up');
    });
    
    // Add event listeners
    window.addEventListener('scroll', reveal);
    document.querySelector('.contact-form').addEventListener('submit', handleFormSubmit);
}); 