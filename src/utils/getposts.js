export async function getPosts(post = "") {
    const response = await fetch(`https://crumbum-api.up.railway.app/posts/${post}` , {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const results = await response.json();
    return results;
  }