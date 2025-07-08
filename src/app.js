import { navigate, updateNav } from './utils.js';

import { showCatalogView } from './catalog.js';
import { showLoginView } from './login.js';
import { showRegisterView } from './register.js';
import { showCreateView } from './create.js';

import "./logout.js";

document.getElementById('views').remove();

updateNav();

document.getElementById('catalog-link').addEventListener('click', e => navigate(e, showCatalogView));
document.getElementById('login-link').addEventListener('click', e => navigate(e, showLoginView));
document.getElementById('register-link').addEventListener('click', e => navigate(e, showRegisterView));
document.getElementById('create-link').addEventListener('click', e => navigate(e, showCreateView));

showCatalogView();