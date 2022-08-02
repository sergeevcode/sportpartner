import OfferBanner from '../../ProfitOfferCards/OfferBanner/OfferBanner';

import { API_URL } from '../../../constants';

export default function PersonalMainPage() {
    return (
        <div className='row'>
            <div className='col-4'>
                <OfferBanner
                    background={`${API_URL}/images/discountBannerOnMainSmall.jpg`}
                    title={'ДАРИМ СКИДКУ 10% НА ВСЮ ПРОДУКЦИЮ'}
                    description={<>По промокоду: <span>NMKEAL10</span></>}
                    small
                    style={{ backgroundPosition: 'center center' }}
                />
            </div>
            <div className='col-2'>
                <OfferBanner
                    background={`${API_URL}/images/discountBannerOnMainSmall.jpg`}
                    title={'ДАРИМ СКИДКУ 10% НА ВСЮ ПРОДУКЦИЮ'}
                    description={<>По промокоду: <span>NMKEAL10</span></>}
                    small
                    style={{ backgroundPosition: '-50px center' }}
                />
            </div>
            <div className='col-2'>
                <OfferBanner
                    background={`${API_URL}/images/discountBannerOnMainSmall.jpg`}
                    title={'ДАРИМ СКИДКУ 10% НА ВСЮ ПРОДУКЦИЮ'}
                    description={<>По промокоду: <span>NMKEAL10</span></>}
                    small
                    style={{ backgroundPosition: '-50px center' }}
                />
            </div>

        </div>
    );
}