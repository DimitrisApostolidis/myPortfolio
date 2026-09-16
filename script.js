// Περιμένουμε να φορτώσει πλήρως το HTML πριν τρέξουμε τη JavaScript
document.addEventListener('DOMContentLoaded', () => {
    
    // Επιλέγουμε όλα τα sections και τον header (Αρχική) που έχουν id
    const sections = document.querySelectorAll('section, header');
    // Επιλέγουμε όλα τα links του μενού
    const navLinks = document.querySelectorAll('.nav-link');

    // Ακούμε για το event του 'scroll' στο παράθυρο
    window.addEventListener('scroll', () => {
        let currentSection = '';

        // Ελέγχουμε τη θέση του κάθε section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Αν το scroll έχει φτάσει στο section (με ένα μικρό περιθώριο 150px για ομαλότητα)
            if (window.scrollY >= (sectionTop - 150)) {
                currentSection = section.getAttribute('id');
            }
        });

        // Αφαιρούμε την κλάση 'active' από όλα τα links και την προσθέτουμε στο σωστό
        navLinks.forEach(link => {
            link.classList.remove('active');
            // Αν το href του link ταιριάζει με το id του τρέχοντος section
            if (link.getAttribute('href').includes(currentSection)) {
                link.classList.add('active');
            }
        });
    });

    // --- Intersection Observer για το Fade-in εφέ --- //
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            // Αν η κάρτα μπει στο οπτικό πεδίο της οθόνης
            if (entry.isIntersecting) {
                entry.target.classList.add('show-element');
                // Σταματάμε να την παρατηρούμε για να μείνει εμφανισμένη
                observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // Η κάρτα εμφανίζεται μόλις το 10% της μπει στην οθόνη
    });

    // Βρίσκουμε όλα τα στοιχεία με την κλάση 'hidden-element' και τα δίνουμε στον observer
    const hiddenElements = document.querySelectorAll('.hidden-element');
    hiddenElements.forEach((el) => observer.observe(el));
});