import {  getUserData } from '../utils.js';
import { createRecipe } from '../data/recipe.js';
import { navigate } from '../nav.js';

const section = document.getElementById('create-view');
section.querySelector('form').addEventListener('submit', onCreate);

export function showCreateView() {
    if (!getUserData()) {
        navigate('login-link');

        return;
    }

    return section;
}

async function onCreate(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const name = formData.get('name');
    const img = formData.get('img');
    const ingredients = formData.get('ingredients').split('\n');
    const steps = formData.get('steps').split('\n');

    try {
        if (!name || !img || !ingredients.length || !steps.length) {
            throw new Error('All fields are required');
        }

        await createRecipe(name, img, ingredients, steps)

        navigate('catalog-link');
    } catch (error) {
        alert(error.message);
    }
}