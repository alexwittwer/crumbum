import { useParams, useNavigate, Link } from "react-router-dom";
import { getPosts } from "../../utils/getposts";
import { AddComment } from "./AddComment";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { escapeHTML } from "../../utils/unescape";
import "./PostPage.css";
import "../Loader.css";
import { deletePost } from "../../utils/deletepost";
import { DateTime } from "luxon";
import { ShowComments } from "./ShowComments";

export default function PostPage() {
  const { postid } = useParams();
  const [post, setPost] = useState(null);
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
    <main className="mx-3 md:mx-auto max-w-lg my-8 flex flex-col gap-5">
      {user
        ? (user.user.userid === post.user._id || user.user.isAdmin) && (
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
              <Link
                to={`/posts/${post._id}/edit`}
                className="btn btn-secondary font-semibold"
              >
                Edit
              </Link>
            </div>
          )
        : ""}
      <h1 className="text-4xl">{post.title}</h1>
      <p>{DateTime.fromISO(post.date).toLocaleString(DateTime.DATE_MED)}</p>
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
