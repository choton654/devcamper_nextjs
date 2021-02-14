import Link from 'next/link';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from '../../../../redux/actions/authActions';
import { getOneBootcamp } from '../../../../redux/actions/bootcampActions';
import { createReview } from '../../../../redux/actions/reviewActions';
import { BASE_URL } from '../../../../utils/baseurl';
const AddReview = ({ bootcamp, id, token }) => {
  const [review, setReview] = useState({
    title: '',
    text: '',
    rating: '',
  });

  const [isSubmit, setIsSubmit] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSubmit) {
      dispatch(createReview(id, review, token));
    }
  }, [isSubmit]);

  const handelSubmit = (e) => {
    e.preventDefault();
    setIsSubmit(true);
  };

  const handelChange = (e) => {
    setReview({
      ...review,
      [e.target.name]: e.target.value,
    });
  };

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
              {bootcamp ? (
                <h1 className='mb-2'>{bootcamp.data.name}</h1>
              ) : (
                <h3>loading...</h3>
              )}

              <h3 className='text-primary mb-4'>Write a Review</h3>
              <p>
                You must have attended and graduated this bootcamp to review
              </p>
              <form onSubmit={handelSubmit}>
                <div className='form-group'>
                  <label> Rating</label>
                  <select
                    className='custom-select mb-2'
                    name='rating'
                    defaultValue={review.rating}
                    onChange={handelChange}>
                    <option value='10'>10</option>
                    <option value='9'>9</option>
                    <option value='8'>8</option>
                    <option value='7'>7</option>
                    <option value='6'>6</option>
                    <option value='5'>5</option>
                    <option value='4'>4</option>
                    <option value='3'>3</option>
                    <option value='2'>2</option>
                    <option value='1'>1</option>
                  </select>
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    name='title'
                    onChange={handelChange}
                    value={review.title}
                    className='form-control'
                    placeholder='Review title'
                  />
                </div>
                <div className='form-group'>
                  <textarea
                    name='text'
                    onChange={handelChange}
                    value={review.text}
                    rows='10'
                    className='form-control'
                    placeholder='Your review'></textarea>
                </div>
                <div className='form-group'>
                  <input
                    type='submit'
                    value='Submit Review'
                    className='btn btn-dark btn-block'
                  />
                  {/* <Link href='/bootcamp'>
                  </Link> */}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

AddReview.getInitialProps = async (ctx) => {
  let role;

  const token = ctx.req?.cookies.token || ctx.store.getState().Auth.token;

  const {
    query: { id },
  } = ctx;

  if (token) {
    // ****** need to sent token from server to api ******
    await ctx.store.dispatch(loadUser(token));
    await ctx.store.dispatch(getOneBootcamp(id));
    role = ctx.store.getState().Auth.user.role;
  }

  console.log(role);

  const { bootcamp } = ctx.store.getState().Bootcamps;

  // client side route protection
  if (!token && !ctx.req) {
    Router.replace('/login');
    return {};
  } else if (role !== 'admin' && role !== 'user' && !ctx.req) {
    Router.replace('/');
    return {};
  }

  // server side route protection
  if (!token && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: `${BASE_URL}/login`,
    });
    ctx.res?.end();
    return;
  } else if (role !== 'admin' && role !== 'user' && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: `${BASE_URL}/login`,
    });
    ctx.res?.end();
    return;
  }

  return { bootcamp, id, token };
};

export default AddReview;
