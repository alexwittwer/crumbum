import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import "./Landing.css";

export default function Landing() {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content text-center">
          <div className="max-w-md flex-col flex gap-5">
            <h1 className="text-5xl hero-text font-bold">
              {user ? "Welcome back" : "Hello there"}
            </h1>
            {user !== null ? (
              <div className="">
                <button
                  className="btn mx-3 btn-primary"
                  onClick={() => {
                    navigate("/posts/create");
                  }}
                >
                  Create a new post
                </button>
                <button
                  className="btn mx-3 btn-primary"
                  onClick={() => {
                    navigate("/posts");
                  }}
                >
                  Browse posts
                </button>
              </div>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => {
                  user !== null
                    ? navigate("/posts/create")
                    : navigate("/signup");
                }}
              >
                Get Started
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
