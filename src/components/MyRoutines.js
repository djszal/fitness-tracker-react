import React, { useState, useEffect } from "react";
import { createNewRoutine } from "../api/api";
import "./MyRoutines.css";

const MyRoutines = (props) => {
  const [name, setRoutineName] = useState("");
  const [goal, setRoutineGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  // const [token, setToken] = useState(localStorage.getItem("token"));
  const { routines, userData, token, userRoutines } = props;

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
          // props.setRoutines(result);
          console.log("44444444444444", result);
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
      </form>
      <h1>My Routines</h1>
      {userRoutines.map((routine, index) => {
        return (
          <div className="routine-block" key={index}>
            <div className="single-routine">
              <h2 className="routine-name">Routine Name: {routine.name}</h2>
              <h3 className="routine-name">Routine Goal: {routine.goal}</h3>
              <button type="submit" className="delete-button">
                Delete
              </button>
              <button type="submit" className="edit-button">
                Edit
              </button>
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
