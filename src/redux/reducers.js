import { SUBMIT_FORM } from "./action-types";

const initialState = {
  form: "",
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_FORM:
      return { ...state, form: action.data };

    default:
      return state;
  }
};
