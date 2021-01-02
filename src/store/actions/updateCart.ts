import { OrderItem } from '../../types';

const updateCart = (payload : OrderItem[]) => ({ type: "UPDATE_CART", payload });

export default updateCart;