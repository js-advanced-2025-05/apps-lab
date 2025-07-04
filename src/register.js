import { showView, updateNav } from './utils.js';
import { showCatalogView } from './catalog.js';

const section = document.getElementById('register-view');
section.querySelector('form').addEventListener('submit', onRegister);

export function showRegisterView() {
    showView(section);
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

        const url = 'http://localhost:3030/users/register';
        const options = {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        };

        const res = await fetch(url, options);

        if (res.ok != true) {
            const err = await res.json();
            throw err;
        }

        const data = await res.json();
        const userData = {
            id: data._id,
            accessToken: data.accessToken
        };

        sessionStorage.setItem('userData', JSON.stringify(userData));

        updateNav();
        showCatalogView();
    } catch (error) {
        alert(error.message);
    }
}