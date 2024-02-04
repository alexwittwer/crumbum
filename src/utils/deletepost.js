export async function deletePost(id, token) {
    const response = await fetch(
      `https://crumbum-api.up.railway.app/posts/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      }
    );
    return response.json();
  }