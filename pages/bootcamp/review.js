import Link from 'next/link';
import Router from 'next/router';
import { loadUser } from '../../redux/actions/authActions';
import { getReviews } from '../../redux/actions/reviewActions';

const ManageReviews = ({ reviews }) => {
  console.log(reviews);

  return (
    <div>
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
                    {reviews ? (
                      reviews.data.map((review) => (
                        <tr key={review._id}>
                          <td>{review.bootcamp.name}</td>
                          <td>{review.rating}</td>
                          <td>
                            <Link
                              href='/bootcamp/[id]/reviews/add'
                              as={`/bootcamp/${review.bootcamp._id}/reviews/add`}>
                              <a className='btn btn-secondary'>
                                <i className='fas fa-pencil-alt'></i>
                              </a>
                            </Link>
                            <button className='btn btn-danger'>
                              <i className='fas fa-times'></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <h4>loading...</h4>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

ManageReviews.getInitialProps = async (ctx) => {
  let role;

  const token = ctx.req?.cookies.token || ctx.store.getState().Auth.token;

  if (token) {
    // ****** need to sent token from server to api ******
    await ctx.store.dispatch(loadUser(token));
    await ctx.store.dispatch(getReviews());
    role = ctx.store.getState().Auth.user.data.role;
  }

  const { reviews } = ctx.store.getState().Reviews;
  console.log(reviews);
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

  return { reviews };
};

export default ManageReviews;
