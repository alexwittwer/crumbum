import { useParams } from "react-router-dom";
import { getPosts } from "../../utils/getposts";
import { useEffect, useState } from "react";

export default function PostPage() {
  const postid = useParams();
  const [post, setPost] = useState();

  useEffect(() => {
    const postdata = getPosts(postid).then((data) => setPost(data));
  });

  console.log(postid);
  return <main></main>;
}
