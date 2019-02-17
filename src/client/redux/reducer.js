import { INCREASE, DECREASE } from "./actions";
const initialState = {
  husky: "",
  count: 5,
};

export default function count(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return { ...state, count: state.count + 1 };

    case DECREASE:
      return { ...state, count: state.count - 1 };

    case "GET_HUSKY":
      return { ...state, husky: action.payload };

    default:
      return state;
  }
}
