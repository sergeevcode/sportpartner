import { useState, useEffect, useRef } from 'react';
import styles from './Card.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { toJS } from 'mobx';
import { observer } from "mobx-react-lite";
import { toast } from 'react-toastify';

import Stars from './Stars/Stars';
import Color from './Colors/Color';
import likeActive from '../../public/likeActive.svg';
import like from '../../public/like.svg';
import addToCartBtnIcon from '../../public/addToCartBtn.svg';
import minus from '../../public/minusBtn.svg';
import plus from '../../public/plusBtn.svg';

import { API_URL } from '../../constants';
import { TOAST_OPTIONS } from '../../lib/constants';
import cart from '../../store/cart';

export default observer(function Card(props) {
    const [starsCount, setStarsCount] = useState(null);
    const [weightValue, setWeightValue] = useState(null);
    const [colorValue, setColorValue] = useState(null);
    const [isLiked, setIsLiked] = useState(false);
    const [quantity, setQuantity] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [checkedInCart, setCheckedInCart] = useState(false);

    const [activeItem, setActiveItem] = useState(null);
    const [colors, setColors] = useState([]);
    const [weights, setWeights] = useState([]);

    useEffect(() => {
        setStarsCount(3);
        setIsLiked(false);

        let weightArray = [];
        let colorsArray = [];

        props.item.MODIFICATIONS.forEach(modif => {
            weightArray.push(modif.props.weight);
            // colorsArray.push(modif.props.color);
        });

        if (weightArray.length > 0) {
            const uniqWeightArray = weightArray.filter((item, pos) => weightArray.indexOf(item) === pos);
            setWeights(uniqWeightArray);
            setWeightValue(uniqWeightArray[0]);
        }

        if (colorsArray.length > 0) {
            const uniqColorsArray = colorsArray.filter((item, pos) => colorsArray.indexOf(item) === pos);
            setColors(uniqColorsArray);
            setColorValue(uniqColorsArray[0]);
        }
    }, []);


    useEffect(() => {
        let colorsArray = [];

        props.item.MODIFICATIONS.forEach(modif => {
            if (modif.props.weight === weightValue) { //modif.props.color === colorValue
                colorsArray.push(modif.props.color);
                // setActiveItem(modif);
            }
        });

        const uniqColorsArray = colorsArray.filter((item, pos) => colorsArray.indexOf(item) === pos);
        setColors(uniqColorsArray);
        setColorValue(uniqColorsArray[0]);
    }, [weightValue]);

    useEffect(() => {
        if (cart.isItemsLoaded) {
            const stateItems = toJS(cart.items);

            if (stateItems.length) {
                // const modifInCart = props.item.MODIFICATIONS.filter(m => m.id === )
                props.item.MODIFICATIONS.forEach(modif => {
                    // const checkCart = cart.checkItemInCart(modif.id);
                    const item = stateItems.length && stateItems.filter(item => Number(item.PRODUCT_ID) === Number(modif.id));
                    const quantity = (item && item.length) ? Number(item[0].QUANTITY) : 0;

                    if (quantity) {
                        const modi = toJS(modif);
                        setActiveItem(modi);
                        if (modi.props) {
                            if (modi.props.color) {
                                setColorValue(modi.props.color);
                            }
                            if (modi.props.weight) {
                                setWeightValue(modi.props.weight);
                            }
                        }
                        setQuantity(quantity);
                    }

                });
            }

            // console.log('cart.isItemsLoaded', cart.isItemsLoaded);
            setCheckedInCart(true);
        }


    }, [cart.isItemsLoaded]);

    // Выбираем id модификации
    useEffect(() => {
        if (checkedInCart) {
            props.item.MODIFICATIONS.forEach(modif => {
                // Если в свойствах есть и вес и цвет
                if (weightValue && colorValue) {
                    if (modif.props.weight === weightValue && modif.props.color === colorValue) {
                        setActiveItem(modif);
                        // console.log(modif);
                    }

                    // Если в свойствах нет цвета
                } else if (!colorValue) {
                    if (modif.props.weight === weightValue) {
                        setActiveItem(modif);
                        // console.log(modif);
                    }

                    // Если в свойствах цвет есть
                } else {
                    if (modif.props.color === colorValue) {
                        setActiveItem(modif);
                        // console.log(modif);
                    }
                }
            });
        }

    }, [weightValue, colorValue, quantity, checkedInCart]);

    const addToCartHandler = async (isUpdate) => {
        setIsLoading(true);
        const addItemAwait = await cart.addItem(activeItem, props.item.NAME, isUpdate);

        if (addItemAwait) {
            setIsLoading(false);
        }

        if (!isUpdate) {
            toast.success(`Товар "${props.item.NAME}" добавлен в корзину`, TOAST_OPTIONS);
        } else if (isUpdate > 0) {
            toast.success(`➕ Количество товаров в корзине увеличено`, TOAST_OPTIONS);
        } else if (isUpdate < 0) {
            toast.success(`➖ Количество товаров в корзине уменьшено`, TOAST_OPTIONS);
        }
    };

    const deleteFromCartHandler = () => {
        cart.deleteItem(activeItem.id);
        toast.warning(`Товар "${props.item.NAME}" удален из корзины`, TOAST_OPTIONS);
    }

    const sliceTitle = (text, count = 120) => {
        if (text.length > count) {
            return text.slice(0, count) + '...';
        } else {
            return text;
        }
    }

    return (
        <div className={props.viewType && (props.viewType !== 'CARDS') ? styles.cardList : styles.card}>

            <div className={props.viewType && (props.viewType !== 'CARDS') ? 'd-flex align-items-center' : ''}>
                <div className={styles.cardTop}>
                    {/*TAGS*/}
                    <div className="d-flex" style={{ marginBottom: '10px' }}>
                        {props.item.is_new && (
                            <Tag type="grey">Новинка</Tag>
                        )}


                        {activeItem && !Array.isArray(activeItem.discount) &&
                            <>
                                {activeItem.discount.TYPE === 'P' &&
                                    <>
                                        <Tag type="black">-{activeItem.discount.VALUE}%</Tag>
                                    </>
                                }
                            </>
                        }

                        {props.item.is_sale && (
                            <Tag>Хит</Tag>
                        )}
                    </div>

                    <div className={styles.cardImg}>
                        <Link href={props.item.CODE && props.item.SECTION_CODE ? `/catalog/${props.item.SECTION_CODE}/${props.item.CODE}` : '#'}>
                            <a>
                                {props.item.DETAIL_PICTURE ? (
                                    <Image
                                        src={`${API_URL}${props.item.DETAIL_PICTURE}`}
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
                </div>

                <div className={styles.cardInfo}>
                    <Link href={props.item.CODE && props.item.SECTION_CODE ? `/catalog/${props.item.SECTION_CODE}/${props.item.CODE}` : '#'}>
                        <a className={styles.cardTitle}>
                            {sliceTitle(props.item.NAME)}
                        </a>
                    </Link>
                    {starsCount && <Stars count={starsCount} reviews="35" />}
                    <div className={styles.cardProperties}>
                        {weightValue && (
                            <div className={styles.weightBlock}>
                                {
                                    weights.map((weight, i) => (
                                        <span key={i}>
                                            {weight && (
                                                <Weight active={weightValue === weight} setWeight={() => setWeightValue(weight)} key={i}>
                                                    {weight}
                                                </Weight>
                                            )}
                                        </span>
                                    ))
                                }
                            </div>
                        )}
                        <div>
                            {colorValue && (
                                <>
                                    {
                                        colors.map((color, i) => (
                                            <Color
                                                key={i}
                                                active={colorValue === color}
                                                setColor={() => setColorValue(color)}
                                                color={color}
                                            />
                                        ))
                                    }
                                </>
                            )}
                        </div>
                    </div>

                </div>
            </div>

            <div className={styles.cardBottom}>
                <div className={styles.cardPrice}>
                    {activeItem && !Array.isArray(activeItem.discount) &&
                        (
                            <span>{new Intl.NumberFormat('ru-RU').format(activeItem.price)} ₽</span>
                        )
                    }
                    {activeItem && !Array.isArray(activeItem.discount) ?
                        (
                            <>
                                {activeItem.discount.TYPE === 'P' ?
                                    (
                                        <>
                                            {new Intl.NumberFormat('ru-RU').format(Math.round(activeItem.price - (activeItem.price * activeItem.discount.VALUE / 100)))} ₽
                                        </>
                                    ) :
                                    (
                                        <>
                                            {new Intl.NumberFormat('ru-RU').format(activeItem.price - activeItem.discount.VALUE)} ₽
                                        </>
                                    )
                                }
                            </>
                        ) :
                        (
                            <>
                                {(activeItem && activeItem.price) && new Intl.NumberFormat('ru-RU').format((activeItem.price))} ₽
                            </>
                        )
                    }

                </div>
                <div className={styles.cardBtns}>
                    <LikeBtn
                        active={isLiked}
                        setLike={() => setIsLiked(!isLiked)}
                    />
                    <div
                        style={{
                            opacity: isLoading ? '0.5' : '1',
                            pointerEvents: isLoading ? 'none' : 'auto'
                        }}
                    >
                        <AddToCartBtn
                            count={quantity}
                            viewType={props.viewType && (props.viewType !== 'CARDS') ? 'LIST' : 'CARDS'}
                            onClick={(isUpdate) => addToCartHandler(isUpdate)}
                            deleteFromCartHandler={() => deleteFromCartHandler()}
                        />
                    </div>

                </div>
            </div>

        </div>
    )
});


function Tag({ type, children }) {
    const className = () => {
        switch (type) {
            case 'grey':
                return styles.tagGrey;
            case 'black':
                return styles.tagBlack;
            default:
                return styles.tagTransparent
        }
    };

    return (
        <div className={className()}>
            {children}
        </div>
    );
}


function Weight({ children, active, setWeight }) {
    return (
        <div className={active ? styles.weightActive : styles.weight} onClick={() => setWeight()}>
            {children} кг
        </div>
    );
}

function LikeBtn({ active, setLike }) {
    return (
        <div className={styles.likeBtn} onClick={() => setLike()} >
            <Image
                src={active ? likeActive : like}
                width={21}
                height={18}
            />
        </div>
    )
}


function AddToCartBtn({ count, viewType, onClick, deleteFromCartHandler }) {
    const [countAtCart, setCountAtCart] = useState(0);

    useEffect(() => {
        setCountAtCart(count);
    }, [count]);

    const addToCartHandler = () => {
        setCountAtCart(1)
        onClick(false);
    }

    const changeCountHandler = (count) => {
        setCountAtCart(countAtCart + count)
        if (countAtCart + count === 0) {
            deleteFromCartHandler();
        } else {
            onClick(count);
        }
    }

    return (
        <>
            {countAtCart > 0 ? (
                <div
                    className={styles.addToCartBtnActive}
                >
                    <div onClick={() => changeCountHandler(-1)} className={styles.counterBtn}>
                        <Image
                            src={minus}
                            width={10}
                            height={2}
                        />
                    </div>

                    <div className={styles.cartCount}>{countAtCart}</div>

                    <div onClick={() => changeCountHandler(1)} className={styles.counterBtn}>
                        <Image
                            src={plus}
                            width={10}
                            height={10}
                        />
                    </div>
                </div>
            ) : (
                <div
                    className={styles.addToCartBtn}
                    onClick={() => addToCartHandler()}
                >
                    <Image
                        src={addToCartBtnIcon}
                        width={33}
                        height={20}
                    />
                    {viewType === 'LIST' && (<span className={styles.addToCartBtnText}>В корзину</span>)}
                </div>
            )}

        </>
    )
};