import { useContext, useEffect, useState } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { getPosts } from "../../utils/getposts";
import { escapeHTML } from "../../utils/unescape";
import "../Loader.css";

export default function Posts() {
  const [data, setData] = useState();

  useEffect(() => {
    const postData = getPosts().then((data) => setData(Array.from(data)));
  }, []);

  if (!data) {
    return <div class="mx-auto square-spin-2"></div>;
  }

  return (
    <main className="grid mx-5 grid-cols-1 gap-5 bg-base-200 my-5 overflow-y-auto">
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
    <article className=" text-slate-50 max-w-72 p-3 rounded-md">
      <Link to={`/posts/${data.data._id}`} className="flex flex-col gap-3">
        <h2 className="text-xl">{data.data.title}</h2>
        <p className="text-slate-200 opacity-80">{data.data.user.name}</p>
        {data.data.lede && <p>{escapeHTML(data.data.lede)}</p>}

        <div className="my-3 border-b-4 border-slate-300"></div>
      </Link>
    </article>
  );
}
