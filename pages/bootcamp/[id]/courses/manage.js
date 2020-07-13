import Cookie from 'js-cookie';
import Link from 'next/link';
import Router from 'next/router';
import { loadUser } from '../../../../redux/actions/authActions';
import {
  getCoursesByBootcamp,
  getOneBootcamp,
} from '../../../../redux/actions/bootcampActions';
const SingleCourse = ({ userCourses, bootcamp, id }) => {
  console.log(userCourses, bootcamp, id);
  return (
    <>
      <section className='container mt-5'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <div className='card bg-white py-2 px-4'>
              <div className='card-body'>
                <Link
                  href='/bootcamp/[id]/manage'
                  as={`/bootcamp/${id}/manage`}>
                  <a className='btn btn-link text-secondary my-3'>
                    <i className='fas fa-chevron-left'></i> Manage Bootcamp
                  </a>
                </Link>
                <h1 className='mb-4'>Manage Courses</h1>
                <div className='card mb-3'>
                  <div className='row no-gutters'>
                    <div className='col-md-4'>
                      <img
                        src='img/image_1.jpg'
                        className='card-img'
                        alt='...'
                      />
                    </div>
                    {bootcamp ? (
                      <div className='col-md-8'>
                        <div className='card-body'>
                          <h5 className='card-title'>
                            <a href='bootcamp.html'>
                              {bootcamp.data.name}
                              <span className='float-right badge badge-success'>
                                4.9
                              </span>
                            </a>
                          </h5>
                          <span className='badge badge-dark mb-2'>
                            {bootcamp.data.location.city}
                          </span>
                          {bootcamp.data.careers.map((career) => (
                            <p className='card-text' key={career}>
                              {career}
                            </p>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <h3>loading...</h3>
                    )}
                  </div>
                </div>
                <Link
                  href='/bootcamp/[id]/courses/add'
                  as={`/bootcamp/${id}/courses/add`}>
                  <a className='btn btn-primary btn-block mb-4'>
                    Add Bootcamp Course
                  </a>
                </Link>
                <table className='table table-striped'>
                  <thead>
                    <tr>
                      <th scope='col'>Title</th>
                      <th scope='col'></th>
                    </tr>
                  </thead>
                  <tbody>
                    {userCourses ? (
                      userCourses.data.map((course) => (
                        <tr key={course._id}>
                          <td>{course.title}</td>
                          <td>
                            <Link
                              href='/bootcamp/[id]/courses/add'
                              as={`/bootcamp/${id}/courses/add`}>
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
                      <h3>loading...</h3>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

SingleCourse.getInitialProps = async (ctx) => {
  let role;

  const token = Cookie.getJSON('userInfo') || ctx.req?.cookies.token;

  const {
    query: { id },
  } = ctx;

  if (token) {
    // ****** need to sent token from server to api ******
    await ctx.store.dispatch(loadUser(token));
    await ctx.store.dispatch(getCoursesByBootcamp(id));
    await ctx.store.dispatch(getOneBootcamp(id));
    role = ctx.store.getState().Auth.user.role;
  }

  console.log(role);

  const { userCourses, bootcamp } = ctx.store.getState().Bootcamps;

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

  return { userCourses, bootcamp, id };
};

export default SingleCourse;
