
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import axios from 'axios';
import loggingMiddleware from 'redux-logger';
import * as actions from './actions';


export const fetchCampuses = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get('/api/campuses');
        const campuses = response.data;
        dispatch(getCampuses(campuses));
      }
      catch (err) {
        console.log(err);
      }  
    };
};

export const fetchCampus = (id) => {
    return async(dispatch) => {
      try {
        const response = (await axios.get(`/api/campuses/${ campus.id }`)).data
        dispatch(getCampus(campus));
      }
      catch (err) {
        console.log(err);
      }  
    }
};

export const createdCampus = (campusName, history) => {
    return async(dispatch) => {
      try {
        const { data: create } = await axios.post('/api/campuses', campusName);
        dispatch(createCampus(create));
        history.push('/campuses');
      }
      catch (err) {
        console.log(err);
      }  
    }
};

export const updatedCampus = (campusId, campus, history) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.put(`/api/campuses/${campusId}`, campus);
        dispatch(updateCampus(data));
        history.push(`/campuses/${campusId}`);
      }
      catch (err) {
        console.log(err);
      }  
    }
};

export const deletedCampus = (campusId, redirect, history) => {
    return async (dispatch) => {
      try {
        await axios.delete(`/api/campuses/${campusId}`);
        dispatch(deleteCampus(campusId));
        if (redirect) {
            history.push('/campuses');
        }
      }
      catch (err) {
        console.log(err);
      }  
    }
};



export const fetchStudents = () => {
    return async (dispatch) => {
      try {
        const response = await axios.get('/api/students');
        const students = response.data;
        dispatch(getStudents(students));
      }
      catch (err) {
        console.log(err);
      }  
    };
};

export const fetchStudent = (id) => {
    return async(dispatch) => {
      try {
        const response = (await axios.get(`/api/students/${ student.id }`)).data
        dispatch(getStudent(student));
      }
      catch (err) {
        console.log(err);
      }  
    }
};

export const createdStudent = (studentName, history) => {
    return async(dispatch) => {
      try {
        const { data: create } = await axios.post('/api/students', studentName);
        dispatch(createStudent(create));
        history.push('/students');
      }
      catch (err) {
        console.log(err);
      }  
    }
};

export const updatedStudent = (studentId, student, history) => {
    return async (dispatch) => {
      try {
        const { data } = await axios.put(`/api/students/${studentId}`, student);
        dispatch(updateStudent(data));
        history.push(`/students/${studentId}`);
      }
      catch (err) {
        console.log(err);
      }  
    }
};

export const deletedStudent = (studentId, redirect, history) => {
    return async (dispatch) => {
      try {
        await axios.delete(`/api/students/${studentId}`);
        dispatch(deleteStudent(studentId));
        if (redirect) {
          history.push('/students');
        }
      }
      catch (err) {
        console.log(err);
      }  
    }
};

const initialState = {
    campuses: [],
    students: [],
    singleCampus: {},
    singleStudent: {}
 };

 const campusReducer = (state = [], action)=> {
    switch (action.type) {
      case actions.GET_CAMPUSES:
        return action.campuses;
      case actions.SELECT_CAMPUS:
        return action.campus;
      case actions.CREATE_CAMPUS:
        return [...state, action.campus];
      case actions.DELETE_CAMPUS:
        return state.filter((campus) => campus.id !== action.campusId);
      case actions.UPDATE_CAMPUS:
        return [
          ...state.filter((campus) => campus.id !== action.campus.id),
          action.campus,
        ];
      default:
        return state;
    }
  };
  
const studentReducer = (state = [], action)=> {
    switch (action.type) {
      case actions.GET_STUDENTS:
        return action.students;
      case actions.SELECT_STUDENT:
        return action.student;
      case actions.CREATE_STUDENT:
        return [...state, action.student];
      case actions.DELETE_STUDENT:
        return state.filter((student) => student.id !== action.studentId);
      case actions.UPDATE_STUDENT:
        return [
          ...state.filter((student) => student.id !== action.student.id),
          action.student,
        ];
      default:
        return state;
    }
  };

const reducer = combineReducers({
    campuses: campusReducer,
    students: studentReducer
});

export default createStore(
    reducer,
    applyMiddleware(thunk, loggingMiddleware)
);    



