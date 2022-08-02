import styles from './Reviews.module.css';
import Stars from "../Card/Stars/Stars";
import Button from "../Button/Button";
import { useState, useEffect } from "react";
import TextLink from "../TextLink/TextLink";

export default function Reviews() {
    const [score, setScore] = useState(0);

    useEffect(() => {
        setScore(3);
    }, []);

    return (
        <div className={styles.reviewsWrap}>
            <div className={styles.reviewsTitle}>
                <div className="row">
                    <div className="col-2">
                        <h2 className="section-title">Отзывы <span>//</span></h2>
                    </div>
                    <div className="col">
                        <div className={styles.score}>Общая оценка: <span>{score}/5</span></div>
                        <Stars count={score} reviews="35 отзывов" />
                    </div>
                    <div className="col">
                        <Button href="#" text="Написать отзыв" fullWidth={true} />
                    </div>
                </div>
            </div>

            <Review stars={3} />
            <Review />
            <Review />

            <div className="d-flex justify-content-center" style={{ marginTop: '40px' }}>
                <TextLink href="#" text="Показать еще" />
            </div>

        </div>
    );
}

export function Review({ stars, item = false, trim = false }) {
    const text = 'Брал пару для отработки ударов с утяжелением и тренировки вращателей плеча. Поэтому остановился на этих гантелях. . Сразу скажу, что не подойдет под широкий кулак, мой кулак еле помещается-гантель позиционируется, видимо, как женская, хотя 1 кг можно использовать по-разному, в том числе и мужчинам в единоборствах. Поверхность обрезиненная, на ощупь приятная, форма достаточно эргономичная.';
    return (
        <div className={styles.review}>
            <div className={styles.reviewTitle}>
                <div className={styles.reviewInfo}>
                    <div className={styles.reviewLogo}><span>А</span></div>
                    <div className={styles.reviewName}>Александр</div>
                    <div className={styles.reviewDate}>25.03.2021</div>
                    <Stars count={3} style={{ marginBottom: 0 }} />
                </div>

                <div>
                    <button className={styles.reviewBtn}>
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.47059 8.87263V17.8699C5.47059 18.1682 5.35284 18.4543 5.14324 18.6652C4.93364 18.8761 4.64936 18.9946 4.35294 18.9946H2.11765C1.82123 18.9946 1.53695 18.8761 1.32735 18.6652C1.11775 18.4543 1 18.1682 1 17.8699V9.99729C1 9.69901 1.11775 9.41295 1.32735 9.20204C1.53695 8.99112 1.82123 8.87263 2.11765 8.87263H5.47059ZM5.47059 8.87263C6.65626 8.87263 7.79337 8.39867 8.63177 7.55501C9.47017 6.71135 9.94118 5.5671 9.94118 4.37398V3.24932C9.94118 2.65277 10.1767 2.08064 10.5959 1.65881C11.0151 1.23698 11.5836 1 12.1765 1C12.7693 1 13.3379 1.23698 13.7571 1.65881C14.1763 2.08064 14.4118 2.65277 14.4118 3.24932V8.87263H17.7647C18.3575 8.87263 18.9261 9.10961 19.3453 9.53144C19.7645 9.95327 20 10.5254 20 11.122L18.8824 16.7453C18.7216 17.4352 18.4167 18.0276 18.0136 18.4333C17.6104 18.839 17.1308 19.036 16.6471 18.9946H8.82353C7.93427 18.9946 7.08144 18.6391 6.45264 18.0064C5.82384 17.3736 5.47059 16.5154 5.47059 15.6206" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>5</span>
                    </button>
                    <button className={styles.reviewBtn}>
                        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15.5294 11.1274V2.13008C15.5294 1.8318 15.6472 1.54574 15.8568 1.33482C16.0664 1.12391 16.3506 1.00542 16.6471 1.00542H18.8824C19.1788 1.00542 19.463 1.12391 19.6726 1.33482C19.8822 1.54574 20 1.8318 20 2.13008V10.0027C20 10.301 19.8822 10.587 19.6726 10.798C19.463 11.0089 19.1788 11.1274 18.8824 11.1274H15.5294ZM15.5294 11.1274C14.3437 11.1274 13.2066 11.6013 12.3682 12.445C11.5298 13.2887 11.0588 14.4329 11.0588 15.626V16.7507C11.0588 17.3472 10.8233 17.9194 10.4041 18.3412C9.98492 18.763 9.41637 19 8.82353 19C8.23069 19 7.66214 18.763 7.24294 18.3412C6.82374 17.9194 6.58824 17.3472 6.58824 16.7507V11.1274H3.23529C2.64246 11.1274 2.0739 10.8904 1.6547 10.4686C1.2355 10.0467 1 9.4746 1 8.87805L2.11765 3.25474C2.27838 2.56479 2.58329 1.97235 2.98645 1.56666C3.38961 1.16097 3.86918 0.964003 4.35294 1.00542H12.1765C13.0657 1.00542 13.9186 1.36089 14.5474 1.99363C15.1762 2.62638 15.5294 3.48456 15.5294 4.3794" stroke="#BDBDBD" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>0</span>
                    </button>
                </div>
            </div>
            <p>{!trim ? text : text.slice(0, 145).trim() + '...'}</p>
            {item && (
                <div className={styles.itemBlock}>
                    <span className={styles.itemName}>Гриф гантельный 50 D</span>
                    <TextLink href="#" text="К комментарию" style={{ marginBottom: 0 }} />
                </div>
            )}
        </div>
    );
}