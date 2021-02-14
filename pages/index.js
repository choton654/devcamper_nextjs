import Router from 'next/router';
import { loadUser } from '../redux/actions/authActions';
import { BASE_URL } from '../utils/baseurl';

const Home = ({ token }) => {
  return <h1>Home</h1>;
};

Home.getInitialProps = async (ctx) => {
  const token = ctx.req?.cookies.token || ctx.store.getState().Auth.token;

  if (token) {
    // ****** need to sent token from server to api ******
    await ctx.store.dispatch(loadUser(token));
  }

  // client side route protection
  if (!token && !ctx.req) {
    Router.replace('/login');
    return { token };
  }
  // server side route protection
  if (!token && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: `${BASE_URL}/login`,
    });
    ctx.res?.end();
    return;
  }

  return { token };
};

export default Home;
