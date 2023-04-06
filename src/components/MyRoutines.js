import React, { useState } from "react";
import { createNewRoutine } from "../api/api";
import "./style/MyRoutines.css";
import {
  deleteRoutine,
  getRoutines,
  attachActivityToRoutine,
  getRoutinesByUser,
  editActivityCountDur,
  deleteActivityFromRoutine,
} from "../api/api";

const MyRoutines = (props) => {
  const [name, setRoutineName] = useState("");
  const [goal, setRoutineGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [stateError, setStateError] = useState("");
  const [activityId, setActivityId] = useState("");
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const [editCount, setEditCount] = useState("");
  const [editDuration, setEditDuration] = useState("");
  const { token, userRoutines, setUserRoutines, setRoutines, userData } = props;
  const act = props.activities;

  const handleEdit = async (routineActivity) => {
    const routineActivityIdToEdit = routineActivity.routineActivityId;
    const activity = {
      routineActivityIdToEdit,
      token,
      editDuration: editDuration ? editDuration : routineActivity.duration,
      editCount: editCount ? editCount : routineActivity.count,
    };
    const result = await editActivityCountDur(activity);
    if (result) {
      const usersRoutines = async () => {
        const routineData = await getRoutinesByUser(token, userData.username);
        console.log("routine data", routineData);
        setUserRoutines(routineData);
      };
      usersRoutines();
    }
  };

  const handleDeleteActivity = async (routineActivity) => {
    const routineActivityIdToEdit = routineActivity.routineActivityId;
    const activity = {
      routineActivityIdToEdit,
      token,
    };
    const result = await deleteActivityFromRoutine(activity);
    if (result) {
      const usersRoutines = async () => {
        const routineData = await getRoutinesByUser(token, userData.username);
        console.log("routine data", routineData);
        setUserRoutines(routineData);
      };
      usersRoutines();
    }
  };

  const handleDelete = async (routineIdToDelete) => {
    const response = await deleteRoutine(token, routineIdToDelete);

    if (response) {
      const newRoutines = userRoutines.filter(
        (routine) => routine.id !== routineIdToDelete
      );
      setUserRoutines(newRoutines);
    }
  };

  const handleAddActivity = async (routineId) => {
    const result = await attachActivityToRoutine({
      activityId,
      count,
      duration,
      routineId,
      token,
    });

    if (result) {
      const usersRoutines = async () => {
        const routineData = await getRoutinesByUser(token, userData.username);
        setUserRoutines(routineData);
      };
      usersRoutines();
    }
  };

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await createNewRoutine(name, goal, isPublic, token);
          if (result.error) {
            const errorMessage = "Routine name already exists";
            setStateError(errorMessage);
          } else {
            const routineData = await getRoutinesByUser(
              token,
              userData.username
            );
            setUserRoutines(routineData);
            getRoutines(setRoutines);
          }
        }}
      >
        <h3>Create a New Routine</h3>
        <input
          name="routine name"
          type="text"
          placeholder="Routine Name"
          value={name}
          onChange={(e) => setRoutineName(e.target.value)}
        />
        <input
          name="description"
          type="text"
          placeholder="Routine Goal"
          value={goal}
          onChange={(e) => setRoutineGoal(e.target.value)}
        />
        <label>
          Public Routine?
          <input
            name="routine-isPublic"
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
          />
        </label>
        <button type="submit" className="create-new-routine-button">
          Create New Routine
        </button>
        {stateError ? <h3>{stateError}</h3> : ""}
      </form>

      <h1>My Routines</h1>

      {userRoutines
        .sort((a, b) => a.id - b.id)
        .map((routine, index) => {
          return (
            <div className="routine-block" key={index}>
              <div className="single-routine">
                <h2 className="routine-name">Routine Name: {routine.name}</h2>
                <h3 className="routine-name">Routine Goal: {routine.goal}</h3>
                <button
                  type="submit"
                  className="delete-button"
                  onClick={() => handleDelete(routine.id)}
                >
                  Delete
                </button>
                <button type="submit" className="edit-button">
                  Edit
                </button>
                <div className="update-routine-activity-block" key={index}>
                  <h2>Activities</h2>

                  {routine.activities
                    .sort((a, b) => a.id - b.id)
                    .map((activity, index) => {
                      return (
                        <div className="activities-block" key={index}>
                          <div className="single-activity">
                            <h2 className="activity-name">
                              Activity Name: {activity.name}
                            </h2>
                            <button
                              type="submit"
                              className="delete-activity-button"
                              onClick={() => handleDeleteActivity(activity)}
                            >
                              Delete Activity
                            </button>
                            <h3 className="activity-name">
                              Activity Description: {activity.description}
                            </h3>
                            <h4 className="activity-count">
                              Activity Count: {activity.count}
                            </h4>
                            <input
                              type="number"
                              placeholder="Update Activity Count"
                              onChange={(e) => {
                                setEditCount(e.target.value);
                              }}
                            ></input>
                            <h4 className="activity-duration">
                              Activity Duration: {activity.duration}
                            </h4>
                            <input
                              type="number"
                              placeholder="Update Activity Duration"
                              onChange={(e) => {
                                setEditDuration(e.target.value);
                              }}
                            ></input>
                            <button
                              type="submit"
                              className="edit-button"
                              onClick={() => handleEdit(activity)}
                            >
                              Save Count & Duration
                            </button>
                          </div>
                        </div>
                      );
                    })}

                  <form className="create-activity">
                    <select onChange={(e) => setActivityId(e.target.value)}>
                      {act.map((activity, index) => {
                        return (
                          <option key={index} value={activity.id}>
                            {activity.name}
                          </option>
                        );
                      })}
                    </select>
                    <label>
                      Count:
                      <input
                        type="number"
                        name="count"
                        placeholder="Insert Count"
                        onChange={(e) => setCount(e.target.value)}
                      ></input>
                    </label>
                    <label>
                      Duration:
                      <input
                        type="number"
                        name="duration"
                        placeholder="Insert Duration"
                        onChange={(e) => setDuration(e.target.value)}
                      ></input>
                    </label>
                    <button
                      type="submit"
                      className="submit-activity"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddActivity(routine.id);
                      }}
                    >
                      Add Activity
                    </button>
                  </form>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
};

export default MyRoutines;
