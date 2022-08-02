import Head from 'next/head';
import { API_URL } from '../../constants';

import Layout from "../../components/Layout/layout";
import Breadcrumps from "../../components/Breadcrumps/Breadcrumps";
import CatalogSorting from "../../components/CatalogSorting/CatalogSorting";
import CatalogFilter from "../../components/CatalogFilter/CatalogFilter";

export default function Catalog(props) {

    const getCountText = (count) => {
        switch (count) {
            case 0:
                return 'ничего не найдено';
            case 1:
                return 'найденo ' + count + ' товар';
            case 2:
            case 3:
            case 4:
                return 'найденo ' + count + ' товара';
            default:
                return 'найденo ' + count + ' товаров'
        }
    };

    return (
        <Layout catalogMenu={props.data.data}>
            <Head>
                <title>Поиск «{props.search.text}»</title>
            </Head>

            <section>
                <div className="container">
                    <Breadcrumps
                        items={[
                            { title: 'Каталог', link: "/catalog" },
                            { title: 'Поиск', link: false },
                        ]}
                    />
                    <h2 className="section-title" style={{ marginBottom: '50px' }}>{
                        props.search.text && (
                            <>По запросу «{props.search.text}» {getCountText(props.search.count)}</>
                        )
                    }
                    </h2>
                    <div className="row">
                        <div className="col">
                            <CatalogFilter searchPage={true}/>
                        </div>
                        <div className="col-3">
                            <CatalogSorting searchText={props.search.text}/>
                        </div>
                    </div>
                </div>
            </section>

            {/*TODO: Сделать просмотренные товары*/}
            {/*<CardsCarousel*/}
            {/*    style={{ padding: '60px 0 55px' }}*/}
            {/*    title={<h2>Вы недавно смотрели <span>//</span></h2>}*/}
            {/*    items={props.shopItems}*/}
            {/*/>*/}
        </Layout>
    )
}



export async function getServerSideProps(context) {
    const catalogMenuRes = await fetch(`${API_URL}/api/catalog/menu`);
    const catalogMenu = await catalogMenuRes.json();

    const { params } = context;
    const catalogSearchRes = await fetch(`${API_URL}/api/catalog/catalog?PAGE=1&SORT=BY_PRICE_ASC&SEARCH=${context.query.text ? context.query.text : '0'}`);
    const catalogSearch = await catalogSearchRes.json();

    if (!catalogMenu) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            data: catalogMenu,
            search: {
                text: context.query.text && context.query.text,
                count: catalogSearch.count,
            }
            // query: context.query.req
            //shopItems: catalogItems
        },
    }
}
