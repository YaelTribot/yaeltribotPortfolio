window.addEventListener('DOMContentLoaded', function () {
    const splashScreen = document.querySelector('.splash-screen');

    // Toujours afficher le splash screen
    splashScreen.style.display = 'flex';

    // Le masquer après 2 secondes
    setTimeout(() => {
        splashScreen.classList.add('hide');
    }, 2000);
});
