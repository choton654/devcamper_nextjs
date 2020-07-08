import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCourses } from '../../redux/actions/courseActions';

const Course = () => {
  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.Courses);

  useEffect(() => {
    // dispatch(loadUser());
    dispatch(getCourses());
  }, []);

  return (
    <div className='container'>
      <h1>Courses</h1>
      {courses.map((course) => (
        <h3 key={course._id}>
          <Link href={`/course/${course._id}`}>
            <a>{course.title}</a>
          </Link>
        </h3>
      ))}
    </div>
  );
};

export default Course;
