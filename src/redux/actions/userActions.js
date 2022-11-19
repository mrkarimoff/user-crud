import { GET_USER, UPDATE_STATE } from "../constants/constants";

export const getUsers = () => ({ type: GET_USER });
export const updateState = (payload) => ({ type: UPDATE_STATE, payload });
