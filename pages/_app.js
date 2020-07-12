import App from 'next/app';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Layout from '../components/Layout';
import { loadUser } from '../redux/actions/authActions';
import { wrapper } from '../redux/store';

function MyApp({ Component, pageProps, token }) {
  // console.log(token);

  const dispatch = useDispatch();
  useEffect(() => {
    if (token) {
      dispatch(loadUser(token));
    }
  }, [token]);
  return (
    <Layout>
      <script src='https://kit.fontawesome.com/3da1a747b2.js'></script>
      <link
        rel='stylesheet'
        href='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css'
        integrity='sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm'
        crossOrigin='anonymous'
      />
      <Component {...pageProps} />
      <script
        src='https://code.jquery.com/jquery-3.2.1.slim.min.js'
        integrity='sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN'
        crossOrigin='anonymous'></script>
      <script
        src='https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js'
        integrity='sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q'
        crossOrigin='anonymous'></script>
      <script
        src='https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js'
        integrity='sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl'
        crossOrigin='anonymous'></script>
    </Layout>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { store } = appContext.ctx;

  let token;
  // verify if req exists(needed for client side routing)
  if (appContext.ctx.req) {
    token = appContext.ctx.req.cookies.token;
    // bring token from req cookies
    if (token) {
      // await fetch('http://localhost:3000/api/v1', {
      //   headers: {
      //     cookie: token,
      //   },
      // });
      await store.dispatch(loadUser(token));
    }

    console.log(store.getState());
  }

  return { ...appProps, token };
};

export default wrapper.withRedux(MyApp);
