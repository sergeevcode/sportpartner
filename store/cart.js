import { makeAutoObservable, toJS } from "mobx"
import { API_URL } from "../constants";

class Cart {
    items = [];
    isCartEmpty = false;
    isItemsLoaded = false;

    constructor() {
        makeAutoObservable(this)
    }

    async addItem(item, itemName, updateCount = false) {

        const data = await fetch(`/api/cart/add`, {
            method: 'POST',
            body: JSON.stringify({
                product_id: item.id,
                price: item.price,
                quantity: !updateCount ? 1 : updateCount,
                name: itemName,
                color: item.props.color,
                weight: item.props.weight
            })
        });

        const json = await data.json();

        if (json) {
            if (this.items.length) {
                const changes = this.items.filter(item => item.ID != json.ID && item.PRODUCT_ID != json.PRODUCT_ID)

                this.items = [
                    ...changes,
                    json
                ];
            } else {
                this.items = [json];
            }

            return true;
        } else {
            return false;
        }
    }

    async deleteItem(itemId) {
        const item = this.items.filter((item) => Number(item.PRODUCT_ID) == itemId)[0];

        const data = await fetch(`/api/cart/delete`, {
            method: 'POST',
            body: JSON.stringify({
                basket_id: item.ID,
            })
        });

        const json = await data.json();

        if (json) {
            this.items = this.items.filter((item) => item.PRODUCT_ID != itemId);

            return true;
        } else {
            return false;
        }
    }

    async fetchCartItems() {
        const data = await fetch(`/api/cart/get`);

        const json = await data.json();

        if (!json.length) {
            this.isCartEmpty = true;
        }

        this.items = json;
        this.isItemsLoaded = true;
    }

    getCartSum() {
        let sum = 0;

        this.items.map(item => {
            sum += Number(item.PRICE) * Number(item.QUANTITY)
        });

        return sum;
    }

    getCartDiscount() {
        let discount = 0;

        this.items.map(item => {
            if (!Array.isArray(item.DISCOUNT) && item.DISCOUNT.VALUE) {

                if (item.DISCOUNT.TYPE === "P") {
                    discount += (Number(item.DISCOUNT.VALUE) / 100) * Number(item.PRICE) * Number(item.QUANTITY);
                } else if (item.DISCOUNT.TYPE === "F") {
                    discount += Number(item.DISCOUNT.VALUE);
                }

            }
        });

        return Math.round(discount);
    }


    checkItemInCart(itemId) {
        const item = this.items.length && this.items.filter(item => Number(item.PRODUCT_ID) === Number(itemId));
        const quantity = (item && item.length) ? Number(item[0].QUANTITY) : 0;
        return quantity;
    }

    getCartItemsCount() {
        return this.items.length;
    }

    getCartItems() {
        return [...this.items];
    }
}

export default new Cart();