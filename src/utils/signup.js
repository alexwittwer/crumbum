export async function signup(data) {
    const response = await fetch("https://crumbum-api.up.railway.app/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  }