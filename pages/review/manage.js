import Cookie from 'js-cookie';
import Router from 'next/router';
import { loadUser } from '../../redux/actions/authActions';

const ManageReviews = () => {
  return (
    <section className='container mt-5'>
      <div className='row'>
        <div className='col-md-8 m-auto'>
          <div className='card bg-white py-2 px-4'>
            <div className='card-body'>
              <h1 className='mb-4'>Manage Reviews</h1>
              <table className='table table-striped'>
                <thead>
                  <tr>
                    <th scope='col'>Bootcamp</th>
                    <th scope='col'>Rating</th>
                    <th scope='col'></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>DevWorks Bootcamp</td>
                    <td>10</td>
                    <td>
                      <a href='add-review.html' className='btn btn-secondary'>
                        <i className='fas fa-pencil-alt'></i>
                      </a>
                      <button className='btn btn-danger'>
                        <i className='fas fa-times'></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>Codemasters</td>
                    <td>7</td>
                    <td>
                      <a href='add-review.html' className='btn btn-secondary'>
                        <i className='fas fa-pencil-alt'></i>
                      </a>
                      <button className='btn btn-danger'>
                        <i className='fas fa-times'></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

ManageReviews.getInitialProps = async (ctx) => {
  let role;

  const token = Cookie.getJSON('userInfo') || ctx.req?.cookies.token;

  if (token) {
    // ****** need to sent token from server to api ******
    await ctx.store.dispatch(loadUser(token));
    role = ctx.store.getState().Auth.user.role;
  }

  console.log(role);

  // client side route protection
  if (!token && !ctx.req) {
    Router.replace('/login');
    return {};
  } else if (role !== 'admin' && role !== 'user' && !ctx.req) {
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
  } else if (role !== 'admin' && role !== 'user' && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: 'http://localhost:3000',
    });
    ctx.res?.end();
    return;
  }

  return {};
};

export default ManageReviews;
