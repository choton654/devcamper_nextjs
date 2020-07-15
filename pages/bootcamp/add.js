import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Select from 'react-select';
import { loadUser } from '../../redux/actions/authActions';
import {
  createBootcamp,
  updateBootcamp,
} from '../../redux/actions/bootcampActions';

const AddBootcamp = ({ token, id }) => {
  const [bootcamp, setBootcamp] = useState({
    name: '',
    address: '',
    phone: '',
    email: '',
    website: '',
    description: '',
  });

  const [housing, setHousing] = useState(false);
  const [jobAssistance, setJobAssistance] = useState(false);
  const [jobGuarantee, setJobGuarantee] = useState(false);
  const [acceptGi, setAcceptGi] = useState(false);

  const optionCareers = [
    { label: 'Web Development', value: 'Web Development' },
    { label: 'Mobile Development', value: 'Mobile Development' },
    { label: 'UI/UX', value: 'UI/UX' },
    { label: 'Data Science', value: 'Data Science' },
    { label: 'Business', value: 'Business' },
    { label: 'Other', value: 'Other' },
  ];

  const [isSubmit, setIsSubmit] = useState(false);

  const [careers, setCareers] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isSubmit && id) {
      dispatch(
        updateBootcamp(
          id,
          {
            ...bootcamp,
            housing,
            jobAssistance,
            jobGuarantee,
            acceptGi,
            careers: careers.map((career) => career.value),
          },
          token
        )
      );
      return;
    }
    if (isSubmit) {
      dispatch(
        createBootcamp(
          {
            ...bootcamp,
            housing,
            jobAssistance,
            jobGuarantee,
            acceptGi,
            careers: careers.map((career) => career.value),
          },
          token
        )
      );
      return;
    }
  }, [isSubmit, id]);

  const handelChange = (e) => {
    setBootcamp({
      ...bootcamp,
      [e.target.name]: e.target.value,
    });
  };

  const handelSubmit = (e) => {
    e.preventDefault();
    console.log({
      ...bootcamp,
      housing,
      jobAssistance,
      jobGuarantee,
      acceptGi,
      careers: careers.map((career) => career.value),
    });
    setIsSubmit(true);
  };

  return (
    <section className='container mt-5'>
      <h1 className='mb-2'>{id ? 'Update Bootcamp' : 'Add Bootcamp'}</h1>
      <p>
        Important: You must be affiliated with a bootcamp to add to DevCamper
      </p>
      <form onSubmit={handelSubmit}>
        <div className='row'>
          <div className='col-md-6'>
            <div className='card bg-white py-2 px-4'>
              <div className='card-body'>
                <h3>Location & Contact</h3>
                <p className='text-muted'>
                  If multiple locations, use the main or largest
                </p>
                <div className='form-group'>
                  <label>Name</label>
                  <input
                    type='text'
                    name='name'
                    onChange={handelChange}
                    value={bootcamp.name}
                    className='form-control'
                    placeholder='Bootcamp Name'
                    required
                  />
                </div>
                <div className='form-group'>
                  <label>Address</label>
                  <input
                    type='text'
                    name='address'
                    onChange={handelChange}
                    value={bootcamp.address}
                    className='form-control'
                    placeholder='Full Address'
                    required
                  />
                  <small className='form-text text-muted'>
                    Street, city, state, etc
                  </small>
                </div>
                <div className='form-group'>
                  <label>Phone Number</label>
                  <input
                    type='text'
                    name='phone'
                    onChange={handelChange}
                    value={bootcamp.phone}
                    className='form-control'
                    placeholder='Phone'
                  />
                </div>
                <div className='form-group'>
                  <label>Email</label>
                  <input
                    type='email'
                    name='email'
                    onChange={handelChange}
                    value={bootcamp.email}
                    className='form-control'
                    placeholder='Contact Email'
                  />
                </div>
                <div className='form-group'>
                  <label>Website</label>
                  <input
                    type='text'
                    name='website'
                    onChange={handelChange}
                    value={bootcamp.website}
                    className='form-control'
                    placeholder='Website URL'
                  />
                </div>
              </div>
            </div>
          </div>
          <div className='col-md-6'>
            <div className='card bg-white py-2 px-4'>
              <div className='card-body'>
                <h3>Other Info</h3>
                <div className='form-group'>
                  <label>Description</label>
                  <textarea
                    name='description'
                    onChange={handelChange}
                    value={bootcamp.description}
                    rows='5'
                    className='form-control'
                    placeholder='Description (What you offer, etc)'
                    maxLength='500'
                    required></textarea>
                  <small className='form-text text-muted'>
                    No more than 500 characters
                  </small>
                </div>
                <div className='form-group'>
                  <label>Careers</label>
                  <Select
                    onChange={setCareers}
                    options={optionCareers}
                    isMulti
                    isSearchable
                  />
                </div>

                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    name='housing'
                    onChange={() => setHousing(!housing)}
                    value={housing}
                    id='housing'
                  />
                  <label className='form-check-label' htmlFor='housing'>
                    Housing
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    name='jobAssistance'
                    onChange={() => setJobAssistance(!jobAssistance)}
                    value={jobAssistance}
                    id='jobAssistance'
                  />
                  <label className='form-check-label' htmlFor='jobAssistance'>
                    Job Assistance
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    name='jobGuarantee'
                    onChange={() => setJobGuarantee(!jobGuarantee)}
                    value={jobGuarantee}
                    id='jobGuarantee'
                  />
                  <label className='form-check-label' htmlFor='jobGuarantee'>
                    Job Guarantee
                  </label>
                </div>
                <div className='form-check'>
                  <input
                    className='form-check-input'
                    type='checkbox'
                    name='acceptGi'
                    onChange={() => setAcceptGi(!acceptGi)}
                    value={acceptGi}
                    id='acceptGi'
                  />
                  <label className='form-check-label' htmlFor='acceptGi'>
                    Accepts GI Bill
                  </label>
                </div>
                <p className='text-muted my-4'>
                  *After you add the bootcamp, you can add the specific courses
                  offered
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className='form-group'>
          <input
            type='submit'
            value={id ? 'Update Bootcamp' : 'Submit Bootcamp'}
            className='btn btn-success btn-block my-4'
          />
          <a
            className='btn btn-danger btn-block mb-4'
            onClick={() => Router.back()}>
            Cancel
          </a>
        </div>
      </form>
    </section>
  );
};

AddBootcamp.getInitialProps = async (ctx) => {
  let role;

  const {
    query: { id },
  } = ctx;

  const token = ctx.req?.cookies.token || ctx.store.getState().Auth.token;

  if (token) {
    // ****** need to sent token from server to api ******
    await ctx.store.dispatch(loadUser(token));
    role = ctx.store.getState().Auth.user.data.role;
  }

  console.log(role);

  // client side route protection
  if (!token && !ctx.req) {
    Router.replace('/login');
    return {};
  }
  if (role !== 'admin' && role !== 'publisher' && !ctx.req) {
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
  }
  if (role !== 'admin' && role !== 'publisher' && ctx.req) {
    ctx.res?.writeHead(302, {
      Location: 'http://localhost:3000',
    });
    ctx.res?.end();
    return;
  }

  return { token, id };
};

export default AddBootcamp;
