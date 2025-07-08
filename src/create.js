import { showView, getUserData } from './utils.js';
import { showLoginView } from './login.js';
import { showCatalogView } from './catalog.js';
import { post } from './data/request.js';
import { createRecipe } from './data/recipe.js';

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

    const name = formData.get('name');
    const img = formData.get('img');
    const ingredients = formData.get('ingredients').split('\n');
    const steps = formData.get('steps').split('\n');

    try {
        if (!recipe.name || !recipe.img || !recipe.ingredients.length || !recipe.steps.length) {
            throw new Error('All fields are required');
        }

        await createRecipe(name, img, ingredients, steps)

        showCatalogView();
    } catch (error) {
        alert(error.message);
    }
}