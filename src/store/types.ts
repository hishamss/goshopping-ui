export const UPDATE_USER = 'UPDATE_USER';
export const SIGN_UP = 'SIGN_UP';
export const LOG_IN = 'LOG_IN';
export const USERS = 'USERS';
export const STORE = 'STORE';
export const ORDERS = 'ORDERS';

export type ListTypes = typeof STORE | typeof ORDERS | typeof USERS;
interface listItemTitleKeys {
    [ORDERS] : 'id';
    [STORE] : 'title';
    [USERS] : 'username';
}
export const listItemTitleKeyMap = {
    [ORDERS]: 'id',
    [STORE]: 'title',
    [USERS]: 'username'
} as listItemTitleKeys;