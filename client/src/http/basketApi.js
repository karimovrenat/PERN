import {$authHost} from "./index";

export const createBasket = async (basket) => {
    console.log(basket);
    const {data} = await $authHost.post('api/basket', basket)
    return data
}