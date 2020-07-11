import Link from 'next/link';
import { useSelector } from 'react-redux';

const ManageBootcamp = () => {
  const { bootcamps } = useSelector((state) => state.Bootcamps);

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

export default ManageBootcamp;
