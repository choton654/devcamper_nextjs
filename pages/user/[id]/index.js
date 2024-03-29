import Link from 'next/link';
import Router from 'next/router';
import { loadUser } from '../../../redux/actions/authActions';
import { getOneUser } from '../../../redux/actions/userActions';
import { BASE_URL } from '../../../utils/baseurl';

const OneUser = ({ user, id }) => {
  return (
    <div>
      {user ? <h1>{user.data.name}</h1> : <h3>loading...</h3>}
      <Link href={`/user/${id}/update`}>
        <a>Update user details</a>
      </Link>
    </div>
  );
};

OneUser.getInitialProps = async (ctx) => {
  let role;

  const token = ctx.req?.cookies.token || ctx.store.getState().Auth.token;

  const {
    query: { id },
  } = ctx;

  if (token) {
    // ****** need to sent token from server to api ******
    await ctx.store.dispatch(loadUser(token));
    await ctx.store.dispatch(getOneUser(id, token));
    role = ctx.store.getState().Auth.user.role;
  }

  console.log(role);

  const { user } = ctx.store.getState().Users;

  // client side route protection
  if (!token && !ctx.req) {
    Router.replace('/login');
    return {};
  } else if (role !== 'admin' && !ctx.req) {
    Router.replace('/');
    return {};
  }

  // server side route protection
  if (!token && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: `${BASE_URL}/login`,
    });
    ctx.res?.end();
    return;
  } else if (role !== 'admin' && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: `${BASE_URL}/login`,
    });
    ctx.res?.end();
    return;
  }

  return { user, id };
};

export default OneUser;
