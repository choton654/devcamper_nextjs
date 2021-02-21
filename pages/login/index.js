import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loginUser } from "../../redux/actions/authActions";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
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
    dispatch(loginUser(user));
    console.log(user);
  };

  return (
    <section className="form mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="card bg-white p-4 mb-4">
              <div className="card-body">
                <h1>
                  <i className="fas fa-sign-in-alt"></i> Login
                </h1>
                <p>
                  Log in to list your bootcamp or rate, review and favorite
                  bootcamps
                </p>
                {error && (
                  <div class="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <form onSubmit={handelSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      value={user.email}
                      onChange={handelChange}
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  <div className="form-group mb-4">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      value={user.password}
                      onChange={handelChange}
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Login"
                      className="btn btn-primary btn-block"
                    />
                  </div>
                </form>

                <p>
                  {" "}
                  Forgot Password? <a href="/user/change-password">Reset Password</a>
                </p>
                <p>
                  {" "}
                  New User? <a href="/register">Sign Up</a>
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
