import Link from 'next/link';
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

Course.getInitialProps = async ({ store }) => {
  await store.dispatch(getCourses());

  const { courses } = store.getState().Courses;

  return { courses };
};

export default Course;
