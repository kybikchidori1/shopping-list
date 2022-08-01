export interface Product {
    id: number;
    name: string;
    price: string;
    image: string;
    description?: string;
}

export interface ListItem {
    id: number;
    itemId: number;
    amount: number;
}

export interface ResponseData {
    goods: Product[];
    list: ListItem[];
}
