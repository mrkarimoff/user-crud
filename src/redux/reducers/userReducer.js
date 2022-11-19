import { GET_USER_SUCCEEDED, UPDATE_STATE } from "../constants/constants";

const initialState = {
  users: [],
  nameInp: "",
  emailInp: "",
  moneyInp: 0,
  ageInp: 0,
  modalVisible: false,
  isLoading: true,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_SUCCEEDED:
      state = { ...state, users: action.payload };
      break;
    case UPDATE_STATE:
      state[action.payload.stateName] = action.payload.value;
      state = { ...state };
      break;

    default:
      break;
  }

  return state;
};

export default userReducer;
