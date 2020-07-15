import Link from 'next/link';
import Router from 'next/router';
import { useDispatch } from 'react-redux';
import { loadUser } from '../../../../redux/actions/authActions';
import {
  getCoursesByBootcamp,
  getOneBootcamp,
} from '../../../../redux/actions/bootcampActions';
import { deleteCourse } from '../../../../redux/actions/courseActions';
const SingleCourse = ({ userCourses, bootcamp, id, token }) => {
  console.log(userCourses, bootcamp, id);

  const dispatch = useDispatch();

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
                {bootcamp ? (
                  <div className='card mb-3'>
                    <div className='row no-gutters'>
                      <div className='col-md-8'>
                        <div className='card-body'>
                          <div className='col-md-4'>
                            <img
                              src={bootcamp.data.photo}
                              className='card-img-top'
                              alt='...'
                            />
                          </div>
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
                    </div>
                  </div>
                ) : (
                  <h3>loading...</h3>
                )}
                <Link
                  href='/bootcamp/[id]/courses/add'
                  as={`/bootcamp/${id}/courses/add`}>
                  <a className='btn btn-primary btn-block mb-4'>
                    Add Bootcamp Course
                  </a>
                </Link>
                {userCourses ? (
                  userCourses.data.length ? (
                    userCourses.data.map((course) => (
                      <table className='table table-striped' key={course._id}>
                        <thead>
                          <tr>
                            <th scope='col'>Title</th>
                            <th scope='col'></th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>{course.title}</td>
                            <td>
                              <a
                                className='btn btn-secondary'
                                onClick={() =>
                                  Router.push({
                                    pathname: `/bootcamp/${id}/courses/add`,
                                    query: {
                                      _courseId: course._id,
                                      get courseId() {
                                        return this._courseId;
                                      },
                                      set courseId(value) {
                                        this._courseId = value;
                                      },
                                    },
                                  })
                                }>
                                <i className='fas fa-pencil-alt'></i>
                              </a>
                              <button
                                className='btn btn-danger'
                                onClick={() => {
                                  dispatch(deleteCourse(token, course._id)),
                                    Router.reload();
                                }}>
                                <i className='fas fa-times'></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    ))
                  ) : (
                    <div className='card-body'>
                      <h3>You have not yet added any courses</h3>
                    </div>
                  )
                ) : (
                  <h3>loading...</h3>
                )}
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

  const token = ctx.req?.cookies.token || ctx.store.getState().Auth.token;

  const {
    query: { id },
  } = ctx;

  if (token) {
    // ****** need to sent token from server to api ******
    await ctx.store.dispatch(loadUser(token));
    await ctx.store.dispatch(getCoursesByBootcamp(id));
    await ctx.store.dispatch(getOneBootcamp(id));
    role = ctx.store.getState().Auth.user.data.role;
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

  return { userCourses, bootcamp, id, token };
};

export default SingleCourse;
