import {$authHost, $host} from "./index";

export const createBasket = async (basket) => {
    const {data} = await $authHost.post('api/basket', basket)
    return data
}
export const fetchBasket = async () => {
    const {data} = await $host.get('api/basket/')
    return data;
}