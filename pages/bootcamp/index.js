import Link from "next/link";
import { getBootcamps } from "../../redux/actions/bootcampActions";

const Bootcamp = ({ bootcamps }) => {
  return (
    <div>
      {/* <!-- Latest bootcamps --> */}
      <section className="browse my-5">
        <div className="row">
          {/* <!-- Sidebar --> */}
          <div className="col-md-4 px-5 pb-5">
            <div className="card card-body mb-4">
              <h4 className="mb-3">By Location</h4>
              <form>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="miles"
                        placeholder="Miles From"
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        name="zipcode"
                        placeholder="Enter Zipcode"
                      />
                    </div>
                  </div>
                </div>
                <input
                  type="submit"
                  value="Find Bootcamps"
                  className="btn btn-primary btn-block"
                />
              </form>
            </div>

            <h4>Filter</h4>
            <form>
              <div className="form-group">
                <label> Career</label>
                <select className="custom-select mb-2">
                  <option value="any" selected>
                    Any
                  </option>
                  <option value="Web Development">Web Development</option>
                  <option value="Mobile Development">Mobile Development</option>
                  <option value="UI/UX">UI/UX</option>
                  <option value="Data Science">Data Science</option>
                  <option value="Business">Business</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <label> Rating</label>
                <select className="custom-select mb-2">
                  <option value="any" selected>
                    Any
                  </option>
                  <option value="9">9+</option>
                  <option value="8">8+</option>
                  <option value="7">7+</option>
                  <option value="6">6+</option>
                  <option value="5">5+</option>
                  <option value="4">4+</option>
                  <option value="3">3+</option>
                  <option value="2">2+</option>
                </select>
              </div>

              <div className="form-group">
                <label> Budget</label>
                <select className="custom-select mb-2" defaultValue="">
                  <option value="any" selected>
                    Any
                  </option>
                  <option value="20000">$20,000</option>
                  <option value="15000">$15,000</option>
                  <option value="10000">$10,000</option>
                  <option value="8000">$8,000</option>
                  <option value="6000">$6,000</option>
                  <option value="4000">$4,000</option>
                  <option value="2000">$2,000</option>
                </select>
              </div>
              <input
                type="submit"
                value="Find Bootcamps"
                className="btn btn-primary btn-block"
              />
            </form>
          </div>
          {/* <!-- Main col --> */}
          <div className="col-md-8">
            {/* <!-- Bootcamps --> */}
            <div className="container">
              {bootcamps ? (
                bootcamps.data.map((bootcamp) => (
                  <div className="card mb-3" key={bootcamp._id}>
                    <div className="row no-gutters">
                      <div className="col-md-4">
                        <img
                          src={`/uploads/${bootcamp.photo}`}
                          className="card-img"
                          alt="..."
                        />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">
                            <Link href={`/bootcamp/${bootcamp._id}`}>
                              <a>{bootcamp.name}</a>
                            </Link>
                            <span className="float-right badge badge-success">
                              8.8
                            </span>
                          </h5>
                          <span className="badge badge-dark mb-2">
                            {bootcamp.location.city}
                          </span>
                          {bootcamp.careers.map((career) => (
                            <p className="card-text" key={career}>
                              {career}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <h2>loading...</h2>
              )}

              {/* <!-- Pagination --> */}
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Previous
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      3
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

Bootcamp.getInitialProps = async (ctx) => {
  await ctx.store.dispatch(getBootcamps());
  const { bootcamps } = ctx.store.getState().Bootcamps;
  return { bootcamps };
};

export default Bootcamp;
