import Image from 'next/image';

import {API_URL} from "../../constants";
import Button from '../Button/Button';
import styles from './AboutBlock.module.css';
import TextLink from "../TextLink/TextLink";
import PhoneImg from "../../public/mobile.png";
import TrenazherImg from "../../public/trenazhor.png";
import PlainImg from "../../public/plain.png";
import CreditCardImg from "../../public/creditCard.png";

export default function AboutBlock() {
    return(
        <>
            <section className={styles.about}>
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-2">
                            <h2 className="section-title">BARBELL <span className="red">//</span></h2>
                            <div className={styles.subtitle}>Ваш спортивный помощник</div>
                            <p>Наш магазин предоставляет огромный выбор профессиональных
                                тренажеров по доступным ценам. Мы занимаемся реализацией
                                товаров для спорта уже длительное время, поэтому очень серьёзно
                                относимся к контролю качества. Наши сотрудники, имеющие
                                большой опыт в данной области, с легкостью проконсультируют
                                вас по всем интересующим вопросам.</p>
                            <Button href="#" text="Узнать подробнее" />
                        </div>
                        <div className="col-2">
                            <div className={styles.aboutImgWrap}>
                                <div className={styles.aboutImg}>
                                    <Image
                                        src={`${API_URL}/images/about-img.jpg`}
                                        width={725 * 2}
                                        height={758 * 2}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container">
                    <div className="d-flex flex-wrap justify-content-between">

                        <UtpCard
                            big
                            title={<>Наше приложение <br/> с программами <br/> тренировок</>}
                            link={{ text: 'Скачать', url: '#' }}
                            img={{
                                src: PhoneImg,
                                width: 427,
                                height: 260
                            }}
                        />
                        <UtpCard
                            title={<>Снаряды <br/> из чистого <br/> чугуна</>}
                            link={{ text: 'Смотреть', url: '#' }}
                            img={{
                                src: TrenazherImg,
                                width: 374,
                                height: 260
                            }}
                        />
                        <UtpCard
                            title={<>Доставка <br/> По всей <br/> России</>}
                            link={{ text: 'Подробнее', url: '#' }}
                            img={{
                                src: PlainImg,
                                width: 374,
                                height: 260
                            }}
                        />
                        <UtpCard
                            big
                            title={<>Оплата любым <br/> удобным способом</>}
                            link={{ text: 'Подробнее', url: '#' }}
                            img={{
                                src: CreditCardImg,
                                width: 471,
                                height: 260
                            }}
                        />

                    </div>
                </div>
            </section>
        </>
    )
}


function UtpCard({ title, link, img, big }) {
    return(
        <div className={styles.utpCard} style={ big ? { maxWidth: '708px' } : { maxWidth: '474px' } } >
            <div className={styles.utpCardTitle}>{title}</div>

            <TextLink href={link.url} text={link.text} style={{ marginRight: 'auto', marginLeft: 0, marginBottom: 0 }} />

            <div className={styles.utpImg}>
                <Image
                    src={img.src}
                    width={img.width}
                    height={img.height}
                />
            </div>
        </div>
    );
}