import { useEffect, useState } from "react";

export default function Posts() {
  const [data, setData] = useState();

  useEffect(() => {
    const postData = posts().then((data) => setData(Array.from(data)));
  }, []);

  async function posts() {
    const response = await fetch("https://crumbum-api.up.railway.app/posts", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const results = await response.json();
    return results;
  }
  return (
    <>
      {data &&
        data.map((individualPostData) => {
          return <Card key={individualPostData.id} data={individualPostData} />;
        })}
    </>
  );
}

function Card(data) {
  console.log(data);
  console.log(data.data.title);
  return (
    <div className="card max-w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{data.data.title}</h2>
        <p>{data.data.user.name}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Read now</button>
        </div>
      </div>
    </div>
  );
}
