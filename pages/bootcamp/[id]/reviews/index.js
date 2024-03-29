import Link from "next/link";
import { useSelector } from "react-redux";
import { loadUser } from "../../../../redux/actions/authActions";
import {
  getOneBootcamp,
  getReviewsByBootcamp,
} from "../../../../redux/actions/bootcampActions";

const ReviewsOfBootcamp = ({ bootcamp, userReviews, id, userReviewed }) => {
  const { user } = useSelector((state) => state.Auth);

  return (
    <div>
      <section className="bootcamp mt-5">
        <div className="container">
          <div className="row">
            {/* <!-- Main col --> */}
            <div className="col-md-8">
              <Link href={`/bootcamp/${id}`}>
                <a className="btn btn-secondary my-3">
                  <i className="fas fa-chevron-left"></i> Bootcamp Info
                </a>
              </Link>
              <h1 className="mb-4">
                {bootcamp ? <h3>{bootcamp.data.name}</h3> : <h3>loading...</h3>}{" "}
                Reviews
              </h1>
              {/* <!-- Reviews --> */}
              {userReviews ? (
                userReviews.data.length ? (
                  userReviews.data.map((review) => (
                    <div className="card mb-3" key={review._id}>
                      <div className="d-flex justify-content-between align-items-center bg-dark">
                        <h5 className="card-header text-white">
                          {review.title}
                        </h5>
                        {user ? (
                          user._id === review.user._id ||
                          user.role === "admin" ? (
                            <Link
                              key={bootcamp.data._id}
                              href="/bootcamp/[id]/reviews/add"
                              as={`/bootcamp/${bootcamp.data._id}/reviews/add`}
                            >
                              <a>
                                <div className="pr-3">
                                  <span className="float-right badge badge-success text-white">
                                    <i className="fas fa-pencil-alt" />
                                  </span>
                                </div>
                              </a>
                            </Link>
                          ) : null
                        ) : null}
                      </div>
                      <div className="card-body">
                        <h5 className="card-title">
                          Rating:{" "}
                          <span className="text-success">{review.rating}</span>
                        </h5>
                        <p className="card-text">{review.text}</p>
                        <p className="text-muted">
                          Writtern By {review.user.name}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="card-body">
                    <h3>Someone has not yet added any reviews</h3>
                  </div>
                )
              ) : (
                <h3>loading...</h3>
              )}
            </div>
            {/* <!-- Sidebar --> */}
            <div className="col-md-4">
              {/* <!-- Rating --> */}
              <h1 className="text-center my-4">
                <span className="badge badge-secondary badge-success rounded-circle p-3">
                  8.8
                </span>
                Rating
              </h1>
              {/* <!-- Buttons --> */}

              {user ? (
                user.role !== "publisher" ? (
                  userReviewed ? (
                    <input
                      className="btn btn-danger btn-block my-3"
                      type="button"
                      value="you already reviewed this bootcamp"
                    />
                  ) : (
                    <Link
                      href="/bootcamp/[id]/reviews/add"
                      as={`/bootcamp/${id}/reviews/add`}
                    >
                      <a className="btn btn-primary btn-block my-3">
                        <i className="fas fa-pencil-alt"></i> Review This
                        Bootcamp
                      </a>
                    </Link>
                  )
                ) : null
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

ReviewsOfBootcamp.getInitialProps = async (ctx) => {
  const {
    query: { id },
    store,
  } = ctx;

  let userReviewed = false;

  const token = ctx.req?.cookies.token || ctx.store.getState().Auth.token;

  if (id && token) {
    await store.dispatch(loadUser(token));
    await store.dispatch(getReviewsByBootcamp(id));
    await store.dispatch(getOneBootcamp(id));
  }
  const {
    bootcamp,
    userReviews,
    userReviews: { data },
  } = store.getState().Bootcamps;

  const { user } = store.getState().Auth;

  function findUser(data, user) {
    data.find((review) => {
      if (review.user._id === user._id) {
        userReviewed = true;
      }
    });
  }
  findUser(data, user);

  return { bootcamp, userReviews, id, userReviewed };
};

export default ReviewsOfBootcamp;
