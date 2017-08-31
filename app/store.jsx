import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger'; // https://github.com/evgenyrodionov/redux-logger
import thunkMiddleware from 'redux-thunk'; // https://github.com/gaearon/redux-thunk
import axios from 'axios';

const initialState = {
  students: [],
  campuses: [],
  student: {},
  campus: {}
};

// ACTION TYPES
const GET_STUDENTS = 'GET_STUDENTS';
const GET_CAMPUSES = 'GET_CAMPUSES';
const ADD_CAMPUS = 'ADD_CAMPUS';
const ADD_STUDENT = 'ADD_STUDENT';
const DELETE_STUDENT = 'DELETE_STUDENT';
const DELETE_CAMPUS = 'DELETE_CAMPUS';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';

// ACTION CREATORS
export function getStudents (students) {
  const action = { type: GET_STUDENTS, students };
  return action;
};
export function getCampuses (campuses) {
  const action = { type: GET_CAMPUSES, campuses };
  return action;
};
export function addCampus (newCampus) {
  const action = { type: ADD_CAMPUS, newCampus };
  return action;
};
export function addStudent (newStudent) {
  const action = { type: ADD_STUDENT, newStudent };
  return action;
};
export function deleteStudent (studentId) {
  const action = { type: DELETE_STUDENT, studentId };
  return action;
};
export function deleteCampus (campusId) {
  const action = { type: DELETE_CAMPUS, campusId };
  return action;
};
export function updateStudent (student) {
  const action = { type: UPDATE_STUDENT, student };
  return action;
};
export function updateCampus (campus) {
  const action = { type: UPDATE_CAMPUS, campus };
  return action;
};

// THUNK CREATORS
// Fetch all items
export const fetchStudents = () => dispatch => {
  return axios.get('/api/student')
  .then(res => res.data)
  .then(students => {
    const action = getStudents(students);
    dispatch(action);
  })
  .catch(console.error);
};
export const fetchCampuses = () => dispatch => {
  return axios.get('/api/campus')
  .then(res => res.data)
  .then(campuses => {
    const action = getCampuses(campuses);
    dispatch(action);
  })
  .catch(console.error);
};
// POST THUNKS - to add data into the DB
export const addNewStudent = (newStudent) => dispatch => {
  return axios.post('/api/student', newStudent)
  .then(res => res.data)
  .then(student => {
    const action = addStudent(student);
    dispatch(action);
  })
  .catch(console.error);
};
export const addNewCampus = (newCampus) => dispatch => {
  return axios.post('/api/campus', newCampus)
  .then(res => res.data)
  .then(campus => {
    const action = addCampus(campus);
    dispatch(action);
  })
  .catch(console.error);
};
// Delete Thunks
export const deleteStudentThunk = (studentId) => dispatch => {
  return axios.delete(`/api/student/${studentId}`)
  .then(res => res.data)
  .then(() => {
    const action = deleteStudent(+studentId);
    dispatch(action);
  });
};
export const deleteCampusThunk = (campusId) => dispatch => {
  return axios.delete(`/api/campus/${campusId}`)
  .then(res => res.data)
  .then(() => {
    const action = deleteCampus(+campusId);
    dispatch(action);
  })
  .catch(console.error);
};
// Update Thunks
export const updateStudentThunk = (student) => dispatch => {
  return axios.put(`/api/student/${student.id}`, student)
  .then(res => res.data)
  .then(student => {
    const action = updateStudent(student);
    dispatch(action);
  })
  .catch(console.error);
};
export const updateCampusThunk = (campus) => dispatch => {
  return axios.put(`/api/campus/${campus.id}`, campus)
  .then(res => res.data)
  .then(campus => {
    const action = updateCampus(campus);
    dispatch(action);
  })
  .catch(console.error);
};

// REDUCER
const rootReducer = function(state = initialState, action) {
  switch(action.type) {
    case GET_STUDENTS:
      return Object.assign({}, state, { students: action.students });
    case GET_CAMPUSES:
      return Object.assign({}, state, { campuses: action.campuses });
    case ADD_CAMPUS:
      return Object.assign({}, state, {campuses: state.campuses.concat(action.newCampus)});
    case ADD_STUDENT:
      return Object.assign({}, state, {students: state.students.concat(action.newStudent)});
    case DELETE_STUDENT:
      return Object.assign({}, state, {students: state.students.filter(student => student.id !== action.studentId) });
    case DELETE_CAMPUS:
      return Object.assign({}, state, {
        campuses: state.campuses.filter(campus => campus.id !== action.campusId),
        students: state.students.filter(student => student.campusId !== action.campusId)
      });
    case UPDATE_STUDENT:
      return Object.assign({}, state, {
        students: state.students.map(student => (student.id === action.student.id) ? action.student : student)
      });
    case UPDATE_CAMPUS:
      return Object.assign({}, state, {
        campuses: state.campuses.map(campus => (campus.id === action.campus.id) ? action.campus : campus)
      });
    default: return state;
  }
};

export default createStore(rootReducer, applyMiddleware(thunkMiddleware, createLogger()));
