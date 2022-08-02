import { withIronSessionApiRoute } from 'iron-session/next'

const sessionOptions = {
    password: 'iftYpLGxLrM42H0Z8g8Ziovqzijqm24b',
    cookieName: 'iron-session',
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    // cookieOptions: {
    //   secure: process.env.NODE_ENV === 'production',
    // },
}

export default withIronSessionApiRoute(userRoute, sessionOptions);

async function userRoute(req, res) {
    if (req.session.user) {
        res.json({
            ...req.session.user,
            isLoggedIn: true,
        })
    } else {
        res.json({
            isLoggedIn: false,
        })
    }
}