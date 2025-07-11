import { updateNav } from './utils.js';
import { initNav, navigate } from './nav.js';

import { showCatalogView } from './views/catalog.js';
import { showLoginView } from './views/login.js';
import { showRegisterView } from './views/register.js';
import { showCreateView } from './views/create.js';
import { showDetailsView } from './views/details.js';

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