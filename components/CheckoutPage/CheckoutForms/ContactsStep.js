import { useState, useEffect } from 'react';
import checkoutState from '../../../store/checkoutState';
import { observer } from "mobx-react-lite";
import InputMask from 'react-input-mask';

import Button from '../../Button/Button';
import styles from './CheckoutForms.module.css';



export const phoneRe = /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/;
export const emailRe = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



export default observer(function ContactsStep() {
    const contactsState = checkoutState.contacts;

    const [status, setStatus] = useState(contactsState.status);
    const [name, setName] = useState(contactsState.name);
    const [phone, setPhone] = useState(contactsState.phone);
    const [email, setEmail] = useState(contactsState.email);
    const [checkedForm, setCheckedForm] = useState(false);

    const stepHandler = (form) => {
        form.preventDefault();

        checkoutState.setContacts({
            status,
            name,
            phone,
            email
        });

        setCheckedForm(true);
    }

    return (
        <>
            <h2 className={styles.title}>Контактные данные</h2>


            <form action="" onSubmit={(form) => stepHandler(form)}>
                <div className={styles.radioBtns}>
                    <div className='d-flex'>
                        <div className={styles.radioBtnWrap} onClick={() => setStatus('YUR')}>
                            <input type="radio" id="YUR" value="YUR" name="type" checked={status === 'YUR' ? true : false} />
                            <label htmlFor="YUR">Юридическое лицо</label>
                        </div>

                        <div className={styles.radioBtnWrap} onClick={() => setStatus('FIZ')}>
                            <input type="radio" id="FIZ" value="FIZ" name="type" checked={status === 'FIZ' ? true : false} />
                            <label htmlFor="FIZ">Физическое лицо</label>
                        </div>
                    </div>
                    {checkedForm && !status && (<div className='error'>Выберите один из вариантов</div>)}
                </div>

                <div className="form-field">
                    <label htmlFor="contact" name="contact">Контактное лицо:</label>
                    <input
                        type="text"
                        id="contact"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ borderColor: (checkedForm && !name && name.length < 2) ? '#E2132A' : '' }}
                    />
                    {(checkedForm && !name && name.length < 2) && (<div className='error'>Заполните поле правильно</div>)}
                </div>
                <div className="form-field">
                    <label htmlFor="phone" name="phone">Телефон:</label>
                    {/* <input type="text" id="phone" /> */}
                    <InputMask
                        name="phone"
                        mask='+7 (999) 999-99-99'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        style={{ borderColor: (checkedForm && !phone && !phoneRe.test(phone)) ? '#E2132A' : '' }}
                    >
                    </InputMask>
                    {(checkedForm && !phone && !phoneRe.test(phone)) && (<div className='error'>Заполните поле правильно</div>)}
                </div>
                <div className="form-field" style={{ marginBottom: '35px' }}>
                    <label htmlFor="email" name="email">E-mail:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ borderColor: (checkedForm && !email && !emailRe.test(email)) ? '#E2132A' : '' }}
                    />
                    {(checkedForm && !email && !emailRe.test(email)) && (<div className='error'>Заполните поле правильно</div>)}
                </div>

                <Button text="Перейти к доставке" onClick={() => console.log('oh, shit! Here we go again!')} />
            </form>
        </>
    )
});