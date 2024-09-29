'use strict';

class App{
    constructor(){
        this.navOpen = false;

        this.$navToggle = document.querySelector('#nav-toggle');
        this.$navbar = document.querySelector('#navbar');
        this.$body = document.body;
        this.$navbarStyle = window.getComputedStyle(this.$navbar);
        this.$navLinks = document.querySelectorAll('.nav-links');
        this.$testimonialContainer = document.querySelector('#testimonial-container');
        this.$tabBtns = document.querySelectorAll('.tab-btn-group button');
        this.$subEmail = document.querySelector('#subscribe-email');
        this.$subEmailBtn = document.querySelector('#subscribe-btn');
        this.$subEmailErr = document.querySelector('.sub-email-error');
        this.$body = document.body;
        this.$getStartBtn = document.querySelectorAll('.sign-up-btn');
        
        this.clearLocalStorage();
        this.fetchTestimonial();
        this.addEventListeners();
    }

    addEventListeners(){
        this.$navToggle.addEventListener('click', this.toggleNavbar.bind(this));
        
        this.$body.addEventListener('click', e => {
            const target = e.target;
            if(this.navOpen && !target.closest('#navbar') && !target.closest('#nav-toggle')){
                this.closeNav();
            }
        })

        this.$navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.removeActiveLink();
                link.classList.add('active');
                this.closeNav();
            });
        });

        this.$subEmailBtn.addEventListener('click', e => {
            e.preventDefault();
            this.validateSubInputEmail();
        });

        this.$getStartBtn.forEach(sign => {
            sign.addEventListener('click', e => {
                e.preventDefault();
                this.fetchSignUp();
            });
        })
    }

    clearLocalStorage(){
        localStorage.removeItem('subscribe-email')
    }

    toggleNavbar(){
        let visibility = this.$navbar.getAttribute('visible');

        if(visibility === 'false'){
            this.openNav();
        }else if(visibility === 'true'){
            this.closeNav();
        }
        
    }

    openNav(){
        this.$navbar.setAttribute('visible', 'true');
        this.$navToggle.setAttribute('aria-expanded', 'true');
        this.$body.classList.add('nav-open');
        this.panelTransition();
        this.navOpen = true;
    }

    closeNav(){
        this.$navbar.setAttribute('visible', 'false');
        this.$navToggle.setAttribute('aria-expanded', 'false');
        this.$body.classList.remove('nav-open');
        this.panelTransition();
        this.navOpen = false;
    }

    panelTransition(){
        let isCircle = this.$navbarStyle.getPropertyValue('clip-path');

        if(isCircle === 'circle(0% at 100% 0%)'){
            this.$navbar.style.clipPath = 'circle(100% at 50% 50%)';
        }else{
            this.$navbar.style.clipPath = 'circle(0% at 100% 0%)';
        }
    }

    removeActiveLink(){
        this.$navLinks.forEach(links => {
            links.classList.remove('active')
        });
    }

    async fetchTestimonial(){
        try{
            const response = await fetch('./data.json');
            if(!response.ok){
                throw new Error('Cannot get data from json file');
            }
            const result = await response.json();
            this.generateReviews(result);
        }
        catch(error){
            console.error(error);
        }
    }
    
    generateReviews(data){
        const reviews = data.map((data, index) => `
           <div class="testimonial">
                <img src="${data.image}" alt="${data.name}'s photo">
                <div class="testimonial-content">
                    <h1 class="text-blue bold-1 fs-500 text-center" aria-label="${data.name}">${data.name}</h1>
                    <blockquote>
                        <p class="text-accent text-center">"${data.desc}"</p>
                    </blockquote>
                </div>
            </div>
            `).join('');

        this.$testimonialContainer.innerHTML = reviews;
        const allReview = this.$testimonialContainer.querySelectorAll('.testimonial');
        this.displayTestimonial(allReview);
    }

    displayTestimonial(review){
        const reviewArr = Array.from(review);
        const btnArr = Array.from(this.$tabBtns);
        
        const results = reviewArr.map((container, index) => {
            return [container, index];
        });

        this.initialDisplayTestimonial(review);

        this.$tabBtns.forEach((btn, btnIndex) => {
            btn.addEventListener('click', e => {
                this.removeTabBtnClass();
                btn.classList.add('active');

                this.showTestimonial(results, btnIndex);
            });

        })
    }

    showTestimonial(results, btnIndex){
        results.forEach(([reviewContainer, reviewIndex]) => {
            if(reviewIndex === btnIndex){
                reviewContainer.classList.remove('hide');
                reviewContainer.classList.add('active');
            }else{
                reviewContainer.classList.remove('active');
                reviewContainer.classList.add('hide');
            }
        })
    }

    removeTabBtnClass(){
        this.$tabBtns.forEach(tab => {
            tab.classList.remove('active');
        })
    }

    initialDisplayTestimonial(container){
        const containers = Array.from(container);
        
        containers.forEach((container, index) => {
            if(index === 0){
                container.classList.remove('hide');
                container.classList.add('active');
            }else{
                container.classList.remove('active');
                container.classList.add('hide')
            }
        });
    }

    validateSubInputEmail(){
        const inputValue = this.$subEmail.value;
        const emptyValue = '';
        const reg_subEmail = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
        let isValid = true;
       

        if(inputValue === emptyValue){
            isValid = false;
            this.subEmailError();
        }else if(!reg_subEmail.test(inputValue)){
            isValid = false;
            this.subEmailError();
        }

        if(isValid){
            const storeInput = localStorage.setItem('subscribe-email', inputValue);
            this.successEmailModal();
        }
    }

    subEmailError(){
        let errMsg = 'Must be valid email';
        this.$subEmailErr.innerHTML = errMsg;
        this.$subEmail.style.border = '2px solid red';
    }

    async successEmailModal(){
       try{
        const response = await fetch('./subscribe-modal.html');
        if(!response.ok){
            throw new Error('cannot get modal page');
        }
        const result = await response.text();
        this.$body.innerHTML = result;

        this.$subEmailSuccess = document.querySelector('#sub-email-feedback');
        this.$subEmailSuccess.textContent = localStorage.getItem('subscribe-email');
       }
       catch(error){
        console.error(error);
       }
    }
    
    async fetchSignUp(){
        try{
            const response = await fetch('sign-up-form.html');
            if(!response.ok){
                throw new Error('cannot get sign up file');
            }
            const result = await response.text();
            this.$body.innerHTML = result;
            this.validateSignUpForm();
        }
        catch(error){
            console.error(error);
        }
    }

    validateSignUpForm(){
        const name = document.querySelector('#name');
        const email = document.querySelector('#email');
        const password = document.querySelector('#password');
        const confirmPassword = document.querySelector('#confirm-password');
        const signUpBtn = document.querySelector('#sign-up-form-btn');

        const reg_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]{2,}\.[a-z]{2,}$/;
        const reg_password = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[%_+-.!@#$^&*])[A-Za-z\d%_+-.!@#$^&*]{8,}$/;
        this.checkPasswordValue();
    
        signUpBtn.addEventListener('click', e => {
            e.preventDefault();
            const emailValue = email.value;
            const passwordValue = password.value;
            const confirmPasswordValue = confirmPassword.value;
            

            let isValid = true;
            
            this.checkInputValue();
           
            if(!reg_email.test(emailValue)){
                isValid = false;
                const parent = email.parentElement;
                const err = parent.querySelector('.form-err');
                err.innerHTML = 'Email Must be Valid.'
                err.style.display = 'block';
                email.style.border = '1px solid red';
            }else{
                this.normalState(email);
            }

            if(!reg_password.test(passwordValue)){
                isValid = false;
                this.errorState(password);
                const parent = password.parentElement;
                const err = parent.querySelector('.form-err');
                err.innerHTML = 'Password must contain at least 8 characters, one uppercase, one special character, and one number.';
                err.style.display = 'block';
            }else{
                this.normalState(password);
            }

            if(passwordValue !== confirmPasswordValue){
                isValid = false;
                const parent = password.parentElement;
                const err = parent.querySelector('.form-err');
                err.innerHTML = 'Password Must match'
                err.style.display = 'block';
                confirmPassword.style.border = '1px solid red';
            }else{
                this.normalState(confirmPassword);
            }
            
            if(isValid){
                this.singUpComplete();
            }
            
        })
        
    }

    checkInputValue(){
        const inputs = document.querySelectorAll('.input-boxes input');
        let isValid = true;
        inputs.forEach(input => {
            let content = '';
            let value = input.value;
            if(value === content){
                isValid = false;
                this.errorState(input);
            }
        })
    }

    errorState(value){
        const parent = value.parentElement;
        const err = parent.querySelector('.form-err');
        err.style.display = 'block';
        value.style.border = '1px solid red';
    }

    normalState(value){
        const parent = value.parentElement;
        const err = parent.querySelector('.form-err');
        err.style.display = 'none';
    }

    checkPasswordValue(){
        const password = document.querySelector('#password');
        const special = document.querySelector('#pw-special');
        const cap = document.querySelector('#pw-cap');
        const char = document.querySelector('#pw-character');
        const num = document.querySelector('#pw-num');

        const reg_cap = /[A-Z]+/;
        const reg_special = /[%_+-.!@#$^&*]/;
        const reg_num = /[0-9]+/;
        
        password.addEventListener('input', e => {
            const passwordValue = password.value;

            if(reg_cap.test(passwordValue)){
                cap.classList.add('active');
            }else{
                cap.classList.remove('active');
            }

            if(reg_special.test(passwordValue)){
                special.classList.add('active');
            }else{
                special.classList.remove('active');
            }

            if(passwordValue.length >= 8){
                char.classList.add('active');
            }else{
                char.classList.remove('active');
            }

            if(reg_num.test(passwordValue)){
                num.classList.add('active');
            }else{
                num.classList.remove('active');
            }
        });
    }

    singUpComplete(){
        const signUpSuccess = document.querySelector('.sign-up-success-modal');
        const dismissBtn = document.querySelector('#dismiss-sign-up');

        signUpSuccess.style.display = 'block';

        dismissBtn.addEventListener('click', this.backToOriginal.bind(this));
    }

    async backToOriginal(){
        try{
            const response = await fetch('./index.html');
            if(!response.ok){
                throw new Error('cannot go back');
            }
            const result = await response.text();
            this.$body.innerHTML = result;
        }
        catch(error){
            console.error(error);
        }
    }
}

new App();