window.addEventListener('DOMContentLoaded', function() {
    const infoForm = document.querySelector('.info-form');
    const cvForm = document.querySelector('.cv-form');
    const access = document.querySelector('.access');
    const menuToggle = document.querySelector('.menu-btn');
    const sidebar = document.querySelector('.sidebar');
   
    const downloadBtn = document.querySelector('.download-btn');
    const joystick = document.getElementById('joystick');
    const paragraphs = document.querySelectorAll('body p'); // Sélectionne uniquement les <p>

    
    // Fonction pour obtenir la taille de police actuelle
    function getCurrentFontSize() {
        const fontSize = window.getComputedStyle(document.body).fontSize;
        return parseFloat(fontSize);
    }

    // Initialiser le joystick avec la valeur actuelle
    const currentSize = getCurrentFontSize() / 16; // Convertit en em
    joystick.value = currentSize;

    // Mettre à jour la taille de police quand le joystick change
    joystick.addEventListener('input', function () {
        const scale = joystick.value;
    
        // Appliquer la taille à tout le document
        document.body.style.fontSize = `${scale}em`;
    
        // Ajuster aussi la hauteur des conteneurs si nécessaire
        const containers = document.querySelectorAll('.contact-form, .sidebar');
        containers.forEach(container => {
            container.style.height = 'auto'; // Laisse le conteneur s'ajuster dynamiquement
        });
    });
    

    menuToggle.addEventListener('click', toggleMenu);

    if (joystick) {
        joystick.addEventListener('input', function () {
            const scale = joystick.value;
            paragraphs.forEach(paragraph => {
                paragraph.style.fontSize = `${scale}em`;
            });
        });
    }

    // Sélectionner les icônes
    const infoIcon = document.querySelector('.fa-circle-info');
    const phoneIcon = document.querySelector('.fa-phone');
    const fileIcon = document.querySelector('.fa-file');
    const accessIcon = document.querySelector('.fa-universal-access');

    // Ajouter des écouteurs d'événements sur les icônes
    if (phoneIcon) phoneIcon.addEventListener('click', () => handleIconClick('phone'));
    if (fileIcon) fileIcon.addEventListener('click', () => handleIconClick('file'));
    if (infoIcon) infoIcon.addEventListener('click', () => handleIconClick('info'));
    if (accessIcon) accessIcon.addEventListener('click', () => handleIconClick('access'));


    // Fonctionnement des déourlants
    function toggleMenu() {
        sidebar.classList.toggle('active');
        if (!sidebar.classList.contains('active')) {
            closeAllSections();
        }
    }

    closeAllSections();

    function handleIconClick(type) {
        switch (type) {
            case 'phone':
                toggleActiveState(infoForm, cvForm, access);
                break;
            case 'file':
                toggleActiveState(cvForm, infoForm, access);
                break;
            case 'info':  // N'oubliez pas d'ajouter le cas 'info'
                toggleActiveState(infoForm, cvForm, access);
                break;
            case 'access':
                toggleActiveState(access, cvForm, infoForm);
                break;
        }
    }
    function toggleActiveState(activeElement, inactiveElement, inactiveElement2) {
        activeElement.classList.toggle('active');
        inactiveElement.classList.remove('active');
        inactiveElement2.classList.remove('active');
    }

    function closeAllSections() {
        infoForm.classList.remove('active');
        cvForm.classList.remove('active');
        access.classList.remove('active')
    }

    // Téléchargement du CV
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault(); // Empêche le comportement par défaut (si nécessaire)
            const filePath = './assets/menu/img/CV-de-Yael-Tribot.pdf'; // Chemin vers le fichier
            const fileName = 'CV Yael Tribot'; // Nom du fichier téléchargé
    
            // Créer un lien temporaire pour le téléchargement
            const tempLink = document.createElement('a');
            tempLink.href = filePath;
            tempLink.download = fileName;
            tempLink.click(); // Déclencher le clic
            tempLink.remove(); // Supprimer le lien après utilisation
        });
    }

    // Gestion du formulaire de contact
    function handleSubmit() {
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const mailtoLink = `mailto:pro.yaeltribot@gmail.com?subject=Message du site&body=De: ${email}%0D%0A%0D%0AMessage:%0D%0A${encodeURIComponent(message)}`;
        window.location.href = mailtoLink;
        document.querySelector('form').reset();
        closeAllSections();
    }

    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            handleSubmit();
        });
    }

});