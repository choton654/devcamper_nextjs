import Cookie from 'js-cookie';
import Link from 'next/link';
import Router from 'next/router';
import { loadUser } from '../../redux/actions/authActions';
import { getUsers } from '../../redux/actions/userActions';

const Users = ({ users }) => {
  return (
    <div>
      {users ? (
        users.data.map((user) => (
          <div key={user._id}>
            <Link href={`/user/${user._id}`}>
              <a>
                {' '}
                <h3>{user.name}</h3>
              </a>
            </Link>
            <p>{user.email}</p>
          </div>
        ))
      ) : (
        <h1>You are not Authorize</h1>
      )}
    </div>
  );
};

Users.getInitialProps = async (ctx) => {
  let role;

  const token = Cookie.getJSON('userInfo') || ctx.req?.cookies.token;

  if (token) {
    // ****** need to sent token from server to api ******
    await ctx.store.dispatch(loadUser(token));
    await ctx.store.dispatch(getUsers(token));
    role = ctx.store.getState().Auth.user.role;
  }

  console.log(role);

  const { users } = ctx.store.getState().Users;

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
      Location: 'http://localhost:3000/login',
    });
    ctx.res?.end();
    return;
  } else if (role !== 'admin' && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: 'http://localhost:3000',
    });
    ctx.res?.end();
    return;
  }

  return { users };
};

export default Users;
