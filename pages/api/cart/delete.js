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

    const { basket_id } = JSON.parse(body);

    if (req.session.user) {
        const formData = new URLSearchParams();
        formData.append('user_id', req.session.user.user.id);
        formData.append('basket_id', basket_id);

        try {
            const data = await fetch(`${API_URL}/api/cart/delete`, {
                method: 'POST',
                body: formData
            });

            const json = await data.json();

            if (!json.data) {
                throw new Error('Ошибка сервера');
            } else {
                if (req.session.cart) {
                    req.session.cart = req.session.cart.filter(item => Number(item.ID) !== Number(basket_id));
                } else {
                    req.session.cart = [];
                }

                await req.session.save();

                return res.json(json.data);
            }
        } catch (error) {
            res.json({ message: error.message });
        }
    } else {
        if (req.session.cart) {
            req.session.cart = req.session.cart.filter(item => Number(item.ID) !== Number(basket_id));
        } else {
            req.session.cart = [];
        }


        await req.session.save();

        return res.json(true);
    }

}