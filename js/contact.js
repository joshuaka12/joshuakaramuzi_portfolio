// Contact form handling (stores submissions locally - upgrade to backend later)
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        if (!name || !email || !message) {
            formStatus.textContent = 'Please fill in all required fields.';
            formStatus.style.color = 'red';
            return;
        }
        
        // Store in localStorage (temporary - shows functionality)
        const formData = {
            name: name,
            email: email,
            subject: subject,
            message: message,
            date: new Date().toISOString()
        };
        
        let submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
        submissions.push(formData);
        localStorage.setItem('contactSubmissions', submissions);
        
        formStatus.textContent = 'Message stored! I\'ll respond within 24 hours.';
        formStatus.style.color = 'green';
        contactForm.reset();
        
        // Optional: Open email client as backup
        setTimeout(() => {
            window.location.href = `mailto:karamuzijoshua@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Contact')}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
        }, 1000);
    });
}