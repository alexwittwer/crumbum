import { useNavigate, Link } from "react-router-dom";
import { deleteComment } from "../../utils/deletecomment";
import { useContext } from "react";
import { UserContext } from "../App";

export function ShowComments(post) {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <>
      {post.post.comments &&
        post.post.comments.map((comment) => {
          return (
            <div
              key={comment._id}
              className="flex flex-col gap-3 border-opacity-50 p-3 border-2 rounded-lg bg-opacity-55"
            >
              <Link
                className="underline link-info"
                to={`/user/${comment.user._id}`}
              >
                {comment.user.name}
              </Link>
              <p>{comment.text}</p>
              {user
                ? user.user.userid === comment.user._id && (
                    <div className="flex justify-end my-3 gap-3">
                      <button
                        className=" btn btn-primary font-semibold rounded-md"
                        onClick={async () => {
                          await deleteComment(
                            post.post._id,
                            comment._id,
                            user
                          ).then(() => {
                            navigate(0);
                          });
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  )
                : ""}
            </div>
          );
        })}
    </>
  );
}
