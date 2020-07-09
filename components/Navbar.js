import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/actions/authActions';

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
      <div className='container'>
        <Link href='/'>
          <a className='navbar-brand'>
            <i className='fas fa-laptop-code'></i>Devcamper
          </a>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>

        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item dropdown'>
              <a
                className='nav-link dropdown-toggle'
                href='#'
                id='navbarDropdown'
                role='button'
                data-toggle='dropdown'>
                <i className='fas fa-user'></i> Account
              </a>
              <div className='dropdown-menu'>
                <Link href='/bootcamp/add'>
                  <a className='dropdown-item'>Manage Bootcamps</a>
                </Link>
                <Link href='/review/add'>
                  <a className='dropdown-item'>Manage Reviews</a>
                </Link>
                <Link href='/course/add'>
                  <a className='dropdown-item'>Manage Courses</a>
                </Link>
                <Link href='/user/update'>
                  <a className='dropdown-item'>Manage Account</a>
                </Link>
                <div className='dropdown-divider'></div>
                <Link href='/login'>
                  <a
                    style={{ cursor: 'pointer' }}
                    onClick={() => dispatch(logOut())}
                    className='dropdown-item'>
                    Log out
                  </a>
                </Link>
              </div>
            </li>
            <li className='nav-item'>
              <Link href='/bootcamp'>
                <a className='nav-link'>Browse Bootcamp</a>
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/course'>
                <a className='nav-link'>Course</a>
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/about'>
                <a className='nav-link'>About</a>
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/register'>
                <a className='nav-link'>Sign Up</a>
              </Link>
            </li>
            <li className='nav-item'>
              <Link href='/login'>
                <a className='nav-link'>Sign In</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
