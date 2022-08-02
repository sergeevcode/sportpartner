import { useState } from 'react';

import styles from './PersonalPages.module.css';

import { STATUS_TYPES } from '../../../lib/constants';

export default function PersonalOrdersPage() {
    return (
        <table className={styles.table}>
            <thead>
                <tr>
                    <th><span>Номер заказа</span></th>
                    <th><span>Менеджер</span></th>
                    <th><span>Стоимость</span></th>
                    <th><span>Дата доставки</span></th>
                    <th><span>Статус доставки</span></th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>NK4932I1</td>
                    <td>Лида</td>
                    <td>11 475 р</td>
                    <td>21.05.2021</td>
                    <td>
                        <Status type={STATUS_TYPES.recived} />
                    </td>
                </tr>
                <tr>
                    <td>NK4932I1</td>
                    <td>Лида</td>
                    <td>11 475 р</td>
                    <td>21.05.2021</td>
                    <td>
                        <Status type={STATUS_TYPES.delivery} />
                    </td>
                </tr>
                <tr>
                    <td>NK4932I1</td>
                    <td>Лида</td>
                    <td>11 475 р</td>
                    <td>21.05.2021</td>
                    <td>
                        <Status type={STATUS_TYPES.awaiting} />
                    </td>
                </tr>
                <tr>
                    <td>NK4932I1</td>
                    <td>Лида</td>
                    <td>11 475 р</td>
                    <td>21.05.2021</td>
                    <td>
                        <Status type={STATUS_TYPES.processing} />
                    </td>
                </tr>
            </tbody>
        </table>
    );
}



function Status({ type }) {

    return (
        <div className={type.style}>{type.title}</div>
    );
}