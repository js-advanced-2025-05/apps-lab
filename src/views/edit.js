import { html } from '../../node_modules/lit-html/lit-html.js';

import { getRecipeById, updateRecipe } from '../data/recipe.js';

const editTemplate = ({ name, img, ingredients, steps }, onSubmit) => html`
<section id="create">
    <article>
        <h2>Edit Recipe</h2>
        <form id="editForm" @submit=${onSubmit}>
            <label>Name: <input type="text" name="name" placeholder="Recipe name" .value=${name}></label>
            <label>Image: <input type="text" name="img" placeholder="Image URL" .value=${img}></label>
            <label class="ml">Ingredients: <textarea name="ingredients"
                    placeholder="Enter ingredients on separate lines" .value=${ingredients.join('\n')}></textarea></label>
            <label class="ml">Preparation: <textarea name="steps"
                    placeholder="Enter preparation steps on separate lines" .value=${steps.join('\n')}></textarea></label>
            <input type="submit" value="Save Changes">
        </form>
    </article>
</section>`;

export async function showEditView(ctx) {
    const recipeId = ctx.params.id;

    ctx.render(html`<p style="color: white">Loading...</p>`);

    const recipe = await getRecipeById(recipeId);

    ctx.render(editTemplate(recipe, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const {
            name,
            img,
            ingredients,
            steps
        } = Object.fromEntries(formData.entries());

        try {
            if (!name || !img || !ingredients || !steps) {
                throw new Error('All fields are required');
            }

            await updateRecipe(recipeId, {
                name,
                img,
                ingredients: ingredients.split('\n'),
                steps: steps.split('\n')
            });

            ctx.page.redirect('/catalog/' + recipeId);
        } catch (error) {
            alert(error.message);
        }
    }
}