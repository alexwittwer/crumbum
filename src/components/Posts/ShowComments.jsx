import { useNavigate, Link } from "react-router-dom";
import { deleteComment } from "../../utils/deletecomment";
import { useContext, useState } from "react";
import { UserContext } from "../App";
import { escapeHTML } from "../../utils/unescape";
import { patchComment } from "../../utils/patchComment";

export function ShowComments(post) {
  const user = useContext(UserContext);

  return (
    <div>
      {post.post.comments &&
        post.post.comments.map((comment) => {
          return (
            <Comment
              key={comment._id}
              post={post}
              comment={comment}
              user={user}
            />
          );
        })}
    </div>
  );
}

function Comment({ post, comment, user }) {
  const navigate = useNavigate();
  const [edit, setEdit] = useState(false);

  function toggleEdit() {
    return setEdit(!edit);
  }

  if (edit) {
    return (
      <EditComment
        commentText={comment.text}
        commentid={comment._id}
        user={user}
        post={post}
        toggleEdit={toggleEdit}
      />
    );
  }

  return (
    <div className="flex flex-col my-3 gap-3 border-opacity-50 p-3 border-2 rounded-lg bg-opacity-55">
      <Link className="underline link-info" to={`/user/${comment.user._id}`}>
        {comment.user.name}
      </Link>
      <p>{escapeHTML(comment.text)}</p>
      {user
        ? (user.user.isAdmin || user.user.userid === comment.user._id) && (
          <div className="flex justify-end my-3 gap-3">
            <button
              className=" btn btn-primary font-semibold rounded-md"
              onClick={async () => {
                await deleteComment(post.post._id, comment._id, user).then(
                  () => {
                    navigate(0);
                  }
                );
              }}
            >
              Delete
            </button>
            <button
              className="btn btn-accent"
              onClick={() => {
                toggleEdit();
              }}
            >
              Edit
            </button>
          </div>
        )
        : ""}
    </div>
  );
}

function EditComment({ toggleEdit, commentid, commentText, post, user }) {
  const [comment, setComment] = useState(escapeHTML(commentText));
  const navigate = useNavigate();

  function handleComment(input) {
    return setComment(input);
  }

  return (
    <div className="my-5">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            await patchComment(
              post,
              commentid,
              { text: comment },
              user.token
            ).then(() => {
              navigate(0);
            });
          } catch (err) {
            console.log(err);
          }
        }}
        className="flex flex-col  gap-3 items-center"
      >
        <textarea
          className="w-full textarea textarea-bordered p-2"
          defaultValue={comment}
          type="text"
          rows={5}
          cols={20}
          name="comment"
          wrap="hard"
          onChange={(e) => {
            handleComment(e.target.value);
          }}
        />
        <div className="flex gap-5">
          <button className="btn btn-outline">Save</button>
          <button
            className="btn btn-outline"
            type="button"
            onClick={() => toggleEdit()}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
