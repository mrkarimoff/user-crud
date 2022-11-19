import { createStore, combineReducers, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import userSaga from "../sagas/userSaga";
import userReducer from "../reducers/userReducer";

const reducer = combineReducers({
  userReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(reducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(userSaga);

export default store;
