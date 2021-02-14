import Link from "next/link";
import { loadUser } from "../../../redux/actions/authActions";
import Router from 'next/router';
import {
  getCoursesByBootcamp,
  getOneBootcamp,
  getReviewsByBootcamp,
} from "../../../redux/actions/bootcampActions";
import { BASE_URL } from "../../../utils/baseurl";

const SingleBootcamp = ({ bootcamp, userCourses, id, userReviewed }) => {
  return (
    <div>
      <section className="bootcamp mt-5">
        <div className="container">
          <div className="row">
            {/* <!-- Main col --> */}
            <div className="col-md-8">
              <h1>{bootcamp ? bootcamp.data.name : <h3>loading</h3>}</h1>
              {/* <!-- Description --> */}
              <p>{bootcamp ? bootcamp.data.description : <h3>loading</h3>}</p>
              {/* <!-- Avg cost --> */}
              <p className="lead mb-4">
                Average Course Cost:{" "}
                <span className="text-primary">
                  ${bootcamp ? bootcamp.data.averageCost : <h3>loading</h3>}
                </span>
              </p>
              {/* <!-- Courses --> */}
              {userCourses ? (
                userCourses.data.length ? (
                  userCourses.data.map((course) => (
                    <div className="card mb-3" key={course._id}>
                      <h5 className="card-header bg-primary text-white">
                        {course.title}
                      </h5>
                      <div className="card-body">
                        <h5 className="card-title">
                          Duration: {course.weeks} Weeks
                        </h5>
                        <p className="card-text">{course.description}</p>
                        <ul className="list-group mb-3">
                          <li className="list-group-item">
                            Cost: ${course.tuition} USD
                          </li>
                          <li className="list-group-item">
                            Skill Required: {course.minimumSkill}
                          </li>
                          <li className="list-group-item">
                            Scholarship Available:
                            {course.scholarshipAvailable ? (
                              <i className="fas fa-check text-success"></i>
                            ) : (
                              <i className="fas fa-times text-danger"></i>
                            )}{" "}
                          </li>
                        </ul>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="card-body">
                    <h3>You have not yet added any courses</h3>
                  </div>
                )
              ) : (
                <h3>loading...</h3>
              )}
            </div>
            {/* <!-- Sidebar --> */}
            <div className="col-md-4">
              {/* <!-- Image --> */}
              <img src="img/image_1.jpg" className="img-thumbnail" alt="" />
              {/* <!-- Rating --> */}
              <h1 className="text-center my-4">
                <span className="badge badge-secondary badge-success rounded-circle p-3">
                  8.8
                </span>{" "}
                Rating
              </h1>
              {/* <!-- Buttons --> */}
              <Link href={`/bootcamp/${id}/reviews`}>
                <a className="btn btn-dark btn-block my-3">
                  <i className="fas fa-comments"></i> Read Reviews
                </a>
              </Link>

              {userReviewed ? (
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
                  <a className="btn btn-light btn-block my-3">
                    <i className="fas fa-pencil-alt"></i> Write a Review
                  </a>
                </Link>
              )}

              <a target="_blank" className="btn btn-secondary btn-block my-3">
                <i className="fas fa-globe"></i> Visit Website
              </a>

              {/* <!-- Map --> */}
              <div id="map" style={{ width: "100%", height: "300px" }}></div>
              {/* <!-- Perks --> */}
              {bootcamp ? (
                <ul className="list-group list-group-flush mt-4">
                  <li className="list-group-item">
                    {bootcamp.data.housing ? (
                      <i className="fas fa-check text-success"></i>
                    ) : (
                      <i className="fas fa-check text-danger"></i>
                    )}{" "}
                    Housing
                  </li>
                  <li className="list-group-item">
                    {bootcamp.data.jobAssistance ? (
                      <i className="fas fa-check text-success"></i>
                    ) : (
                      <i className="fas fa-check text-danger"></i>
                    )}{" "}
                    Job Assistance
                  </li>
                  <li className="list-group-item">
                    {bootcamp.data.jobGuarantee ? (
                      <i className="fas fa-check text-success"></i>
                    ) : (
                      <i className="fas fa-check text-danger"></i>
                    )}{" "}
                    Job Guarantee
                  </li>
                  <li className="list-group-item">
                    {bootcamp.data.acceptGi ? (
                      <i className="fas fa-check text-success"></i>
                    ) : (
                      <i className="fas fa-check text-danger"></i>
                    )}{" "}
                    Accepts GI Bill
                  </li>
                </ul>
              ) : (
                <h3>loading...</h3>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

SingleBootcamp.getInitialProps = async (ctx) => {
  let userReviewed = false;
  const {
    query: { id },
    store,
  } = ctx;

  const token = ctx.req?.cookies.token || ctx.store.getState().Auth.token;

  if (token) {
    await store.dispatch(loadUser(token));
  }
  if (id) {
    await store.dispatch(getOneBootcamp(id));
    await store.dispatch(getCoursesByBootcamp(id));
    await store.dispatch(getReviewsByBootcamp(id));
  }

  if (!token && !ctx.req) {
    Router.replace('/login');
    return {};
  }

  if (!token && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: `${BASE_URL}/login`,
    });
    ctx.res?.end();
    return;
  }

  const {
    bootcamp,
    userCourses,
    userReviews: { data },
  } = store.getState().Bootcamps;

  const { user } = store.getState().Auth;

  // console.log(user, data);

  function findUser(data, user) {
    data.find((review) => {
      if (review.user._id === user._id) {
        userReviewed = true;
      }
    });
  }
  findUser(data, user);

  return { bootcamp, userCourses, id, userReviewed };
};

export default SingleBootcamp;
