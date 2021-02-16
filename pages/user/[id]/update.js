import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getOneUser, updateUser } from "../../../redux/actions/userActions";

const UpdateUser = ({token, user: User }) => {
  const [user, setUser] = useState({
    name: User.name || "",
    email: User.email || "",
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSubmit) {
      dispatch(updateUser(id, user, token));
    }
  }, [isSubmit]);

  const handelChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <h1 className="mb-2">Manage Account</h1>
              <form onSubmit={handelSubmit}>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    onChange={handelChange}
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    value={user.name}
                  />
                </div>
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    onChange={handelChange}
                    name="email"
                    className="form-control"
                    placeholder="Email"
                    value={user.email}
                  />
                </div>
                <div className="form-group">
                  <div className="row">
                    <div className="col-md-6">
                      <input
                        type="submit"
                        value="Save"
                        className="btn btn-success btn-block"
                      />
                    </div>
                    <div className="col-md-6">
                      <Link href={`/user/${id}/updatePassword`}>
                        <a className="btn btn-secondary btn-block">
                          Update Password
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

UpdateUser.getInitialProps = async (ctx) => {
  const token = ctx.req?.cookies.token || ctx.store.getState().Auth.token;

  const {
    query: { id },
  } = ctx;

  if (token) {
    // ****** need to sent token from server to api ******
    await ctx.store.dispatch(getOneUser(id, token));
  }

  const { user } = ctx.store.getState().Users;
  console.log(user);
  
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

  return { user, id, token };
};

export default UpdateUser;
