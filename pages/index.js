import { ProtectRoute } from '../components/ProtectRoute';

const Home = () => {
  return <h1>Home</h1>;
};

export default ProtectRoute(Home);
