import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearError } from '../../../redux/actions/authActions';
import { updateUserPassword } from '../../../redux/actions/userActions';

const updatePassword = ({id, token}) => {
  const [user, setUser] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();

  const { error } = useSelector((state) => state.Auth);

  const handelChange = (e) => {
    dispatch(clearError());
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    console.log(user, id, token);
    dispatch(updateUserPassword(user, token))
  };

  return (
    <section className='container mt-5'>
      <div className='row'>
        <div className='col-md-8 m-auto'>
          <div className='card bg-white py-2 px-4'>
            <div className='card-body'>
              <h1 className='mb-2'>Update Password</h1>
              {error && (
                  <div class="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
              <form onSubmit={handelSubmit}>
                <div className='form-group'>
                  <label>Current Password</label>
                  <input
                    type='password'
                    onChange={handelChange}
                    name='currentPassword'
                    className='form-control'
                    placeholder='Current Password'
                  />
                </div>
                <div className='form-group'>
                  <label>New Password</label>
                  <input
                    type='password'
                    onChange={handelChange}
                    name='newPassword'
                    className='form-control'
                    placeholder='New Password'
                  />
                </div>
                <div className='form-group'>
                  <label>Confirm New Password</label>
                  <input
                    type='password'
                    onChange={handelChange}
                    name='confirmPassword'
                    className='form-control'
                    placeholder='Confirm New Password'
                  />
                </div>
                <div className='form-group'>
                  <input
                    type='submit'
                    value='Update Password'
                    className='btn btn-dark btn-block'
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

updatePassword.getInitialProps = async (ctx) => {
  const token = ctx.req?.cookies.token || ctx.store.getState().Auth.token;

  const {
    query: { id },
  } = ctx;

  
  // client side route protection
  if (!token && !ctx.req) {
    Router.replace("/login");
    return {};
  }

  // server side route protection
  if (!token && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: `${BASE_URL}/login`,
    });
    ctx.res?.end();
    return;
  }

  return { id, token };
};

export default updatePassword;
