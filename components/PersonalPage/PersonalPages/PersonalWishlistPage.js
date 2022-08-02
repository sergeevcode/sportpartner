import OfferBanner from '../../ProfitOfferCards/OfferBanner/OfferBanner';
import Card from '../../Card/Card';
import Loader from '../../Loader/Loader';

import { API_URL } from '../../../constants';
import { useState, useEffect } from 'react';

export default function PersonaWishlistPage() {
    const [items, setItems] = useState(null);
    const seadItems = [7, 29, 30];

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch(`${API_URL}/api/catalog/items-by-ids?itemsId=${seadItems.join(',')}`);
            const json = await data.json();

            setItems(json.data);
            console.log(json.data);
        }

        fetchData()
            .catch(console.error);
    }, [])


    return (
        <div className="row">
            {items && Object.keys(items).map((item, i) => (
                <div
                    className="col-cat"
                    key={items[item].ID}
                >
                    <Card item={items[item]} />
                </div>
            ))}

            {!items && (
                <Loader />
            )}
        </div>
    );
}