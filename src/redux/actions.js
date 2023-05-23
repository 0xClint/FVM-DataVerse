import { SUBMIT_FORM } from "./action-types";

export const submitForm = (data) => {
  return {
    type: SUBMIT_FORM,
    data,
  };
};
