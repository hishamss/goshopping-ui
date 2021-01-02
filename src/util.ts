import { Location } from 'history';
import { User, OrderItem } from './types';


export function capitalize(string : string) {
    return string[0].toUpperCase() + string.slice(1);
}

export function getPathVar(location : Location) {
    return location.pathname.split(/\/.*?\//)[1];
}

export const updateCartStorage = (user : User|null, cart : OrderItem[]) => {
    const carts = JSON.parse( (localStorage.getItem("carts") || '{}') );
    carts[user ? user.id : 'guest'] = cart;
    localStorage.setItem("carts", JSON.stringify(carts));
}
