import { useContext } from "react";
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
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <details>
              <summary>Menu</summary>
              {!user ? (
                <ul className="p-2 bg-base-100 rounded-t-none">
                  <li>
                    <Link to="/login"> Login </Link>
                  </li>
                  <li>
                    <Link to="/signup">Join</Link>
                  </li>

                  <li>
                    <Link to="/posts">Posts</Link>
                  </li>
                </ul>
              ) : (
                <ul className="p-2 bg-base-100 rounded-t-none">
                  <li>
                    <button
                      onClick={(e) => {
                        logout();
                      }}
                    >
                      Logout
                    </button>
                  </li>
                  <li>
                    <Link to="/posts">Posts</Link>
                  </li>
                  <li>
                    <Link to={`/user/${user.user.userid}`}>Profile</Link>
                  </li>
                  <li>
                    <Link to={"/posts/create"}>Write</Link>
                  </li>
                </ul>
              )}
            </details>
          </li>
        </ul>
      </div>
    </nav>
  );
}
