import { useContext, useState, useRef } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { post } from "../../utils/post";

export default function PostCreate() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [lede, setLede] = useState("");
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();
  const user = useContext(UserContext);

  function handleTitle(input) {
    return setTitle(input);
  }

  function handleLede(input) {
    return setLede(input);
  }

  console.log(validationError);

  return (
    <main>
      <form
        className="flex flex-col justify-center items-center"
        method="POST"
        onSubmit={async (e) => {
          e.preventDefault();
          post(
            {
              text: value,
              title: title,
              lede: lede,
            },
            user.token
          ).then((data) => {
            if (data.message === "Post created") {
              navigate(`/posts/${data.id}`);
            } else {
              console.log(data);
              setValidationError(data);
            }
          });
        }}
      >
        <div className="w-3/4 grid gap-1">
          {validationError &&
            validationError.errors &&
            validationError.errors.map((error) => {
              return (
                <div className="text-red-600" key={error.path}>
                  {error.msg}
                </div>
              );
            })}
          <div className="flex gap-5 items-center">
            <input
              className="w-full p-2 input input-bordered"
              type="text"
              name="title"
              placeholder="Title *"
              onChange={(e) => handleTitle(e.target.value)}
            />
          </div>
          <div>
            <input
              className="w-full p-2 input input-bordered"
              placeholder="Subtitle"
              type="text"
              name="lede"
              onChange={(e) => handleLede(e.target.value)}
            />
          </div>
          <ReactQuill
            className="min-h-28"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
        <button className="bg-teal-800 hover:bg-teal-600 rounded-md p-2 text-xl text-slate-50 my-20">
          Submit
        </button>
      </form>
    </main>
  );
}
