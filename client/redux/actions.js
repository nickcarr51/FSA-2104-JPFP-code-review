
import axios from "axios";
import { Component } from "react";

export const CONSTANTS = {
  GET_CAMPUSES: "GET_CAMPUSES",
  GET_STUDENTS: "GET_STUDENTS",
  DESTROY_CAMPUSES: "DESTROY_CAMPUSES",
  DESTROY_STUDENTS: "DESTROY_STUDENTS",
  CREATE_CAMPUSES: "CREATE_CAMPUSES",
  CREATE_STUDENTS: "CREATE_STUDENTS",
  EDIT_CAMPUSES: "EDIT_CAMPUSES",
  EDIT_STUDENTS: "EDIT_STUDENTS",
};

const getCampusesAction = (campuses) => {
  return {
    type: CONSTANTS.GET_CAMPUSES,
    campuses,
  };
};

const getStudentsActions = (students) => {
  return {
    type: CONSTANTS.GET_STUDENTS,
    students,
  };
};

const deleteCampusAction = (campus) => {
  return {
    type: CONSTANTS.DESTROY_CAMPUSES,
    campus,
  };
};

export const getCampuses = () => async (dispatch) => {
  try {
    const campuses = await (await axios.get("/api/campuses")).data;
    dispatch(getCampusesAction(campuses));
  } catch (err) {
    console.log(err);
  }
};

export const getStudents = () => async (dispatch) => {
  try {
    const students = await (await axios.get("/api/students")).data;
    dispatch(getStudentsActions(students));
  } catch (err) {
    console.log(err);
  }
};

export const deleteCampus = (campus, history) => async (dispatch) => {
  await axios.delete(`/api/campuses/${campus.id}`);
  // dispatch({ type: CONSTANTS.DESTROY_CAMPUSES, campus });
  dispatch(deleteCampus(campus));
  history.push("/campuses");
};

export const deleteStudent = (student, history) => async (dispatch) => {
  await axios.delete(`/api/students/${student.id}`);

  dispatch(deleteStudent(student));
  history.push("/students");
};

export const createCampus = (_campus, history) => async (dispatch) => {
  const campus = await axios.post("/api/campuses", _campus);
  history.push("/campuses");
  dispatch({ type: CONSTANTS.CREATE_CAMPUSES, campus });
};

export const createStudent = (_student, history) => async (dispatch) => {
  const student = await axios.post("/api/students", _student);
  history.push("/students");
  dispatch({ type: CONSTANTS.CREATE_STUDENTS, student });
};

export const editCampus = (campus, history) => async (dispatch) => {
  await axios.put(`/api/campuses/${campus.id}`, campus);

  history.push("/campuses");
  dispatch({ type: CONSTANTS.EDIT_CAMPUSES, campus });
};

export const editStudent = (data, history) => async (dispatch) => {
  const { student } = await axios.put(`/api/students/${data.id}`, data);

  history.push("/students");
  dispatch({ type: CONSTANTS.EDIT_STUDENTS, student });
};