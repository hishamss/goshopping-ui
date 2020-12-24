export const API = new URL('http://localhost:8080/go-shopping-server');

export const routes = {
    HOME: '/',
    ABOUT: '/about',
    CONTACT: '/contact',
    ADMIN: '/admin',
    PROFILE: '/profile',
    ORDERS: '/orders',
    SIGN_UP: '/signup',
    LOG_IN: '/login',
    STORE: '/items',
    USERS: '/users',
    ORDER: '/order',
    STORE_ITEM: '/item',
    USER: '/user'
}

export const apiRoutes : any = Object.entries({
    SIGN_UP: '/signup',
    LOG_IN: '/login',
    LOG_OUT: '/logout',
    ORDER: '/order',
    USER: '/user',
    ITEM: '/item',
    TAG: '/tag'
}).reduce((acc, cur) => ({ ...acc, [cur[0]]: API + cur[1] }), {});