import { html } from '../../node_modules/lit-html/lit-html.js';

import { login } from '../data/user.js';
import { saveUserData, updateNav } from '../utils.js';

const loginTemplate = (onLogin) => html`
<section id="login-view">
    <article>
        <h2>Login</h2>
        <form @submit=${onLogin}>
            <label>E-mail: <input type="text" name="email" ?disabled=${!onLogin}></label>
            <label>Password: <input type="password" name="password" ?disabled=${!onLogin}></label>
            <input type="submit" value="Login" ?disabled=${!onLogin}>
        </form>
    </article>
</section>`;

export function showLoginView(ctx) {
    ctx.render(loginTemplate(onLogin));

    async function onLogin(event) {
        event.preventDefault();
    
        const formData = new FormData(event.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
    
        try {
            if (!email || !password) {
                return;
            }

            ctx.render(loginTemplate());
    
            const data = await login(email, password);
            saveUserData({
                id: data._id,
                accessToken: data.accessToken
            });
    
            updateNav();
            ctx.page.redirect('/');
        } catch (error) {
            alert(error.message);
        }
    }
}