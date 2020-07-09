import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getCoursesByBootcamp,
  getOneBootcamp,
} from '../../../redux/actions/bootcampActions';

const SingleBootcamp = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const dispatch = useDispatch();
  const { bootcamp, courses, reviews } = useSelector(
    (state) => state.Bootcamps
  );

  useEffect(() => {
    if (id) {
      dispatch(getOneBootcamp(id));
      dispatch(getCoursesByBootcamp(id));
    }
  }, [id]);

  return (
    <div>
      <div classNameName='container'>
        <h1>{bootcamp.name}</h1>
        <div classNameName='container'>
          <h3>Courses</h3>
          {courses.map((course) => (
            <p key={course._id}>{course.title}</p>
          ))}
        </div>
      </div>

      <section className='bootcamp mt-5'>
        <div className='container'>
          <div className='row'>
            {/* <!-- Main col --> */}
            <div className='col-md-8'>
              <h1>DevWorks Bootcamp</h1>
              {/* <!-- Description --> */}
              <p>
                Devworks is a full stack JavaScript Bootcamp located in the
                heart of Boston that focuses on the technologies you need to get
                a high paying job as a web developer
              </p>
              {/* <!-- Avg cost --> */}
              <p className='lead mb-4'>
                Average Course Cost:{' '}
                <span className='text-primary'>$10,000</span>
              </p>
              {/* <!-- Courses --> */}
              <div className='card mb-3'>
                <h5 className='card-header bg-primary text-white'>
                  Front End Web Development
                </h5>
                <div className='card-body'>
                  <h5 className='card-title'>Duration: 8 Weeks</h5>
                  <p className='card-text'>
                    This course will provide you with all of the essentials to
                    become a successful frontend web developer. You will learn
                    to master HTML, CSS and front end JavaScript, along with
                    tools like Git, VSCode and front end frameworks like Vue
                  </p>
                  <ul className='list-group mb-3'>
                    <li className='list-group-item'>Cost: $8,000 USD</li>
                    <li className='list-group-item'>
                      Skill Required: Beginner
                    </li>
                    <li className='list-group-item'>
                      Scholarship Available:{' '}
                      <i className='fas fa-check text-success'></i>{' '}
                    </li>
                  </ul>
                </div>
              </div>

              <div className='card mb-3'>
                <h5 className='card-header bg-primary text-white'>
                  Full Stack Web Development
                </h5>
                <div className='card-body'>
                  <h5 className='card-title'>Duration: 12 Weeks</h5>
                  <p className='card-text'>
                    In this course you will learn full stack web development,
                    first learning all about the frontend with HTML/CSS/JS/Vue
                    and then the backend with Node.js/Express/MongoDB
                  </p>
                  <ul className='list-group mb-3'>
                    <li className='list-group-item'>Cost: $10,000 USD</li>
                    <li className='list-group-item'>
                      Skill Required: Intermediate
                    </li>
                    <li className='list-group-item'>
                      Scholarship Available:{' '}
                      <i className='fas fa-times text-danger'></i>{' '}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* <!-- Sidebar --> */}
            <div className='col-md-4'>
              {/* <!-- Image --> */}
              <img src='img/image_1.jpg' className='img-thumbnail' alt='' />
              {/* <!-- Rating --> */}
              <h1 className='text-center my-4'>
                <span className='badge badge-secondary badge-success rounded-circle p-3'>
                  8.8
                </span>{' '}
                Rating
              </h1>
              {/* <!-- Buttons --> */}
              <Link href={`/bootcamp/${id}/reviews`}>
                <a className='btn btn-dark btn-block my-3'>
                  <i className='fas fa-comments'></i> Read Reviews
                </a>
              </Link>
              <a
                href='add-review.html'
                className='btn btn-light btn-block my-3'>
                <i className='fas fa-pencil-alt'></i> Write a Review
              </a>
              <a
                href='#'
                target='_blank'
                className='btn btn-secondary btn-block my-3'>
                <i className='fas fa-globe'></i> Visit Website
              </a>
              {/* <!-- Map --> */}
              <div id='map' style={{ width: '100%', height: '300px' }}></div>
              {/* <!-- Perks --> */}
              <ul className='list-group list-group-flush mt-4'>
                <li className='list-group-item'>
                  <i className='fas fa-check text-success'></i> Housing
                </li>
                <li className='list-group-item'>
                  <i className='fas fa-check text-danger'></i> Job Assistance
                </li>
                <li className='list-group-item'>
                  <i className='fas fa-times text-success'></i> Job Guarantee
                </li>
                <li className='list-group-item'>
                  <i className='fas fa-check text-success'></i> Accepts GI Bill
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SingleBootcamp;
