import styles from './PersonalLeftSidebar.module.css';
import Button from '../../Button/Button';
import TextLink from '../../TextLink/TextLink';
import { observer } from "mobx-react-lite";

import user from '../../../store/user';
import { API_URL } from '../../../constants';

export default observer(function PersonalLeftSidebar({ userInfo, pages, activePage, pageHandler }) {

    const logoutHandler = async () => {

        if (confirm('Вы действительно хотите выйти?')) {

            const data = await fetch(`/api/logout`, { method: 'POST' });
            const json = await data.json();

            user.setIsAuthorized(false);
            user.setUserInfo({
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                token: '',
            });
        }
    }


    const fetchHandler = async () => {

        /*const data = await fetch(`/api/cart/delete`, {
            method: 'POST',
            body: JSON.stringify({
                user_id: 2,
                product_id: 333,
                price: 1234.00,
                quantity: 2,
                name: 'Гриф гантельный В-31х6 мм',
                color: '294a36',
                weight: 13
            })
        });*/

        // const formData = new FormData();
        // formData.append('basket_id', 18);

        // const data = await fetch(`${API_URL}/api/cart/delete`, {
        //     method: 'POST',
        //     body: formData
        // });

        // const json = await data.json();
        // console.log(json);
    }



    return (
        <>
            <div className={styles.wrap}>
                <div className={styles.avatar}>
                    {user.firstName && user.firstName.substring(0, 1)}
                </div>
                <span className={styles.name}>{user.firstName} {user.lastName}</span>
                <span className={styles.settings}>Настройки</span>

                <div className={styles.links}>
                    {pages.map(page => (
                        <a
                            key={page.title}
                            onClick={() => pageHandler(page)}
                            className={page === activePage ? styles.active : ''}
                        >
                            {page.title}
                        </a>
                    ))}

                    <TextLink text="Выйти" onClick={() => logoutHandler()} style={{ marginTop: '40px' }} />
                </div>
            </div>
        </>
    );
});