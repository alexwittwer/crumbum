import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Signup(data) {
  const [pwd, setPwd] = useState("");
  const [confirmPwd, setConfirmPwd] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  async function signup(data) {
    const response = await fetch("https://crumbum-api.up.railway.app/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }

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
              onSubmit={(e) => {
                e.preventDefault();
                console.log({
                  name: username,
                  email: email,
                  bio: "Hello world!",
                  password: pwd,
                });
                signup({
                  name: username,
                  bio: "Hello world!",
                  email: email,
                  password: pwd,
                });
              }}
              method="POST"
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Username</span>
                </label>
                <input
                  type="text"
                  name="username"
                  placeholder="username"
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
              <div className="form-control mt-6">
                <button
                  className="btn btn-primary"
                  disabled={pwd !== confirmPwd || pwd === ""}
                >
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
