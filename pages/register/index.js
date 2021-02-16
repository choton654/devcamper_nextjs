import Router from "next/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearError, registerUser } from "../../redux/actions/authActions";

const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [role, setrole] = useState(["user", "publisher"]);

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
    dispatch(registerUser(user));
  };
  return (
    <section className="form mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="card bg-white p-4 mb-4">
              <div className="card-body">
                <h1>
                  <i className="fas fa-user-plus"></i> Register
                </h1>
                {error && (
                  <div class="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                <form onSubmit={handelSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      value={user.name}
                      onChange={handelChange}
                      name="name"
                      className="form-control"
                      placeholder="Enter full name"
                      required
                    />
                  </div>
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
                  <div className="form-group">
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
                  <div className="form-group mb-4">
                    <label htmlFor="password2">Confirm Password</label>
                    <input
                      type="password"
                      value={user.confirmPassword}
                      onChange={handelChange}
                      name="confirmPassword"
                      className="form-control"
                      placeholder="Confirm password"
                      required
                    />
                  </div>
                  <div className="card card-body mb-3">
                    <h5>User Role</h5>
                    {role.map((r) => (
                      <div className="form-check" key={r}>
                        <input
                          className="form-check-input"
                          type="radio"
                          name="role"
                          value={r}
                          onChange={handelChange}
                        />
                        <label className="form-check-label">{r}</label>
                      </div>
                    ))}
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      value="Register"
                      className="btn btn-primary btn-block"
                    />
                  </div>
                </form>
                <p>
                  {" "}
                  Already have account? <a href="/login">Log In</a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
