import { useEffect, useState } from "react";
import Link from 'next/link';
import { observer } from "mobx-react-lite";
// import Router, { useRouter } from 'next/router';

import styles from './CatalogSorting.module.css';
import Card from "../Card/Card";
import catalog from '../../store/catalog';
import Loader from "../Loader/Loader";

import { SORTING_TYPES, VIEW_TYPES } from '../../lib/constants';


export default observer(function CatalogSorting({ groupCode = null, searchText = null }) {
    const [viewType, setViewType] = useState(VIEW_TYPES.CARDS);
    const [page, setPage] = useState(catalog.page);
    const [sorting, setSorting] = useState(catalog.sorting);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        catalog.setGroupCode(groupCode);
    }, []);

    useEffect(() => {
        setIsLoading(true);
        catalog.setPage(page);
        catalog.setSorting(sorting);
        catalog.setSearchText(searchText);
        catalog.setGroupCode(groupCode);

        // console.log('page', page);
        const awaitFetch = async () => {
            await catalog.fetchShopItems();
            setIsLoading(false);
        }

        window.scrollTo({
            top: 135,
            left: 0,
            behavior: 'smooth',
        });

        awaitFetch();


    }, [page, sorting, searchText, groupCode]);

    return (
        <>
            <div className="d-flex justify-content-between flex-wrap" style={{ marginBottom: '20px' }}>
                <div className="d-flex">
                    <span className={styles.sortingText}>Сортировка:</span>
                    {Object.keys(SORTING_TYPES).map((type, i) => (
                        <span
                            key={SORTING_TYPES[type]}
                            className={styles.btn}
                            onClick={() => setSorting(type)}
                            style={type === sorting ? { color: '#E2132A' } : {}}
                        >
                            {SORTING_TYPES[type]}
                        </span>
                    ))}
                </div>

                <div className="d-flex">

                    <div className={styles.viewTypeBtn} onClick={() => setViewType(VIEW_TYPES.CARDS)}>
                        <svg className={viewType === VIEW_TYPES.CARDS ? styles.activeViewTypeBtn : ''} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1" width="6" height="6" stroke="#E2132A" strokeWidth="2" />
                            <rect x="1" y="11" width="6" height="6" stroke="#E2132A" strokeWidth="2" />
                            <rect x="11" y="11" width="6" height="6" stroke="#E2132A" strokeWidth="2" />
                            <rect x="11" y="1" width="6" height="6" stroke="#E2132A" strokeWidth="2" />
                        </svg>
                    </div>

                    <div className={styles.viewTypeBtn} onClick={() => setViewType(VIEW_TYPES.LIST)}>
                        <svg className={viewType === VIEW_TYPES.LIST ? styles.activeViewTypeBtn : ''} width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="1" y="1" width="6" height="6" stroke="#BDBDBD" strokeWidth="2" />
                            <rect x="10.5" y="1.5" width="7" height="1" stroke="#BDBDBD" />
                            <rect x="10.5" y="5.5" width="5" height="1" stroke="#BDBDBD" />
                            <rect x="10.5" y="11.5" width="7" height="1" stroke="#BDBDBD" />
                            <rect x="10.5" y="15.5" width="5" height="1" stroke="#BDBDBD" />
                            <rect x="1" y="11" width="6" height="6" stroke="#BDBDBD" strokeWidth="2" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="row" style={{ position: 'relative' }}>
                {catalog.items.data && Object.keys(catalog.items.data).map((item, i) => (
                    <div
                        className={viewType === VIEW_TYPES.CARDS ? "col-cat" : 'col-4'}
                        key={catalog.items.data[item].ID}
                        style={{
                            opacity: isLoading ? '0.2' : '1'
                        }}
                    >
                        <Card item={catalog.items.data[item]} viewType={viewType} />
                    </div>
                ))}

                {isLoading && (
                    <Loader
                        style={{ position: 'absolute', top: '0', left: '0', zIndex: '999' }}
                    />
                )}
            </div>

            {catalog.items.pages > 1 && (
                <div className="d-flex justify-content-center">
                    <Pagination pages={catalog.items.pages} currentPage={page} onClick={(page) => setPage(page)} />
                </div>
            )}


        </>
    );
});

function Pagination({ pages, currentPage, onClick }) {
    return (
        <div className={styles.pagination}>
            <div
                className={styles.paginationBtn}
                onClick={() => onClick(currentPage - 1)}
                style={currentPage === 1 ? { opacity: 0, pointerEvents: 'none' } : {}}
            >
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 1L2 8L9 15" stroke="#BDBDBD" strokeWidth="2" />
                </svg>
            </div>

            {[...new Array(pages)].map((page, i) => (
                <div
                    key={i}
                    className={i + 1 === currentPage ? styles.paginationBtnActive : styles.paginationBtn}
                    onClick={() => onClick(i + 1)}
                >
                    <span>{i + 1}</span>
                </div>
            ))}

            <div
                className={styles.paginationBtn}
                onClick={() => onClick(currentPage + 1)}
                style={currentPage === pages ? { opacity: 0, pointerEvents: 'none' } : {}}
            >
                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 1L8 8L1 15" stroke="#BDBDBD" strokeWidth="2" />
                </svg>
            </div>

        </div>
    );
}