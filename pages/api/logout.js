import { withIronSessionApiRoute } from 'iron-session/next';
import { API_URL } from '../../constants';


const sessionOptions = {
    password: 'iftYpLGxLrM42H0Z8g8Ziovqzijqm24b',
    cookieName: 'iron-session',
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    // cookieOptions: {
    //   secure: process.env.NODE_ENV === 'production',
    // },
}

export default withIronSessionApiRoute(logoutRoute, sessionOptions);

async function logoutRoute(req, res) {
    try {
        req.session.user = null;

        await req.session.save();
    } catch (error) {
        res.status(500).json({ message: error.message })
    }

    res.json({
        isLoggedIn: false,
    })
}