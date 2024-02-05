import { useParams, useNavigate, Link } from "react-router-dom";
import { getPosts } from "../../utils/getposts";
import { postComment } from "../../utils/postcomment";
import { deleteComment } from "../../utils/deletecomment";
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
  const [loading, setLoading] = useState(true);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const postdata = getPosts(postid).then((data) => {
      setPost(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="mx-auto square-spin-2"></div>;
  }

  const postText = escapeHTML(post.text);

  return (
    <main className="mx-auto max-w-lg my-8 flex flex-col gap-5">
      {user
        ? user.user.userid === post.user._id && (
            <div className="flex gap-3">
              <button
                onClick={async (e) => {
                  e.preventDefault();
                  await deletePost(post._id, user);
                  navigate("/posts");
                }}
                className="btn btn-primary font-semibold "
              >
                Delete
              </button>
              <button disabled className="btn btn-disabled font-semibold">
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
      <AddComment post={post} />
      <ShowComments post={post} />
    </main>
  );
}

export function AddComment(post) {
  const [comment, setComment] = useState("");
  const user = useContext(UserContext);
  const navigate = useNavigate();

  function handleComment(input) {
    console.log(comment);
    return setComment(input);
  }

  return (
    <>
      <p>Comments</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await postComment(post, { text: comment }, user.token).then(() =>
            navigate(0)
          );
        }}
        className="flex flex-col  gap-3 items-center"
      >
        <textarea
          className="w-full textarea textarea-bordered p-2"
          placeholder={user ? "Add your comment" : "Login to add a comment"}
          type="text"
          rows={5}
          cols={20}
          name="comment"
          wrap="hard"
          onChange={(e) => handleComment(e.target.value)}
        />
        {user ? (
          <button disabled={user ? false : true} className="btn btn-outline">
            Add
          </button>
        ) : (
          <Link className="btn btn-primary" to={"/login"}>
            Login
          </Link>
        )}
      </form>
    </>
  );
}

export function ShowComments(post) {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      {post.post.comments &&
        post.post.comments.map((comment) => {
          return (
            <div className="flex flex-col gap-3 border-opacity-50 p-3 border-2">
              <Link
                className="underline link-info"
                to={`/user/${comment.user._id}`}
              >
                {comment.user.name}
              </Link>
              <p>{comment.text}</p>
              {user
                ? user.user.userid === comment.user._id && (
                    <div className="flex justify-end my-3 gap-3">
                      <button
                        className=" btn btn-primary font-semibold rounded-md"
                        onClick={async () => {
                          console.log(comment);
                          console.log(post);
                          await deleteComment(
                            post.post._id,
                            comment._id,
                            user
                          ).then(() => {
                            navigate(0);
                          });
                        }}
                      >
                        Delete
                      </button>
                      <button className="btn btn-disabled " disabled>
                        Edit
                      </button>
                    </div>
                  )
                : ""}
            </div>
          );
        })}
    </>
  );
}
