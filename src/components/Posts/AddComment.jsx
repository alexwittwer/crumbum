import { postComment } from "../../utils/postcomment";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export function AddComment(post) {
  const [comment, setComment] = useState("");
  const user = useContext(UserContext);
  const navigate = useNavigate();

  function handleComment(input) {
    console.log(comment);
    return setComment(input);
  }

  return (
    <>
      <p>Comments</p>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await postComment(post, { text: comment }, user.token).then(() => {
            navigate(0);
          });
        }}
        className="flex flex-col  gap-3 items-center"
      >
        <textarea
          className="w-full textarea textarea-bordered p-2"
          placeholder={user ? "Add your comment" : "Login to add a comment"}
          type="text"
          rows={5}
          cols={20}
          name="comment"
          wrap="hard"
          onChange={(e) => handleComment(e.target.value)}
        />
        {user ? (
          <button disabled={user ? false : true} className="btn btn-outline">
            Add
          </button>
        ) : (
          <Link className="btn btn-primary" to={"/login"}>
            Login
          </Link>
        )}
      </form>
    </>
  );
}
