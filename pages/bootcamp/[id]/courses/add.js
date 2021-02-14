import Link from "next/link";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { loadUser } from "../../../../redux/actions/authActions";
import { getOneBootcamp } from "../../../../redux/actions/bootcampActions";
import {
  createCourse,
  updateCourse,
} from "../../../../redux/actions/courseActions";
import { BASE_URL } from "../../../../utils/baseurl";

const AddCourse = ({ bootcamp, id, token, courseId }) => {
  console.log(courseId);

  const optionMinimumSkill = [
    { label: "beginner", value: "beginner" },
    { label: "intermediate", value: "intermediate" },
    { label: "advanced", value: "advanced" },
  ];

  const [course, setCourse] = useState({
    title: "",
    weeks: 0,
    tuition: 0,
    description: "",
  });

  const [scholarshipAvailable, setScholarshipAvailable] = useState(false);

  const [minimumSkill, setMinimumSkill] = useState({});

  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSubmit && courseId) {
      dispatch(
        updateCourse(
          {
            ...course,
            scholarshipAvailable,
            minimumSkill: minimumSkill.value,
          },
          token,
          courseId
        )
      );
      return;
    }
    if (isSubmit) {
      dispatch(
        createCourse(
          {
            ...course,
            scholarshipAvailable,
            minimumSkill: minimumSkill.value,
          },
          token,
          id
        )
      );
      return;
    }
  }, [isSubmit, id, courseId]);

  const handelCahange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...course,
      scholarshipAvailable,
      minimumSkill: minimumSkill.value,
    });
    setIsSubmit(true);
  };

  return (
    <section className="container mt-5">
      <div className="row">
        <div className="col-md-8 m-auto">
          <div className="card bg-white py-2 px-4">
            <div className="card-body">
              <Link
                href="/bootcamp/[id]/courses/manage"
                as={`/bootcamp/${id}/courses/manage`}
              >
                <a className="btn btn-link text-secondary my-3">
                  <i className="fas fa-chevron-left"></i> Manage Courses
                </a>
              </Link>
              {bootcamp ? (
                <h1 className="mb-2">{bootcamp.data.name}</h1>
              ) : (
                <h3>loading...</h3>
              )}
              <h3 className="text-primary mb-4">
                {courseId ? "Update Course" : "Add course"}
              </h3>
              <form onSubmit={handelSubmit}>
                <div className="form-group">
                  <label>Course Title</label>
                  <input
                    type="text"
                    onChange={handelCahange}
                    value={course.title}
                    name="title"
                    className="form-control"
                    placeholder="Title"
                  />
                </div>
                <div className="form-group">
                  <label>Weeks</label>
                  <input
                    type="number"
                    onChange={handelCahange}
                    value={course.weeks}
                    name="weeks"
                    placeholder="weeks"
                    className="form-control"
                  />
                  <small className="form-text text-muted">
                    Enter number of weeks course lasts
                  </small>
                </div>
                <div className="form-group">
                  <label>Course Tuition</label>
                  <input
                    type="number"
                    onChange={handelCahange}
                    value={course.tuition}
                    name="tuition"
                    placeholder="Tuition"
                    className="form-control"
                  />
                  <small className="form-text text-muted">USD Currency</small>
                </div>
                <div className="form-group">
                  <label>Minimum Skill Required</label>
                  <Select
                    onChange={setMinimumSkill}
                    options={optionMinimumSkill}
                  />
                </div>
                <div className="form-group">
                  <textarea
                    type="text"
                    onChange={handelCahange}
                    name="description"
                    value={course.description}
                    rows="5"
                    className="form-control"
                    placeholder="Course description summary"
                    maxLength="500"
                  ></textarea>
                  <small className="form-text text-muted">
                    No more than 500 characters
                  </small>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    onChange={() =>
                      setScholarshipAvailable(!scholarshipAvailable)
                    }
                    value={scholarshipAvailable}
                    name="scholarshipAvailable"
                    id="scholarshipAvailable"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="scholarshipAvailable"
                  >
                    Scholarship Available
                  </label>
                </div>
                <div className="form-group mt-4">
                  <input
                    onClick={() => Router.back()}
                    type="submit"
                    value={courseId ? "Update Course" : "Add course"}
                    className="btn btn-dark btn-block"
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

AddCourse.getInitialProps = async (ctx) => {
  const {
    query: { id, courseId },
  } = ctx;

  let role;

  const token = ctx.req?.cookies.token || ctx.store.getState().Auth.token;

  if (token) {
    // ****** need to sent token from server to api ******
    await ctx.store.dispatch(loadUser(token));
    await ctx.store.dispatch(getOneBootcamp(id));
    role = ctx.store.getState().Auth.user.data.role;
  }

  console.log(role);

  const { bootcamp } = ctx.store.getState().Bootcamps;

  // client side route protection
  if (!token && !ctx.req) {
    Router.replace("/login");
    return {};
  } else if (role !== "admin" && role !== "publisher" && !ctx.req) {
    Router.replace("/");
    return {};
  }

  // server side route protection
  if (!token && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: `${BASE_URL}/login`,
    });
    ctx.res?.end();
    return;
  } else if (role !== "admin" && role !== "publisher" && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: `${BASE_URL}/login`,
    });
    ctx.res?.end();
    return;
  }

  return { bootcamp, id, token, courseId };
};

export default AddCourse;
