import { useState } from "react";
import InputRange from "react-input-range";

import styles from './CatalogFilter.module.css';
import Button from "../Button/Button";
import TextLink from "../TextLink/TextLink";
import 'react-input-range/lib/css/index.css';

export default function CatalogFilter({ searchPage = false }) {
    return (
        <form className={styles.filterForm}>
            <div className={styles.filterBlock}>
                <div className={styles.title}>Фильтр</div>

                <div>
                    <input type="checkbox" id="test"/>
                    <label htmlFor="test">Популярные товары</label>
                </div>
                <div>
                    <input type="checkbox" id="test2"/>
                    <label htmlFor="test2">Товары со скидкой</label>
                </div>
                <div>
                    <input type="checkbox" id="test3"/>
                    <label htmlFor="test3">Новинки</label>
                </div>
            </div>

            { !searchPage && (
                <>
                    <div className={styles.filterBlock}>
                        <div className={styles.title}>Форм фактор</div>

                        <div>
                            <input type="checkbox" id="test4"/>
                            <label htmlFor="test4">Прямой</label>
                        </div>
                        <div>
                            <input type="checkbox" id="test5"/>
                            <label htmlFor="test5">Олимпийский</label>
                        </div>
                        <div>
                            <input type="checkbox" id="test6"/>
                            <label htmlFor="test6">W-образный</label>
                        </div>
                        <div>
                            <input type="checkbox" id="test7"/>
                            <label htmlFor="test7">Z-образный</label>
                        </div>
                    </div>
                    <div className={styles.filterBlock}>
                        <div className={styles.title}>Длина</div>

                        <div>
                            <input type="checkbox" id="test8"/>
                            <label htmlFor="test8">1.2</label>
                        </div>
                        <div>
                            <input type="checkbox" id="test9"/>
                            <label htmlFor="test9">1.3</label>
                        </div>
                        <div>
                            <input type="checkbox" id="test10"/>
                            <label htmlFor="test10">1.4</label>
                        </div>
                        <div>
                            <input type="checkbox" id="test11"/>
                            <label htmlFor="test11">2.1</label>
                        </div>


                        <a href="#" className={styles.moreBtn}>Показать еще</a>
                    </div>

                    <div className={styles.filterBlock}>
                        <div className={styles.title}>Вес, кг</div>
                        <Range min={1} max={20} />
                    </div>

                    <div className={styles.filterBlock}>
                        <div className={styles.title}>Покрытие</div>

                        <div>
                            <input type="checkbox" id="test12"/>
                            <label htmlFor="test12">Хром</label>
                        </div>
                        <div>
                            <input type="checkbox" id="test13"/>
                            <label htmlFor="test13">Резина</label>
                        </div>
                        <div>
                            <input type="checkbox" id="test14"/>
                            <label htmlFor="test14">Пластик</label>
                        </div>
                    </div>
                </>
            ) }



            <div className={styles.filterBlock}>
                <div className={styles.title}>Цена, руб</div>
                <Range min={100} max={100000}  />
            </div>


            { !searchPage && (
                <div className={styles.filterBlock}>
                    <div className={styles.title}>Бренд</div>

                    <div>
                        <input type="checkbox" id="test15"/>
                        <label htmlFor="test15">Barbell</label>
                    </div>
                    <div>
                        <input type="checkbox" id="test16"/>
                        <label htmlFor="test16">Sportmass</label>
                    </div>
                    <div>
                        <input type="checkbox" id="test17"/>
                        <label htmlFor="test17">IronMan</label>
                    </div>
                </div>
            ) }




            <Button href="#" text="Применить" fullWidth={true}/>
            <div className={styles.filterReset}>
                <TextLink text="Сбросить" onClick={() => console.log('asdasd')}/>
            </div>

        </form>
    );
}

function Range({ min, max }) {
    const [fromValue, setFromValue] = useState({ min, max });

    return (
        <>
            <InputRange
                maxValue={max}
                minValue={min}
                value={fromValue}
                onChange={value => setFromValue( value )}
            />
            <div className="d-flex justify-content-between">
                <div className={styles.inputWrap}>
                    <span>От</span>
                    <input type="text" defaultValue={fromValue.min} className={styles.input} onChange={e => setFromValue( {min: e.target.value, max: fromValue.max} )} />
                </div>
                <div className={styles.inputWrap}>
                    <span>До</span>
                    <input type="text" defaultValue={fromValue.max} className={styles.input} onChange={e => setFromValue( {min: fromValue.min, max: e.target.value} )} />
                </div>
            </div>
        </>
    );
}