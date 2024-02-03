import { useContext, useEffect, useState } from "react";
import { UserContext, LoginContext } from "../App";
import { useNavigate } from "react-router-dom";
import { login } from "../../utils/login";

export default function Login() {
  const navigate = useNavigate();
  const [pwd, setPwd] = useState("");
  const [email, setEmail] = useState("");
  const [data, setData] = useState();
  const setUser = useContext(LoginContext);
  const user = useContext(UserContext);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (data) {
      localStorage.setItem("user", JSON.stringify(data));
      setUser(data);
      navigate("/");
    }
  }, [data]);

  function handlePassword(input) {
    return setPwd(input);
  }

  function handleEmail(input) {
    return setEmail(input);
  }

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form
              className="card-body"
              onSubmit={async (e) => {
                e.preventDefault();
                const userLogin = await login({
                  email: email,
                  password: pwd,
                });
                setData(userLogin);
              }}
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                  onChange={(e) => handleEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  onChange={(e) => handlePassword(e.target.value)}
                />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" disabled={!pwd}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
