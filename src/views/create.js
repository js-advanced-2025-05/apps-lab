import { html } from '../../node_modules/lit-html/lit-html.js';

import {  getUserData } from '../utils.js';
import { createRecipe } from '../data/recipe.js';
import { navigate } from '../nav.js';

const createTemplate = (onCreate) => html `
    <section id="create-view">
        <article>
                <h2>New Recipe</h2>
                <form @submit=${onCreate}>
                    <label>Name: <input type="text" name="name" placeholder="Recipe name"></label>
                    <label>Image: <input type="text" name="img" placeholder="Image URL"></label>
                    <label class="ml">Ingredients: <textarea name="ingredients"
                            placeholder="Enter ingredients on separate lines"></textarea></label>
                    <label class="ml">Preparation: <textarea name="steps"
                            placeholder="Enter preparation steps on separate lines"></textarea></label>
                    <input type="submit" value="Create Recipe">
                </form>
        </article>
    </section>`

export function showCreateView(ctx) {
    if (!getUserData()) {
        navigate('login-link');

        return;
    }

    ctx.render(createTemplate(onCreate))

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
}