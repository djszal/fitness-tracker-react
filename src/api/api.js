const baseUrl = "http://fitnesstrac-kr.herokuapp.com/api";

const getRoutines = async (setRoutines) => {
  try {
    const response = await fetch(`${baseUrl}/routines`);
    const data = await response.json();
    // console.log(`getRoutines API Call `, data);
    setRoutines(data);
  } catch (error) {
    console.error(error);
  }
};

const getUserRoutinesWithAuth = async (setRoutines, token) => {
  var myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTYyLCJ1c2VybmFtZSI6IkNoZWxzZWEiLCJpYXQiOjE2NzM0NTQ0NTAsImV4cCI6MTY3NDA1OTI1MH0.kRVlfyb-tY85goULR21E59KIRSl8Vp2TvVEOtQsW-VQ"
  );

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "http://fitnesstrac-kr.herokuapp.com/api/users/Chelsea/routines",
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

const getActivities = async (setActivities) => {
  try {
    const response = await fetch(`${baseUrl}/activities`);
    const data = await response.json();
    setActivities(data);
  } catch (error) {
    console.error(error);
  }
};

const createNewRoutine = async (name, goal, isPublic, token) => {
  try {
    const response = await fetch(`${baseUrl}/routines`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        goal,
        isPublic,
      }),
    });
    const data = await response.json();
    console.log("YYYYYYYYYYYY", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

const getRoutinesByUser = async (token, username) => {
  try {
    const response = await fetch(`${baseUrl}/users/${username}/routines`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    console.log(`getUserRoutines API Call `, data);
    // setRoutines(data);
  } catch (error) {
    console.error(error);
  }
};

export { getRoutines, getActivities, createNewRoutine, getRoutinesByUser };
