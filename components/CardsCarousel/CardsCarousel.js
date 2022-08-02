import {useState, useEffect, useRef} from 'react';
import styles from './CardsCarousel.module.css';
// import Link from 'next/Link';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

// import { API_URL } from '../../constants';
import Card from "../Card/Card";
import TextLink from "../TextLink/TextLink";

export default function CardsCarousel(props) {
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);

    return (
        <div style={props.style} className={styles.sliderCarouselWrap}>
            <div className="container cards-carousel">
                <div className={styles.sliderContainer}>

                    {/*ЗАГОЛОВОК*/}
                    <div className="row">
                        { props.link ? (
                            <>
                                <div className="col"> </div>
                                <div className="col-2">{props.title}</div>
                                <div className="col" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    <TextLink href={props.link.url} text={props.link.text}/>
                                </div>
                            </>
                        ) : (
                            <div className="col-4">
                                <div>{props.title}</div>
                            </div>
                        ) }
                    </div>


                    {/*СЛАЙДЕР*/}
                    <Swiper
                        slidesPerView={4}
                        spaceBetween={20}
                        navigation={{
                            prevEl: navigationPrevRef.current,
                            nextEl: navigationNextRef.current,
                        }}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = navigationPrevRef.current;
                            swiper.params.navigation.nextEl = navigationNextRef.current;
                        }}
                        autoplay={false}
                        modules={[Autoplay, Navigation]}
                        className={styles.swiperWrap}
                    >
                        { props.items.data.map((item, i) => (
                            <SwiperSlide key={item.ID + Math.random().toString(36).substr(2, 9)}>
                                <Card item={item}/>
                            </SwiperSlide>
                        )) }

                        <div ref={navigationPrevRef} className={styles.prevBtn}>
                            <svg width="18" height="11" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.btnArrow}>
                                <path d="M1 1L4.5 4.5L8 1" stroke="#fff"/>
                            </svg>
                        </div>
                        <div ref={navigationNextRef} className={styles.nextBtn}>
                            <svg width="18" height="11" viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.btnArrow}>
                                <path d="M1 1L4.5 4.5L8 1" stroke="#fff"/>
                            </svg>
                        </div>
                    </Swiper>

                </div>
            </div>
        </div>
    )
};