import { getUserData } from '../utils.js';

export function hasUser(ctx, next) {
    const userData = getUserData();

    if (!userData) {
        return ctx.page.redirect('/login');
    }

    next();
}