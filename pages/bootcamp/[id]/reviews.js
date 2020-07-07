import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviewsByBootcamp } from '../../../redux/actions/bootcampActions';

const ReviewsOfBootcamp = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.Bootcamps);

  useEffect(() => {
    if (id) {
      dispatch(getReviewsByBootcamp(id));
    }
  }, [id]);

  return (
    <div className='container'>
      {reviews.map((review) => (
        <h3 key={review._id}>{review.title}</h3>
      ))}
    </div>
  );
};

export default ReviewsOfBootcamp;
