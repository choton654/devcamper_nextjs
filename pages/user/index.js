import Link from 'next/link';
import { getUsers } from '../../redux/actions/userActions';

const Users = ({ users }) => {
  // const { isAuthenticated, token } = useSelector((state) => state.Auth);
  // const { users } = useSelector((state) => state.Users);

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   // if (token) {
  //   // }
  //   dispatch(getUsers());
  // }, []);
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

Users.getInitialProps = async (ctx) => {
  if (ctx.req) {
    const { token } = ctx.req.cookies;
    console.log(token);
    if (token) {
      await ctx.store.dispatch(getUsers(token));
    }
  }

  const { users } = ctx.store.getState().Users;

  return { users };
};

export default Users;
