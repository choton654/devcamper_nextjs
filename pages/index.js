import Router from 'next/router';

const Home = () => {
  return <h1>Home</h1>;
};

Home.getInitialProps = (ctx) => {
  const { isAuthenticated } = ctx.store.getState().Auth;
  if (ctx.req) {
    console.log(ctx.req.headers.cookie);
  }

  if (!isAuthenticated && !ctx.req) {
    Router.replace('/login');
    return {};
  }
  if (!isAuthenticated && ctx.req) {
    ctx.res.writeHead(302, {
      Location: 'http://localhost:3000/login',
    });
    ctx.res.end();
    return;
  }

  return {};
};

export default Home;
