import { useContext, useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { getPosts } from "../../utils/getposts";

export default function Posts() {
  const [data, setData] = useState();

  useEffect(() => {
    const postData = getPosts().then((data) => setData(Array.from(data)));
  }, []);

  return (
    <main>
      {data &&
        data.map((individualPostData) => {
          return <Card key={individualPostData.id} data={individualPostData} />;
        })}
      <Outlet />
    </main>
  );
}

function Card(data) {
  return (
    <article>
      <div>
        <h2>{data.data.title}</h2>
        <p>{data.data.user.name}</p>
        <p>{data.data.lede}</p>
        <Link to={`/posts/${data.data._id}`}>Read now</Link>
      </div>
    </article>
  );
}
