import { useState } from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import {API_URL} from "../../constants";

import Visa from "../../public/visa.png";
import MasterCard from "../../public/mastercard.png";
import Mir from "../../public/mir.png";
import Aaccent from "../../public/aaccent.png";

export default function Footer({ catalogMenu }) {
    return (
        <div className={styles.footer}>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Link href="#">
                            <a className={styles.title}>Клиентам</a>
                        </Link>
                        <ul>
                            <li><Link href="#">Личный кабинет</Link></li>
                            <li><Link href="#">Оплата и доставка</Link></li>
                            <li><Link href="#">Обмен и возврат</Link></li>
                            <li><Link href="#">Сервисное обслуживание</Link></li>
                            <li><Link href="#">Ответы на частые вопросы</Link></li>
                            <li><Link href="#">О компании</Link></li>
                            <li><Link href="#">Контакты</Link></li>
                        </ul>
                    </div>
                    <div className="col">
                        <Link href="/catalog">
                            <a className={styles.title}>Каталог</a>
                        </Link>
                        <ul>
                            {Object.keys(catalogMenu).filter(i => catalogMenu[i].parent_id === 0).map((item, i) => (
                                <li key={i}><Link href={`/catalog/${catalogMenu[item].code}`}>{catalogMenu[item].name}</Link></li>
                            )) }
                        </ul>
                    </div>
                    <div className="col">
                        <Link href="#">
                            <a className={styles.title}>Контакты</a>
                        </Link>
                        <div className={styles.footerInfoBlock}>
                            <span>Телефон</span>
                            <a href="tel:88007777771">8 800 777-777-1</a>
                        </div>
                        <div className={styles.footerInfoBlock}>
                            <span>Сервисный центр</span>
                            <a href="tel:88002123123">8 800 212-31-23</a>
                        </div>
                        <div className={styles.footerInfoBlock}>
                            <span>E-mail</span>
                            <a href="mailto:sportpartner@mail.ru">sportpartner@mail.ru</a>
                        </div>
                        <div className={styles.footerInfoBlock}>
                            <span>Мы в соцсетях</span>
                            <div className="d-flex">
                                <Social
                                    img={`${API_URL}/images/instagram.svg`}
                                    href="#"
                                />
                                <Social
                                    img={`${API_URL}/images/vk.svg`}
                                    href="#"
                                />
                                <Social
                                    img={`${API_URL}/images/facebook.svg`}
                                    href="#"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className={styles.footerLogo}>
                            <Image
                                src={`${API_URL}/images/logo-light.png`}
                                width={170}
                                height={24}
                            />
                        </div>
                        <div className={styles.footerText}>© 2022 «BARBELL»</div>
                        <div className={styles.footerText}>
                            <Link href="#">Политика конфиденциальности</Link>
                        </div>
                        <div className={styles.footerPaymentCards}>
                            <div>
                                <Image
                                    src={Visa}
                                    width={50}
                                    height={17}
                                />
                            </div>
                            <div>
                                <Image
                                    src={MasterCard}
                                    width={42}
                                    height={32}
                                />
                            </div>
                            <div>
                                <Image
                                    src={Mir}
                                    width={50}
                                    height={14}
                                />
                            </div>
                        </div>
                        <div className={styles.footerText} style={{ marginBottom: '7px' }}>Создание и продвижение сайтов:</div>
                        <div className="d-flex align-items-center">
                            <div style={{ marginRight: '6px' }}>
                                <Image
                                    src={Aaccent}
                                    width={21}
                                    height={22}
                                />
                            </div>
                            <a
                                href="https://aaccent.ru"
                                style={{ textDecorationLine: 'underline', marginBottom: '5px' }}
                                target="_blank"
                                rel="noreferrer"
                            >Акцент на результат</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

function Social({ img, href }) {
    return(
        <div className={styles.social}>
            <Link href={href}>
                <a>
                    <img src={img} alt=""/>
                </a>
            </Link>
        </div>
    )
}