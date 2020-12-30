export interface LoginRequest {
    username : string;
    password : string;
}

export interface LoginResponse {
    jwt : string;
}

export interface Auth {
    id : number;
    admin : boolean;
}

export interface User extends Auth {
    username : string;
}

export interface PutableUser {
    newPass : string;
    oldPass : string;
}

export interface PostableUser {
    username : string;
    password : string;
}

export interface Tag {
    id : number;
    name : string;
}

export interface BareTag {
    name : string;
}

export interface Item {
    id : number;
    name : string;
    price : number;
    description : string;
    img? : string;
    tags : Tag[];
}

export interface PostableItem {
    name : string;
    price : number;
    description : string;
    img? : string;
    tags : BareTag[];
}

export interface PutableItem extends PostableItem {
    id : number;
}

export interface OrderItem extends Item {
    quantity : number;
}

export interface PostableOrderItem {
    id : number;
    quantity : number;
}

export interface Order {
    id : number;
    date : number;
    userID : number;
    items : OrderItem[];
}

export interface PostableOrder {
    userID : number;
    stripeToken : string;
    items : PostableOrderItem[];
}

export interface ItemSearchQueryParams {
    text? : string;
    tag? : string;
    quantity? : number;
    page? : number;
}

export interface Action {
    type : string;
    payload? : any;
}

export interface Store {
    user : User | null;
    cart : Item[];
}

export type ListItemTypes = Order | User | Item;

export interface PaymentRequest {
    id : string;
    amount: number;
}

export interface PaymentResponse {
    status : string;
}