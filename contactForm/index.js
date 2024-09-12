(()=>{
    'use strict';

    const submit = document.querySelector('.submit-btn');
    const form = document.querySelector('.form');
    const inputs = document.querySelectorAll('.input-boxes input');
    const textarea = document.querySelector('#message');
    const queries = form.query;
    const checkbox = document.querySelector('#consent');



    submit.addEventListener('click', (e)=>{
        e.preventDefault();

        let isValid = true;

        inputs.forEach(input => {
           const value = input.value;
           const inputId = input.id;
           const error = input.nextElementSibling;
           const textValue = textarea.textContent;

           //validate input value
           if(!value){
            error.style.opacity = 1;
            isValid = false;
            input.style.border = '1px solid hsl(var(--clr-red))';
            input.classList.add('shake');
           }

           // validate textarea value
           if(!textValue){
            textarea.nextElementSibling.style.opacity = 1;
            isValid = false;
            textarea.style.border = '1px solid hsl(var(--clr-red))';
            textarea.classList.add('shake');
           }

           //validate email
           if(inputId === 'email'){
            const regEmail = /^[a-zA-Z0-9]+@[a-z]+\.[a-z]{2,}$/;
            if(!regEmail.test(value)){
                isValid = false;
                error.style.opacity = 1;
                input.style.border = '1px solid hsl(var(--clr-red))';
                input.classList.add('shake');
            }
           }
        });

        //validate checkbox
        if(!checkbox.checked){
            const parent = checkbox.parentElement.parentElement;
            parent.querySelector('p').style.opacity = 1;
            isValid = false;
        }

        // validate radio
        queries.forEach(query => {
           if(query.checked){
            console.log(query.id)
           }else{
            const parent = query.parentElement.parentElement;
            parent.querySelector('p').style.opacity = 1;
           }
        })

    
        if(isValid){
            form.submit();
            document.querySelector('#success').style.display = 'block';
    
            setTimeout(()=>{
                document.querySelector('#success').style.display = 'none';
            }, 1000);
        }
    });

})();