import React, { useState, useEffect } from "react";

const Routines = (props) => {
  const allRoutines = props.routines;
  const allActivites = props.routines.activities;

  return (
    <>
      <h1>All Public Routines</h1>

      {allRoutines.map((routine, index) => {
        return (
          <div className="routine-block" key={index}>
            <div className="single-routine">
              <h2 className="routine-name">{routine.name}</h2>
              <h3 className="routine-creator-name">{routine.creatorName}</h3>
              <p className="routine-goal">{routine.goal}</p>
              {routine.activities.map((activity, index) => (
                <div className="single-activity" key={index}>
                  <p className="activity-name">{activity.name}</p>
                  <p className="activity-description">{activity.description}</p>
                  <p className="activity-duration">
                    Duration: {activity.duration}
                  </p>
                  <p className="activity-count">Count: {activity.count}</p>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Routines;
