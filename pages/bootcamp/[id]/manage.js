import Link from 'next/link';
import Router from 'next/router';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from '../../../redux/actions/authActions';
import {
  bootcampPhotoUpload,
  deleteBootcamp,
  getOneBootcamp,
} from '../../../redux/actions/bootcampActions';

const manage = ({ bootcamp, id, token }) => {
  const dispatch = useDispatch();

  const [photo, setPhoto] = useState(null);

  return (
    <section className='container mt-5'>
      <div className='row'>
        <div className='col-md-8 m-auto'>
          <div className='card bg-white py-2 px-4'>
            <div className='card-body'>
              <Link href='/bootcamp/[id]' as={`/bootcamp/${id}`}>
                <a className='btn btn-link text-secondary my-3'>
                  <i className='fas fa-chevron-left'></i> Bootcamp Info
                </a>
              </Link>
              <h1 className='mb-4'>Manage Bootcamp</h1>
              {bootcamp ? (
                <div className='card mb-3'>
                  <div className='row no-gutters'>
                    <div className='col-md-4'>
                      <img
                        src={bootcamp.data.photo}
                        className='card-img'
                        alt='...'
                      />
                    </div>
                    <div className='col-md-8'>
                      <div className='card-body'>
                        <h5 className='card-title'>
                          <a>{bootcamp.data.name}</a>
                        </h5>
                        <span className='badge badge-dark mb-2'>
                          {bootcamp.data.location.city}
                        </span>
                        {bootcamp.data.careers.map((career) => (
                          <p className='card-text' key={career}>
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

              <form
                className='mb-4'
                onSubmit={(e) => {
                  e.preventDefault();
                  const data = new FormData();
                  data.append('file', photo);
                  console.log(photo);
                  dispatch(bootcampPhotoUpload(id, token, photo));
                }}>
                <div className='form-group'>
                  <div className='custom-file'>
                    <input
                      type='file'
                      onChange={(e) => setPhoto(e.target.files[0])}
                      name='photo'
                      className='custom-file-input'
                      id='photo'
                    />
                    <label className='custom-file-label' htmlFor='photo'>
                      Add Bootcamp Image
                    </label>
                  </div>
                </div>
                <input
                  type='submit'
                  className='btn btn-light btn-block'
                  value='Upload Image'
                />
              </form>
              <a
                className='btn btn-primary btn-block'
                onClick={() =>
                  Router.push({
                    pathname: '/bootcamp/add',
                    query: { id },
                  })
                }>
                Edit Bootcamp Details
              </a>
              <Link
                href='/bootcamp/[id]/courses/manage'
                as={`/bootcamp/${id}/courses/manage`}>
                <a className='btn btn-secondary btn-block'>Manage Courses</a>
              </Link>
              <Link href='/bootcamp/manage'>
                <a
                  className='btn btn-danger btn-block'
                  onClick={() => dispatch(deleteBootcamp(id, token))}>
                  Remove Bootcamp
                </a>
              </Link>
              <p className='text-muted mt-5'>
                * You can only add one bootcamp per account.
              </p>
              <p className='text-muted'>
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

manage.getInitialProps = async (ctx) => {
  let role;

  const {
    query: { id },
  } = ctx;

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
    Router.replace('/login');
    return {};
  } else if (role !== 'admin' && role !== 'publisher' && !ctx.req) {
    Router.replace('/');
    return {};
  }

  // server side route protection
  if (!token && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: 'http://localhost:3000/login',
    });
    ctx.res?.end();
    return;
  } else if (role !== 'admin' && role !== 'publisher' && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: 'http://localhost:3000',
    });
    ctx.res?.end();
    return;
  }

  return { bootcamp, id, token };
};

export default manage;
