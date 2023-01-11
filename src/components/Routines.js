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
              <h2>Routine</h2>
              <h3 className="routine-name">Routine Name: {routine.name}</h3>
              <p className="routine-creator-name">
                Username: {routine.creatorName}
              </p>
              <p className="routine-goal">Routine Goal: {routine.goal}</p>
              {routine.activities.map((activity, index) => (
                <div className="single-activity" key={index}>
                  <h2>Activity</h2>
                  <p className="activity-name">Name: {activity.name}</p>
                  <p className="activity-description">
                    Description: {activity.description}
                  </p>
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
