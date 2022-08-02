import Head from "next/head";

import Layout from "../components/Layout/layout";
import Breadcrumps from "../components/Breadcrumps/Breadcrumps";
import PersonalPage from "../components/PersonalPage/PersonalPage";
import CardsCarouselAsync from '../components/CardsCarouselAsync/CardsCarouselAsync';

import { API_URL } from "../constants";


export default function Checkout(props) {
    return (
        <Layout catalogMenu={props.data.data}>
            <Head>
                <title>Личный кабинет</title>
                {/*<meta name="description" content={ props.shopItem.data.item.META.ELEMENT_META_DESCRIPTION } />*/}
                {/*<meta name="keywords" content={ props.shopItem.data.item.META.ELEMENT_META_KEYWORDS } />*/}
            </Head>

            <section>
                <div className="container">
                    <Breadcrumps
                        items={[
                            { title: 'Личный кабинет', link: false },
                        ]}
                    />
                </div>

                <PersonalPage />

                <section>
                    {/*TODO: Сделать просмотренные товары*/}
                    <CardsCarouselAsync
                        url={`/api/catalog/items-by-ids?itemsId=7,29,30`}
                        style={{ padding: '60px 0 55px' }}
                        title={<h2>Вы недавно смотрели <span>//</span></h2>}
                    />
                </section>


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