import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LoginContext, UserContext } from "../App";
import { signup } from "../../utils/signup";
import { login } from "../../utils/login";

export default function Signup(data) {
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const setUser = useContext(LoginContext);
  const user = useContext(UserContext);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, []);

  function handlePassword(input) {
    return setPwd(input);
  }

  function handleConfirm(input) {
    return setConfirmPwd(input);
  }

  function handleUsername(input) {
    return setUsername(input);
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
                console.log({
                  name: username,
                  email: email,
                  bio: "Hello world!",
                  password: pwd,
                });
                await signup({
                  name: username,
                  bio: "Hello world!",
                  email: email,
                  password: pwd,
                });
                await login({
                  email: email,
                  password: pwd,
                }).then((data) => setUser(data));

                navigate("/");
              }}
              method="POST"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Full Name</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="John Smith"
                  className="input input-bordered"
                  required
                  onChange={(e) => handleUsername(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
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
                  name="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  onChange={(e) => handlePassword(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  onChange={(e) => handleConfirm(e.target.value)}
                />
              </div>
              <Link className="my-3 text-center text-sm" to={"/login"}>
                Have an account? Login
              </Link>
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  disabled={pwd !== confirmPwd || pwd === ""}
                >
                  Sign-up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
