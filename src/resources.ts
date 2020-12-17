export const API = new URL('http://localhost:8080/go-shopping-server');

export const routes = {
    HOME: '/',
    ADMIN: '/admin',
    AUTHENTICATED: '/authenticated',
    SIGN_UP: '/signup',
    LOG_IN: '/login',
    PAGE_ONE: '/page-one',
    PAGE_TWO: '/page-two',
}

export const apiRoutes : any = Object.entries({
    SIGN_UP: '/signup',
    LOG_IN: '/login',
    LOG_OUT: '/logout',
    ADMIN: '/admin'
}).reduce((acc, cur) => ({ ...acc, [cur[0]]: API + cur[1] }), {});