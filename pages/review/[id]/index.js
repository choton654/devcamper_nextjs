import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneReview } from '../../../redux/actions/reviewActions';

const OneReview = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const { review } = useSelector((state) => state.Reviews);

  useEffect(() => {
    if (id) {
      dispatch(getOneReview(id));
    }
  }, [id]);
  return (
    <div>{review ? <h1>{review.data.title}</h1> : <h3>loading...</h3>}</div>
  );
};

export default OneReview;
