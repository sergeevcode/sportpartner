import { useState } from "react";

import styles from './Tabs.module.css';




export default function Tabs({ item }) {
    const [activeTab, setActiveTab] = useState(1);

    const TABS = {
        description: {
            id: 1,
            title: 'Описание',
            active: true
        },
        characteristics: {
            id: 2,
            title: 'Характеристики',
            active: item.characteristics && item.characteristics[0].VALUE && (item.characteristics.length > 0)
        },
        features: {
            id: 3,
            title: 'Преимущества',
            active: item.features
        },
    }

    return(
        <div className={styles.tabsWrap}>
            <div className={styles.tabBtns}>

                { Object.keys(TABS).filter( tab => TABS[tab].active ).map( tab => (
                    <div
                        key={TABS[tab].id}
                        className={activeTab === TABS[tab].id ? styles.activeTabBtn : styles.tabBtn}
                        onClick={() => setActiveTab(TABS[tab].id)}
                    >
                        { TABS[tab].title }
                    </div>
                ) ) }

                <div className={styles.tabBtn}>Отзывы</div>
            </div>

            <div className={styles.tabs}>


                <div style={ activeTab === 1 ? { display: 'block' } : { display: 'none' } } className={styles.description}>
                    <div dangerouslySetInnerHTML={{__html: item.DETAIL_TEXT}} />
                </div>


                { TABS.characteristics.active && (
                    <div style={ activeTab === TABS.characteristics.id ? { display: 'block' } : { display: 'none' } }>
                        <div className="row">
                            <div className="col-2">
                                { item.characteristics.filter((it, i) => i <= (item.characteristics.length / 2) ).map((characteristic, i) => (
                                    <div className={styles.characteristics} key={i}>
                                        <span>{characteristic.VALUE}</span>
                                        <div>{characteristic.DESCRIPTION}</div>
                                    </div>
                                )) }
                            </div>
                            <div className="col-2">
                                { item.characteristics.filter((it, i) => i > (item.characteristics.length / 2) ).map((characteristic, i) => (
                                    <div className={styles.characteristicsSecond} key={i}>
                                        <span>{characteristic.VALUE}</span>
                                        <div>{characteristic.DESCRIPTION}</div>
                                    </div>
                                )) }
                            </div>
                        </div>
                    </div>
                )}

                { TABS.features.active && (
                    <div style={ activeTab === TABS.features.id ? { display: 'block' } : { display: 'none' } }  className={styles.description}>
                        {/*{ item.features }*/}
                        <div dangerouslySetInnerHTML={{__html: item.features}} />
                    </div>
                )}

            </div>
        </div>
    );
}