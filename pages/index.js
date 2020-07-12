import { ProtectRoute } from '../components/ProtectRoute';
const Home = () => {
  return <h1>Home</h1>;
};

// Home.getInitialProps = async (ctx) => {
//   const { isAuthenticated, token } = ctx.store.getState().Auth;

//   if (!isAuthenticated && !ctx.req) {
//     Router.replace('/login');
//     return {};
//   }
//   if (!isAuthenticated && ctx.req) {
//     ctx.res.writeHead(302, {
//       Location: '/login',
//     });
//     ctx.res.end();
//     return;
//   }

//   return {};
// };

export default ProtectRoute(Home);
