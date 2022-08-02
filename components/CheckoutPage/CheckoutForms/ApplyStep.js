import { useState, useEffect } from 'react';
import checkoutState from '../../../store/checkoutState';
import { observer } from "mobx-react-lite";
import Link from 'next/link';

import Button from '../../Button/Button';
import styles from './CheckoutForms.module.css';
import { PAYMENT_TYPES } from '../../../lib/constants';


export default observer(function ApplyStep() {
    const [paymentType, setPaymentType] = useState(checkoutState.paymentType);
    const [policyConfirm, setPolicyConfirm] = useState(false);

    const stepHandler = (form) => {
        form.preventDefault();

        if (policyConfirm) {
            checkoutState.setStep(4);
        }
    }

    const policyHandler = () => {
        setPolicyConfirm(!policyConfirm);
    }

    const paymentTypeHandler = (type) => {
        setPaymentType(type);
        checkoutState.setPaymentType(type);
    }

    useEffect(() => {
        if (!checkoutState.paymentType.type) {
            setPaymentType(PAYMENT_TYPES[0]);
        }
    }, []);

    return (
        <>
            <form action="" onSubmit={(form) => stepHandler(form)}>

                <h2 className={styles.title}>Контактные данные</h2>
                <div className={styles.applyblock}>
                    <p>Контактное лицо: <span>{checkoutState.contacts.name}</span></p>
                    <p>Телефон: <span>{checkoutState.contacts.phone}</span></p>
                    <p>E-mail: <span>{checkoutState.contacts.email}</span></p>
                </div>

                <h2 className={styles.title}>Адрес доставки</h2>
                <div className={styles.applyblock}>
                    <p>Страна: <span>{checkoutState.address.country}</span></p>
                    <p>Город: <span>{checkoutState.address.city}</span></p>
                    <p>Адрес: <span>{checkoutState.address.address}</span></p>
                </div>

                <h2 className={styles.title}>Способ доставки</h2>
                <div className={styles.applyblock}>

                    <p>{checkoutState.delivery.type.name}: <span>{checkoutState.delivery.point.name}  <span>({checkoutState.delivery.point.price}₽)</span></span></p>
                    <p>Комментарий: <span>{checkoutState.address.comment}</span></p>
                </div>

                <h2 className={styles.title}>Способ оплаты</h2>

                <div className={styles.apply}>
                    <div className={styles.radioBtns}>
                        <div>
                            {PAYMENT_TYPES.map(type => (
                                <div
                                    className={styles.radioBtnWrap}
                                    key={type.type}
                                    onClick={() => paymentTypeHandler(type)}
                                >
                                    <input
                                        type="radio"
                                        id={type.type}
                                        value={type.type}
                                        name="type"
                                        checked={type.type === paymentType.type ? true : false}
                                    />
                                    <label htmlFor={type.type}>{type.text} {type.description && (<span>({type.description})</span>)}</label>
                                </div>
                            ))}
                        </div>
                        {/* {checkedForm && !status && (<div className='error'>Выберите один из вариантов</div>)} */}
                    </div>
                </div>
                <div className='d-flex'>
                    <Button
                        text="Перейти к оплате"
                        onClick={() => (<></>)}
                        disabled={policyConfirm ? false : true}
                    />
                    <div style={{ position: 'relative' }}>
                        <div className={styles.filterBlock}>
                            <input
                                type="checkbox"
                                id="test4"
                                checked={policyConfirm}
                                onChange={() => policyHandler()}
                            />
                            <label htmlFor="test4">
                                <span>Я даю согласие на обработку персональных
                                    данных в соответствии с условиями <Link href="#"><a>политики конфиденциальности</a></Link></span>
                            </label>
                        </div>

                    </div>
                </div>

            </form>
        </>
    )
});