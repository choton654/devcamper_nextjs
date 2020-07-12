import Link from 'next/link';
import { getReviews } from '../../redux/actions/reviewActions';

const Review = ({ reviews }) => {
  return (
    <div>
      <div className='container'>
        <h1>Reviews</h1>
        {reviews ? (
          reviews.data.map((review) => (
            <h3 key={review._id}>
              <Link href='/review/[id]' as={`/review/${review._id}`}>
                <a> {review.title}</a>
              </Link>
            </h3>
          ))
        ) : (
          <h3>loading...</h3>
        )}
      </div>
    </div>
  );
};

Review.getInitialProps = async ({ store }) => {
  await store.dispatch(getReviews());

  const { reviews } = store.getState().Reviews;

  return { reviews };
};

export default Review;
