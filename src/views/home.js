import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getRecentRecipes } from '../data/recipe.js';

const homeTemplate = (recipes) => html`
<section id="home">
    <div class="hero">
        <h2>Welcome to My Cookbook</h2>
    </div>
    <header class="section-title">Recently added recipes</header>
    <div class="recent-recipes">
        ${recipes[0] ? recipePreview(recipes[0]) : nothing }
        ${recipes[1] ? [spacer(), recipePreview(recipes[1])] : nothing }
        ${recipes[2] ? [spacer(), recipePreview(recipes[2])] : nothing }
    </div>
    <footer class="section-title">
        <p>Browse all recipes in the <a href="/catalog">Catalog</a></p>
    </footer>
</section>`;

const recipePreview = ({ name, img, _id }) => html`
<a class="card" href="/catalog/${_id}">
    <article class="recent">
        <div class="recent-preview"><img src=${img}></div>
        <div class="recent-title">${name}</div>
    </article>
</a>`;

const spacer = () => html`<div class="recent-space"></div>`;

export async function showHomeView(ctx) {
    ctx.render(html`<p style="color: white">Loading...</p>`);

    const recipes = await getRecentRecipes();

    ctx.render(homeTemplate(recipes));
}