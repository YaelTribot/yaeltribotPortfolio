document.addEventListener('DOMContentLoaded', function() {
    // Configuration object to hold different gallery settings
    const galleryConfigs = {
        '3D': {
            images: [
                './assets/images/3D/alpha.webp',
                './assets/images/3D/sac.webp',
                './assets/images/3D/bottes.webp',
                './assets/images/3D/exotic.webp',
                './assets/images/3D/stairs.webp'
            ],
            backgroundColors: [
                'rgb(104, 146, 250)',
                'rgb(132, 12, 52)',
                'rgb(243, 175, 47)',
                'rgb(23,97,57)',
                'rgb(168, 142, 237)'
            ],
            imageTexts: [
                {
                    title: 'COLORS #1 - Alpha Wann',
                    description: "Cette création s'inscrit dans une suite de projet que je suis en train de créer qui reprend des image de Colors. Colors est une plateforme musicale qui invite des artistes à performer sur une version exclusive d'une de leur musique. Je suis en train d'en faire d'autres actuellement. Voici l'image de référence :",
                },
                {
                    title: 'INKTOBER #1 - SAC À DOS',
                    description: "Cette création était dans le registre de Inktober qui est un défi artistique annuel et a lieu tout au long du mois d'octobre. Je voulais le faire cette année et le faire en 3D mais je ne trouvais pas assez de chose à faire avec ces mots donc j'ai arrêté le défi au bout du 4ème jour. Mais j'ai beaucoup appris grâce à ce petit défi. Voici donc un sac à dos que j'ai fait.",
                },
                {
                    title: 'INKTOBER #3 - BOTTES',
                    description: "Cette création était dans le registre de Inktober qui est un défi artistique annuel et a lieu tout au long du mois d'octobre. Je voulais le faire cette année et le faire en 3D mais je ne trouvais pas assez de chose à faire avec ces mots donc j'ai arrêté le défi au bout du 4ème jour. Mais j'ai beaucoup appris grâce à ce petit défi. Voici donc mon illustration préférée de ce petit défi : les bottes, car je trouve que c'est celle que j'ai le plus réussi.",
                },
                {
                    title: 'INKTOBER #4 - EXOTIQUE',
                    description: "Cette création était dans le registre de Inktober qui est un défi artistique annuel et a lieu tout au long du mois d'octobre. Je voulais le faire cette année et le faire en 3D mais je ne trouvais pas assez de chose à faire avec ces mots donc j'ai arrêté le défi au bout du 4ème jour. Mais j'ai beaucoup appris grâce à ce petit défi. Et voici donc mon illustration représentant une noix de coco dans un panier.",
                },
                {
                    title: 'ESCALIERS',
                    description: "C'est une illustration que j'ai fait une nuit alors que je n'arrivais pas à dormir. Je ne suis pas encore satisfait du résultat, je pense changer encore cette illustration.",
                }
            ]
        },
        '2D': {
            images: [
                './assets/images/2D/MAN3.webp',
                './assets/images/2D/frog.webp',
                './assets/images/2D/flee.webp',
                './assets/images/2D/groovy.webp',
                './assets/images/2D/ProjetFly6.webp'
            ],
            backgroundColors: [
                'rgb(50, 109, 153  )',
                'rgb(145, 154, 161 )',
                'rgb(171, 123, 178)',
                'rgb(55, 55, 55)',
                'rgb(21, 20, 21)'
            ],
            imageTexts: [
                { title: 'MAN', description: 'MAN est le premier projet illustrator que j\'ai réalisé. Aujourd\'hui c\'est un peu devenu mon logo/ma marque de fabrique. Je voulais faire un style d\'auto portrait dans un style que j\'aimais bien : le flat design, qui consiste à créer des éléments très simple et sans trop de détail.' },
                { title: 'Frog', description: 'Frog est ma création préféré en illustrator. Je trouve que c\'était marrant de faire une grenouille humanoide et j\'en suis plutôt fier.' },
                { title: 'Flee', description: 'Flee était une création que j\'ai fait un peu sans réfléchir mais je suis plutôt satisfait je la trouve cool' },
                { title: 'Groovy', description: 'Groovy était censé être dans un style de poster mais j\'ai finalement abandonné l\'idée. J\'aime bien cette création mais j\'en suis pas stisfat à 100%. ' },
                { title: 'Fly', description: 'Fly était un projet qui m\'a été demandé par un ami. Il fait de la musique dans le style du rock alternatif et experimental et voulait que je fasse sa cover. Donc j\'ai accepté et je suis satisfait et lui aussi. Il représente la moouche qui est le sujet principal de son morceau.' }
            ]
            
        }
    };

    function initializeGallery(galleryType) {
        const config = galleryConfigs[galleryType];
        if (!config) {
            console.error(`No configuration found for gallery type: ${galleryType}`);
            return;
        }

        const imageContainer = document.querySelector('.image-container');
        const mainGalleryImage = document.querySelector('.main-gallery-image');
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

        function updateMainImage(index) {
            mainGalleryImage.style.opacity = 0;
            setTimeout(() => {
                mainGalleryImage.src = config.images[index];
                mainGalleryImage.style.opacity = 1;
            }, 300);
        }

        function updateText(index) {
            const titleElement = document.querySelector('.text-content h2');
            const descElement = document.querySelector('.text-content p');

            titleElement.style.opacity = 0;
            descElement.style.opacity = 0;

            setTimeout(() => {
                titleElement.textContent = config.imageTexts[index].title;
                descElement.textContent = config.imageTexts[index].description;

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
            updateMainImage(index);
            updateText(index);
            updateDots(index);

            body.style.backgroundColor = config.backgroundColors[index];
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
            // If screen is wider, control DVD image
            if (window.innerWidth > 1100) {
                isNavExtended = !isNavExtended;
                carouselNav.classList.toggle('extended', isNavExtended);
                rotatDVD.classList.toggle('extended', isNavExtended);
            } else {
                cycleImages();
            }
        });

        function cycleImages() {
            currentIndex = (currentIndex + 1) % config.images.length;
            showContent(currentIndex);
        }

        // Initialization
        showContent(0);
    }

    // Dynamically detect gallery type
    function detectGalleryType() {
        // Check current page's image paths to determine gallery type
        const firstImagePath = document.querySelector('.dot img')?.src || '';
        
        if (firstImagePath.includes('/3D/')) {
            return '3D';
        } else if (firstImagePath.includes('/2D/')) {
            return '2D';
        }
        
        console.error('Could not detect gallery type');
        return null;
    }

    // Detect and initialize gallery
    const galleryType = detectGalleryType();
    if (galleryType) {
        initializeGallery(galleryType);
    }
});