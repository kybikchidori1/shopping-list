import items from "../mockData/items.json";
import { ResponseData } from "./interfaces";

export function getData(): Promise<ResponseData> {
    return Promise.resolve(items);
}
