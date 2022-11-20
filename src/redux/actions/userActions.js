import {
  GET_USER,
  UPDATE_STATE,
  POST_USER,
  DELETE_USER,
} from "../constants/constants";

export const getUsers = () => ({ type: GET_USER });
export const addUsers = (data) => ({ type: POST_USER, payload: data });
export const updateState = (payload) => ({ type: UPDATE_STATE, payload });
export const delUser = (id) => ({ type: DELETE_USER, payload: id });
