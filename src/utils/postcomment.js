export async function postComment(post, data, token) {
    console.log(post.post._id)
    const response = await fetch(
      `https://crumbum-api.up.railway.app/posts/${post.post._id}/comments`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
      }
    );
    return response.json();
  }