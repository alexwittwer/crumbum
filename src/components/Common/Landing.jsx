import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export default function Landing() {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md flex-col flex gap-5">
            <h1 className="text-5xl font-bold">
              Hello there {user && user.user.email}
            </h1>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/signup")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
