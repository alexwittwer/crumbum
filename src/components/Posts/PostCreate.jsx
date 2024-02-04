import { useContext, useState, useRef } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { post } from "../../utils/post";

export default function PostCreate() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [lede, setLede] = useState("");
  const navigate = useNavigate();
  const user = useContext(UserContext);

  function handleTitle(input) {
    return setTitle(input);
  }

  function handleLede(input) {
    return setLede(input);
  }

  return (
    <main>
      <form
        method="POST"
        onSubmit={async (e) => {
          e.preventDefault();
          console.log(value);
          console.log(title);
          post(
            {
              text: value,
              title: title,
              lede: lede,
            },
            user.token
          ).then((data) => {
            if (data.message === "Post created") {
              navigate("/posts");
            }
          });
        }}
      >
        <label htmlFor="title">Title *</label>
        <input
          type="text"
          name="title"
          onChange={(e) => handleTitle(e.target.value)}
        />
        <label htmlFor="title">Summary *</label>
        <input
          type="text"
          name="lede"
          onChange={(e) => handleLede(e.target.value)}
        />
        <ReactQuill theme="snow" value={value} onChange={setValue} />
        <button>Submit</button>
      </form>
    </main>
  );
}
