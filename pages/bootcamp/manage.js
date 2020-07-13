import Cookie from 'js-cookie';
import Link from 'next/link';
import Router from 'next/router';
import { loadUser } from '../../redux/actions/authActions';
import { getBootcamps } from '../../redux/actions/bootcampActions';
const ManageBootcamp = ({ bootcamps }) => {
  return (
    <div>
      {bootcamps ? (
        bootcamps.data.map((bootcamp) => (
          <Link
            key={bootcamp._id}
            href='/bootcamp/[id]/manage'
            as={`/bootcamp/${bootcamp._id}/manage`}>
            <a>
              <h1 key={bootcamp._id}>{bootcamp.name}</h1>
            </a>
          </Link>
        ))
      ) : (
        <h3>loading...</h3>
      )}
    </div>
  );
};

ManageBootcamp.getInitialProps = async (ctx) => {
  let role;

  const token = Cookie.getJSON('userInfo') || ctx.req?.cookies.token;

  if (token) {
    // ****** need to sent token from server to api ******
    await ctx.store.dispatch(loadUser(token));
    await ctx.store.dispatch(getBootcamps());
    role = ctx.store.getState().Auth.user.role;
  }

  console.log(role);

  const { bootcamps } = ctx.store.getState().Bootcamps;

  // client side route protection
  if (!token && !ctx.req) {
    Router.replace('/login');
    return {};
  } else if (role !== 'admin' && role !== 'publisher' && !ctx.req) {
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
  } else if (role !== 'admin' && role !== 'publisher' && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: 'http://localhost:3000',
    });
    ctx.res?.end();
    return;
  }

  return { bootcamps };
};

export default ManageBootcamp;
