import { showView } from './utils.js';

const section = document.getElementById('details-view');

export function showDetailsView(recipeId) {
    showView(section);

    loadRecipe(recipeId);
}

async function loadRecipe(recipeId) {
    const loader = document.createElement('p');
    loader.textContent = 'Loading...';
    loader.style.color = 'white';
    section.replaceChildren(loader);

    const url = 'http://localhost:3030/data/recipes/' + recipeId;

    const res = await fetch(url);
    const data = await res.json();

    showRecipe(data);
}

function showRecipe(data) {
    const element = document.createElement('article');

    element.innerHTML = `
    <h2>${data.name}</h2>
    <div class="band">
        <div class="thumb">
            <img src="${data.img}">
        </div>
        <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul>
                ${data.ingredients.map(i => `<li>${i}</li>`).join('')}
            </ul>
        </div>
    </div>
    <div class="description">
        <h3>Preparation:</h3>
        ${data.steps.map(s => `<p>${s}</p>`).join('')}
    </div>`;

    section.replaceChildren(element);
}