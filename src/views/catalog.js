import { html } from '../../node_modules/lit-html/lit-html.js';

import { getAllRecipes } from '../data/recipe.js';

const catalogTemplate = (recipes) => html`
<section id="catalog-view">
    ${recipes.map(recipePreview)}
</section>
`;

const recipePreview = ({ name, img, _id }) => html`
<a href=${`/catalog/${_id}`}>
    <article class="preview">
        <div class="title">
            <h2>${name}</h2>
        </div>
        <div class="small">
            <img src=${img}>
        </div>
    </article>
</a>`;

export async function showCatalogView(ctx) {
    ctx.render(html`<p style="color: white">Loading...</p>`);

    const recipes = await getAllRecipes();

    ctx.render(catalogTemplate(recipes));
}