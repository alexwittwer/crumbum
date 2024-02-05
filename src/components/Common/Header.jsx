import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext, LoginContext } from "../App";

export default function Header() {
  const user = useContext(UserContext);
  const setUser = useContext(LoginContext);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("user");
    navigate("/");
    return setUser(null);
  }

  return (
    <nav className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          CrumBum
        </Link>
      </div>
      <ul className="flex gap-3 px-1">
        {!user ? (
          <>
            <li>
              <Link className="btn btn-secondary btn-square" to="/signup">
                Join
              </Link>
            </li>

            <li>
              <Link className="btn btn-accent btn-square" to="/posts">
                Posts
              </Link>
            </li>
          </>
        ) : (
          <>
            <ul className="menu menu-horizontal flex items-center gap-3 px-1">
              <li>
                <Link
                  className="btn py-4 btn-primary hover:bg-cyan-400"
                  to="/posts"
                >
                  View posts
                </Link>
              </li>
              <li>
                <details className="">
                  <summary className="btn py-4 hover:bg-cyan-400 text-center btn-primary">
                    Menu
                  </summary>
                  <ul className="p-2 flex flex-col gap-3 bg-base-100 rounded-t-none">
                    <li>
                      <Link
                        className="btn hover:bg-cyan-300 btn-accent"
                        to={`/user/${user.user.userid}`}
                      >
                        View Profile
                      </Link>
                    </li>
                    <li>
                      <Link
                        className="btn hover:bg-cyan-300 btn-accent"
                        to={"/posts/create"}
                      >
                        Write a post
                      </Link>
                    </li>
                    <li>
                      <button
                        className="btn hover:bg-red-500 hover:text-slate-50 btn-secondary"
                        onClick={(e) => {
                          logout();
                        }}
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </details>
              </li>
            </ul>
          </>
        )}
      </ul>
    </nav>
  );
}
