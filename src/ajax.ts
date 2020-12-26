import axios from 'axios';
import { apiRoutes as api } from './resources';
import { User, StoreItem, Order, Tag } from './types';
import { LoginForm, EditUsernameForm, EditPasswordForm } from './types';

// Many of these functions are nearly identical to each other and may be able to be merged into a reusable function if isolation of concerns is not especially desired

// Authentication/Registration

export async function signup(formData : LoginForm) : Promise<User|null>{
    try {
        const { data } = await axios.post(api.SIGN_UP, formData);
        return (data ? data as User : null);
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function login(formData : LoginForm) : Promise<User|null>{
    try {
        const { data } = await axios.post(api.LOG_IN, formData);
        return (data ? data as User : null);
    } catch (e) {
        console.log(e);
        return null;
    }
}

export async function editUsername(formData : EditUsernameForm) : Promise<User|null> {
    try {
        const { data } = await axios.post(api.EDIT_USERNAME, formData);
        return (data ? data as User : null);
    } catch (e) {
        console.log(e);
        throw new Error('Error updating username');
    }
}

export async function editPassword(formData : EditPasswordForm) : Promise<User|null> {
    try {
        const { data } = await axios.post(api.EDIT_PASSWORD, formData);
        return (data ? data as User : null);
    } catch (e) {
        console.log(e);
        throw new Error('Error updating password');
    }
}


// Store Items

export async function getStoreItems() : Promise<[StoreItem]|[]> {
    try {
        const { data } = await axios.get(api.ITEM);
        return (Array.isArray(data) ? data as [StoreItem] : []);
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function getStoreItem(id : number) : Promise<StoreItem|null> {
    try {
        const { data } = await axios.get(api.ITEM + `/${id}`);
        return (data ? data as StoreItem : null);
    } catch (e) {
        console.log(e);
        return null;
    }
}


// Orders

export async function getAllOrders() : Promise<[Order]|[]> {
    try {
        const { data } = await axios.get(api.ORDER);
        return (Array.isArray(data) ? data as [Order] : []);
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function getOrdersForUser(user : User) : Promise<[Order]|[]> {
    try {
        let { data } = await axios.get(api.ORDER + `/${user.id}`); data = [data]; // for json-server
        return (Array.isArray(data) ? data as [Order] : []);
    } catch (e) {
        console.log(e);
        return [];
    }
}


export async function getOrderById(id : number) : Promise<Order|null> {
    try {
        const { data } = await axios.get(api.ORDER + `/${id}`);
        return (data ? data as Order : null);
    } catch (e) {
        console.log(e);
        return null;
    }
}


// Users

export async function getUsers() : Promise<[User]|[]> {
    try {
        const { data } = await axios.get(api.USER);
        return (Array.isArray(data) ? data as [User] : []);
    } catch (e) {
        console.log(e);
        return [];
    }
}

export async function getUser(id : number) : Promise<User|null> {
    try {
        const { data } = await axios.get(api.USER + `/${id}`);
        return (data ? data as User : null);
    } catch (e) {
        console.log(e);
        return null;
    }
}


// Tags

export async function getTags() : Promise<[Tag]|[]> {
    try {
        const { data } = await axios.get(api.TAG);
        return (Array.isArray(data) ? data as [Tag] : []);
    } catch (e) {
        console.log(e);
        return [];
    }
}