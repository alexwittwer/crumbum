import { Link, useParams } from "react-router-dom";
import { getProfile } from "../../utils/profile";
import { useState, useEffect } from "react";
import { DateTime } from "luxon";

export default function UserPage() {
  const { userid } = useParams();
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProfile(userid).then((data) => {
      setProfile(data);
      setLoading(false);
    });
  }, [userid]);

  if (loading) {
    return <div className="mx-auto square-spin-2"></div>;
  }

  console.log(profile);

  return (
    <main>
      <div className="mx-3 flex flex-col items-center justify-center">
        <p className="text-2xl md:text-7xl">{profile.name}</p>
        <div className="flex flex-col gap-3 my-5">
          <p className="text-center">Joined: {DateTime.fromISO(profile.joinDate).toLocaleString()}</p>
          <p className="text-4xl">Posts:</p>
          {profile &&
            profile.posts.map((post) => {
              return (
                <Link
                  key={post._id}
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
