import Link from 'next/link';
import Router from 'next/router';
import { loadUser } from '../../redux/actions/authActions';
import { getCourses } from '../../redux/actions/courseActions';

const Course = ({ courses }) => {
  console.log(courses);
  return (
    <div className='container'>
      <h1>Courses</h1>
      {courses ? (
        courses.data.map((course) => (
          <h3 key={course._id}>
            <Link
              href='/bootcamp/[id]/courses/manage'
              as={`/bootcamp/${course.bootcamp._id}/courses/manage`}>
              <a>{course.title}</a>
            </Link>
          </h3>
        ))
      ) : (
        <h3> loading...</h3>
      )}
    </div>
  );
};

Course.getInitialProps = async (ctx) => {
  let role;

  const token = ctx.req?.cookies.token || ctx.store.getState().Auth.token;

  const {
    query: { id },
  } = ctx;

  if (token) {
    // ****** need to sent token from server to api ******
    await ctx.store.dispatch(loadUser(token));
    await ctx.store.dispatch(getCourses());
    role = ctx.store.getState().Auth.user.data.role;
  }

  console.log(role);

  const { courses } = ctx.store.getState().Courses;

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

  return { courses };
};

export default Course;
