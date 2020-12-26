export interface Action {
    type : string;
    payload? : any;
}

export interface Store {
    user : User | null;
}

export interface User {
    id : number;
    username : string;
    isAdmin : boolean;
}

export interface StoreItem {
    id : number;
    title : string;
    description: string;
}

export interface Order {
    id : number;
    itemId: number;
    quantity: number;
    userId: number;
}

export interface Tag {
    id : number;
    name : string;
}

export type ListItemTypes = StoreItem | Order | User;

export interface LoginForm {
    username : string;
    password : string;
    confirmPassword? : string;
}

export interface EditUsernameForm {
    newUsername : string;
    password : string;
}

export interface EditPasswordForm {
    password : string;
    newPassword : string;
}