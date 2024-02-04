import { useParams } from "react-router-dom";
import { getPosts } from "../../utils/getposts";
import { useEffect, useState } from "react";

export default function PostPage() {
  const { postid } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const postdata = getPosts(postid).then((data) => setPost(data));
  }, []);

  if (!post) {
    return <p> loading ...</p>;
  }

  function unEscape(htmlStr) {
    htmlStr = htmlStr.replace(/&lt;/g, "<");
    htmlStr = htmlStr.replace(/&gt;/g, ">");
    htmlStr = htmlStr.replace(/&quot;/g, '"');
    htmlStr = htmlStr.replace(/&#x27;/g, "'");
    htmlStr = htmlStr.replace(/&amp;/g, "&");
    return htmlStr;
  }

  return (
    <main>
      <h1>{post.title}</h1>
      <p>{post.lede}</p>
      <p>by {post.user.name}</p>
      <p>{unEscape(post.text)}</p>
    </main>
  );
}
