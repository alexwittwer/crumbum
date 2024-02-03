import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="flex justify-between items-center p-5">
      <ul>
        <li>CrumBum</li>
      </ul>
      <ul className="flex gap-3">
        <li>Home</li>
        <li>Posts</li>
        <li>Users</li>
        <li>Profile</li>
      </ul>
    </nav>
  );
}
