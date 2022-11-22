const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//an empty array created for storing user details
let users = [];

form.addEventListener('submit', e => {


    e.preventDefault();
    validateInputs();
});

//we havea already created css classses for success input boxes  and error input boxes. we are defining two functions for succes inputs and error inputs.these are used at the validation parts of this script.

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

//validating email address.(cheking for a proper email format with @ symbol and all)

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {

    //validating user inputs. if the inputs are correct the input box will turn green after clicking on the submit button.else it will turn red.

    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if(usernameValue === '') {
        setError(username, 'Username is required');
    } else {
        setSuccess(username);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 character.')
    } else {
        setSuccess(password);
    }

    if(password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match");
    } else {
        setSuccess(password2);
    }


    //creating user as an object to be stored in the array called users

    let user = {
        user_name:usernameValue,
        user_email:emailValue,
        user_password:passwordValue

    }

    users.push(user);
    document.forms[0].reset();

    //to check the objects added to the array using. use comsole to check wheather objects are being added or not.

    console.warn('added',{users});
    console.log(users)
    let pre = document.querySelector('#msg pre');
    pre.textContent = '\n' + JSON.stringify(users, '\t' , 2);

};
