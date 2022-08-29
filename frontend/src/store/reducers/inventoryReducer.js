import * as Types from "../actions/types";

const initial = {
  inventories: [],
  inventory: {}
}

export const inventoryReducer = (state = initial, action) => {
  switch (action.type) {
    case Types.FETCH_INVENTORIES:
      return {
        ...state,
        inventories: action.payload
      }
    case Types.FETCH_INVENTORY:
      return {
        ...state,
        inventory: action.payload
      }
    case Types.INVENTORY_DELETE:
      const inventories = state.inventories.filter((ele) => ele.id !== action.id)
      return {
        ...state,
        inventories
      }
    case Types.FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
