import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../utils/baseurl";

function ChangePass() {
  const [email, setEmail] = useState("");
  const [message, setmessage] = useState("");
  const [error, setError] = useState("");

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(email);
    try {
      const {
        data,
      } = await axios.post(`${BASE_URL}/api/v1/auth/forgotpassword`, { email });
      console.log(data);

      setmessage(data.data);
    } catch (error) {
      console.error(error);
      setError(error.response.data.err);
    }
  };

  return (
    <section className="form mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="card bg-white p-4 mb-4">
              <div className="card-body">
                {error && (
                  <div class="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}
                {message && (
                  <div class="alert alert-success" role="alert">
                    {message}
                  </div>
                )}
                <form onSubmit={handelSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Enter Email Address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                          setEmail(e.target.value);
                          setmessage('');
                          setError('')
                      }}
                      name="email"
                      className="form-control"
                      placeholder="Enter email"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <input
                      type="submit"
                      value="reset"
                      className="btn btn-primary btn-block"
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChangePass;
