class App{
    constructor(){
        
        this.$navbar = document.querySelector('#navbar');
        this.$toggleBtn = document.querySelector('#mobile-nav-toggle');
        this.$body = document.body;

        this.$transform = document.querySelector('#transform-img');
        this.$standOut = document.querySelector('#stand-out-img');
        this.$graphic = document.querySelector('#graphic-img');
        this.$photo = document.querySelector('#photo-img');

        window.addEventListener('resize', this.navbar());
        this.addEventListeners();
    }

    addEventListeners(){
        
    }

    navbar(){
        const smallScreen = window.matchMedia("(max-width: 34.9em)");

        if(smallScreen.matches){
            this.$toggleBtn.addEventListener('click', e => {
            this.toggleNav();
            });
            this.$body.addEventListener('click', e => {
            if(!(e.target.closest('#mobile-nav-toggle'))){
                this.closeNav();
            }
            });
        }else{
            this.$transform.setAttribute('src', './assets/img/desktop/image-transform.jpg');
            this.$standOut.setAttribute('src', './assets/img/desktop/image-stand-out.jpg');
            this.$graphic.setAttribute('src', './assets/img/desktop/image-graphic-design.jpg');
            this.$photo.setAttribute('src', './assets/img/desktop/image-photography.jpg');
        }
        
    }

    toggleNav(){
        let visibility = this.$navbar.getAttribute('visible');

        if(visibility === 'true'){
            this.closeNav();
        }else if(visibility === 'false'){
            this.openNav();
        }
    }

    closeNav(){
        this.$navbar.setAttribute('visible', 'false');
        this.$navbar.style.display = 'none';
        this.$toggleBtn.setAttribute('aria-expanded', 'false');
    }

    openNav(){
        this.$navbar.setAttribute('visible', 'true');
        this.$navbar.style.display = 'block';
        this.$toggleBtn.setAttribute('aria-expanded', 'true');
    }
}


new App;