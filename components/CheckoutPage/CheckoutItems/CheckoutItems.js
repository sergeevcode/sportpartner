/* eslint-disable jsx-a11y/alt-text */
import { useEffect, useState } from 'react';
import { API_URL } from '../../../constants';
import Image from 'next/image';
import Loader from '../../Loader/Loader';
import { observer } from 'mobx-react-lite';

import cart from '../../../store/cart';
import { toJS } from 'mobx';
import Modal from '../../Modal/Modal';
import Button from '../../Button/Button';

import styles from './CheckoutItems.module.css';

export default observer(function CheckoutItems() {
    const [items, setItems] = useState([]);
    const [seadItems, setSeadItems] = useState([]);

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

                console.log(itemsArray);
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

    const deleteHandler = (deleteId) => {
        return cart.deleteItem(deleteId);
    }

    return (
        <div className={styles.wrap}>
            <h3>Ваш заказ</h3>
            <div className={styles.divider} />
            {(items && items.length > 0) ? (
                <>
                    {items.map(item => (
                        <CheckoutItem
                            item={item.info}
                            key={item.ID}
                            modificationId={item.PRODUCT_ID}
                            quantity={Number(item.QUANTITY)}
                            deleteItemHandler={() => deleteHandler(item.PRODUCT_ID)}
                        />
                    ))}
                </>
            ) : (
                <>
                    <Loader />
                </>
            )}

            <p className={styles.sum}>Общая сумма: {new Intl.NumberFormat('ru-RU').format(cart.getCartSum() - cart.getCartDiscount())} ₽</p>
            {/* <p className={styles.sum}>Оптовая скидка: <span>-34 000 ₽</span></p> */}
            <div className={styles.fullSum}>Итого: {new Intl.NumberFormat('ru-RU').format(cart.getCartSum() - cart.getCartDiscount())} ₽</div>
        </div>
    );
});


function CheckoutItem({ item, quantity, modificationId, deleteItemHandler }) {
    const [modification, setModification] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isHidden, setIsHidden] = useState(true);

    useEffect(() => {
        const modif = item.MODIFICATIONS.filter(m => Number(m.id) === Number(modificationId))[0];

        setModification(modif);
    }, []);

    const deleteHandler = () => {
        // console.log(activeItem);

        setIsLoading(true);
        if (deleteItemHandler()) {
            setIsLoading(false);
        }
        setIsHidden(true);
    }

    return (
        <>
            {!isHidden && (
                <Modal width="500px">
                    <h3>Удалить товар</h3>
                    <hr style={{ borderColor: 'rgba(0,0,0,0.1)' }} />
                    <p style={{ fontSize: '15px', marginBottom: '30px', lineHeight: '140%' }}>Вы действительно хотите удалить <b>{item.NAME}</b> из корзины?</p>
                    <div className="d-flex justify-content-between">
                        <Button text="Удалить" onClick={() => deleteHandler(item.ID)} />
                        <button className={styles.closeBtn} onClick={() => setIsHidden(true)}>Отменить</button>
                    </div>
                </Modal>
            )}
            <div
                className={styles.item}
                style={{
                    opacity: isLoading ? '0.2' : '1',
                    pointerEvents: isLoading ? 'none' : 'auto'
                }}
            >
                <div>
                    {item.DETAIL_PICTURE ? (
                        <Image
                            src={`${API_URL}${item.DETAIL_PICTURE}`}
                            width={60}
                            height={60}
                        />
                    ) : (
                        <Image
                            src={`${API_URL}/images/no-image.png`}
                            width={60}
                            height={60}
                        />
                    )}

                </div>
                <div className={styles.itemTitle}>
                    {item.NAME}
                </div>
                <div className={styles.itemCount}>
                    Количество:
                    <span> {quantity}</span>
                </div>
                <div className='d-flex justify-content-between'>
                    <span className={styles.itemSum} >

                        {modification && !Array.isArray(modification.discount) && modification.discount && modification.discount.TYPE ? (
                            <>
                                {modification.discount.TYPE === 'P' ?
                                    (<>
                                        {new Intl.NumberFormat('ru-RU').format(Math.round(modification.price - (modification.price * modification.discount.VALUE / 100)))} ₽
                                    </>) :
                                    (<>
                                        {new Intl.NumberFormat('ru-RU').format(modification.price - modification.discount.VALUE)} ₽
                                    </>)
                                }
                            </>
                        ) : (
                            <>{modification ? (
                                <>
                                    {new Intl.NumberFormat('ru-RU').format((modification.price))} ₽
                                </>
                            ) : (
                                <>
                                    {new Intl.NumberFormat('ru-RU').format((item.PRICE))} ₽
                                </>
                            )}</>
                        )}
                    </span>
                    <button className={styles.itemDeleteBtn} onClick={() => setIsHidden(false)}>Удалить</button>
                </div>


                <div className={styles.divider} />
            </div>
        </>
    )
}