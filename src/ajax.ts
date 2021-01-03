import axios from 'axios';
import { apiRoutes as api } from './resources';
import * as models from './types';
import jwtDecode from 'jwt-decode';

// Authentication/Registration

export async function signup(formData : models.PostableUser) : Promise<models.User>{
    try {
        const { data } = await axios.post(api.USER, formData);
        return data as models.User;
    } catch (e) {
        console.log(e);
        throw e.response.status;
    }
}

export async function login(formData : models.LoginRequest) : Promise<models.User>{
    try {
        const { data: { jwt } } = await axios.post<models.LoginResponse>(api.LOG_IN, formData);
        const o : any = jwtDecode(jwt);
        const auth : models.Auth = JSON.parse(o.auth);
        const user : models.User = { ...auth, username: formData.username };
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('jwt', jwt);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + jwt;
        return user;
    } catch (e) {
        console.log(e);
        throw e.response.status;
    }
}

/** Reset local storage */
export function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('jwt');
    delete axios.defaults.headers.common['Authorization'];
}

export async function editPassword(formData : models.PutableUser) : Promise<models.User|null> {
    try {
        const { data } = await axios.put(api.USER, formData);
        return data as models.User;
    } catch (e) {
        console.log(e);
        throw new Error('Error updating password');
    }
}


// Store Items

export async function getStoreItems(params : models.ItemSearchQueryParams) : Promise<models.Item[]> {
    try {
        const { data } = await axios({
            url: api.ITEM,
            params
        });
        return (data as models.Item[]);
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function getStoreItem(id : number) : Promise<models.Item|null> {
    try {
        const { data } = await axios.get(api.ITEM + `/${id}`);
        return (data as models.Item);
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function deleteStoreItem(id : number) {
    try {
        axios.delete(api.ITEM + `/${id}`);
    } catch (e) {
        console.log(e);
        throw new Error('Failed to delete item');
    }
}


export async function createStoreItem(formData : models.PostableItem) : Promise<models.Item> {
    try {
        const { data } = await axios.post(api.ITEM, formData);
        return data;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to create item');
    }
}

export async function updateStoreItem(formData : models.PutableItem) : Promise<models.Item> {
    try {
        const { data } = await axios.put(api.ITEM + `/${formData.id}`, formData);
        return data;
    } catch (e) {
        throw new Error('Failed to update item');
    }
}

// Orders

export async function getOrders(uid? : number) : Promise<models.Order[]> {
    try {
        const { data } = await axios.get(api.ORDER + (uid ? `?uid=${uid}` : ''));
        return data as models.Order[];
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function getOrderById(id : number) : Promise<models.Order|null> {
    try {
        const { data } = await axios.get(api.ORDER + `/${id}`);
        return data as models.Order;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function createOrder(formData : models.PostableOrder) : Promise<models.Order> {
    try {
        const { data } = await axios.post<models.Order>(api.ORDER, formData);
        return data as models.Order;
    } catch (e) {
        console.log(e);
        throw new Error('Failed to create order');
    }
}


// Users

export async function getUsers() : Promise<models.User[]> {
    try {
        const { data } = await axios.get<models.User[]>(api.USER);
        console.log(data);
        return data;
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function getUser(id : number) : Promise<models.User|null> {
    try {
        const { data } = await axios.get<models.User>(api.USER + `/${id}`);
        return data;
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function deleteUser(id : number) {
    try {
        axios.delete(api.USER + `/${id}`);
    } catch (e) {
        console.log(e);
        throw new Error('Failed to delete user');
    }
}


// Tags

export async function getTags() : Promise<models.Tag[]> {
    try {
        const { data } = await axios.get(api.TAG);
        return (Array.isArray(data) ? data as models.Tag[] : []);
    } catch (e) {
        console.log(e);
        return [];
    }
}


// Payment

export async function chargeCustomerCard(formData: models.PostableOrder): Promise<models.OrderResponse>{
    try {
        const {data, status} = await axios.post(api.ORDER, formData);
  
        const response:models.OrderResponse = {
            data,
            status,
        };
        return response;
    } catch (e) {
        console.log(e);
        throw e;
    }
} 