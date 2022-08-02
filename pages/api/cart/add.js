import { withIronSessionApiRoute } from 'iron-session/next';
import { API_URL } from '../../../constants';


const sessionOptions = {
    password: 'iftYpLGxLrM42H0Z8g8Ziovqzijqm24b',
    cookieName: 'iron-session',
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    // cookieOptions: {
    //   secure: process.env.NODE_ENV === 'production',
    // },
}

export default withIronSessionApiRoute(cartAddRoute, sessionOptions);

async function cartAddRoute(req, res) {
    const body = await req.body;

    const { product_id, price, quantity, name, color, weight } = JSON.parse(body);

    if (req.session.user.isLoggedIn) {
        const formData = new URLSearchParams();
        formData.append('user_id', req.session.user.user.id);
        formData.append('product_id', product_id);
        formData.append('price', price);
        formData.append('quantity', quantity);
        formData.append('name', name);
        formData.append('color', color);
        formData.append('weight', weight);

        try {
            const data = await fetch(`${API_URL}/api/cart/add`, {
                method: 'POST',
                body: formData
            });

            const json = await data.json();

            if (!json.data) {
                throw new Error('Ошибка сервера');
            } else {
                if (req.session.cart) {
                    req.session.cart = [
                        ...req.session.cart,
                        json.data
                    ];
                } else {
                    req.session.cart = [
                        json.data
                    ];
                }

                await req.session.save();

                return res.json(json.data);
            }
        } catch (error) {
            res.json({ message: error.message });
        }
    } else {
        if (req.session.cart) {
            req.session.cart = [
                ...req.session.cart,
                JSON.parse(body)
            ];
        } else {
            req.session.cart = [
                JSON.parse(body)
            ];
        }


        await req.session.save();

        return res.json(JSON.parse(body));
    }

}