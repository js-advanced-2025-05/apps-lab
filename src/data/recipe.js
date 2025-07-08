import { get, post } from './request.js';

export async function getAllRecipes() {
    return get('/data/recipes?select=_id%2Cname%2Cimg');
}

export async function getRecipeById(recipeId) {
    return get('/data/recipes/' + recipeId);
}

export async function createRecipe(name, img, ingredients, steps) {
    return post('/data/recipes', { name, img, ingredients, steps });
}