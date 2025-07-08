import { getAllRecipes } from './data/recipe.js';
import { navigate, link } from './nav.js';

const section = document.getElementById('catalog-view');

export function showCatalogView() {
    loadRecipes();

    return section;
}

async function loadRecipes() {
    const loader = document.createElement('p');
    loader.textContent = 'Loading...';
    loader.style.color = 'white';
    section.replaceChildren(loader);

    const data = await getAllRecipes();

    showRecipes(data);
}

function showRecipes(recipes) {
    section.replaceChildren(...recipes.map(createRecipePreview));
}

function createRecipePreview(record) {
    const element = document.createElement('article');
    element.className = 'preview';

    element.innerHTML = `
    <div class="title">
        <h2>${record.name}</h2>
    </div>
    <div class="small">
        <img src="${record.img}">
    </div>`;

    link(element, () => navigate('details', record._id));

    return element;
}

/*
<article class="preview">
    <div class="title">
        <h2>Title</h2>
    </div>
    <div class="small">
        <img src="assets/lasagna.jpg">
    </div>
</article>
*/

/*
<article>
    <h2>Title</h2>
    <div class="band">
        <div class="thumb">
            <img src="assets/lasagna.jpg">
        </div>
        <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul>
                <li>Ingredient 1</li>
                <li>Ingredient 2</li>
                <li>Ingredient 3</li>
                <li>Ingredient 4</li>
            </ul>
        </div>
    </div>
    <div class="description">
        <h3>Preparation:</h3>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius, quaerat.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consectetur officia ipsam nulla vitae nobis
            reprehenderit pariatur aut dolor exercitationem impedit.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus dolorem odit officiis numquam
            corrupti? Quam.</p>
    </div>
</article>
*/