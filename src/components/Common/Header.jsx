import { Link } from "react-router-dom";

export default function Header() {
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
            </details>
          </li>
        </ul>
      </div>
    </nav>
  );
}
