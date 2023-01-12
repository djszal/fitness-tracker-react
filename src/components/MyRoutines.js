import React, { useState, useEffect } from "react";
import { createNewRoutine } from "../api/api";
import "./MyRoutines.css";
import {
  deleteRoutine,
  getRoutines,
  attachActivityToRoutine,
} from "../api/api";

const MyRoutines = (props) => {
  const [name, setRoutineName] = useState("");
  const [goal, setRoutineGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [stateError, setStateError] = useState("");
  const [activityId, setActivityId] = useState("");
  const [count, setCount] = useState("");
  const [duration, setDuration] = useState("");
  const [routineId, setRoutineId] = useState();

  // const [token, setToken] = useState(localStorage.getItem("token"));
  const { token, userRoutines, setUserRoutines, setRoutines, activities } =
    props;
  const act = props.activities;
  const userAct = userRoutines.activities;

  // console.log("333333333", [userRoutines]);

  const handleDelete = async (routineIdToDelete) => {
    // console.log("11111111111", routineIdToDelete);
    const response = await deleteRoutine(token, routineIdToDelete);

    if (response) {
      const newRoutines = userRoutines.filter(
        (routine) => routine.id !== routineIdToDelete
      );
      setUserRoutines(newRoutines);
    }
  };

  const handleAddActivity = async (routineId) => {
    console.log("TTTTTTTTTTTTTTTTT", count, activityId, duration, token);

    const result = await attachActivityToRoutine({
      activityId,
      count,
      duration,
      routineId,
      token,
    });

    if (result) {
      setUserRoutines();
    }
    // console.log("TTTTTTTTTTTTTTTTT", result);
  };

  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const result = await createNewRoutine(name, goal, isPublic, token);
          if (result.error) {
            const errorMessage = "Routine name already exists";
            console.log(errorMessage);
            setStateError(errorMessage);
          } else {
            setUserRoutines([...userRoutines, result]);
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
      {console.log("VVVVVVVV", userRoutines)}
      {userRoutines.map((routine, index) => {
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

                {routine.activities.map((activity, index) => {
                  console.log("ZZZZZZZ", activity);
                  return (
                    <div className="activities-block" key={index}>
                      <div className="single-activity">
                        <h2 className="activity-name">
                          Activity Name: {activity.name}
                        </h2>
                        <h3 className="activity-name">
                          Activity Description: {activity.description}
                        </h3>
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
                      // setRoutineId(routine.id);
                      handleAddActivity(routine.id);
                      // console.log("CCCCCCCCC", routine.id);
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
