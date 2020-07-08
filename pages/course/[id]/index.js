import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneCourse } from '../../../redux/actions/courseActions';

const SingleCourse = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.Courses);

  useEffect(() => {
    if (id) {
      dispatch(getOneCourse(id));
      // dispatch(loadUser());
    }
  }, [id]);

  return (
    <div className='container'>
      <h1>{course.title}</h1>
    </div>
  );
};

export default SingleCourse;
