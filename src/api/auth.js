const baseUrl = "http://fitnesstrac-kr.herokuapp.com/api";

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${baseUrl}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const token = await response.json();
    console.log("TOKEN?? ", token.token);
    return token.token;
  } catch (error) {
    console.error(error);
  }
};
