import { html, nothing } from '../../node_modules/lit-html/lit-html.js';

import { getRecipeById } from '../data/recipe.js';
import { getUserData } from '../utils.js';

const detailsTemplate = ({ name, img, ingredients, steps }, isOwner) => html`
<section id="details-view">
    <article>
        <h2>
            ${name}
            ${isOwner ? html`<button>Edit</button><button>Delete</button>` : nothing }
        </h2>
        <div class="band">
            <div class="thumb">
                <img src=${img}>
            </div>
            <div class="ingredients">
                <h3>Ingredients:</h3>
                <ul>
                    ${ingredients.map(i => html`<li>${i}</li>`)}
                </ul>
            </div>
        </div>
        <div class="description">
            <h3>Preparation:</h3>
            ${steps.map(s => html`<p>${s}</p>`)}
        </div>
    </article>
</section>`;

export async function showDetailsView(ctx, recipeId) {
    ctx.render(html`<p style="color: white">Loading...</p>`);

    const userData = getUserData();

    const recipe = await getRecipeById(recipeId);

    const isOwner = userData && userData.id == recipe._ownerId;

    ctx.render(detailsTemplate(recipe, isOwner));
}