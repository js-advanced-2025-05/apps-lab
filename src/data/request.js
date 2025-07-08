import { getUserData } from '../utils.js';

const hostname = 'http://localhost:3030';

export async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    };

    const userData = getUserData();
    
    if (userData) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json',
        options.body = JSON.stringify(data)
    }

    const res = await fetch(hostname + url, options);

    if (!res.ok) {
        const error = await res.json();
        throw error;
    }

    return res.json();
}

export const get = (url) => request('get', url);
export const post = (url, data) => request('post', url, data);