import styles from './ProfitOfferCards.module.css';
import TitleArrows from "../TitleArrows/TitleArrows";
import TextLink from "../TextLink/TextLink";
import Card from "../Card/Card";
import {useEffect} from "react";
import OfferBanner from "./OfferBanner/OfferBanner";
import {API_URL} from "../../constants";

export default function ProfitOfferCards({ items }) {


    useEffect(() => {
        // console.log(items);
    }, []);

    return(
        <section>
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col-2">
                        <h2 className="section-title" style={{ margin: '0 0 30px' }}>
                            <TitleArrows size="sm" count={3} colored={[1,3]} style={{ marginLeft: '85px' }}/> <span style={{ marginLeft: '-15px' }}>Выгодные <br/></span>предложения
                        </h2>
                    </div>
                    <div className="col" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <TextLink href="#" text="Все скидки"/>
                    </div>
                </div>

                <div className={styles.cards}>
                    <div className="row">
                        <div className="col-2">
                            <OfferBanner
                                background={`${API_URL}/images/discountBannerOnMain.jpg`}
                                title={'ДАРИМ СКИДКУ 10% НА ВСЮ ПРОДУКЦИЮ'}
                                description={<>По промокоду: <span>NMKEAL10</span></>}
                            />
                        </div>

                        { items.data.map((item, i) => (
                            <div className="col" key={item.ID}>
                                <Card item={item}/>
                            </div>
                        )) }

                    </div>
                </div>
            </div>
        </section>
    );
}