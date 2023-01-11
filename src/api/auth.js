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
    // console.log("TOKEN?? ", token.token);
    return token.token;
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${baseUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });
    const reply = await response.json();
    // console.log("^^^^^^^^^^^^", reply.token);
    return reply;
  } catch (error) {
    console.error(error);
  }
};

export const fetchMe = async (token) => {
  try {
    const response = await fetch(`${baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log("&&&&&&&&&&&", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
