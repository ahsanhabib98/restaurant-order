import * as Types from "../actions/types";
const initialState = {
  company: null,
  branding: null,
  brandings: [],
  locations: [],
  error: null,
};
const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.RETRIVE_COMPANY:
      return {
        ...state,
        company: action.payload,
      };
    case Types.CREATE_BRANDING:
      return {
        ...state,
        brandings: [...state.brandings, action.payload],
      };
    case Types.RETRIVE_BRANDING:
      return {
        ...state,
        branding: action.payload,
      };
    case Types.BRANDING_LIST:
      return {
        ...state,
        brandings: action.payload,
      };
    case Types.DELETE_BRANDING:
      return {
        ...state,
        brandings: state.brandings.filter((ele) => ele.id != action.id),
      };
    case Types.LOCATION:
      return {
        ...state,
        locations: action.payload,
      };

    case Types.FETCH_MENU:
      return {
        ...state,
        menues: action.payload.menus,
      };
    // case Types.DETAIL_MENU:
    //   return {
    //     ...state,
    //     branding: action.payload,
    //   };
    case Types.FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default companyReducer;
