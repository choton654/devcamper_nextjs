import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneUser } from '../../../redux/actions/userActions';

const OneUser = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.Users);

  useEffect(() => {
    if (id) {
      dispatch(getOneUser(id));
    }
  }, []);
  return (
    <div>
      {user ? <h1>{user.data.name}</h1> : <h3>loading...</h3>}
      <Link href={`/user/${id}/update`}>
        <a>Update user details</a>
      </Link>
    </div>
  );
};

export default OneUser;
