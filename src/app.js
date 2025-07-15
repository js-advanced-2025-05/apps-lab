import page from '../node_modules/page/page.mjs';

import { updateNav, logout } from './utils.js';
import { addRender } from './middlewares/render.js';
import { hasUser } from './middlewares/guards.js';

import { showHomeView } from './views/home.js';
import { showCatalogView } from './views/catalog.js';
import { showLoginView } from './views/login.js';
import { showRegisterView } from './views/register.js';
import { showCreateView } from './views/create.js';
import { showDetailsView } from './views/details.js';
import { showEditView } from './views/edit.js';

const logoutRef = document.getElementById('logoutBtn');

logoutRef.addEventListener('click', async (e) => {
    e.preventDefault();
    await logout();
    page.redirect('/');
});

page(addRender);
page('/', showHomeView);
page('/catalog', showCatalogView);
page('/catalog/:id', showDetailsView);
page('/edit/:id', hasUser, showEditView);
page('/create', hasUser, showCreateView);
page('/login', showLoginView);
page('/register', showRegisterView);

updateNav();

page.start();