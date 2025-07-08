import { saveUserData, updateNav } from '../utils.js';
import { register } from '../data/user.js';
import { navigate } from '../nav.js';

const section = document.getElementById('register-view');
section.querySelector('form').addEventListener('submit', onRegister);

export function showRegisterView() {
    return section;
}

async function onRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const rePass = formData.get('rePass');

    try {
        if (!email) {
            throw new Error('Email is required');
        }
        if (password.length < 3) {
            throw new Error('Password must be at least 3 characters long!');
        }
        if (password != rePass) {
            throw new Error('Passwords must match!');
        }

        const data = await register(email, password);
        saveUserData({
            id: data._id,
            accessToken: data.accessToken
        });

        updateNav();
        navigate('catalog-link');
    } catch (error) {
        alert(error.message);
    }
}