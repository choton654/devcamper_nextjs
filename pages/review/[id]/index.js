import { getOneReview } from '../../../redux/actions/reviewActions';

const OneReview = ({ review, id }) => {
  return (
    <div>{review ? <h1>{review.data.title}</h1> : <h3>loading...</h3>}</div>
  );
};

OneReview.getInitialProps = async ({ query: { id }, store }) => {
  if (id) {
    await store.dispatch(getOneReview(id));
  }

  const { review } = store.getState().Reviews;

  return { review, id };
};

export default OneReview;
