import { useSelector } from 'react-redux';

const About = () => {
  const Auth = useSelector((state) => state.Auth);
  console.log(Auth);
  return (
    <div>
      <h1>About page</h1>
    </div>
  );
};

export default About;
