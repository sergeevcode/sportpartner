import Head from "next/head";
import Layout from "../components/Layout/layout";
import Breadcrumps from "../components/Breadcrumps/Breadcrumps";
import { API_URL } from "../constants";
import ShopCart from "../components/ShopCart/ShopCart";




export default function Cart(props) {
    return (
        <Layout catalogMenu={props.data.data}>
            <Head>
                <title>Корзина</title>
                {/*<meta name="description" content={ props.shopItem.data.item.META.ELEMENT_META_DESCRIPTION } />*/}
                {/*<meta name="keywords" content={ props.shopItem.data.item.META.ELEMENT_META_KEYWORDS } />*/}
            </Head>

            <section>
                <div className="container">
                    <Breadcrumps
                        items={[
                            { title: 'Корзина', link: false },
                        ]}
                    />
                </div>
                <div className="container">
                    <h1 className="section-title">Корзина</h1>

                </div>


                <ShopCart />
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