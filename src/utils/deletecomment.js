export async function deleteComment(postid, commentid, user) {
    const response = await fetch(
      `https://crumbum-api.up.railway.app/posts/${postid}/comments/${commentid}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user.token}`
        },
      }
    );
    return response.json();
  }