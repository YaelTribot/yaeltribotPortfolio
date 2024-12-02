document.addEventListener('DOMContentLoaded', function() {
    const videoContainer = document.querySelector('.youtube-container');
    const dots = document.querySelectorAll('.dot');
    const toggleBtn = document.querySelector('.toggle-nav-btn');
    const carouselNav = document.querySelector('.carousel-navigation');
    const rotatDVD = document.querySelector('.rotating-container');
    const previewOverlay = document.querySelector('.preview-overlay');
    const previewImage = document.querySelector('.preview-image');
    const body = document.body;

    let currentIndex = 0;
    let hoverTimer;
    let isNavExtended = false;
    

    // URLs des vidéos
    const videos = [
        'https://www.youtube.com/embed/1q2qI_CXfa4',
        'https://www.youtube.com/embed/meTwEL-zhdQ',
        'https://www.youtube.com/embed/DQgnRFkyxhM'
    ];

    const backgroundColors = [
        'rgb(153, 28, 32)',   // Mon Lego CV 
        'rgb(23,97,57)',    // Bourre-Pif
        'rgb(221, 213, 243)'     // L'audition
    ];

    const projectTexts = [
        {
            title: "Mon Lego CV",
            description: "Voici mon CV vidéo que j'ai entièrement réalisé en 3D. Je l'ai fait pour pouvoir montré ce dont j'étais capable aux entreprises mais égalemnet à moi-même. Je voulais me lancer ce défi qui avait une échéance de 1 mois, pour pouvoir me prouver que j'étais capable de le faire. Aujourd'hui j'en suis très fier."
        },
        {
            title: "Bourre-Pif",
            description: "C'est un court-métrage que nous avons réalisé, écrit, tourné et monté en équipe de 3 personnes. Nous étions en classe de terminale das notre option cinéma et avons gagné le prix du public, le soir de projection de tous les films du lycée. Je garde un très bon souvenir de tournage avec cette équipe et nous sommes très fier du résultat de ce film, encore aujourd'hui c'est mon court-métrage préféré."
        },
        {
            title: "L'audition",
            description: "C'est un court-métrage réalisé dans le cadre du concours Crous avec pour thème 'Espoirs'. Nous étions en équipe de 4 et avons tourné ce film à Angoulême, ville de mes études, avec une caméra d'une grande qualité. Je suis très fier du résultat de ce court-métrage."
        }
    ];

    function updateVideo(index) {
        const newIframe = document.createElement('iframe');
        newIframe.src = videos[index];
        newIframe.title = "YouTube video player";
        newIframe.frameBorder = "0";
        newIframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        newIframe.allowFullscreen = true;
        newIframe.style.opacity = "0";
        newIframe.style.transition = "opacity 0.3s ease";

        const oldIframe = videoContainer.querySelector('iframe');
        
        if (oldIframe) {
            oldIframe.style.opacity = "0";
            setTimeout(() => {
                oldIframe.remove();
                videoContainer.appendChild(newIframe);
                requestAnimationFrame(() => {
                    newIframe.style.opacity = "1";
                });
            }, 300);
        } else {
            videoContainer.appendChild(newIframe);
            requestAnimationFrame(() => {
                newIframe.style.opacity = "1";
            });
        }
    }

    function updateText(index) {
        const titleElement = document.querySelector('.text-content h2');
        const descElement = document.querySelector('.text-content p');

        titleElement.style.opacity = 0;
        descElement.style.opacity = 0;

        setTimeout(() => {
            titleElement.textContent = projectTexts[index].title;
            descElement.textContent = projectTexts[index].description;

            titleElement.style.opacity = 1;
            descElement.style.opacity = 1;
        }, 300);
    }

    function updateDots(index) {
        dots.forEach(dot => {
            dot.classList.remove('active');
            dot.style.transform = 'scale(1)';
        });
        dots[index].classList.add('active');
        dots[index].style.transform = 'scale(1.1)';
    }

    function showContent(index) {
        updateVideo(index);
        updateText(index);
        updateDots(index);

        body.style.backgroundColor = backgroundColors[index];
    }

    // Preview functionality
    dots.forEach((dot, index) => {
        const thumbnail = dot.querySelector('img');
        dot.addEventListener('mouseenter', () => {
            hoverTimer = setTimeout(() => {
                previewImage.src = thumbnail.src;
                previewOverlay.classList.add('visible');
            }, 1000);
        });

        dot.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimer);
            previewOverlay.classList.remove('visible');
        });

        dot.addEventListener('click', () => {
            if (currentIndex !== index) {
                currentIndex = index;
                showContent(currentIndex);
            }
        });

        dot.addEventListener('mouseover', () => {
            if (!dot.classList.contains('active')) {
                dot.style.transform = 'scale(1.05)';
            }
        });

        dot.addEventListener('mouseout', () => {
            if (!dot.classList.contains('active')) {
                dot.style.transform = 'scale(1)';
            }
        });
    });
    
toggleBtn.addEventListener('click', function() {
    // Si écran plus large, contrôle l'image DVD
    if (window.innerWidth > 1100) {
        isNavExtended = !isNavExtended; // Bascule état du menu
        carouselNav.classList.toggle('extended', isNavExtended); // Active/désactive menu carousel
        rotatDVD.classList.toggle('extended', isNavExtended); // Déplace l'image DVD
    } else {
        cycleProjects(); // Change de projet pour les écrans plus petits
    }
});

    function cycleProjects() {
        currentIndex = (currentIndex + 1) % videos.length;
        showContent(currentIndex);
    }

    // Initialisation
    showContent(0);

});

