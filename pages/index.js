import Cookie from 'js-cookie';
import Router from 'next/router';
import { loadUser } from '../redux/actions/authActions';

const Home = ({ token }) => {
  console.log(token);
  return <h1>Home</h1>;
};

Home.getInitialProps = async (ctx) => {
  const token = Cookie.getJSON('userInfo') || ctx.req?.cookies.token;

  if (token) {
    // ****** need to sent token from server to api ******
    await ctx.store.dispatch(loadUser(token));
  }

  // client side route protection
  if (!token && !ctx.req) {
    Router.replace('/login');
    return {};
  }
  // server side route protection
  if (!token && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: 'http://localhost:3000/login',
    });
    ctx.res?.end();
    return;
  }

  return { token };
};

export default Home;
