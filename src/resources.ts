export const API = new URL('http://localhost:3001');

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
    SIGN_UP: 'signup',
    LOG_IN: 'login',
    LOG_OUT: 'logout',
    EDIT_USERNAME: 'user/edit/username',
    EDIT_PASSWORD: 'user/edit/password',
    ORDER: 'order',
    USER: 'user',
    ITEM: 'item',
    TAG: 'tag',
    PAY: 'pay'
}).reduce((acc, cur) => ({ ...acc, [cur[0]]: API + cur[1] }), {});