export async function post(data, token) {
    const response = await fetch(
      "https://crumbum-api.up.railway.app/posts",
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