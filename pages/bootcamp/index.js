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
    <div className='container'>
      <h1>Bootcamp</h1>
      {bootcamps.map((bootcamp) => (
        <Link key={bootcamp._id} href={`/bootcamp/${bootcamp._id}`}>
          <a>
            <h3>{bootcamp.name}</h3>
          </a>
        </Link>
      ))}
    </div>
  );
};

export default Bootcamp;
