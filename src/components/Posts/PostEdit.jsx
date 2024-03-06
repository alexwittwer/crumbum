import { useContext, useState, useRef, useEffect } from "react";
import { UserContext } from "../App";
import { useNavigate, useParams } from "react-router-dom";
import { getPosts } from "../../utils/getposts";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "./PostPage.css";
import { patch } from "../../utils/patch";
import { escapeHTML } from "../../utils/unescape";

export default function PostEdit() {
  const [post, setPost] = useState(null);
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [lede, setLede] = useState("");
  const [loading, setLoading] = useState(true);
  const [error] = useState("");
  const { postid } = useParams();
  const navigate = useNavigate();
  const user = useContext(UserContext);

  useEffect(() => {
    getPosts(postid).then((data) => {
      const fixedText = escapeHTML(data.text);

      setValue(fixedText);
      setTitle(data.title);
      setPost(data);
      setLoading(false);
    });
  }, [postid]);

  if (loading) {
    return <div className="mx-auto square-spin-2"></div>;
  }

  function handleTitle(input) {
    return setTitle(input);
  }

  function handleLede(input) {
    return setLede(input);
  }

  return (
    <main>
      <form
        className="flex my-10 flex-col justify-center items-center"
        method="POST"
        onSubmit={async (e) => {
          e.preventDefault();
          patch(
            postid,
            {
              title: title,
              lede: lede,
              text: value,
            },
            user.token
          ).then(() => {
            navigate(`/posts/${postid}`);
          });
        }}
      >
        <div className="w-3/4 grid gap-1">
          {error &&
            error.err.errors.map((err) => {
              return <div key={err.path}>{err.msg}</div>;
            })}
          <div className="flex gap-5 items-center">
            <input
              className="w-full p-2 input input-bordered"
              type="text"
              defaultValue={post.title}
              name="title"
              placeholder="Title *"
              onChange={(e) => handleTitle(e.target.value)}
            />
          </div>
          <div>
            <input
              className="w-full p-2 input input-bordered"
              placeholder="Subtitle"
              defaultValue={post.lede}
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
