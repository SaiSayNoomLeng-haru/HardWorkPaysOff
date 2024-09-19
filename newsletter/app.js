class App{
    constructor(){

        this.$form = document.querySelector('#form');
        this.$email = document.querySelector('#email');
        this.$img = document.querySelector('#img');
        this.$error = document.querySelector('#email-error');
        this.$main = document.querySelector('main');
        this.$body = document.body;

        this.addEventListener();
        this.updateImg();
    }

    addEventListener(){
        window.addEventListener('resize', this.updateImg.bind(this));

        this.$form.addEventListener('submit', e => {
            e.preventDefault();
            this.validateEmail();
        });
    }

    updateImg(){
        const small = window.matchMedia('(max-width: 34.9em)');

        if(small.matches){
            this.$img.setAttribute('src', './assets/img/illustration-sign-up-mobile.svg');
        }
        else{
            this.$img.setAttribute('src', './assets/img/illustration-sign-up-desktop.svg');
        }
    }

    validateEmail(){
        const emailInput = this.$email.value;
        const regEmail = /^[a-zA-Z0-9]+@[a-z]+\.[a-zA-Z]{2,}$/;
        let isValid = true;

        if(!regEmail.test(emailInput)){
            isValid = false;
            this.$email.style.backgroundColor = 'hsl(var(--clr-tomato) / .5)';
            this.$error.style.display = 'block';
            this.$email.style.border = '3px solid hsl(var(--clr-tomato))';
        }else{
            isValid = true;
            this.toSuccess();
        }
    }

    async toSuccess(){
        try{
            const response = await fetch('./success.html');
            if(!response.ok){
           throw new Error('network error');
            }
            const result = await response.text();
            this.$body.innerHTML = result;
            
            this.$userEmail = document.querySelector('#user-email');
            this.$userEmail.textContent = this.$email.value;

            document.querySelector('#dismiss-btn').addEventListener('click', this.close);
        }
        catch(err){
            console.log(err);
        }
    }

    close(){
       window.location.reload();
    }
}
new App();