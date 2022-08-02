import { useState } from 'react';
import { observer } from "mobx-react-lite";
import Link from 'next/link';
import user from '../../store/user';
import { ToastContainer, toast } from 'react-toastify';

import PersonalLeftSidebar from './PersonalLeftSidebar/PersonalLeftSidebar';
import PersonalMainPage from './PersonalPages/PersonalMainPage';
import PersonalOrdersPage from './PersonalPages/PersonalOrdersPage';
import PersonaWishlistPage from './PersonalPages/PersonalWishlistPage';
import PersonalReviewsPage from './PersonalPages/PersonalReviewsPage';
import PersonalClaimsPage from './PersonalPages/PersonalClaimsPage';
import PersonLoginPage from './PersonalPages/PersonLoginPage';

const PERSONAL_PAGES = [
    {
        title: 'Главная',
        component: <PersonalMainPage />,
    },
    {
        title: 'Заказы',
        component: <PersonalOrdersPage />,
    },
    {
        title: 'Желаемое',
        component: <PersonaWishlistPage />,
    },
    {
        title: 'Отзывы',
        component: <PersonalReviewsPage />
    },
    // {
    //     title: 'Вопросы',
    //     // component: <PaymentStep />
    // },
    {
        title: 'Претензии',
        component: <PersonalClaimsPage />
    }
];


export default observer(function PersonalPage() {
    const [page, setPage] = useState(PERSONAL_PAGES[0]);

    const stepChangeHandler = (step) => {
        checkoutState.setStep(step);
    };


    return (
        <>
            <div className="container">
                {user.isAuthorized ? (
                    <div className="row">
                        <div className="col">
                            <PersonalLeftSidebar
                                userInfo={user.getUserInfo()}
                                pages={PERSONAL_PAGES}
                                activePage={page}
                                pageHandler={(page) => setPage(page)}
                            />
                        </div>
                        <div className="col-3">
                            {page.component}
                        </div>
                    </div>
                ) : (
                    <PersonLoginPage />
                )}


            </div>
        </>
    )
});