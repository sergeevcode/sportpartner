import Image from 'next/image';
import FsLightbox from 'fslightbox-react';
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { observer } from 'mobx-react-lite';
import { toJS } from 'mobx';

import cart from '../../store/cart';
import styles from './ShopItemPage.module.css';
import { toast } from 'react-toastify';

import { API_URL } from "../../constants";
import { useState, useEffect } from "react";
import Stars from "../Card/Stars/Stars";
import likeActive from "../../public/likeActive.svg";
import like from "../../public/like.svg";
import addToCartBtnIcon from "../../public/addToCartBtn.svg";
import Color from "../Card/Colors/Color";
import Tabs from "./Tabs/Tabs";

import { TOAST_OPTIONS } from '../../lib/constants';

export default observer(function ShopItemPage({ item, itemCode }) {
    const [starsCount, setStarsCount] = useState(null);
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [lightboxController, setLightboxController] = useState({
        toggler: false,
        slide: 1
    });

    const [activeItem, setActiveItem] = useState(null);
    const [colors, setColors] = useState([]);
    const [weights, setWeights] = useState([]);
    const [isLiked, setIsLiked] = useState(false);
    const [weightValue, setWeightValue] = useState(null);
    const [colorValue, setColorValue] = useState(null);
    const [quantity, setQuantity] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [checkedInCart, setCheckedInCart] = useState(false);


    function openLightboxOnSlide(number) {
        setLightboxController({
            toggler: !lightboxController.toggler,
            slide: number
        });
    }

    function getColorName(color) {
        const filter = item.MODIFICATIONS.filter(modif => modif.props.color === color);
        return (filter[0] && filter[0].props) && filter[0].props.colorName;
    }

    useEffect(() => {
        setStarsCount(3);
        setIsLiked(false);

        let weightArray = [];
        let colorsArray = [];

        item.MODIFICATIONS.forEach(modif => {
            weightArray.push(modif.props.weight);
            colorsArray.push(modif.props.color);
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
    }, [itemCode]);



    useEffect(() => {
        let colorsArray = [];

        item.MODIFICATIONS.forEach(modif => {
            if (modif.props.weight === weightValue) {
                colorsArray.push(modif.props.color);
            }
        });

        const uniqColorsArray = colorsArray.filter((item, pos) => colorsArray.indexOf(item) === pos);
        setColors(uniqColorsArray);
        setColorValue(uniqColorsArray[0]);
    }, [weightValue, itemCode]);


    useEffect(() => {
        if (cart.isItemsLoaded) {
            const stateItems = toJS(cart.items);

            if (stateItems.length) {
                item.MODIFICATIONS.forEach(modif => {
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

            setCheckedInCart(true);
        }


    }, [cart.isItemsLoaded]);


    const addToCartHandler = async (isUpdate) => {
        setIsLoading(true);
        const addItemAwait = await cart.addItem(activeItem, item.NAME, isUpdate);

        if (addItemAwait) {
            setIsLoading(false);
        }

        if (!isUpdate) {
            toast.success(`Товар "${item.NAME}" добавлен в корзину`, TOAST_OPTIONS);
        } else if (isUpdate === 1) {
            toast.success(`➕ Количество товаров в корзине увеличено`, TOAST_OPTIONS);
        } else if (isUpdate < 0) {
            toast.success(`➖ Количество товаров в корзине уменьшено `, TOAST_OPTIONS);
        } else if (isUpdate > 1) {
            toast.success(`Товар "${item.NAME}" добавлен в корзину`, TOAST_OPTIONS);
        }
    };

    const deleteFromCartHandler = () => {
        cart.deleteItem(activeItem.id);
        toast.warning(`Товар "${item.NAME}" удален из корзины`, TOAST_OPTIONS);
    }

    // Выбираем id модификации
    useEffect(() => {
        if (checkedInCart) {
            item.MODIFICATIONS.forEach(modif => {

                // Если в свойствах есть и вес и цвет
                if (weightValue && colorValue) {
                    if (modif.props.weight === weightValue && modif.props.color === colorValue) {
                        setActiveItem(modif);
                    }

                    // Если в свойствах нет цвета
                } else if (!colorValue) {
                    if (modif.props.weight === weightValue) {
                        setActiveItem(modif);
                    }

                    // Если в свойствах цвет есть
                } else {
                    if (modif.props.color === colorValue) {
                        setActiveItem(modif);
                    }
                }
            });
        }
    }, [weightValue, colorValue, itemCode, quantity, checkedInCart]);

    return (
        <>
            <h2 className={styles.title}>
                {item.NAME}
            </h2>

            {/* МОДАЛКА ИЗОБРАЖЕНИЯ */}
            <FsLightbox
                toggler={lightboxController.toggler}
                sources={
                    item.PICTURES ? item.PICTURES.map((item, i) => (
                        <img src={`${API_URL}${item}`} />
                    )) : [<img src={`${API_URL}/images/no-image.png`} />]
                }
                slide={lightboxController.slide}
            // disableLocalStorage={true}
            />

            <div className="row">
                <div className="col-2">
                    <div className="d-flex shopItem-card">

                        <div className={styles.thumbs}>
                            <Swiper
                                direction={"vertical"}
                                onSwiper={setThumbsSwiper}
                                spaceBetween={15}
                                slidesPerView={4}
                                // freeMode={true}
                                // watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className={styles.mySwiper}
                            >
                                {item.PICTURES && item.PICTURES.map((item, i) => (
                                    <SwiperSlide
                                        key={i + 'asdasd'}
                                        className={styles.swiperSlideItem}
                                    >
                                        <Image
                                            src={`${API_URL}${item}`}
                                            width={105}
                                            height={105}
                                        />
                                    </SwiperSlide>
                                ))}
                                {
                                    !item.PICTURES && (
                                        <SwiperSlide className={styles.swiperSlideItem}>
                                            <Image
                                                src={`${API_URL}/images/no-image.png`}
                                                width={105}
                                                height={105}
                                            />
                                        </SwiperSlide>
                                    )
                                }
                            </Swiper>
                        </div>

                        <div className={styles.mainPhoto}>
                            <Swiper
                                // direction={"vertical"}
                                slidesPerView={1}
                                // spaceBetween={20}
                                autoplay={false}
                                // direction={"vertical"}
                                // spaceBetween={10}
                                // navigation={true}
                                thumbs={{ swiper: thumbsSwiper }}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className={styles.mySwiper2}
                            >
                                {item.PICTURES && item.PICTURES.map((item, i) => (
                                    <SwiperSlide
                                        key={i}
                                        className={styles.swiperSlideItem}
                                    >
                                        <Image
                                            src={`${API_URL}${item}`}
                                            width={450}
                                            height={465}
                                            onClick={() => openLightboxOnSlide(i + 1)}
                                        />
                                    </SwiperSlide>
                                ))}
                                {
                                    !item.PICTURES && (
                                        <SwiperSlide className={styles.swiperSlideItem}>
                                            <Image
                                                src={`${API_URL}/images/no-image.png`}
                                                width={450}
                                                height={465}
                                            />
                                        </SwiperSlide>
                                    )
                                }

                            </Swiper>
                        </div>

                    </div>

                </div>
                <div className="col-2">
                    <div className={styles.info}>
                        <div className="d-flex justify-content-between" style={{ marginBottom: '20px' }}>
                            {item.article && (
                                <span className={styles.artikul}>Артикул: {item.article} </span>
                            )}

                            {starsCount && <Stars count={starsCount} reviews="35 отзывов" />}
                        </div>
                        {weightValue && (
                            <div>
                                <span className={styles.propertyTitle}>Вес:</span>
                                <div className={styles.cardProperties}>
                                    <div className="d-flex">
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
                                </div>
                            </div>
                        )}
                        {colorValue && (
                            <div>
                                <span className={styles.propertyTitle}>Цвет:</span>
                                <div className={styles.cardProperties}>
                                    {
                                        colors.map((color, i) => (
                                            <Color
                                                key={i}
                                                active={colorValue === color}
                                                setColor={() => setColorValue(color)}
                                                color={color}
                                                colorName={getColorName(color)}
                                            />
                                        ))
                                    }
                                </div>
                            </div>
                        )}
                        {(item.brand && item.brand.brandImage && item.brand.brandName) && (
                            <div>
                                <span className={styles.propertyTitle}>Бренд:</span>
                                <div className={styles.cardProperties}>
                                    <div className="d-flex align-items-center">
                                        <div className={styles.brand}>
                                            <Image
                                                alt="logo"
                                                src={`${API_URL}${item.brand.brandImage}`}
                                                width={87}
                                                height={87}
                                            />
                                        </div>
                                        <span className={styles.brandName}>{item.brand.brandName}</span>
                                    </div>
                                </div>
                            </div>
                        )}



                        <div className={styles.cardBottom}>
                            <div className={styles.cardPrice}>
                                {activeItem && !Array.isArray(activeItem.discount) && (
                                    <span>{new Intl.NumberFormat('ru-RU').format(activeItem.price)} ₽</span>
                                )}
                                {activeItem && !Array.isArray(activeItem.discount) ? (<>
                                    {activeItem.discount.TYPE === 'P' ? (<>
                                        {new Intl.NumberFormat('ru-RU').format(Math.round(activeItem.price - (activeItem.price * activeItem.discount.VALUE / 100)))} ₽
                                    </>) : (<>
                                        {new Intl.NumberFormat('ru-RU').format(activeItem.price - activeItem.discount.VALUE)} ₽
                                    </>)}
                                </>) : (<>
                                    {(activeItem && activeItem.price) && new Intl.NumberFormat('ru-RU').format((activeItem.price))} ₽
                                </>)}
                                {/*{ activeItem && activeItem.price }*/}

                            </div>

                            <AddToCartBtn
                                style={{
                                    opacity: isLoading ? '0.5' : '1',
                                    pointerEvents: isLoading ? 'none' : 'auto'
                                }}
                                count={quantity}
                                isLiked={isLiked}
                                setIsLiked={(isLiked) => setIsLiked(isLiked)}
                                addToCartHandler={(isUpdate) => addToCartHandler(isUpdate)}
                                deleteFromCartHandler={() => deleteFromCartHandler()}
                            />
                        </div>

                    </div>
                </div>
            </div>

            <Tabs item={item} />
        </>
    );
});


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

function AddToCartBtn({ count, isLiked, setIsLiked, addToCartHandler, deleteFromCartHandler, style }) {
    const [isInCart, setIsInCart] = useState(false);
    const [quantity, setQuantity] = useState(count + 1);

    const countHandler = (countHand) => {
        if (countHand > 0) {
            setQuantity(countHand);
        }
    }

    const addToCardHandler = (isUpdate) => {
        setIsInCart(true);
        if (isInCart) {
            addToCartHandler(quantity);
        } else {
            addToCartHandler(false)
        }
    }

    const deleteHandler = () => {
        deleteFromCartHandler();
        setQuantity(1);
        setIsInCart(false);
    }

    const changeCountHandler = (count) => {
        if (isInCart) {
            if (quantity + count === 0) {
                // deleteFromCartHandler();
            } else if (quantity + count > 0) {
                setQuantity(quantity + count)
                addToCartHandler(count);
            }
        }
    }

    useEffect(() => {
        console.log(count);
        if (count > 0) {
            setIsInCart(true);
        }
    }, [count]);

    return (
        <>
            <div style={style}>
                <div className={styles.cartCountBtn} >
                    <button onClick={() => changeCountHandler(-1)} className={styles.counterBtn}>
                        <svg width="9" height="2" viewBox="0 0 9 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 1L0 1" stroke="#BDBDBD" strokeWidth="2" />
                        </svg>
                    </button>

                    <div className={styles.cartCount}>{quantity}</div>

                    <button onClick={() => changeCountHandler(1)} className={styles.counterBtn}>
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M3.5 5.5V9H5.5V5.5H9V3.5L5.5 3.5V0H3.5V3.5L0 3.5V5.5H3.5Z" fill="#BDBDBD" />
                        </svg>
                    </button>
                </div>
            </div>


            <div style={style} className={styles.cardBtns}>
                <LikeBtn
                    active={isLiked}
                    setLike={() => setIsLiked(!isLiked)}
                />

                {isInCart ? (
                    <div
                        className={styles.deleteFromCartBtn}
                        onClick={() => deleteHandler()}
                    >
                        <span className={styles.addToCartBtnText}>Убрать из корзины</span>
                    </div>
                ) : (
                    <div
                        className={styles.addToCartBtn}
                        onClick={() => addToCardHandler()}
                    >
                        <Image
                            src={addToCartBtnIcon}
                            width={33}
                            height={20}
                        />
                        <span className={styles.addToCartBtnText}>В корзину</span>
                    </div>
                )}

            </div>
        </>
    )
}
