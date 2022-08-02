import {useEffect} from "react";
import Image from 'next/image';
import Link from 'next/link';

import styles from './CatalogCategories.module.css';
import TitleArrows from "../TitleArrows/TitleArrows";
import {API_URL} from "../../constants";

export default function CatalogCategories({ categories }) {

    useEffect(() => {
        // console.log(categories);
    }, []);

    return(
        <section className="section-block">
            <div className="container">
                <div className="row">
                    <div className="col"></div>
                    <div className="col-3">
                        <h2 className="section-title" style={{ margin: '60px 0 30px' }}>
                            <TitleArrows size="sm" count={3} colored={[2,3]}/> <span style={{ marginLeft: '-15px' }}>Каталог</span>
                        </h2>
                    </div>
                </div>

                <div className="row justify-content-between" style={{ padding: '0 20px' }}>
                    { Object.keys(categories).filter(i => categories[i].parent_id === 0).map((category) => (
                        <Link href={'/catalog/' + categories[category].code} key={categories[category].id}>
                            <a className={styles.catalogCard}>

                                <svg width="206" height="324" viewBox="0 0 206 324" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path opacity="0.05" d="M-69 -134L153 88L-69 310" stroke="#131313" strokeWidth="74"/>
                                </svg>

                                <Image
                                    src={`${API_URL}/${categories[category].picture_detail}`}
                                    width={207}
                                    height={207}
                                />

                                <div className={styles.title}>{categories[category].name}</div>
                            </a>
                        </Link>
                    )) }
                </div>
            </div>
        </section>
    );
};