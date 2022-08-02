import styles from './ShopCart.module.css';
import CartItem from "./CartItem/CartItem";
import { useEffect, useState } from "react";
import { API_URL } from "../../constants";
import Loader from "../Loader/Loader";
import CardsCarouselAsync from "../CardsCarouselAsync/CardsCarouselAsync";
import Button from "../Button/Button";
import TextLink from "../TextLink/TextLink";
import { toJS } from 'mobx';

import { observer } from 'mobx-react-lite';
import cart from '../../store/cart';


export default observer(function ShopCart() {
    const [items, setItems] = useState([]);
    const [seadItems, setSeadItems] = useState([]);

    const refreshItems = () => {
        setItems([]);
    }

    useEffect(() => {
        if (seadItems.length > 0) {
            const fetchData = async () => {
                const data = await fetch(`${API_URL}/api/catalog/items-by-ids?itemsId=${seadItems.join(',')}`);
                const json = await data.json();

                let itemsArray = [];
                const cartItems = toJS(cart.items);

                json.data.forEach(jsonItem => {

                    cartItems.forEach(seadItem => {
                        if (Number(jsonItem.ID) == Number(seadItem.PARENT_ID)) {
                            itemsArray.push({
                                ...seadItem,
                                info: jsonItem
                            });
                        }
                    });

                });

                setItems(itemsArray);
            }

            fetchData()
                .catch(console.error);
        }
    }, [seadItems]);

    useEffect(() => {
        const cartItems = toJS(cart.items);
        let items = [];

        cartItems.forEach(element => {
            items.push(element.PARENT_ID);
        });

        setSeadItems(items);

    }, [cart.items]);

    return (
        <>
            <div className="container">


                {(items && items.length > 0) ? (
                    <>

                        <div className={styles.header}>
                            <div className="row">
                                <div className="col-2">
                                    <span>Товар</span>
                                </div>
                                <div className="col-2">
                                    <div className={styles.headerSecondCol}>
                                        <span>Цена</span>
                                        <span>Количество</span>
                                        <span>Сумма</span>
                                        <span>Удалить</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {items.map(item => (
                            <CartItem
                                item={item.info}
                                key={item.ID}
                                refreshItems={() => refreshItems()}
                                modification={item.PRODUCT_ID}
                                quantity={Number(item.QUANTITY)}
                            />
                        ))}

                        <div className={styles.bottom}>
                            <div className="row">
                                <div className="col-2">
                                    {(cart.getCartSum() - cart.getCartDiscount()) < 10000 && (
                                        <p style={{ color: '#E2132A', fontWeight: 600, fontSize: '16px', margin: 0 }}>Оформить заказ возможно от 10 000 ₽</p>
                                    )}

                                    {/*<div className={styles.promocode}>*/}
                                    {/*    <span>Промокод:</span>*/}
                                    {/*    <form action="#" style={{ width: '335px' }}>*/}
                                    {/*        <div className="form-field" style={{ marginBottom: 0 }}>*/}
                                    {/*            <input type="text" placeholder="Введите промокод"/>*/}
                                    {/*        </div>*/}
                                    {/*    </form>*/}
                                    {/*    <div>*/}
                                    {/*        <TextLink text="Применить" style={{ marginBottom: 0 }}/>*/}
                                    {/*    </div>*/}
                                    {/*</div>*/}
                                </div>
                                <div className="col"></div>
                                <div className="col">
                                    <div className={styles.sum}>
                                        <div>Общая сумма: {new Intl.NumberFormat('ru-RU').format(cart.getCartSum())} ₽</div>
                                        {cart.getCartDiscount() > 0 && (
                                            <div>Скидка: <span>-{new Intl.NumberFormat('ru-RU').format(cart.getCartDiscount())} ₽</span></div>
                                        )}

                                    </div>
                                    <div className={styles.total}>Итого: {new Intl.NumberFormat('ru-RU').format(cart.getCartSum() - cart.getCartDiscount())} ₽</div>

                                    <div
                                        style={(cart.getCartSum() - cart.getCartDiscount()) < 10000 ? {
                                            pointerEvents: 'none',
                                            opacity: '0.4',
                                            cursor: 'not-allowed'
                                        } : {}}
                                    >
                                        <Button href={(cart.getCartSum() - cart.getCartDiscount()) < 10000 ? '#' : '/checkout'} text="Продолжить" fullWidth={true} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        {!toJS(cart.isCartEmpty) && <Loader />}
                        {cart.isCartEmpty && <h2>Корзина пуста</h2>}
                    </>
                )}


            </div>

            <section>
                {/*TODO: Сделать Вы недавно смотрели*/}
                {/*{ (props.shopItem.data.item.recommended && props.shopItem.data.item.recommended[0]) && (*/}
                <CardsCarouselAsync
                    url={`/api/catalog/items-by-ids?itemsId=${seadItems.join(',')}`}
                    style={{ padding: '60px 0 55px' }}
                    title={<h2>Вы недавно смотрели <span>//</span></h2>}
                />
                {/*)}*/}
            </section>
        </>
    );
});