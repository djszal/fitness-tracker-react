import React, { useState, useEffect } from "react";

const MyRoutines = (props) => {
  const [routineName, setRoutineName] = useState("");
  const [routineGoal, setGoal] = useState("");
  const [routineIsPublic, setIsPublic] = useState(false);
  return (
    <>
      <form onSubmit={(e) => ev.preventDefault()}>
        <h3>Create a New Routine</h3>
        <input
          name="routine name"
          type="text"
          placeholder="Routine Name"
          value={routineName}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          name="description"
          type="text"
          placeholder="Routine Goal"
          value={routineGoal}
          onChange={(e) => setGoal(e.target.value)}
        />
        <label>
          Private Routine?
          <input
            name="routine-goal"
            type="checkbox"
            checked={routineIsPublic}
            onChange={(e) => setIsPublic(e.target.value)}
          />
        </label>
        <input
          type="submit"
          value="createPost"
          onClick={console.log("Hello")}
        />
      </form>
    </>
  );
};

export default MyRoutines;
