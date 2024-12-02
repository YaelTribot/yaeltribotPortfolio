window.addEventListener('DOMContentLoaded', function() {
  
    const splashScreen = document.querySelector('.splash-screen');
    
    if (performance.getEntriesByType("navigation")[0].type === "reload" || !localStorage.getItem('hasVisited')) {
        splashScreen.style.display = 'flex'; // S'assure que le splash screen est visible
        setTimeout(() => {
            splashScreen.classList.add('hide');
            // Marque que l'utilisateur a visité le site
            localStorage.setItem('hasVisited', 'true');
        }, 2000);
    } else {
        // Si ce n'est pas la première visite et pas un rechargement, cache directement le splash screen
        splashScreen.style.display = 'none';
    }

    setTimeout(() => {
        splashScreen.classList.add('hide');
        
    }, 2000);

});