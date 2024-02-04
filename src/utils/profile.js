export async function getProfile(id) { 
    const response = await fetch(`https://crumbum-api.up.railway.app/users/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const results = await response.json();
    return results;
  }