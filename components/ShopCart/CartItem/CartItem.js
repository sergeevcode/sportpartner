import styles from './CartItem.module.css';
import Image from "next/image";
import { API_URL } from "../../../constants";
import Link from "next/link";
import { useEffect, useState } from "react";
import FsLightbox from "fslightbox-react";
import Button from "../../Button/Button";
import Modal from "../../Modal/Modal";

import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';
import cart from '../../../store/cart';


export default observer(function CartItem({ item, refreshItems, modification, quantity }) {
    const [countAtCart, setCountAtCart] = useState(1);
    const [isHidden, setIsHidden] = useState(true);
    const [activeItem, setActiveItem] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const countHandler = async (countHand) => {
        if ((countAtCart + countHand) > 0) {
            setCountAtCart(countAtCart + countHand);
            setIsLoading(true);

            const addItemAwait = await cart.addItem(activeItem, item.NAME, countHand);

            if (addItemAwait) {
                setIsLoading(false);
            }
        }

    }

    const deleteHandler = () => {
        // console.log(activeItem);

        setIsLoading(true);
        cart.deleteItem(activeItem.id);

        // if (deleteItemAwait) {
        //     setIsLoading(false);
        // }

        setIsHidden(true);
        // refreshItems();
    }

    useEffect(() => {
        item.MODIFICATIONS.forEach(modif => {
            if (Number(modif.id) === Number(modification)) {
                setCountAtCart(quantity);
                setActiveItem(modif);
                console.log(modif);
            }
        });
    }, []);

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
                className={styles.itemWrap}
                style={{
                    opacity: isLoading ? '0.5' : '1',
                    pointerEvents: isLoading ? 'none' : 'auto'
                }}
            >

                <div className="row">
                    <div className="col-2 d-flex align-items-center">
                        <div className={styles.image}>
                            <Link href={item.CODE && item.SECTION_CODE ? `/catalog/${item.SECTION_CODE}/${item.CODE}` : '#'}>
                                <a>
                                    {item.DETAIL_PICTURE ? (
                                        <Image
                                            src={`${API_URL}${item.DETAIL_PICTURE}`}
                                            width={174}
                                            height={174}
                                        />
                                    ) : (
                                        <Image
                                            src={`${API_URL}/images/no-image.png`}
                                            width={174}
                                            height={174}
                                        />
                                    )}

                                </a>
                            </Link>
                        </div>

                        <div className={styles.title}>
                            <span className={styles.vendorCode}>Артикул: 30M27UEZ68</span>
                            <Link href={item.CODE && item.SECTION_CODE ? `/catalog/${item.SECTION_CODE}/${item.CODE}` : '#'}>
                                <a className={styles.itemTitle}>
                                    {item.NAME}
                                </a>
                            </Link>

                            <div className={styles.modification}>
                                {activeItem && activeItem.props.weight && (
                                    <div>Вес: <span>{activeItem.props.weight}</span></div>
                                )}
                                {activeItem && activeItem.props.colorName && (
                                    <div>Цвет: <span>{activeItem.props.colorName}</span></div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="col-2 d-flex align-items-center justify-content-between">
                        <div className={styles.price}>
                            {activeItem && !Array.isArray(activeItem.discount) && (
                                <span>{new Intl.NumberFormat('ru-RU').format(activeItem.price)}</span>
                            )}
                            {activeItem && !Array.isArray(activeItem.discount) ?
                                (<>
                                    {activeItem.discount.TYPE === 'P' ?
                                        (<>
                                            {new Intl.NumberFormat('ru-RU').format(Math.round(activeItem.price - (activeItem.price * activeItem.discount.VALUE / 100)))} ₽
                                        </>) :
                                        (<>
                                            {new Intl.NumberFormat('ru-RU').format(activeItem.price - activeItem.discount.VALUE)} ₽
                                        </>)
                                    }
                                </>) :
                                (<>
                                    {activeItem && new Intl.NumberFormat('ru-RU').format((activeItem.price))} ₽
                                </>
                                )
                            }

                        </div>


                        <div className={styles.cartCountBtn} >
                            <button onClick={() => countHandler(-1)} className={styles.counterBtn}>
                                <svg width="9" height="2" viewBox="0 0 9 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1L0 1" stroke="#BDBDBD" strokeWidth="2" />
                                </svg>
                            </button>

                            <div className={styles.cartCount}>{countAtCart}</div>

                            <button onClick={() => countHandler(1)} className={styles.counterBtn}>
                                <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M3.5 5.5V9H5.5V5.5H9V3.5L5.5 3.5V0H3.5V3.5L0 3.5V5.5H3.5Z" fill="#BDBDBD" />
                                </svg>
                            </button>
                        </div>


                        <div className={styles.priceTotal}>
                            {activeItem && !Array.isArray(activeItem.discount) ?
                                (<>
                                    {activeItem.discount.TYPE === 'P' ?
                                        (<>
                                            {new Intl.NumberFormat('ru-RU').format(Math.round((activeItem.price - (activeItem.price * activeItem.discount.VALUE / 100)) * countAtCart))} ₽
                                        </>) :
                                        (<>
                                            {new Intl.NumberFormat('ru-RU').format((activeItem.price - activeItem.discount.VALUE) * countAtCart)} ₽
                                        </>)
                                    }
                                </>) :
                                (<>
                                    {activeItem && new Intl.NumberFormat('ru-RU').format((activeItem.price * countAtCart))} ₽
                                </>)
                            }

                        </div>


                        <div className={styles.delete} onClick={() => setIsHidden(false)}>
                            <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M22.0708 7.07031L7.92871 21.2124" stroke="#BDBDBD" strokeWidth="2" />
                                <path d="M22.0708 21.2129L7.92871 7.07075" stroke="#BDBDBD" strokeWidth="2" />
                            </svg>
                        </div>


                    </div>
                </div>
            </div>

        </>
    );
});