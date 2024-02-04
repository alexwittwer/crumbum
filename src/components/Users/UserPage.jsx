import { useParams } from "react-router-dom";
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
      <div>
        <p>{profile.name}</p>
        <p>{profile.email}</p>
        <p>{profile.bio}</p>
        <p>{profile.joinDate}</p>
        <p>Posts: </p>
        {profile.posts.map((post) => {
          return <p>{post.title}</p>;
        })}
      </div>
    </main>
  );
}
