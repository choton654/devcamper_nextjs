import Link from 'next/link';
import { useRouter } from 'next/router';

const AddReview = () => {
  const router = useRouter();
  const { id } = router.query;
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
              <h1 className='mb-2'>DevWorks Bootcamp</h1>
              <h3 className='text-primary mb-4'>Write a Review</h3>
              <p>
                You must have attended and graduated this bootcamp to review
              </p>
              <form>
                <div className='form-group'>
                  <label> Rating</label>
                  <select className='custom-select mb-2'>
                    <option value='10'>10</option>
                    <option value='9'>9</option>
                    <option value='8'>8</option>
                    <option value='7'>7</option>
                    <option value='6'>6</option>
                    <option value='5'>5</option>
                    <option value='4'>4</option>
                    <option value='3'>3</option>
                    <option value='2'>2</option>
                    <option value='1' selected>
                      1
                    </option>
                  </select>
                </div>
                <div className='form-group'>
                  <input
                    type='text'
                    name='title'
                    className='form-control'
                    placeholder='Review title'
                  />
                </div>
                <div className='form-group'>
                  <textarea
                    name='review'
                    rows='10'
                    className='form-control'
                    placeholder='Your review'></textarea>
                </div>
                <div className='form-group'>
                  <Link href='/bootcamp'>
                    <input
                      type='submit'
                      value='Submit Review'
                      className='btn btn-dark btn-block'
                    />
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddReview;
