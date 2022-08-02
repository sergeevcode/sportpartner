import Head from "next/head";
import Layout from "../../../components/Layout/layout";
import {API_URL} from "../../../constants";
import Breadcrumps from "../../../components/Breadcrumps/Breadcrumps";
import CatalogFilter from "../../../components/CatalogFilter/CatalogFilter";
import CatalogSorting from "../../../components/CatalogSorting/CatalogSorting";
import Tags from "../../../components/Tags/Tags";
import SeoText from "../../../components/SeoText/SeoText";
import TitleArrows from "../../../components/TitleArrows/TitleArrows";
import CardsCarousel from "../../../components/CardsCarousel/CardsCarousel";


export default function Group(props) {
    return (
        <Layout catalogMenu={props.data.data}>
            <Head>
                <title>{ props.group.group.META.SECTION_META_TITLE }</title>
                <meta name="description" content={ props.group.group.META.SECTION_META_DESCRIPTION } />
                <meta name="keywords" content={ props.group.group.META.SECTION_META_KEYWORDS } />
            </Head>

            <section>
                <div className="container">
                    <Breadcrumps
                        items={[
                            { title: 'Каталог', link: '/catalog' },
                            { title: props.group.group.NAME, link: false }
                        ]}
                    />
                    <h2 className="section-title" style={{ marginBottom: '50px' }}>
                        { props.group.group.NAME }
                    </h2>
                    <div className="row">
                        <div className="col">
                            <CatalogFilter />
                        </div>
                        <div className="col-3">
                            <CatalogSorting groupCode={props.groupCode}/>
                        </div>
                    </div>
                </div>
            </section>

            <Tags />

            { props.group.group.DESCRIPTION && (
                <SeoText
                    title={<><span style={{ marginRight: '10px' }}>SEO TEXT</span><TitleArrows size="sm" count={3} colored={[1]}/></>}
                    text={props.group.group.DESCRIPTION}
                />
            ) }


            {/*<CardsCarousel*/}
            {/*    style={{ padding: '60px 0 55px' }}*/}
            {/*    title={<h2>Вы недавно смотрели <span>//</span></h2>}*/}
            {/*    items={props.shopItems}*/}
            {/*/>*/}

        </Layout>
    );
}

export async function getStaticPaths() {
    const catalogMenuRes = await fetch(`${API_URL}/api/catalog/menu`);
    const catalogMenu = await catalogMenuRes.json();

    const paths = Object.keys(catalogMenu.data).map(group => {
        return {
            params: {
                group: catalogMenu.data[group].code
            }
        }
    });

    return {
        paths,
        fallback: false
    };
}

export async function getStaticProps(context) {
    const catalogMenuRes = await fetch(`${API_URL}/api/catalog/menu`);
    const catalogMenu = await catalogMenuRes.json();

    const { params } = context;
    const catalogGroupRes = await fetch(`${API_URL}/api/catalog/${params.group}`);
    const catalogGroup = await catalogGroupRes.json();

    if (!catalogMenu) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            data: catalogMenu,
            groupCode: params.group,
            group: catalogGroup
            //shopItems: catalogItems
        },
    }
}