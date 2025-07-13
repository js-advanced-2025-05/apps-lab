import { updateNav, logout } from './utils.js';
import { initNav, navigate } from './nav.js';

import { showCatalogView } from './views/catalog.js';
import { showLoginView } from './views/login.js';
import { showRegisterView } from './views/register.js';
import { showCreateView } from './views/create.js';
import { showDetailsView } from './views/details.js';

const logoutRef = document.getElementById('logoutBtn')

const views = {
    'catalog-link': showCatalogView,
    'login-link': showLoginView,
    'register-link': showRegisterView,
    'create-link': showCreateView,
    'details': showDetailsView
};

logoutRef.addEventListener('click', async (e) => {
    e.preventDefault();
    await logout();
    navigate('catalog-link');
});

initNav(views);

updateNav();

navigate('catalog-link');