import { postComment } from "../../utils/postcomment";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";

export function AddComment(post) {
  const [comment, setComment] = useState("");
  const [validationError, setValidationError] = useState("");
  const user = useContext(UserContext);
  const navigate = useNavigate();

  console.log(validationError);

  function handleComment(input) {
    return setComment(input);
  }

  return (
    <>
      <p>Comments</p>{" "}
      {validationError &&
        validationError.errors.map((error) => {
          return <div key={error.path}>{error.msg}</div>;
        })}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await postComment(post, { text: comment }, user.token).then(
              (data) => {
                if (data.message === "Comment created") {
                  navigate(0);
                } else {
                  setValidationError(data);
                }
              }
            );
          } catch (err) {
            console.log(err);
          }
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
