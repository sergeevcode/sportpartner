import { useState, useEffect } from 'react';
import checkoutState from '../../../store/checkoutState';
import { observer } from "mobx-react-lite";

import Button from '../../Button/Button';
import styles from './CheckoutForms.module.css';
import { DELIVERY_TYPES } from '../../../lib/constants';


export default observer(function DeliveryStep() {
    const [activeDeliveryType, setActiveDeliveryType] = useState(checkoutState.deliveryType);
    const [deliveryTypeList, setDeliveryTypeList] = useState(null);
    const [activePoint, setActivePoint] = useState(checkoutState.pointType);

    const [country, setCountry] = useState(checkoutState.address.country);
    const [city, setCity] = useState(checkoutState.address.city);
    const [address, setAddress] = useState(checkoutState.address.address);
    const [comment, setComment] = useState(checkoutState.address.comment);
    const [checkedForm, setCheckedForm] = useState(false);


    const stepHandler = (form) => {
        form.preventDefault();

        checkoutState.setAddress({
            country,
            city,
            address,
            comment
        });
        checkoutState.setDelivery({
            type: activeDeliveryType,
            point: activePoint,
        });

        setCheckedForm(true);
    }

    const deliveryTypeHandler = (type) => {
        setActiveDeliveryType(type);
        // setActivePoint(checkoutState.delivery.point);
    }

    const activePointHandler = (point) => {
        setActivePoint(point);
    }


    useEffect(() => {
        console.log('activeDeliveryType', activeDeliveryType);
        console.log('activePoint', activePoint);

        if (!deliveryTypeList) {
            setDeliveryTypeList(DELIVERY_TYPES);
        }

        if (!activeDeliveryType.key) {
            setActiveDeliveryType(DELIVERY_TYPES[0]);
        }

        if (!activePoint.name) {
            setActivePoint(DELIVERY_TYPES[0].points[0]);
        }
    }, []);

    return (
        <form action="" onSubmit={(form) => stepHandler(form)}>
            <h2 className={styles.title}>Адрес доставки</h2>

            <div className="form-field">
                <label htmlFor="country" name="country">Страна:</label>
                <input
                    type="text"
                    id="country"
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    style={{ borderColor: (checkedForm && !country) ? '#E2132A' : '' }}
                />
                {checkedForm && !country && (<div className='error'>Заполните поле</div>)}
            </div>
            <div className="form-field">
                <label htmlFor="city" name="city">Город:</label>
                <input
                    type="text"
                    id="city"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    style={{ borderColor: (checkedForm && !city) ? '#E2132A' : '' }}
                />
                {checkedForm && !city && (<div className='error'>Заполните поле</div>)}
            </div>

            <div className="form-field" style={{ marginBottom: '60px' }}>
                <label htmlFor="address" name="address">Адрес:</label>
                <input
                    type="text"
                    id="address"
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    style={{ borderColor: (checkedForm && !address) ? '#E2132A' : '' }}
                />
                {checkedForm && !address && (<div className='error'>Заполните поле</div>)}
            </div>

            <h2 className={styles.title}>Способ доставки</h2>

            <div className='d-flex'>

                {deliveryTypeList && deliveryTypeList.map(type => (
                    <div
                        className={styles.radioBtnWrap}
                        key={type.key}
                        onClick={() => deliveryTypeHandler(type)}
                    >
                        <input type="radio" id={type.key} value={type.key} name="type" checked={type.key === activeDeliveryType.key ? true : false} />
                        <label htmlFor={type.key}>{type.name}</label>
                    </div>
                ))}
            </div>

            <div className={styles.points}>
                {(activeDeliveryType && activeDeliveryType.points && activeDeliveryType.points.length > 0) && (
                    activeDeliveryType.points.map(point => (
                        <div
                            key={point.name}
                            className={activePoint.name === point.name ? styles.activePoint : styles.point}
                            onClick={() => activePointHandler(point)}
                        >
                            {point.name}
                            {point.price && (<span>{point.price} ₽</span>)}
                        </div>
                    ))
                )}
            </div>

            <div className="form-field" style={{ marginBottom: '30px' }}>
                <label htmlFor="comment" name="comment">Комментарий:</label>
                <textarea id="comment" rows="6" value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>


            <Button text="Перейти к оплате" onClick={() => (<></>)} />
        </form>
    )
});