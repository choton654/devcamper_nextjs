import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { logOut } from '../redux/actions/authActions';

const Navbar = () => {
  const dispatch = useDispatch();

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-light'>
      <Link href='/'>
        <a className='navbar-brand'>Home</a>
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
        <ul className='navbar-nav m-auto'>
          <li className='nav-item'>
            <Link href='/bootcamp'>
              <a className='nav-link'>Bootcamp</a>
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
          <li className='nav-item'>
            <a
              style={{ cursor: 'pointer' }}
              onClick={() => dispatch(logOut())}
              className='nav-link'>
              Log out
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
