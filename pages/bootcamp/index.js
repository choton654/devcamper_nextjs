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
      {bootcamps.map((bootcamp) => (
        <h1 key={bootcamp._id}>{bootcamp.name}</h1>
      ))}
      <h1>Bootcamp</h1>
    </div>
  );
};

export default Bootcamp;
