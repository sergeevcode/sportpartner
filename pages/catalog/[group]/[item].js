import Head from "next/head";

import Layout from "../../../components/Layout/layout";
import {API_URL} from "../../../constants";
import Breadcrumps from "../../../components/Breadcrumps/Breadcrumps";
import ShopItemPage from "../../../components/ShopItemPage/ShopItemPage";
import Tags from "../../../components/Tags/Tags";
import CardsCarouselAsync from "../../../components/CardsCarouselAsync/CardsCarouselAsync";
import Reviews from "../../../components/Reviews/Reviews";


export default function Item(props) {

    return (
        <Layout catalogMenu={props.data.data}>
            <Head>
                <title>{ props.shopItem.data.item.META.ELEMENT_META_TITLE }</title>
                <meta name="description" content={ props.shopItem.data.item.META.ELEMENT_META_DESCRIPTION } />
                <meta name="keywords" content={ props.shopItem.data.item.META.ELEMENT_META_KEYWORDS } />
            </Head>

            <section>
                <div className="container">
                    <Breadcrumps
                        items={[
                            { title: 'Каталог', link: '/catalog' },
                            { title: props.shopItem.group.NAME, link: '/catalog/' +  props.shopItem.group.CODE },
                            { title: props.shopItem.data.item.NAME, link: false }
                        ]}
                    />
                    <ShopItemPage item={props.shopItem.data.item} itemCode={props.itemCode}/>

                    <Tags />
                </div>

                {/*TODO: Сделать С этим товаром покупают*/}
                { (props.shopItem.data.item.recommended && props.shopItem.data.item.recommended[0]) && (
                    <CardsCarouselAsync
                        url={`/api/catalog/items-by-ids?itemsId=${props.shopItem.data.item.recommended.join(',')}`}
                        style={{ padding: '60px 0 55px' }}
                        title={<h2>С этим товаром покупают <span>//</span></h2>}
                    />
                ) }

                { (props.shopItem.data.item.recommended && props.shopItem.data.item.recommended[0]) && (
                    <CardsCarouselAsync
                        url={`/api/catalog/items-by-ids?itemsId=${props.shopItem.data.item.recommended.join(',')}`}
                        style={{ padding: '60px 0 55px' }}
                        title={<h2>Также рекомендуем <span>//</span></h2>}
                    />
                )}

            </section>

            <div className="container">
                <Reviews />
            </div>

            <section>
                {/*TODO: Сделать Вы недавно смотрели*/}
                { (props.shopItem.data.item.recommended && props.shopItem.data.item.recommended[0]) && (
                    <CardsCarouselAsync
                        url={`/api/catalog/items-by-ids?itemsId=${props.shopItem.data.item.recommended.join(',')}`}
                        style={{ padding: '60px 0 55px' }}
                        title={<h2>Вы недавно смотрели <span>//</span></h2>}
                    />
                )}
            </section>

        </Layout>
    );
}

export async function getStaticPaths() {
    const catalogGroupsAndItemsRes = await fetch(`${API_URL}/api/catalog/menu/items`);
    const catalogGroupsAndItems = await catalogGroupsAndItemsRes.json();

    let paths = [];

    const groups = catalogGroupsAndItems.data.map(group => {
        if(group.ITEMS.length) {
            group.ITEMS.map(item => {
                paths.push({
                    params: {
                        group: group.CODE,
                        item: item.CODE
                    }
                });
            });
        }
    });

    return {
        paths,
        fallback: 'blocking'
    };
}

export async function getStaticProps(context) {
    const catalogMenuRes = await fetch(`${API_URL}/api/catalog/menu`);
    const catalogMenu = await catalogMenuRes.json();

    const { params } = context;
    const catalogItemRes = await fetch(`${API_URL}/api/catalog/${params.group}/${params.item}`);
    const catalogItem = await catalogItemRes.json();

    if (!catalogMenu) {
        return {
            notFound: true,
        }
    }

    if (!catalogItem) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            data: catalogMenu,
            shopItem: catalogItem,
            itemCode: params.item
        },
        revalidate: 10, // In seconds
    }
}