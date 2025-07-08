import { updateNav } from './utils.js';
import { initNav, navigate } from './nav.js';

import { showCatalogView } from './catalog.js';
import { showLoginView } from './login.js';
import { showRegisterView } from './register.js';
import { showCreateView } from './create.js';
import { showDetailsView } from './details.js';

document.getElementById('views').remove();

const views = {
    'catalog-link': showCatalogView,
    'login-link': showLoginView,
    'register-link': showRegisterView,
    'create-link': showCreateView,
    'details': showDetailsView
};

initNav(views);

updateNav();

navigate('catalog-link');