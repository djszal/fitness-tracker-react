import React, { useState, useEffect } from "react";
import { createNewRoutine } from "../api/api";
import "./MyRoutines.css";
import { deleteRoutine, getRoutines } from "../api/api";

const MyRoutines = (props) => {
  const [name, setRoutineName] = useState("");
  const [goal, setRoutineGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [stateError, setStateError] = useState("");
  // const [token, setToken] = useState(localStorage.getItem("token"));
  const {
    routines,
    userData,
    token,
    userRoutines,
    setUserRoutines,
    setRoutines,
  } = props;
  const act = props.activities;
  // console.log("333333333", props);

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

  // console.log(
  //   "LLLLLLLLLLLLL",
  //   props,
  //   userData,
  //   token,
  //   routines.filter((r) => r.creatorName === userData.username)
  //   .sort((a, b) => b.id - a.id)
  // );
  // console.log("DDDDDDDDDDDD", typeof isPublic);
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
                <form className="create-activity">
                  <label>
                    Count:
                    <input
                      type="text"
                      name="count"
                      placeholder="Insert Count"
                    ></input>
                  </label>
                  <label>
                    Duration:
                    <input
                      type="text"
                      name="duration"
                      placeholder="Insert Duration"
                    ></input>
                  </label>
                  <select>
                    {act.map((activity, index) => {
                      return <option key={index}>{activity.name}</option>;
                    })}
                  </select>
                  <button type="submit" className="submit-activity">
                    Add Activity
                  </button>
                </form>
              </div>
            </div>
          </div>
        );
      })}
      {/* <ul>
        {
          //Routines go here
          routines
            .filter((routine) => routine.creatorName === userData.username)
            .map((routine, index) => {
              return (
                <div className="single-activity" key={index}>
                  <p className="activity-name">{routine.name}</p>
                  <p className="activity-description">{routine.goal}</p>
                </div>
              );
            })
        }
      </ul> */}
    </>
  );
};

export default MyRoutines;
