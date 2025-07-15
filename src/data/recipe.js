import { get, post, put } from './request.js';

const endpoints = {
    recent: '/data/recipes?sortBy=_createdOn%20desc&pageSize=3&select=_id%2Cname%2Cimg',
    all: '/data/recipes?select=_id%2Cname%2Cimg',
    byId: '/data/recipes/',
    create: '/data/recipes',
}

export async function getRecentRecipes() {
    return get(endpoints.recent);
}

export async function getAllRecipes() {
    return get(endpoints.all);
}

export async function getRecipeById(recipeId) {
    return get(endpoints.byId + recipeId);
}

export async function createRecipe(name, img, ingredients, steps) {
    return post(endpoints.create, { name, img, ingredients, steps });
}

export async function updateRecipe(recipeId, recipeData) {
    return put(endpoints.byId + recipeId, recipeData);
}