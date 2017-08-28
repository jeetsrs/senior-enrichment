import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import axios from 'axios';

const initialState = {
  students: [],
  campuses: [],
  newStudent: ''
};

// ACTION TYPES
const GET_STUDENTS = 'GET_STUDENTS';
const GET_CAMPUSES = 'GET_CAMPUSES';
const ADD_CAMPUS = 'ADD_CAMPUS';
const ADD_STUDENT = 'ADD_STUDENT';

// ACTION CREATORS
export function getStudents (students) {
  const action = { type: GET_STUDENTS, students };
  return action;
};
export function getCampuses (campuses) {
  const action = { type: GET_CAMPUSES, campuses };
  return action;
};
export function addCampus (campus) {
  const action = { type: ADD_CAMPUS, campus };
  return action;
};
export function addStudent (student) {
  const action = { type: ADD_STUDENT, student };
  return action;
};

// THUNK CREATORS
export function fetchStudents () {
  return function thunk (dispatch) {
    return axios.get('/api/student')
      .then(res => res.data)
      .then(students => {
        const action = getStudents(students);
        dispatch(action);
      });
  };
};
export function fetchCampuses () {
  return function thunk (dispatch) {
    return axios.get('/api/campus')
      .then(res => res.data)
      .then(campuses => {
        const action = getCampuses(campuses);
        dispatch(action);
      });
  };
};

// REDUCER
const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    case GET_STUDENTS:
      // I think I am assigning the students object here into the state - NOT SURE :(
      return Object.assign({}, state, { students: action.students });
    case GET_CAMPUSES:
      // I think I am assigning the campus object here into the state - NOT SURE :(
      return Object.assign({}, state, { campuses: action.campuses });
    case ADD_CAMPUS:
      // I think I am adding a campus to the list here - NOT SURE WHAT TO DO HERE :(
      return Object.assign({}, state, {campuses: state.campuses.concat(action.campus)});
    case ADD_STUDENT:
      // I think I am adding a student to the list here - NOT SURE WHAT TO DO HERE :(
      return Object.assign({}, state, {students: state.students.concat(action.student)});
    default: return state;
  }
};

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()));
