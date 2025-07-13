import { html } from '../../node_modules/lit-html/lit-html.js';

import { register } from '../data/user.js';
import { navigate } from '../nav.js';
import { saveUserData, updateNav } from '../utils.js';

const registerTemplate = (onRegister) => html`
<section id="register-view">
    <article>
        <h2>Register</h2>
        <form @submit=${onRegister}>
            <label>E-mail: <input type="text" name="email"></label>
            <label>Password: <input type="password" name="password"></label>
            <label>Repeat: <input type="password" name="rePass"></label>
            <input type="submit" value="Register">
        </form>
    </article>
</section>`;

export function showRegisterView(ctx) {
    ctx.render(registerTemplate(onRegister));
    
    async function onRegister(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
        const rePass = formData.get('rePass');

        try {
            if (!email || !rePass || !password) {
                throw new Error('All fields are required');
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
}