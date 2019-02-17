import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducer";

export default function configureStore(state = {}) {
  return createStore(
    rootReducer,
    state,
    composeWithDevTools(applyMiddleware(thunk)),
  );
}
