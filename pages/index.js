import Link from "next/link";

const Home = ({ token }) => {
  return (
    <div className="landing">
      <div className="dark-overlay landing-inner text-light">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <h1 className="display-3 mb-4">Devcamper Bootcamp</h1>
              <p className="lead">
                Transform your life through education, Get personal learning
                recommendations
              </p>
              <hr />
              <Link href="/register">
                <a className="btn btn-lg btn-info mr-2">Sign Up</a>
              </Link>
              <Link href="/login">
                <a className="btn btn-lg btn-light">Login</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
