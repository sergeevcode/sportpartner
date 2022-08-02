import { useState, useRef, useEffect } from 'react';
import styles from './Carousel.module.css';
// import Link from 'next/link';
import Image from 'next/image';
import {API_URL} from "../../constants";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

import Button from "../Button/Button";
import TitleArrows from "../TitleArrows/TitleArrows";

export default function Carousel() {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    const [slideChange, setSlideChanged] = useState(false);
    const [isLastSlide, setIsLastSlide] = useState(false);

    const DELAY = 3000;

    return (
        <>
            <Swiper
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current;
                    swiper.params.navigation.nextEl = navigationNextRef.current;
                }}
                onSlideChange={(swiper) => {
                    setSlideChanged(!slideChange)

                    if(swiper.activeIndex + 1 === swiper.slides.length) {
                        setIsLastSlide(true);
                    } else {
                        setIsLastSlide(false);
                    }
                }}
                autoplay={{
                    delay: DELAY,
                    disableOnInteraction: false,
                }}
                modules={[Autoplay, Navigation]}
                className={styles.carousel}
            >
                <SwiperSlide>
                    <Slide />
                </SwiperSlide>
                <SwiperSlide>
                    <Slide />
                </SwiperSlide>
                <SwiperSlide>
                    <Slide />
                </SwiperSlide>

                <div className={styles.carouselNav}>
                    <div className="container d-flex">
                        <div ref={navigationPrevRef} className={styles.prevBtn}>
                            { isLastSlide && (
                                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.nextBtnCircleReverse}>
                                    <circle cx="21" cy="21" r="20" stroke="#E2132A" strokeWidth="2"/>
                                </svg>
                            ) }
                            <svg width="18" height="11" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.btnArrow}>
                                <path d="M1 1L4.5 4.5L8 1" stroke="#131313"/>
                            </svg>
                        </div>

                        <div ref={navigationNextRef} className={styles.nextBtn}>
                            { !isLastSlide && (
                                <svg width="42" height="42" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg" className={slideChange ? styles.nextBtnCircle : styles.nextBtnCircleAnim}>
                                    <circle cx="21" cy="21" r="20" stroke="#E2132A" strokeWidth="2"/>
                                </svg>
                            ) }
                            <svg width="18" height="11" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.btnArrow}>
                                <path d="M1 1L4.5 4.5L8 1" stroke="#131313"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </Swiper>
            <Ticker text="Оптовая продажа железа от 10 000 руб"/>
        </>
    )
};

function Slide() {
    return (
        <div className={styles.slide}>

            <div className="container">
                <div className={styles.slideContent}>
                    <div className={styles.slideContentTitle}>
                        Готовимся <span>//</span><br/>
                        <TitleArrows size="lg" count={5} colored={[1,2,4,5]}/>К лету
                    </div>
                    <p className={styles.slideDescription}>Оптовая продажа железа от 10 000 руб</p>
                    <Button href="#" text="Выбрать товары"/>
                </div>
            </div>

            <div className={styles.slideImg}>
                <Image
                    src={`${API_URL}/images/slider1.jpg`}
                    width={952}
                    height={750}
                />
            </div>

        </div>
    );
}

function Ticker({ text }) {
    return (
        <Swiper
            slidesPerView={3}
            centeredSlides={true}
            spaceBetween={30}
            speed={10000}
            loop={true}
            allowTouchMove={false}
            autoplay={{
                delay: 0,
                disableOnInteraction: false,
            }}
            modules={[Autoplay]}
            className={styles.ticker}
        >
            {
                [...Array(1)].map((e, i) => (
                    <div key={e + i + Math.random().toString(36).substr(2, 9) * i}>
                        <SwiperSlide className={styles.tickerText}><span>{text}</span></SwiperSlide>
                        <SwiperSlide className={styles.tickerTextRed}><span>//</span></SwiperSlide>
                    </div>
                ))
            }
        </Swiper>
    )
}