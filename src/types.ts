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
}

export interface Order {
    id : number;
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