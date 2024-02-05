export async function deletePost(id, user) {
    const response = await fetch(
      `https://crumbum-api.up.railway.app/posts/${id}`,
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