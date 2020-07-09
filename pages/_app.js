import withRedux from 'next-redux-wrapper';
import App from 'next/app';
import { useEffect } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import Layout from '../components/Layout';
import { loadUser } from '../redux/actions/authActions';
import { store } from '../redux/store';

function MyApp({ Component, pageProps }) {
  const { isAuthenticated, token } = useSelector((state) => state.Auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(loadUser());
    }
  }, [token]);
  return (
    <Provider store={store}>
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
    </Provider>
  );
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
MyApp.getInitialProps = async (appContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  // console.log(appContext);
  // const cookie = appContext.req.headers.cookie;

  // const res = await axios.get('http://localhost:3000/api/v1/auth/me', {
  //   headers: { cookie },
  // });

  return { ...appProps };
};

const makeStore = () => store;

export default withRedux(makeStore)(MyApp);
