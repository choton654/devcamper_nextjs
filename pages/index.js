import Router from 'next/router';

const Home = () => {
  return <h1>Home</h1>;
};

Home.getInitialProps = ({ store, req, res }) => {
  const { isAuthenticated } = store.getState().Auth;
  if (!isAuthenticated) {
    if (!req) {
      Router.replace('/login');
      return {};
    }
    if (req) {
      res.writeHead(302, {
        Location: 'http://localhost:3000/login',
      });
      res.end();
      return;
    }
  }
  return {};
};

export default Home;
