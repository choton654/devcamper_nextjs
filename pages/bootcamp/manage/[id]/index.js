import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOneBootcamp } from '../../../../redux/actions/bootcampActions';

const manage = () => {
  const router = useRouter();
  const { id } = router.query;

  const dispatch = useDispatch();
  const { bootcamp } = useSelector((state) => state.Bootcamps);

  useEffect(() => {
    if (id) {
      dispatch(getOneBootcamp(id));
      // dispatch(getCoursesByBootcamp(id));
      // findUser(reviews, user);
    }
  }, [id]);

  return (
    <section class='container mt-5'>
      <div class='row'>
        <div class='col-md-8 m-auto'>
          <div class='card bg-white py-2 px-4'>
            <div class='card-body'>
              <h1 class='mb-4'>Manage Bootcamp</h1>
              {bootcamp ? (
                <div class='card mb-3'>
                  <div class='row no-gutters'>
                    <div class='col-md-4'>
                      <img src='img/image_1.jpg' class='card-img' alt='...' />
                    </div>
                    <div class='col-md-8'>
                      <div class='card-body'>
                        <h5 class='card-title'>
                          <a>{bootcamp.data.name}</a>
                        </h5>
                        <span class='badge badge-dark mb-2'>
                          {bootcamp.data.location.city}
                        </span>
                        {bootcamp.data.careers.map((career) => (
                          <p class='card-text' key={career}>
                            {career}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <h3>loading...</h3>
              )}

              <form class='mb-4'>
                <div class='form-group'>
                  <div class='custom-file'>
                    <input
                      type='file'
                      name='photo'
                      class='custom-file-input'
                      id='photo'
                    />
                    <label class='custom-file-label' for='photo'>
                      Add Bootcamp Image
                    </label>
                  </div>
                </div>
                <input
                  type='submit'
                  class='btn btn-light btn-block'
                  value='Upload Image'
                />
              </form>
              <a href='add-bootcamp.html' class='btn btn-primary btn-block'>
                Edit Bootcamp Details
              </a>
              <a href='manage-courses.html' class='btn btn-secondary btn-block'>
                Manage Courses
              </a>
              <a href='#' class='btn btn-danger btn-block'>
                Remove Bootcamp
              </a>
              <p class='text-muted mt-5'>
                * You can only add one bootcamp per account.
              </p>
              <p class='text-muted'>
                * You must be affiliated with the bootcamp in some way in order
                to add it to DevCamper.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default manage;
