export async function patch(postid, data, token) {
    const response = await fetch(
      `https://crumbum-api.up.railway.app/posts/${postid}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(data),
      }
    );
    return response.json();
  }