import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import Link from 'next/link';
import Image from 'next/image'
import Head from 'next/head';
import imgSearch from '../../public/search.svg';
import account from '../../public/account.svg';
import headerLike from '../../public/header-like.svg';
import headerCart from '../../public/header-cart.svg';
import Router from 'next/router';
import { ToastContainer } from 'react-toastify';

import { observer } from 'mobx-react-lite';
import user from '../../store/user';
import cart from '../../store/cart';

import { API_URL } from '../../constants';

export default observer(function Header({ catalogMenu }) {
    const [isMenuOpened, setIsMenuOpened] = useState(false);
    const [isCitySelectOpened, setCitySelectOpened] = useState(false);

    const menuHandler = () => {
        setIsMenuOpened(!isMenuOpened);
    };

    const citySelectHandler = () => {
        setCitySelectOpened(!isCitySelectOpened);
    };

    const handleSearchForm = (e) => {
        e.preventDefault();

        // console.log(e.target.search.value);
        Router.push('/catalog/search?text=' + e.target.search.value);
    };

    useEffect(() => {
        user.checkAuthorized();
        cart.fetchCartItems();
    }, []);

    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
                <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,700&display=swap" rel="stylesheet" />
            </Head>

            <div className={styles.header}>
                <nav className="container d-flex justify-content-between">
                    <div className={styles.topHeaderBlock}>
                        <Link href="#">Оптовикам</Link>
                        <Link href="#">Новинки</Link>
                        <Link href="#">Популярные товары</Link>
                    </div>
                    <div className={styles.topHeaderBlock}>
                        <Link href="#">Оплата и доставка</Link>
                        <Link href="#">О компании</Link>
                        <Link href="#">Контакты</Link>
                    </div>
                    <div className={styles.topHeaderBlock}>
                        <span>Город: <a href="#" onClick={() => citySelectHandler()}>Казань <img src={`${API_URL}/images/city-arrow.svg`} className={isCitySelectOpened ? styles.opened : undefined} /></a></span>
                        {isCitySelectOpened && (
                            <div className={styles.citySelect}>
                                <Link href="#">Казань</Link>
                                <Link href="#">Москва</Link>
                                <Link href="#">Санкт-Петербург</Link>
                                <Link href="#">Самара</Link>
                                <Link href="#">Самара</Link>
                                <Link href="#">Уфа</Link>
                                <Link href="#">Нижний Новгород</Link>
                                <Link href="#">Ижевск</Link>
                                <Link href="#">Перьм</Link>
                                <Link href="#">Сочи</Link>
                                <Link href="#">Краснодар</Link>
                            </div>
                        )}
                        <a href="tel:88009346512" className={styles.phone}>8 800 934 65 12</a>
                    </div>
                </nav>

                <div className={styles.headerBottom}>
                    <div className="container d-flex justify-content-between align-items-center">
                        <div className={styles.headerLogo}>
                            <Link href="/">
                                <a>
                                    <Image
                                        alt="logo"
                                        src={`${API_URL}/images/logo.png`}
                                        width={170}
                                        height={24}
                                    />
                                </a>
                            </Link>
                            <button
                                className={styles.catalogBtn}
                                onClick={() => menuHandler()}
                            >
                                <div className={isMenuOpened ? styles.gamburgerImg + ' ' + styles.gamburgerImgOpened : styles.gamburgerImg}>
                                    <span></span><span></span><span></span>
                                </div>
                                Каталог
                            </button>
                        </div>
                        <form action="#" onSubmit={(e) => handleSearchForm(e)} method="post" className={styles.searchForm}>
                            <input type="text" id="search" name="search" placeholder="Поиск по каталогу" />
                            <button className={styles.searchIcon}><Image src={imgSearch} width={19} height={20} /></button>
                        </form>
                        <div className={styles.accountLinks}>
                            <div>
                                <Image
                                    src={account}
                                    width={18}
                                    height={18}
                                />
                                {user.isAuthorized ? (
                                    <><Link href="/personal"><a>{user.firstName}</a></Link></>
                                ) : (
                                    <><Link href="/personal">Вход</Link></>
                                )}

                            </div>
                            <div>
                                <Image
                                    src={headerLike}
                                    width={18}
                                    height={18}
                                />
                                <Link href="#">Избранное</Link>
                            </div>
                            <div className={styles.cartIconBtn}>
                                <Image
                                    src={headerCart}
                                    width={18}
                                    height={18}
                                />
                                {cart.items.length > 0 && (
                                    <span className={styles.cartIconCount}>{cart.items.length}</span>
                                )}

                                <Link href="/cart">Корзина</Link>
                            </div>
                        </div>
                    </div>
                </div>


                {isMenuOpened && (
                    <div className="container position-relative">
                        <nav className={styles.categoriesMenu}>
                            <ul>
                                {Object.keys(catalogMenu).filter(i => catalogMenu[i].parent_id === 0).map((item) => (
                                    <li key={catalogMenu[item].id} onClick={() => menuHandler()}>
                                        <img src={`${API_URL}${catalogMenu[item].picture}`} alt="" />
                                        <Link href={`/catalog/${catalogMenu[item].code}`}>{catalogMenu[item].name}</Link>
                                        {Object.keys(catalogMenu).filter(i => catalogMenu[i].parent_id === catalogMenu[item].id).length > 0 && (
                                            <>
                                                <svg width="12" height="7" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M1 1L4.5 4.5L8 1" stroke="#131313" />
                                                </svg>
                                                <ul>
                                                    {Object.keys(catalogMenu).filter(i => catalogMenu[i].parent_id === catalogMenu[item].id).map(item => (
                                                        <li key={catalogMenu[item].id} onClick={() => menuHandler()}>
                                                            <Link href={`/catalog/${catalogMenu[item].code}`}>{catalogMenu[item].name}</Link>
                                                            {Object.keys(catalogMenu).filter(i => catalogMenu[i].parent_id === catalogMenu[item].id).length > 0 && (
                                                                <>
                                                                    <svg width="12" height="7" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M1 1L4.5 4.5L8 1" stroke="#131313" />
                                                                    </svg>
                                                                    <ul>
                                                                        {Object.keys(catalogMenu).filter(i => catalogMenu[i].parent_id === catalogMenu[item].id).map(item => (
                                                                            <li key={catalogMenu[item].id} onClick={() => menuHandler()}>
                                                                                <Link href={`/catalog/${catalogMenu[item].code}`}>{catalogMenu[item].name}</Link>
                                                                            </li>
                                                                        ))}
                                                                    </ul>
                                                                </>
                                                            )}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>
                )}


            </div>
        </>
    )
});