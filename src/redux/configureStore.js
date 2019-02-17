import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "redux/reducer";

export default function configureStore(state) {
  return composeWithDevTools(applyMiddleware(thunk))(createStore)(
    rootReducer,
    state,
  );
}
