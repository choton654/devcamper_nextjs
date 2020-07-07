import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneBootcamp } from '../../../redux/actions/bootcampActions';

const SingleBootcamp = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const dispatch = useDispatch();
  const { bootcamp } = useSelector((state) => state.Bootcamps);

  useEffect(() => {
    if (id) {
      dispatch(getOneBootcamp(id));
    }
  }, [id]);

  return (
    <div className='container'>
      <h1>{bootcamp.name}</h1>
      <Link href={`/bootcamp/${id}/courses`}>
        <a>Get Courses</a>
      </Link>
      <Link href={`/bootcamp/${id}/reviews`}>
        <a>Read Reviews</a>
      </Link>
    </div>
  );
};

export default SingleBootcamp;
