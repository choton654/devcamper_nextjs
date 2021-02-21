import React, { useState } from "react";
import { useRouter } from "next/router";
import { BASE_URL } from "../../../utils/baseurl";
import axios from "axios";

function ResetPassword() {
  const router = useRouter();

  const [password, setPassword] = useState("");

  const { resetToken: resettoken } = router.query;

  const handelSubmit = async (e) => {
    e.preventDefault();
    console.log(password);
    try {
      const { data } = await axios.put(
        `${BASE_URL}/api/v1/auth/resetpassword/${resettoken}`,
        {password}
      );
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="form mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 m-auto">
            <div className="card bg-white p-4 mb-4">
              <div className="card-body">
                <h1>
                  <i className="fas fa-sign-in-alt"></i> Reset Password
                </h1>
                <form onSubmit={handelSubmit}>
                  <div className="form-group mb-4">
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      name="password"
                      className="form-control"
                      placeholder="Enter password"
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

export default ResetPassword;


 

