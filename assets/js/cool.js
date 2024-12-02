document.addEventListener('DOMContentLoaded', function() {
    const dvdLogo = document.querySelector('.dvd-logo');
    const speed = 3; // Vitesse du déplacement (pixels par frame)
    let x = 100; // Position horizontale initiale
    let y = 100; // Position verticale initiale
    let dx = speed; // Déplacement horizontal
    let dy = speed; // Déplacement vertical
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    function updatePosition() {
        const logoRect = dvdLogo.getBoundingClientRect();

        // Vérifie les collisions avec les bords
        if (logoRect.left <= 0 || logoRect.right >= window.innerWidth) {
            dx = -dx; // Inverse la direction horizontale
        }
        if (logoRect.top <= 0 || logoRect.bottom >= window.innerHeight) {
            dy = -dy; // Inverse la direction verticale
        }

        // Mise à jour des positions
        x += dx;
        y += dy;

        // Applique la nouvelle position
        dvdLogo.style.left = `${x}px`;
        dvdLogo.style.top = `${y}px`;

        // Rafraîchit l'animation
        requestAnimationFrame(updatePosition);
    }

    // Initialise l'animation
    updatePosition();

    
});
