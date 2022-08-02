import styles from './PersonalPages.module.css';
import Button from '../../Button/Button';
import { observer } from "mobx-react-lite";
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import user from '../../../store/user';
import { API_URL } from '../../../constants';
import { TOAST_OPTIONS } from '../../../lib/constants';

import TextLink from '../../TextLink/TextLink';

export default observer(function PersonLoginPage() {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const formHandler = (form) => {
        form.preventDefault();

        const formData = new FormData();
        formData.append('login', login);
        formData.append('password', password);
        setIsLoading(true);

        const fetchData = async () => {
            const data = await fetch(`/api/login`, {
                method: 'POST',
                body: JSON.stringify({ login, password })
            });
            const json = await data.json();
            console.log(json);

            if (!json.isLoggedIn && json.data.TYPE && json.data.TYPE === 'ERROR') {
                toast.error(json.data.MESSAGE.replace(/<\/?[a-zA-Z]+>/gi, ''), TOAST_OPTIONS);
                setIsLoading(false);
            } else if (json.isLoggedIn && json.user) {
                toast.success('👍 Вы успешно авторизовались', TOAST_OPTIONS);
                user.setIsAuthorized(true);
                user.setUserInfo({
                    id: json.user.id,
                    firstName: json.user.first_name,
                    lastName: json.user.last_name,
                    email: json.user.email,
                    token: json.user.token,
                });
                setIsLoading(false);
            }
        }

        fetchData()
            .catch((e) => {
                console.log(e);
                toast.warning('Пошло что-то не так! Попробуйте повторить ещё раз', TOAST_OPTIONS);
            });
    };

    return (
        <>
            <div className='row justify-content-center'>
                <div className='col-2'>
                    <form action="" onSubmit={(form) => formHandler(form)} className={styles.authForm}>
                        <h1 className={styles.authTitle}>Войти в личный кабинет</h1>

                        <div className="form-field">
                            <label htmlFor="login">Логин:</label>
                            <input
                                type="text"
                                id="login"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                        </div>
                        <div className="form-field">
                            <label htmlFor="password">Пароль:</label>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <div
                            style={{
                                opacity: isLoading ? '0.3' : '1',
                                pointerEvents: isLoading ? 'none' : 'auto',
                            }}
                        >
                            <Button
                                text={isLoading ? "Загрузка..." : 'Войти'}
                                onClick={() => console.log('oh, shit! Here we go again!')}
                                fullWidth
                            />
                        </div>

                        <div className='d-flex justify-content-center'>
                            <TextLink href="#" text="Зарегестрироваться" style={{ margin: '30px 0 0 0' }} />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
});