/* eslint-disable jsx-a11y/alt-text */
import { useState, useEffect } from 'react';
import checkoutState from '../../../store/checkoutState';
import { observer } from "mobx-react-lite";
import Image from 'next/image';

import Visa from "../../../public/visaColored.png";
import MasterCard from "../../../public/mastercardColored.png";
import Mir from "../../../public/mirColored.png";
import Checked from "../../../public/checkoutAccept.svg";

import Button from '../../Button/Button';
import styles from './CheckoutForms.module.css';

export default observer(function PaymentStep() {
    return (
        <>
            {checkoutState.paymentType.type === 'CARD_ONLINE' ? (
                <>
                    <h2 className={styles.titleBig}>К оплате: 11 475 ₽</h2>
                    <div className={styles.paymentCards}>
                        <div>
                            <Image
                                src={Visa}
                                width={55}
                                height={22}
                            />
                        </div>
                        <div>
                            <Image
                                src={MasterCard}
                                width={36}
                                height={27}
                            />
                        </div>
                        <div>
                            <Image
                                src={Mir}
                                width={54}
                                height={14}
                            />
                        </div>
                    </div>
                    <Button
                        text="Оплатить"
                        onClick={() => (<></>)}
                    />
                </>
            ) : (
                <div className={styles.finalBlock}>
                    <Image
                        src={Checked}
                        width={156}
                        height={140}
                    />
                    <h1>Заказ успешно оплачен</h1>
                    <p className={styles.finallDescr}>Статус заказа можно отслеживать в личном кабинете</p>
                    <Button
                        text="В личный кабинет"
                        href="#"
                    />
                </div>
            )}

        </>
    )
});