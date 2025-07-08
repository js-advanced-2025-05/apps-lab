import { login } from './data/user.js';
import { navigate } from './nav.js';
import { saveUserData, updateNav } from './utils.js';

const section = document.getElementById('login-view');
section.querySelector('form').addEventListener('submit', onLogin);

export function showLoginView() {
    return section;
}

async function onLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        if (!email || !password) {
            return;
        }

        const data = await login(email, password);
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