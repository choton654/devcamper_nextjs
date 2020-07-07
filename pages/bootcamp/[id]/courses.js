import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCoursesByBootcamp } from '../../../redux/actions/bootcampActions';

const SingleBootcampByCourse = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const dispatch = useDispatch();
  const { courses } = useSelector((state) => state.Bootcamps);

  useEffect(() => {
    if (id) {
      dispatch(getCoursesByBootcamp(id));
    }
  }, [id]);

  return (
    <div className='container'>
      {courses.map((course) => (
        <h3 key={course._id}>{course.title}</h3>
      ))}
    </div>
  );
};

export default SingleBootcampByCourse;
