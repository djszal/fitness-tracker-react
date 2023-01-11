import React, { useState, useEffect } from "react";

const Activities = (props) => {
  const allActivites = props.activities;
  //   console.log("ssssssss", allActivites);
  return (
    <>
      <h1>All Public Activities</h1>

      {allActivites.map((activity, index) => {
        return (
          <div className="activity-block" key={index}>
            <div className="single-activity">
              <h2 className="activity-name">{activity.name}</h2>
              <h3 className="activity-description">{activity.description}</h3>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Activities;
