import * as Types from "../actions/types";

const initial = {
  outlets: [],
  outlet: null,
  error: null,
};

const outletReducer = (state = initial, action) => {
  switch (action.type) {
    case Types.FETCH_OUTLET:
      return {
        ...state,
        outlets: action.payload,
      };
    case Types.CREATE_OUTLET:
      return {
        ...state,
        outlet: action.payload,
      };
    case Types.UPDATE_OUTLET:
      return {
        ...state,
        outlet: action.payload,
      };
    case Types.DELETE_OUTLET:
      return {
        ...state,
        outlets: state.outlets.filter((ele) => ele.id !== action.id),
      };
    case Types.FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
export default outletReducer;
