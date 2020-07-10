import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from '../../redux/actions/userActions';

const Users = () => {
  const { isAuthenticated, token } = useSelector((state) => state.Auth);
  const { users } = useSelector((state) => state.Users);

  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      dispatch(getUsers());
    }
  }, [token]);

  return (
    <div>
      {users ? (
        users.data.map((user) => (
          <div key={user._id}>
            <Link href={`/user/${user._id}`}>
              <a>
                {' '}
                <h3>{user.name}</h3>
              </a>
            </Link>
            <p>{user.email}</p>
          </div>
        ))
      ) : (
        <h1>loading...</h1>
      )}
    </div>
  );
};

export default Users;
