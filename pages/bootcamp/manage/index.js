import Link from 'next/link';
import { getBootcamps } from '../../../redux/actions/bootcampActions';

const ManageBootcamp = ({ bootcamps }) => {
  return (
    <div>
      {bootcamps ? (
        bootcamps.data.map((bootcamp) => (
          <Link
            href='/bootcamp/manage/[id]'
            as={`/bootcamp/manage/${bootcamp._id}`}>
            <a>
              <h1 key={bootcamp._id}>{bootcamp.name}</h1>
            </a>
          </Link>
        ))
      ) : (
        <h3>loading...</h3>
      )}
    </div>
  );
};

ManageBootcamp.getInitialProps = async ({ store }) => {
  await store.dispatch(getBootcamps());
  const { bootcamps } = store.getState().Bootcamps;

  return { bootcamps };
};

export default ManageBootcamp;
