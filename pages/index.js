import Head from 'next/head';
import { useEffect } from 'react';
import { API_URL } from '../constants';

import Layout from "../components/Layout/layout";
import Carousel from "../components/Carousel/Carousel";
import CardsCarousel from "../components/CardsCarousel/CardsCarousel";
import CatalogCategories from "../components/CatalogCategories/CatalogCategories";
import ProfitOfferCards from "../components/ProfitOfferCards/ProfitOfferCards";
import AboutBlock from "../components/AboutBlock/AboutBlock";
import SeoText from "../components/SeoText/SeoText";
import TitleArrows from "../components/TitleArrows/TitleArrows";
import Calculator from "../components/Calculator/Calculator";
import CardsCarouselAsync from '../components/CardsCarouselAsync/CardsCarouselAsync';

export default function Home(props) {

    return (
        <Layout catalogMenu={props.data.data}>
            <Head>
                <title>Barbell</title>
            </Head>

            <Carousel />

            {/* <CardsCarousel
                style={{ backgroundColor: '#E7E7E6', padding: '120px 0 155px' }}
                title={<h2>Популярные <br /><span style={{ paddingLeft: '142px' }}>//</span> товары</h2>}
                link={{ text: 'Все популярные товары', url: '#' }}
                items={props.shopItems}
            /> */}

            <CardsCarouselAsync
                url={`/api/catalog/items-by-ids?saleLeaders=Y`}
                style={{ backgroundColor: '#E7E7E6', padding: '120px 0 155px' }}
                title={<h2>Популярные <br /><span style={{ paddingLeft: '142px' }}>//</span> товары</h2>}
                link={{ text: 'Все популярные товары', url: '#' }}
            />

            <CatalogCategories categories={props.data.data} />

            <ProfitOfferCards items={props.shopItems} />

            <CardsCarouselAsync
                url={`/api/catalog/items-by-ids?newItems=Y`}
                style={{ padding: '60px 0 55px' }}
                title={<h2>Новинки <span>//</span></h2>}
                link={{ text: 'Все новинки', url: '#' }}
            />

            <Calculator />

            <AboutBlock />

            <SeoText
                title={<><span style={{ marginRight: '10px' }}>SEO TEXT</span><TitleArrows size="sm" count={3} colored={[1]} /></>}
                text="<p>Наш магазин предоставляет огромный выбор профессиональных  тренажеров по доступным ценам. Мы занимаемся реализацией  товаров для спорта уже длительное время, поэтому очень серьёзно  относимся к контролю качества. Наши сотрудники, имеющие большой опыт в данной области, с легкостью проконсультируют вас по всем интересующим вопросам магазин предоставляет огромный выбор. Наш магазин предоставляет огромный выбор профессиональных  тренажеров по доступным ценам. Мы занимаемся реализацией  товаров для спорта уже длительное время, поэтому очень серьёзно  относимся к контролю качества. Наши сотрудники, имеющие большой опыт в данной области, с легкостью проконсультируют вас по всем интересующим вопросам магазин предоставляет огромный выбор...</p>"
            />

        </Layout>
    )
}



export async function getStaticProps(context) {
    const catalogMenuRes = await fetch(`${API_URL}/api/catalog/menu`);
    const catalogMenu = await catalogMenuRes.json();

    const catalogItemsRes = await fetch(`${API_URL}/api/catalog/main-page`);
    const catalogItems = await catalogItemsRes.json();

    // console.log(catalogItems);

    if (!catalogMenu) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            data: catalogMenu,
            shopItems: catalogItems
        },
    }
}
