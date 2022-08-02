import Head from 'next/head';
import { API_URL } from '../../constants';

import Layout from "../../components/Layout/layout";
import Breadcrumps from "../../components/Breadcrumps/Breadcrumps";
import CatalogSorting from "../../components/CatalogSorting/CatalogSorting";
import SeoText from "../../components/SeoText/SeoText";
import TitleArrows from "../../components/TitleArrows/TitleArrows";
import CardsCarousel from "../../components/CardsCarousel/CardsCarousel";
import CatalogFilter from "../../components/CatalogFilter/CatalogFilter";
import Tags from "../../components/Tags/Tags";

export default function Catalog(props) {

    return (
        <Layout catalogMenu={props.data.data}>
            <Head>
                <title>Каталог</title>
            </Head>

            <section>
                <div className="container">
                    <Breadcrumps
                        items={[
                            { title: 'Каталог', link: false },
                       ]}
                    />
                    <h2 className="section-title" style={{ marginBottom: '50px' }}>Каталог</h2>
                    <div className="row">
                        <div className="col">
                            <CatalogFilter />
                        </div>
                        <div className="col-3">
                            <CatalogSorting />
                        </div>
                    </div>
                </div>
            </section>

            <Tags />


            <SeoText
                title={<><span style={{ marginRight: '10px' }}>SEO TEXT</span><TitleArrows size="sm" count={3} colored={[1]}/></>}
                text="<p>Наш магазин предоставляет огромный выбор профессиональных  тренажеров по доступным ценам. Мы занимаемся реализацией  товаров для спорта уже длительное время, поэтому очень серьёзно  относимся к контролю качества. Наши сотрудники, имеющие большой опыт в данной области, с легкостью проконсультируют вас по всем интересующим вопросам магазин предоставляет огромный выбор. Наш магазин предоставляет огромный выбор профессиональных  тренажеров по доступным ценам. Мы занимаемся реализацией  товаров для спорта уже длительное время, поэтому очень серьёзно  относимся к контролю качества. Наши сотрудники, имеющие большой опыт в данной области, с легкостью проконсультируют вас по всем интересующим вопросам магазин предоставляет огромный выбор...</p>"
            />

            {/*TODO: Сделать просмотренные товары*/}
            {/*<CardsCarousel*/}
            {/*    style={{ padding: '60px 0 55px' }}*/}
            {/*    title={<h2>Вы недавно смотрели <span>//</span></h2>}*/}
            {/*    items={props.shopItems}*/}
            {/*/>*/}
        </Layout>
    )
}



export async function getStaticProps(context) {
    const catalogMenuRes = await fetch(`${API_URL}/api/catalog/menu`);
    const catalogMenu = await catalogMenuRes.json();

    // const catalogItemsRes = await fetch(`${API_URL}/api/catalog/catalog?PAGE=1`);
    // const catalogItems = await catalogItemsRes.json();

    if (!catalogMenu) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            data: catalogMenu,
            //shopItems: catalogItems
        },
    }
}
