import React, { useState, useEffect } from "react";
import { createNewRoutine } from "../api/api";

const MyRoutines = (props) => {
  const [name, setRoutineName] = useState("");
  const [goal, setRoutineGoal] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));

  console.log("LLLLLLLLLLLLL", isPublic);
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
    </>
  );
};

export default MyRoutines;