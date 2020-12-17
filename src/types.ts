export interface Action {
    type : string;
    payload? : any;
}

export interface Store {
    user : User | null;
}

export interface User {
    username : string;
    isAdmin : boolean;
}