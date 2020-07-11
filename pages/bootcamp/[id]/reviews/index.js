import Link from 'next/link';
import {
  getOneBootcamp,
  getReviewsByBootcamp,
} from '../../../../redux/actions/bootcampActions';

const ReviewsOfBootcamp = ({ bootcamp, userReviews, id }) => {
  return (
    <div>
      <section className='bootcamp mt-5'>
        <div className='container'>
          <div className='row'>
            {/* <!-- Main col --> */}
            <div className='col-md-8'>
              <Link href={`/bootcamp/${id}`}>
                <a target='_blank' className='btn btn-secondary my-3'>
                  <i className='fas fa-chevron-left'></i> Bootcamp Info
                </a>
              </Link>
              <h1 className='mb-4'>
                {bootcamp ? bootcamp.name : <h3>loading...</h3>} Reviews
              </h1>
              {/* <!-- Reviews --> */}
              {userReviews ? (
                userReviews.data.map((review) => (
                  <div className='card mb-3' key={review._id}>
                    <h5 className='card-header bg-dark text-white'>
                      {review.title}
                    </h5>
                    <div className='card-body'>
                      <h5 className='card-title'>
                        Rating:{' '}
                        <span className='text-success'>{review.rating}</span>
                      </h5>
                      <p className='card-text'>{review.text}</p>
                      <p className='text-muted'>
                        Writtern By {review.user.name}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <h3>loading...</h3>
              )}
            </div>
            {/* <!-- Sidebar --> */}
            <div className='col-md-4'>
              {/* <!-- Rating --> */}
              <h1 className='text-center my-4'>
                <span className='badge badge-secondary badge-success rounded-circle p-3'>
                  8.8
                </span>
                Rating
              </h1>
              {/* <!-- Buttons --> */}
              <Link
                href='/bootcamp/[id]/reviews/add'
                as={`/bootcamp/${id}/reviews/add`}>
                <a className='btn btn-primary btn-block my-3'>
                  <i className='fas fa-pencil-alt'></i> Review This Bootcamp
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

ReviewsOfBootcamp.getInitialProps = async ({ query: { id }, store }) => {
  if (id) {
    await store.dispatch(getReviewsByBootcamp(id));
    await store.dispatch(getOneBootcamp(id));
  }
  const { bootcamp, userReviews } = store.getState().Bootcamps;
  return { bootcamp, userReviews, id };
};

export default ReviewsOfBootcamp;
