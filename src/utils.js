const main = document.querySelector('main');

let userData = null;

export function getUserData() {
    return userData;
}

export function updateNav() {
    userData = JSON.parse(sessionStorage.getItem('userData'));

    if (userData) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

export function showView(view) {
    main.replaceChildren(view);
}

export function navigate(e, callback) {
    e.preventDefault();
    callback();
}