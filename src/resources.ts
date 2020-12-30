// export const API = new URL('http://localhost:3001');
export const API = new URL('http://localhost:4321/api');

export const routes = {
    HOME: '/',
    ABOUT: '/about',
    CONTACT: '/contact',
    PAYMENT: '/payment',
    PROFILE: '/profile',
    SIGN_UP: '/signup',
    LOG_IN: '/login',
    ORDERS: '/orders',
    STORE: '/items',
    USERS: '/users'
}

export const apiRoutes : any = Object.entries({
    LOG_IN: '/login',
    ORDER: '/order',
    USER: '/user',
    ITEM: '/item',
    TAG: '/tags',
}).reduce((acc, cur) => ({ ...acc, [cur[0]]: API + cur[1] }), {});