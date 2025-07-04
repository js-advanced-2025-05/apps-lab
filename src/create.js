import { showView, getUserData } from './utils.js';
import { showLoginView } from './login.js';
import { showCatalogView } from './catalog.js';

const section = document.getElementById('create-view');
section.querySelector('form').addEventListener('submit', onCreate);

export function showCreateView() {
    if (!getUserData()) {
        showLoginView();

        return;
    }

    showView(section);
}

async function onCreate(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const recipe = {
        name: formData.get('name'),
        img: formData.get('img'),
        ingredients: formData.get('ingredients').split('\n'),
        steps: formData.get('steps').split('\n'),
    }

    try {
        if (!recipe.name || !recipe.img || !recipe.ingredients.length || !recipe.steps.length) {
            throw new Error('All fields are required');
        }

        const userData = getUserData();

        const url = 'http://localhost:3030/data/recipes';
        const options = {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userData.accessToken
            },
            body: JSON.stringify(recipe)
        };

        const res = await fetch(url, options);

        if (!res.ok) {
            const err = await res.json();
            throw err;
        }

        showCatalogView();
    } catch (error) {
        alert(error.message);
    }
}