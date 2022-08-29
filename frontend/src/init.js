import jwtDecode from "jwt-decode";
import Axios from "axios";
import * as Types from "./store/actions/types";
import {
  companyDetailsAction,
  brandingListAction,
  locationAction,
} from "./store/actions/companyAction";

export const setAuthToken = (token) => {
  if (token) {
    Axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  } else {
    Axios.defaults.headers.common["Authorization"] = "";
  }
};

async function init(dispatch) {
  const token = localStorage.getItem("token");
  setAuthToken(token);
  if (token) {
    let decode = jwtDecode(token);
    // console.log(decode)
    dispatch({
      type: Types.SET_USER,
      payload: {
        user: decode,
      },
    });
    if (decode.is_owner) {
      dispatch(companyDetailsAction(decode.company_id));
    }
    dispatch(brandingListAction());
    if (decode.is_superuser) dispatch(locationAction());
  }
}

export default init;
