import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getReviews } from '../../redux/actions/reviewActions';

const Review = () => {
  const dispatch = useDispatch();
  const { reviews } = useSelector((state) => state.Reviews);
  const { isAuthenticated } = useSelector((state) => state.Auth);

  useEffect(() => {
    dispatch(getReviews());
    // if (!isAuthenticated) {
    //   router.push('/login');
    // }
  }, []);

  return (
    <div>
      <div classNameName='container'>
        <h1>Reviews</h1>
        {reviews.map((review) => (
          <h3 key={review._id}>{review.title}</h3>
        ))}
      </div>
    </div>
  );
};

export default Review;
