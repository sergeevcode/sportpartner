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

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req, res) {
  const body = await req.body
  const formData = new URLSearchParams();
  formData.append('login', JSON.parse(body).login);
  formData.append('password', JSON.parse(body).password);

  try {
    const data = await fetch(`${API_URL}/api/auth`, {
      method: 'POST',
      body: formData
    });

    const json = await data.json();

    if (json.data && json.data.TYPE && json.data.TYPE === 'ERROR') {
      const user = { isLoggedIn: false, ...json };
      return res.json(user);
    } else if (json.data && json.user) {
      const user = { isLoggedIn: true, user: json.user };
      req.session.user = user;

      await req.session.save();

      return res.json(user);
    }

    res.json({ message: 'Oh, Shit! Its broken!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}