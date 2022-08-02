import { useState } from 'react';
import { observer } from "mobx-react-lite";
import Link from 'next/link';

import CheckoutItems from './CheckoutItems/CheckoutItems';
import ContactsStep from './CheckoutForms/ContactsStep';
import DeliveryStep from './CheckoutForms/DeliveryStep';
import ApplyStep from './CheckoutForms/ApplyStep';
import PaymentStep from './CheckoutForms/PaymentStep';

import checkoutState from '../../store/checkoutState';
import styles from './CheckoutPage.module.css';


export default observer(function CheckoutPage() {

    const stepChangeHandler = (step) => {
        checkoutState.setStep(step);
    };

    const CHECKOUT_STEPS = {
        1: {
            title: 'Контакты',
            component: <ContactsStep />,
        },
        2: {
            title: 'Доставка',
            component: <DeliveryStep />,
        },
        3: {
            title: 'Подтверждение',
            component: <ApplyStep />,
        },
        4: {
            title: 'Оплата',
            component: <PaymentStep />
        }
    };

    return (
        <>
            {(checkoutState.step != 4 || (checkoutState.step == 4 && checkoutState.paymentType.type === 'CARD_ONLINE')) && (
                <h1 className="section-title">Оформление заказа</h1>
            )}
            <section>
                <div className='row'>
                    <div className={(checkoutState.step != 4 || (checkoutState.step == 4 && checkoutState.paymentType.type === 'CARD_ONLINE')) ? 'col-2' : 'col-4'}>

                        {(checkoutState.step != 4 || (checkoutState.step == 4 && checkoutState.paymentType.type === 'CARD_ONLINE')) && (
                            <>
                                {Object.keys(CHECKOUT_STEPS).map(step => (
                                    <span
                                        key={step}
                                        className={styles.breadcrumbs}
                                    >
                                        <span
                                            className={step == checkoutState.step ? styles.active : ''}
                                        >
                                            <span
                                                onClick={(checkoutState.validatedSteps[step - 1] || checkoutState.validatedSteps[step]) ? () => stepChangeHandler(step) : () => (<></>)}
                                            >
                                                {CHECKOUT_STEPS[step].title}
                                            </span>
                                            {Object.keys(CHECKOUT_STEPS).length != step ? ' — ' : ''}
                                        </span>
                                    </span>
                                ))}
                            </>
                        )}


                        {checkoutState.step != 4 && (
                            <p className={styles.subTitle}>
                                Для удобства и возможности следить за состоянием заказа <Link href="#"><a>войдите в личный кабинет</a></Link> или <Link href="#"><a>зарегистрируйтесь на сайте</a></Link>
                            </p>
                        )}


                        {CHECKOUT_STEPS[checkoutState.step].component}
                    </div>
                    {(checkoutState.step != 4 || (checkoutState.step == 4 && checkoutState.paymentType.type === 'CARD_ONLINE')) && (
                        <div className='col-2'>
                            <CheckoutItems />
                        </div>
                    )}
                </div>
            </section>
        </>
    )
});