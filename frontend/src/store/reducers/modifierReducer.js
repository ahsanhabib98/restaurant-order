import * as Types from "../actions/types";

const initial = {
  modifiers: [],
  modifier: {}
}

export const modifierReduer = (state = initial, action) => {
  switch (action.type) {
    case Types.FETCH_MODIFIER:
      return {
        ...state,
        modifiers: action.payload
      };
    case Types.RETRIVE_MODIFIER:
      return {
        ...state,
        modifier: action.payload
      };

    case Types.CREATE_MODIFIER:
      let results = state.modifires;
      results.unshift(action.payload.modifier);
      return {
        ...state,
        modifiers: results
      };

    case Types.UPDATE_MODIFIER:
      let modifier = state.modifires;
      modifier.unshift(action.payload.types);
      return {
        ...state,
        modifiers: modifier
      };

    case Types.DELETE_MODIFIER:
      return action.payload;

    case Types.FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
