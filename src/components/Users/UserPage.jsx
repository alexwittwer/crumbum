import { Link, useParams } from "react-router-dom";
import { getProfile } from "../../utils/profile";
import { useState, useEffect } from "react";

export default function UserPage() {
  const { userid } = useParams();
  const [profile, setProfile] = useState();

  useEffect(() => {
    const prof = getProfile(userid).then((data) => setProfile(data));
  }, []);

  if (!profile) {
    return <p>loading ... </p>;
  }

  return (
    <main>
      <div className="mx-3">
        <p>{profile.name}</p>
        <div className="flex flex-col gap-3 my-5">
          <p>Posts</p>
          {profile.posts.map((post) => {
            return (
              <Link
                to={`/posts/${post._id}`}
                className="t text-cyan-500 underline"
              >
                {post.title}
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
