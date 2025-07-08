let userData = null;

export function saveUserData(userData) {
    sessionStorage.setItem('userData', JSON.stringify(userData));
}

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