import Link from 'next/link';
import { getOneUser } from '../../../redux/actions/userActions';

const OneUser = ({ user, id }) => {
  return (
    <div>
      {user ? <h1>{user.data.name}</h1> : <h3>loading...</h3>}
      <Link href={`/user/${id}/update`}>
        <a>Update user details</a>
      </Link>
    </div>
  );
};

OneUser.getInitialProps = async ({ query: { id }, store, req }) => {
  if (req) {
    const { token } = req.cookies;
    console.log(token);
    if (token && id) {
      await store.dispatch(getOneUser(id, token));
    }
  }

  const { user } = store.getState().Users;

  return { user, id };
};

export default OneUser;
