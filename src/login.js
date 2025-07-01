document.querySelector('form').addEventListener('submit', onLogin);

async function onLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
        if (!email || !password) {
            return;
        }

        const url = 'http://localhost:3030/users/login';
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

        location = '/';
    } catch (error) {
        alert(error.message);
    }
}