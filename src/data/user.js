import { get, post } from './request.js';

export async function login(email, password) {
    return post('/users/login', { email, password });
}

export async function register(email, password) {
    return post('/users/register', { email, password });
}

export async function logout() {
    return get('/users/logout');
}