document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.menu-btn');
    const siteMenu = document.querySelector('#site-menu');
    
    menuBtn.addEventListener('click', () => {
        siteMenu.classList.toggle('active');
    });
});