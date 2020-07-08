import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/actions/authActions';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();

  const { isAuthenticated } = useSelector((state) => state.Auth);

  useEffect(() => {
    if (isSubmit) {
      dispatch(loginUser(user));
    }
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isSubmit, isAuthenticated]);

  const handelChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
    console.log(user);
  };

  return (
    <section className='form mt-5'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-6 m-auto'>
            <div className='card bg-white p-4 mb-4'>
              <div className='card-body'>
                <h1>
                  <i className='fas fa-sign-in-alt'></i> Login
                </h1>
                <p>
                  Log in to list your bootcamp or rate, review and favorite
                  bootcamps
                </p>
                {isSubmit ? (
                  <h2>loading...</h2>
                ) : (
                  <form onSubmit={handelSubmit}>
                    <div className='form-group'>
                      <label htmlFor='email'>Email Address</label>
                      <input
                        type='email'
                        value={user.email}
                        onChange={handelChange}
                        name='email'
                        className='form-control'
                        placeholder='Enter email'
                        required
                      />
                    </div>
                    <div className='form-group mb-4'>
                      <label htmlFor='password'>Password</label>
                      <input
                        type='password'
                        value={user.password}
                        onChange={handelChange}
                        name='password'
                        className='form-control'
                        placeholder='Enter password'
                        required
                      />
                    </div>
                    <div className='form-group'>
                      <input
                        type='submit'
                        value='Login'
                        className='btn btn-primary btn-block'
                      />
                    </div>
                  </form>
                )}
                <p>
                  {' '}
                  Forgot Password? <a href='/login'>Reset Password</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
