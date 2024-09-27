'use strict';

class App{
    constructor(){
        this.$navToggle = document.querySelector('.nav-toggle-btn');
        this.$navbar = document.querySelector('#navbar');
        this.$body = document.body;
        this.$navLinks = document.querySelectorAll('.nav-links');
        this.$coverImg = document.querySelector('.main-img');
        
        this.addEventListener();
        window.addEventListener('resize', this.updateImage.bind(this));
    }

    addEventListener(){
        this.$navToggle.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            this.toggleNavbar();
        });

        this.$body.addEventListener('click', e => {
            const target = e.target;

            if(!target.closest('#navbar') && !target.closest('.nav-toggle-btn')){
                this.closeNav();
            }
        });

        this.$navLinks.forEach(link => {
            link.addEventListener('click', e => {
                this.closeNav();
            });
        });

       
    }

    toggleNavbar(){
        const visibility = this.$navbar.getAttribute('visible');

        if(visibility === 'false'){
            this.openNav();
        }
        else if(visibility === 'true'){
            this.closeNav();
        }
    }

    openNav(){
        this.$body.classList.add('nav-open');
        this.$navbar.setAttribute('visible', 'true');
        this.$navToggle.setAttribute('aria-expanded', 'true');
    }

    closeNav(){
        this.$body.classList.remove('nav-open');
        this.$navbar.setAttribute('visible', 'false');
        this.$navToggle.setAttribute('aria-expanded', 'false');
    }

    updateImage(){
        const smallScreen = window.matchMedia('(max-width: 35em)');

        if(smallScreen.matches){
            this.$coverImg.setAttribute('src', "./assets/img/image-web-3-mobile.jpg");
        }else{
            this.$coverImg.setAttribute('src', "./assets/img/image-web-3-desktop.jpg");
        }
    }
}

new App();