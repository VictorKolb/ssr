import response from "./responce";
// actions
export const INCREASE = "INCREASE";
export const DECREASE = "DECREASE";
// Создаем action creators
export function increase() {
  return {
    type: INCREASE,
  };
}
export function decrease() {
  return {
    type: DECREASE,
  };
}

export const fetchHome = () => async (dispatch, getState) => {
  const { husky } = getState();
  if (!husky) {
    await dispatch(getHusky());
  }
};

export const getHusky = () => async dispatch => {
  const result = await response(
    "https://dog.ceo/api/breed/husky/images/random",
  );
  dispatch({ type: "GET_HUSKY", payload: result.message });
};
