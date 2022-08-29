import axios from "axios";
import { outLetURL } from "../../constants";
import * as Types from "../actions/types";

// List of outlets action
export const outletListActon = (sub_domain) => (dispatch) => {
  axios
    .get(`${outLetURL}?subdomain=${sub_domain}`)
    .then((res) => {
      // console.log(res.data);
      dispatch({
        type: Types.FETCH_OUTLET,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: Types.FAIL,
      });
    });
};

// Create outlets action
export const createOutletUpdateAction =
  ({ payload, openingHour, history, subdomain, brandingID }) =>
  (dispatch) => {
    let method = axios.post;
    let url = outLetURL;
    if (payload.id) {
      method = axios.patch;
      url = `${url}${payload.id}/`;
      delete payload.id;
    }
    method(`${url}?subdomain=${subdomain}`, payload)
      .then((res) => {
        // console.log(res.data);
        dispatch({
          message: "Outlet has been created successfully",
          type: Types.CREATE_OUTLET,
          payload: res.data,
        });
        history.push(`/brand-details/${brandingID}/${subdomain}`); // change to outlet details page
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: Types.FAIL,
        });
      });
  };
export const updateOutletAction =
  ({ payload, outletID }) =>
  (dispatch) => {
    axios
      .patch(`${outLetURL}${outletID}/`, payload)
      .then(({ data }) => {
        // console.log(res.data);
        dispatch({
          message: "Outlet update successfully",
          type: Types.UPDATE_OUTLET,
          payload: {
            outlet: data,
          },
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: Types.FAIL,
        });
      });
  };

export const deleteOutletAction =
  ({ id, subdomain }) =>
  (dispatch) => {
    axios
      .delete(`${outLetURL}${id}/?subdomain=${subdomain}`)
      .then(({ data }) => {
        // console.log(res.data);
        dispatch({
          message: "Outlet update successfully",
          type: Types.DELETE_OUTLET,
          id: id,
        });
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: Types.FAIL,
        });
      });
  };
