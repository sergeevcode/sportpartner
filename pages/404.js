import Head from 'next/head';
import { API_URL } from '../constants';

import Layout from "../components/Layout/layout";
import TitleArrows from "../components/TitleArrows/TitleArrows";
import Button from "../components/Button/Button";

export default function Custom404(props) {

    return (
        <Layout catalogMenu={props.data.data}>
            <Head>
                <title>404 | This page could not be found.</title>
            </Head>

            <div className="container" style={{ padding: '200px 0', }}>
                <h1
                    style={{
                        fontSize: 60,
                        fontWeight: 600,
                        fontFamily: 'Bebas_Neue',
                        // textAlign: 'center'
                    }}
                >
                    <TitleArrows size="sm" count={3} colored={[1, 3]}/>
                    <span style={{ marginRight: '40px', color: '#e2132a', }}>404</span><br/>
                    <span style={{ marginLeft: '70px', fontSize: 50 }}>Такой страницы не существует</span><br/>
                </h1>
                <div style={{ marginLeft: '70px'}}>
                    <Button href="/" text="Перейти на главную"/>
                </div>
            </div>

        </Layout>
    )
}



export async function getStaticProps(context) {
    const catalogMenuRes = await fetch(`${API_URL}/api/catalog/menu`);
    const catalogMenu = await catalogMenuRes.json();

    const catalogItemsRes = await fetch(`${API_URL}/api/catalog/main-page`);
    const catalogItems = await catalogItemsRes.json();

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