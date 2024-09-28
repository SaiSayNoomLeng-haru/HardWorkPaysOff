class App{
    constructor(){
        this.$year = document.querySelector('#year');
        this.$month = document.querySelector('#month');
        this.$day = document.querySelector('#day');
        this.$yearResult = document.querySelector('#year-result');
        this.$monthResult = document.querySelector('#month-result');
        this.$dayResult = document.querySelector('#day-result');
        this.$submitBtn = document.querySelector('#submit-btn');

        this.addEventListener();
    }

    addEventListener(){
        this.$submitBtn.addEventListener('click', e => {
            e.preventDefault();
            this.validateInput();
        });
    }

    // validate user input
    validateInput(){
        const yearInput = parseInt(this.$year.value);
        const monthInput = parseInt(this.$month.value);
        const dayInput = parseInt(this.$day.value);
        
        let isValid = true;
        const isEmpty = '';

        const inputs = document.querySelectorAll('.input-boxes input').forEach(input => {
            const value = input.value;
            const parent = input.parentElement;
            const label = parent.querySelector('label');
            const error = parent.querySelector('.error-message');

            if(value === isEmpty){
                isValid = false;
                label.style.color = 'hsl(var(--clr-red))';
                error.style.opacity = 1;
            }
            else if(!this.isValidDate(yearInput, monthInput, dayInput)){
                isValid = false;
                label.style.color = 'hsl(var(--clr-red))';
                error.style.opacity = 1;
                error.textContent = 'Must be a valid date';
            }
            else{
                isValid = true;
                label.style.color = 'hsl(var(--clr-dark))';
                error.style.opacity = 0;
            }
        });

        if(isValid){
            this.calculate(yearInput, monthInput, dayInput);
        }
        
    }

    // validate the valid date input
    isValidDate(year, month, day){
        const date = new Date(year, month - 1, day);
        return  date.getFullYear() === parseInt(year) &&
                date.getMonth() === month - 1 &&
                date.getDate() === parseInt(day);
    }

    calculate(year, month, day){
        const inputDate = new Date(year, month - 1, day);
        const today = new Date();
        const diff = today - inputDate;

        const years = new Date(diff).getUTCFullYear() - 1970;
        const months = new Date(diff).getUTCMonth();
        const days = new Date(diff).getUTCDate() - 1;

        // adjust months and days
        const adjustedMonth = months;
        const adjustedDay = days;

        if(days < 0){
            adjustedMonth--;
            adjustedDay += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
        }

        if(adjustedMonth < 0 ){
            years--;
            adjustedMonth += 12;
        }

        this.$dayResult.textContent = days;
        this.$monthResult.textContent = months;
        this.$yearResult.textContent = years;
    }


}

new App();