import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../redux/actions/authActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.Auth);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link href="/">
          <a className="navbar-brand">
            <i className="fas fa-laptop-code" />
            {user ? ` ${user.name}` : " Devcamper"}
          </a>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
              >
                <i className="fas fa-user"></i> Account
              </a>
              <div className="dropdown-menu">
                {user && user.role === "publisher" && (
                  <>
                    <Link href="/bootcamp/manage">
                      <a className="dropdown-item">Manage Bootcamps</a>
                    </Link>
                    <Link href="/bootcamp/course">
                      <a className="dropdown-item">Manage Courses</a>
                    </Link>
                  </>
                )}
                {user && user.role === "user" && (
                  <Link href="/bootcamp/review">
                    <a className="dropdown-item">Manage Reviews</a>
                  </Link>
                )}
                {user && user.role === "admin" && (
                  <>
                    <Link href="/bootcamp/manage">
                      <a className="dropdown-item">Manage Bootcamps</a>
                    </Link>
                    <Link href="/bootcamp/course">
                      <a className="dropdown-item">Manage Courses</a>
                    </Link>
                    <Link href="/bootcamp/review">
                      <a className="dropdown-item">Manage Reviews</a>
                    </Link>
                    <Link href="/user">
                      <a className="dropdown-item">Manage Users</a>
                    </Link>
                  </>
                )}
                {user === null && (
                  <a className="dropdown-item">No user found</a>
                )}
              </div>
            </li>
            <li className="nav-item">
              <Link href="/bootcamp">
                <a className="nav-link">Browse Bootcamp</a>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about">
                <a className="nav-link">About</a>
              </Link>
            </li>
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link href="/register">
                    <a className="nav-link">Sign Up</a>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/login">
                    <a className="nav-link">Sign In</a>
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link href="/login">
                  <a onClick={() => dispatch(logOut())} className="nav-link">
                    Log out
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
