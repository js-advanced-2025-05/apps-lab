import { render } from '../node_modules/lit-html/lit-html.js';

const main = document.querySelector('main');
const nav = document.querySelector('nav');

let views = {};

export function showView(view) {
    main.replaceChildren(view);
}

export async function navigate(id, ...params) {
    const view = views[id];

    if (typeof view == 'function') {
        const section = await view(...params);

        if (section) {
            render(section, main);
        }
    }
}

export function initNav(iniViews) {
    views = iniViews;

    nav.addEventListener('click', (e) => {
        e.preventDefault();
        const id = e.target.id;

        navigate(id);
    });
}

export function link(ref, callback) {
    ref.addEventListener('click', e => {
        e.preventDefault();

        callback();
    })
}