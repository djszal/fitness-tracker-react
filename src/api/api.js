import React, { useState, useEffect } from "react";

const baseUrl = "http://fitnesstrac-kr.herokuapp.com/api";

const getRoutines = async (setRoutines) => {
  try {
    const response = await fetch(`${baseUrl}/routines`);
    const data = await response.json();
    // console.log(`getRoutines API Call `, data);
    setRoutines(data);
  } catch (error) {
    console.error(error);
  }
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
    console.log("YYYYYYYYYYYY", data);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export { getRoutines, getActivities, createNewRoutine };
