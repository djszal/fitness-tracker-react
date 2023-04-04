import axios from 'axios';

const baseUrl = "https://fitnesstrac-kr.herokuapp.com/api";

const getRoutines = async (setRoutines) => {
  try {
    const response = await axios.get(`${baseUrl}/routines`);
    setRoutines(response.data)
  } catch (error) {
    console.error(error);
  }
  // try {
  //   const response = await fetch(`${baseUrl}/routines`);
  //   const data = await response.json();
  //   setRoutines(data);
  // } catch (error) {
  //   console.error(error);
  // }
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
    return data;
  } catch (error) {
    console.error(error);
  }
};

const deleteRoutine = async (token, routineIdToDelete) => {
  try {
    const response = await fetch(`${baseUrl}/routines/${routineIdToDelete}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const reply = await response.json();
    return reply;
  } catch (error) {
    console.error(error);
  }
};

const createNewActivity = async (name, description, token) => {
  try {
    const response = await fetch(`${baseUrl}/activities`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name,
        description,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const attachActivityToRoutine = async ({
  activityId,
  count,
  duration,
  routineId,
  token,
}) => {
  try {
    const parseCount = parseInt(count);
    const parseDur = parseInt(duration);
    const parseAct = parseInt(activityId);
    const response = await fetch(
      `${baseUrl}/routines/${routineId}/activities`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          activityId: parseAct,
          count: parseCount,
          duration: parseDur,
        }),
      }
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

const editActivityCountDur = async ({
  routineActivityIdToEdit,
  editCount,
  editDuration,
  token,
}) => {
  try {
    const parseCount2 = parseInt(editCount);
    const parseDur2 = parseInt(editDuration);
    const response = await fetch(
      `${baseUrl}/routine_activities/${routineActivityIdToEdit}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          count: parseCount2,
          duration: parseDur2,
        }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const deleteActivityFromRoutine = async ({
  routineActivityIdToEdit,
  token,
}) => {
  try {
    const response = await fetch(
      `${baseUrl}/routine_activities/${routineActivityIdToEdit}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export {
  getRoutines,
  getActivities,
  createNewRoutine,
  getRoutinesByUser,
  deleteRoutine,
  createNewActivity,
  attachActivityToRoutine,
  editActivityCountDur,
  deleteActivityFromRoutine,
};
