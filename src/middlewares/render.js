import { render } from '../../node_modules/lit-html/lit-html.js';

const main = document.querySelector('main');

function renderMain(content) {
    render(content, main);
}

export function addRender(ctx, next) {
    ctx.render = renderMain;

    next();
}