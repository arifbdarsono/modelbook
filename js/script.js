document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });

    // Navbar Scroll Effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Model Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const modelCards = document.querySelectorAll('.model-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            // Show/hide model cards based on filter
            modelCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Initialize Flatpickr for Date Picker
    if (document.getElementById('event-date')) {
        flatpickr("#event-date", {
            minDate: "today",
            dateFormat: "Y-m-d",
            disable: [
                function(date) {
                    // Disable random dates for demo purposes
                    return (date.getDay() === 0); // Disable Sundays
                }
            ],
            onChange: function(selectedDates, dateStr, instance) {
                // You can add custom logic here when a date is selected
            }
        });
    }

    // Initialize Flatpickr for Time Picker
    if (document.getElementById('event-time')) {
        flatpickr("#event-time", {
            enableTime: true,
            noCalendar: true,
            dateFormat: "H:i",
            minTime: "08:00",
            maxTime: "20:00",
            time_24hr: true
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current FAQ item
            item.classList.toggle('active');
        });
    });

    // Reviews Slider
    const reviewCards = document.querySelectorAll('.review-card');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-review');
    const nextBtn = document.querySelector('.next-review');
    let currentReview = 0;

    // Hide all reviews except the first one
    function showReview(index) {
        reviewCards.forEach((card, i) => {
            card.style.display = i === index ? 'block' : 'none';
        });
        
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Initialize reviews
    showReview(currentReview);

    // Next review
    nextBtn.addEventListener('click', () => {
        currentReview = (currentReview + 1) % reviewCards.length;
        showReview(currentReview);
    });

    // Previous review
    prevBtn.addEventListener('click', () => {
        currentReview = (currentReview - 1 + reviewCards.length) % reviewCards.length;
        showReview(currentReview);
    });

    // Dot navigation
    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => {
            currentReview = i;
            showReview(currentReview);
        });
    });

    // Booking Form Submission to WhatsApp
    const bookingForm = document.getElementById('booking-form');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('client-name').value;
            const email = document.getElementById('client-email').value;
            const phone = document.getElementById('client-phone').value;
            const eventType = document.getElementById('event-type').value;
            const modelPreference = document.getElementById('model-preference').value;
            const date = document.getElementById('event-date').value;
            const time = document.getElementById('event-time').value;
            const duration = document.getElementById('event-duration').value;
            const location = document.getElementById('event-location').value;
            const additionalInfo = document.getElementById('additional-info').value;
            
            // Format message for WhatsApp
            let message = `*New Booking Request*%0A%0A`;
            message += `*Name:* ${name}%0A`;
            message += `*Email:* ${email}%0A`;
            message += `*Phone:* ${phone}%0A`;
            message += `*Event Type:* ${eventType}%0A`;
            message += `*Model Preference:* ${modelPreference || 'No specific preference'}%0A`;
            message += `*Date:* ${date}%0A`;
            message += `*Time:* ${time}%0A`;
            message += `*Duration:* ${duration} hours%0A`;
            message += `*Location:* ${location}%0A`;
            message += `*Additional Info:* ${additionalInfo || 'None'}%0A`;
            
            // WhatsApp number from the requirements
            const whatsappNumber = '62895332782122';
            
            // Create WhatsApp link
            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${message}`;
            
            // Open WhatsApp in a new tab
            window.open(whatsappLink, '_blank');
            
            // Reset form
            bookingForm.reset();
            
            // Show success message
            alert('Your booking request has been sent via WhatsApp. We will contact you shortly!');
        });
    }

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const subject = document.getElementById('contact-subject').value;
            const message = document.getElementById('contact-message').value;
            
            // In a real application, you would send this data to a server
            // For demo purposes, we'll just show an alert
            alert(`Thank you for your message, ${name}! We will get back to you soon.`);
            
            // Reset form
            contactForm.reset();
        });
    }

    // Live Chat Button
    const chatBtn = document.querySelector('.chat-btn');
    
    if (chatBtn) {
        chatBtn.addEventListener('click', function() {
            // In a real application, this would open a chat widget
            alert('Live chat feature would open here. This is a demo.');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('nav-active')) {
                    nav.classList.remove('nav-active');
                    burger.classList.remove('toggle');
                    
                    navLinks.forEach(link => {
                        link.style.animation = '';
                    });
                }
            }
        });
    });

    // View More Models Button
    const viewMoreBtn = document.querySelector('.view-more-btn');
    
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', function() {
            // In a real application, this would load more models
            alert('In a real application, this would load more models from the database.');
        });
    }

    // Portfolio View Button
    const portfolioBtns = document.querySelectorAll('.view-portfolio');
    
    portfolioBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // In a real application, this would open a portfolio modal or page
            const modelName = this.closest('.model-card').querySelector('h3').textContent;
            alert(`Viewing portfolio for ${modelName}. In a real application, this would open a detailed portfolio.`);
        });
    });
});