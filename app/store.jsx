import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk


// ACTION TYPES
const GET_STUDENTS = 'GET_STUDENTS';
const GET_CAMPUSES = 'GET_CAMPUSES';
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
export function addStudent (student) {
  const action = { type: ADD_STUDENT, student };
  return action;
};


// THUNK CREATORS
export function fetchStudents () {
    return function thunk (dispatch) {
      return axios.get('/api/students')
        .then(res => res.data)
        .then(students => {
          const action = getStudents(students);
          dispatch(action);
        });
    };
}
export function fetchCampuses () {
  return function thunk (dispatch) {
    return axios.get('/api/campus')
      .then(res => res.data)
      .then(campuses => {
        const action = getCampuses(campuses);
        dispatch(action);
      });
  };
}

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()))
