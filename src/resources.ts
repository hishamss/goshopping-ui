let url = `http://54.151.78.250:8080/goshopping-api`;

if (window.location.host.includes('localhost')) {
    const local = localStorage.getItem('API_URL');
    url = localStorage.getItem('API_URL') || `http://localhost:8080/api`;

    if (!local) {
        console.warn("localStorage.getItem('API_URL') not set. " +
            "api url will be set to " + url);
    }
}

export const API = new URL(url);

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