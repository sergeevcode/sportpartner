import { useState, useEffect } from "react";
import { API_URL } from "../../constants";
import Loader from "../Loader/Loader";
import CardsCarousel from "../CardsCarousel/CardsCarousel";
import styles from "../CardsCarousel/CardsCarousel.module.css";
import TextLink from "../TextLink/TextLink";

export default function CardsCarouselAsync({ style, title, url }) {
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${API_URL}${url}`);
            const json = await data.json();

            setItems(json);
            setIsLoaded(true);
            console.log(json);
        }

        fetchData()
            .catch(console.error);
    }, []);

    return (
        <>

            {items.data && items.data.length > 0 ? (
                <CardsCarousel
                    items={items}
                    style={style}
                    title={title}
                />
            ) : (
                <>{!isLoaded && <div style={style} className={styles.sliderCarouselWrap}>
                    <div className="container cards-carousel">
                        <div className={styles.sliderContainer}>

                            {/*ЗАГОЛОВОК*/}
                            <div className="row">
                                <div className="col-4">
                                    <div>{title}</div>
                                </div>
                            </div>


                            <Loader />

                        </div>
                    </div>
                </div>}</>
            )}

        </>
    )
}