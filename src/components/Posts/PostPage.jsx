import { useParams, useNavigate } from "react-router-dom";
import { getPosts } from "../../utils/getposts";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import { deletePost } from "../../utils/deletepost";

export default function PostPage() {
  const { postid } = useParams();
  const [post, setPost] = useState(null);
  const user = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const postdata = getPosts(postid).then((data) => setPost(data));
  }, []);

  if (!post) {
    return <p> loading ...</p>;
  }

  function unEscape(htmlStr) {
    htmlStr = htmlStr.replace(/&lt;/g, "<");
    htmlStr = htmlStr.replace(/script/g, "scrip");
    htmlStr = htmlStr.replace(/&gt;/g, ">");
    htmlStr = htmlStr.replace(/&quot;/g, '"');
    htmlStr = htmlStr.replace(/&#x27;/g, "'");
    htmlStr = htmlStr.replace(/&#x2F;/g, "/");
    htmlStr = htmlStr.replace(/&amp;/g, "&");
    return htmlStr;
  }

  const postText = unEscape(post.text);

  return (
    <main>
      {user.user.userid === post.user._id && (
        <button
          onClick={async (e) => {
            e.preventDefault();
            await deletePost(post._id, user.token);
            navigate("/posts");
          }}
        >
          Delete
        </button>
      )}
      {console.log(user.user.userid)}
      {console.log(post.user._id)}
      <h1 className="text-4xl">{post.title}</h1>
      <h2 className="text-xl">{post.lede}</h2>
      <p>by {post.user.name}</p>
      <div dangerouslySetInnerHTML={{ __html: postText }}></div>
    </main>
  );
}
