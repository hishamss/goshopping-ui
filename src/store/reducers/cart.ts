import { Action } from '../../types';
import { UPDATE_CART } from '../types';

const cart = (state=[], { type, payload } : Action) => {
   if (!payload) return [...state];
    switch (type) {
        case UPDATE_CART:
            return [...payload];
        default:
            return [...state];
    }
}

export default cart;