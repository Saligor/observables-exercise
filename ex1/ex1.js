import Kefir from 'https://unpkg.com/kefir@3.8.3/dist/kefir.esm.js';
import { isEmailValid, isPasswordValid } from './validation.js';

/**
 * Selector for error message on the password field
 * @type {Element}
 */
const passwordError = document.getElementById('password_error');

/**
 * Constant for the visible class
 * @type {string}
 */
const SHOW_ELEMENT_CLASS = 'visible';

/**
 * Selector for error message on the email field
 * @type {Element}
 */
const emailError = document.getElementById('email_error');

/**
 * Selector for success message on the form element
 * @type {Element}
 */
const successDiv = document.getElementById('successDiv');


const $email = Kefir.fromEvents(document.getElementById('email'), 'keydown')
    .map(e => e.target.value)
    .map(value => isEmailValid(value));

const $password = Kefir.fromEvents(document.getElementById('password'), 'keydown')
    .map(e => e.target.value)
    .map(value => isPasswordValid(value));


$email.observe(value => {
    value ?
        emailError.classList.remove(SHOW_ELEMENT_CLASS) :
        emailError.classList.add(SHOW_ELEMENT_CLASS);
});

$password.observe(value => {
    value ?
        passwordError.classList.add(SHOW_ELEMENT_CLASS) :
        passwordError.classList.remove(SHOW_ELEMENT_CLASS);
});

const $result = Kefir.combine({ email: $email, password: $password}, result => {
    return result.email && result.password;
});

$result.observe(value => {
    value ?
        successDiv.classList.remove(SHOW_ELEMENT_CLASS) :
        successDiv.classList.add(SHOW_ELEMENT_CLASS);
});