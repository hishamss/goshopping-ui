export const UPDATE_USER = 'UPDATE_USER';
export const UPDATE_CART = 'UPDATE_CART';
export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';
export const USERS = 'USERS';
export const STORE = 'STORE';
export const ORDERS = 'ORDERS';
export const CHECKOUT = 'CHECKOUT';

export type ListTypes = typeof STORE | typeof ORDERS | typeof USERS | typeof CHECKOUT;

export const listItemTitleKeys = {
    [USERS]: 'username',
    [ORDERS]: 'id',
    [STORE]: 'name',
    [CHECKOUT]: 'name'
}
