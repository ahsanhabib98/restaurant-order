import axios from "axios";
import jwtDecode from "jwt-decode";
import { BASE_DOMAIN, loginURL } from "../../constants";
import { setAuthToken } from "../../init";
import * as Types from "../actions/types";

// user login action
export const login = (user, history) => (dispatch) => {
  axios
    .post(loginURL, user)
    .then((res) => {
      // console.log(res.data);
      let token = res.data.access;
      // console.log(token);
      localStorage.setItem("token", token);
      setAuthToken(token);
      let decode = jwtDecode(token);
      // console.log(decode);
      const subdomain = decode.sub_domain;
      const is_verified = decode.is_verified;
      const is_owner = decode.is_owner;
      const is_manager = decode.is_manager;
      const is_superuser = decode.is_superuser;
      dispatch({
        type: Types.SET_USER,
        payload: {
          user: decode,
        },
      });
      if (is_superuser) {
        window.location.href = `//dashboard.${BASE_DOMAIN}/superuser-dashboard`;
      } else {
        if (is_verified) {
          if (is_owner) {
            window.location.href = `//dashboard.${BASE_DOMAIN}/dashboard`;
          } else if (is_manager) {
            window.location.href = `//dashboard.${BASE_DOMAIN}/my-profile`;
          } else {
            // window.location.href = `//${subdomain}.${BASE_DOMAIN}/delivery`;
            history.push("/delivery");
          }
        } else {
          history.push("/otp-add");
        }
      }
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: Types.USER_ERROR,
        payload: {
          error: error.response?.data,
        },
      });
    });
};
