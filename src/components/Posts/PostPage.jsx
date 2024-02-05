import { useParams, useNavigate, Link } from "react-router-dom";
import { getPosts } from "../../utils/getposts";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { escapeHTML } from "../../utils/unescape";
import "./PostPage.css";
import "../Loader.css";
import { deletePost } from "../../utils/deletepost";

export default function PostPage() {
  const { postid } = useParams();
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const user = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const postdata = getPosts(postid).then((data) => setPost(data));
  }, []);

  function handleComment(input) {
    return setComment(input);
  }

  if (!post) {
    return <div className="mx-auto square-spin-2"></div>;
  }

  const postText = escapeHTML(post.text);

  return (
    <main className="mx-auto max-w-lg my-8 flex flex-col gap-5">
      {user
        ? user.user.userid === post.user._id && (
            <div>
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  await deletePost(post._id, user);
                  navigate("/posts");
                }}
                className="p-2 bg-rose-700 font-semibold rounded-md m-3 hover:bg-rose-600"
              >
                Delete
              </button>
              <button className="p-2 bg-lime-700  hover:bg-lime-600 font-semibold rounded-md m-3">
                Edit
              </button>
            </div>
          )
        : ""}
      <h1 className="text-4xl">{post.title}</h1>
      <p>
        by{" "}
        <Link to={`/user/${post.user._id}`} className="underline ">
          {post.user.name}
        </Link>
      </p>
      <div
        className="max-w-lg"
        dangerouslySetInnerHTML={{ __html: postText }}
      ></div>
      <Comment comments={post.comments} />
    </main>
  );
}

export function Comment() {
  return (
    <>
      <p>Comments</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <textarea
          className="w-full textarea textarea-bordered p-2"
          placeholder="Add your comment"
          type="text"
          rows={5}
          cols={20}
          name="comment"
          wrap="hard"
          onChange={(e) => handleComment(e)}
        />
        <button className="btn btn-outline">Add</button>
      </form>
    </>
  );
}
