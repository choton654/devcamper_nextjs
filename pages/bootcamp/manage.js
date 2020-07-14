import Cookie from 'js-cookie';
import Link from 'next/link';
import Router from 'next/router';
import { loadUser } from '../../redux/actions/authActions';
import { getBootcamps } from '../../redux/actions/bootcampActions';
const ManageBootcamp = ({ bootcamps }) => {
  return (
    <div>
      {bootcamps ? (
        bootcamps.data.length ? (
          <>
            {bootcamps.data.map((bootcamp) => (
              <Link
                key={bootcamp._id}
                href='/bootcamp/[id]/manage'
                as={`/bootcamp/${bootcamp._id}/manage`}>
                <a>
                  <h1 key={bootcamp._id}>{bootcamp.name}</h1>
                </a>
              </Link>
            ))}
            <Link href='/bootcamp/add'>
              <a className='btn btn-primary'>Add Bootcamp</a>
            </Link>
          </>
        ) : (
          <section className='container mt-5'>
            <div className='row'>
              <div className='col-md-8 m-auto'>
                <div className='card bg-white py-2 px-4'>
                  <div className='card-body'>
                    <h1 className='mb-2'>Manage Bootcamp</h1>
                    <p className='lead'>You have not yet added a bootcamp</p>
                    <Link href='/bootcamp/add'>
                      <a classNameName='btn btn-primary btn-block'>
                        Add Bootcamp
                      </a>
                    </Link>
                    <p className='text-muted mt-5'>
                      * You can only add one bootcamp per account.
                    </p>
                    <p className='text-muted'>
                      * You must be affiliated with the bootcamp in some way in
                      order to add it to DevCamper.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )
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
