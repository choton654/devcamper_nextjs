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
      <section className='bootcamp mt-5'>
        <div className='container'>
          <div className='row'>
            {/* <!-- Main col --> */}
            <div className='col-md-8'>
              <h1>{bootcamp ? bootcamp.data.name : <h3>loading</h3>}</h1>
              {/* <!-- Description --> */}
              <p>{bootcamp ? bootcamp.data.description : <h3>loading</h3>}</p>
              {/* <!-- Avg cost --> */}
              <p className='lead mb-4'>
                Average Course Cost:{' '}
                <span className='text-primary'>
                  ${bootcamp ? bootcamp.data.averageCost : <h3>loading</h3>}
                </span>
              </p>
              {/* <!-- Courses --> */}
              {courses ? (
                courses.data.map((course) => (
                  <div className='card mb-3' key={course._id}>
                    <h5 className='card-header bg-primary text-white'>
                      {course.title}
                    </h5>
                    <div className='card-body'>
                      <h5 className='card-title'>
                        Duration: {course.weeks} Weeks
                      </h5>
                      <p className='card-text'>{course.description}</p>
                      <ul className='list-group mb-3'>
                        <li className='list-group-item'>
                          Cost: ${course.tuition} USD
                        </li>
                        <li className='list-group-item'>
                          Skill Required: {course.minimumSkill}
                        </li>
                        <li className='list-group-item'>
                          Scholarship Available:
                          {course.scholarshipAvailable ? (
                            <i className='fas fa-check text-success'></i>
                          ) : (
                            <i className='fas fa-times text-danger'></i>
                          )}{' '}
                        </li>
                      </ul>
                    </div>
                  </div>
                ))
              ) : (
                <h3>loading...</h3>
              )}
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
              <Link
                href='/bootcamp/[id]/reviews/add'
                as={`/bootcamp/${id}/reviews/add`}>
                <a className='btn btn-light btn-block my-3'>
                  <i className='fas fa-pencil-alt'></i> Write a Review
                </a>
              </Link>
              <Link href='/'>
                <a target='_blank' className='btn btn-secondary btn-block my-3'>
                  <i className='fas fa-globe'></i> Visit Website
                </a>
              </Link>
              {/* <!-- Map --> */}
              <div id='map' style={{ width: '100%', height: '300px' }}></div>
              {/* <!-- Perks --> */}
              {bootcamp ? (
                <ul className='list-group list-group-flush mt-4'>
                  <li className='list-group-item'>
                    {bootcamp.data.housing ? (
                      <i className='fas fa-check text-success'></i>
                    ) : (
                      <i className='fas fa-check text-danger'></i>
                    )}{' '}
                    Housing
                  </li>
                  <li className='list-group-item'>
                    {bootcamp.data.jobAssistance ? (
                      <i className='fas fa-check text-success'></i>
                    ) : (
                      <i className='fas fa-check text-danger'></i>
                    )}{' '}
                    Job Assistance
                  </li>
                  <li className='list-group-item'>
                    {bootcamp.data.jobGuarantee ? (
                      <i className='fas fa-check text-success'></i>
                    ) : (
                      <i className='fas fa-check text-danger'></i>
                    )}{' '}
                    Job Guarantee
                  </li>
                  <li className='list-group-item'>
                    {bootcamp.data.acceptGi ? (
                      <i className='fas fa-check text-success'></i>
                    ) : (
                      <i className='fas fa-check text-danger'></i>
                    )}{' '}
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

SingleBootcamp.getInitialProps = () => {
  return {};
};

export default SingleBootcamp;
