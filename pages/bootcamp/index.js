import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getBootcamps } from '../../redux/actions/bootcampActions';

const Bootcamp = () => {
  const dispatch = useDispatch();
  const { bootcamps } = useSelector((state) => state.Bootcamps);

  useEffect(() => {
    dispatch(getBootcamps());
  }, []);

  return (
    <div>
      {/* <!-- Latest bootcamps --> */}
      <section class='browse my-5'>
        <div class='container'>
          <div class='row'>
            {/* <!-- Sidebar --> */}
            <div class='col-md-4'>
              <div class='card card-body mb-4'>
                <h4 class='mb-3'>By Location</h4>
                <form>
                  <div class='row'>
                    <div class='col-md-6'>
                      <div class='form-group'>
                        <input
                          type='text'
                          class='form-control'
                          name='miles'
                          placeholder='Miles From'
                        />
                      </div>
                    </div>
                    <div class='col-md-6'>
                      <div class='form-group'>
                        <input
                          type='text'
                          class='form-control'
                          name='zipcode'
                          placeholder='Enter Zipcode'
                        />
                      </div>
                    </div>
                  </div>
                  <input
                    type='submit'
                    value='Find Bootcamps'
                    class='btn btn-primary btn-block'
                  />
                </form>
              </div>

              <h4>Filter</h4>
              <form>
                <div class='form-group'>
                  <label> Career</label>
                  <select class='custom-select mb-2'>
                    <option value='any' selected>
                      Any
                    </option>
                    <option value='Web Development'>Web Development</option>
                    <option value='Mobile Development'>
                      Mobile Development
                    </option>
                    <option value='UI/UX'>UI/UX</option>
                    <option value='Data Science'>Data Science</option>
                    <option value='Business'>Business</option>
                    <option value='Other'>Other</option>
                  </select>
                </div>

                <div class='form-group'>
                  <label> Rating</label>
                  <select class='custom-select mb-2'>
                    <option value='any' selected>
                      Any
                    </option>
                    <option value='9'>9+</option>
                    <option value='8'>8+</option>
                    <option value='7'>7+</option>
                    <option value='6'>6+</option>
                    <option value='5'>5+</option>
                    <option value='4'>4+</option>
                    <option value='3'>3+</option>
                    <option value='2'>2+</option>
                  </select>
                </div>

                <div class='form-group'>
                  <label> Budget</label>
                  <select class='custom-select mb-2'>
                    <option value='any' selected>
                      Any
                    </option>
                    <option value='20000'>$20,000</option>
                    <option value='15000'>$15,000</option>
                    <option value='10000'>$10,000</option>
                    <option value='8000'>$8,000</option>
                    <option value='6000'>$6,000</option>
                    <option value='4000'>$4,000</option>
                    <option value='2000'>$2,000</option>
                  </select>
                </div>
                <input
                  type='submit'
                  value='Find Bootcamps'
                  class='btn btn-primary btn-block'
                />
              </form>
            </div>
            {/* <!-- Main col --> */}
            <div class='col-md-8'>
              {/* <!-- Bootcamps --> */}
              {bootcamps ? (
                bootcamps.data.map((bootcamp) => (
                  <div class='card mb-3' key={bootcamp._id}>
                    <div class='row no-gutters'>
                      <div class='col-md-4'>
                        <img src='img/image_1.jpg' class='card-img' alt='...' />
                      </div>
                      <div class='col-md-8'>
                        <div class='card-body'>
                          <h5 class='card-title'>
                            <a href='bootcamp.html'>
                              <Link href={`/bootcamp/${bootcamp._id}`}>
                                <a>{bootcamp.name}</a>
                              </Link>
                              <span class='float-right badge badge-success'>
                                8.8
                              </span>
                            </a>
                          </h5>
                          <span class='badge badge-dark mb-2'>
                            {bootcamp.location.city}
                          </span>
                          {bootcamp.careers.map((career) => (
                            <p class='card-text'>{career}</p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h2>loading...</h2>
              )}

              {/* <!-- Pagination --> */}
              <nav aria-label='Page navigation example'>
                <ul class='pagination'>
                  <li class='page-item'>
                    <a class='page-link' href='#'>
                      Previous
                    </a>
                  </li>
                  <li class='page-item'>
                    <a class='page-link' href='#'>
                      1
                    </a>
                  </li>
                  <li class='page-item'>
                    <a class='page-link' href='#'>
                      2
                    </a>
                  </li>
                  <li class='page-item'>
                    <a class='page-link' href='#'>
                      3
                    </a>
                  </li>
                  <li class='page-item'>
                    <a class='page-link' href='#'>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Bootcamp;
