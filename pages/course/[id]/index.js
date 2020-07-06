import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneCourse } from '../../../redux/actions/courseActions';

const SingleCourse = () => {
  const router = useRouter();
  console.log(router.query.id);

  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.Courses);

  useEffect(() => {
    dispatch(getOneCourse(router.query.id));
  }, []);

  return (
    <div className='container'>
      <h1>{course.title}</h1>
    </div>
  );
};

export default SingleCourse;
