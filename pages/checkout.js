import Head from "next/head";
import Layout from "../components/Layout/layout";
import Breadcrumps from "../components/Breadcrumps/Breadcrumps";
import { API_URL } from "../constants";
import ShopCart from "../components/ShopCart/ShopCart";
import CheckoutPage from "../components/CheckoutPage/CheckoutPage";
import CardsCarouselAsync from '../components/CardsCarouselAsync/CardsCarouselAsync';



export default function Checkout(props) {
    return (
        <Layout catalogMenu={props.data.data}>
            <Head>
                <title>Оформление заказа</title>
                {/*<meta name="description" content={ props.shopItem.data.item.META.ELEMENT_META_DESCRIPTION } />*/}
                {/*<meta name="keywords" content={ props.shopItem.data.item.META.ELEMENT_META_KEYWORDS } />*/}
            </Head>

            <section>
                <div className="container">
                    <Breadcrumps
                        items={[
                            { title: 'Оформление заказа', link: false },
                        ]}
                    />
                </div>
                <div className="container">
                    <CheckoutPage />
                </div>

                <CardsCarouselAsync
                    url={`/api/catalog/items-by-ids?itemsId=7,29,30`}
                    style={{ padding: '60px 0 55px' }}
                    title={<h2>Вы недавно смотрели <span>//</span></h2>}
                />
            </section>

        </Layout>
    );
}


export async function getStaticProps(context) {
    const catalogMenuRes = await fetch(`${API_URL}/api/catalog/menu`);
    const catalogMenu = await catalogMenuRes.json();

    if (!catalogMenu) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            data: catalogMenu,
        },
    }
}