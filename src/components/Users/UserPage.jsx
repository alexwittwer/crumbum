import { Link, useParams } from "react-router-dom";
import { getProfile } from "../../utils/profile";
import { useState, useEffect } from "react";

export default function UserPage() {
  const { userid } = useParams();
  const [profile, setProfile] = useState();
  const [loading, set loading] = useState(true);

  useEffect(() => {
    const prof = getProfile(userid).then((data) => {setProfile(data);
    setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="mx-auto square-spin-2"></div>;
  }

  return (
    <main>
      <div className="mx-3">
        <p>{profile.name}</p>
        <div className="flex flex-col gap-3 my-5">
          <p>Posts</p>
          {profile && profile.posts.map((post) => {
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
