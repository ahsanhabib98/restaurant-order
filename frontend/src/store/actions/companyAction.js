import axios from "axios";
import {
  brandingURL,
  companyDetailsURL,
  locationListURL,
  brandingUserRL,
} from "../../constants";
import * as Types from "./types";

export const locationAction = () => (dispatch) => {
  // TODO: change to dynamic subdomain
  axios
    .get(`${locationListURL}?subdomain=all`)
    .then(({ data }) => {
      dispatch({
        type: Types.LOCATION,
        payload: data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: Types.FAIL,
      });
    });
};

export const companyDetailsAction = (company_id) => (dispatch) => {
  axios
    .get(companyDetailsURL(company_id))
    .then(({ data }) => {
      dispatch({
        type: Types.RETRIVE_COMPANY,
        payload: data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: Types.FAIL,
      });
    });
};
export const companyUpdateAction = (id, formData) => (dispatch) => {
  axios
    .patch(companyDetailsURL(id, formData))
    .then(({ data }) => {
      dispatch({
        type: Types.RETRIVE_COMPANY,
        payload: data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: Types.FAIL,
      });
    });
};

export const brandingCreateAction =
  ({ brandFormData, history }) =>
  (dispatch) => {
    // contact_info, openingHour,
    axios
      .post(brandingURL, brandFormData)
      .then((res) => {
        // axios.post(brandingUserRL, { branding: res.data.id })
        // await axios.post(brandingURL, contact_info)
        dispatch({
          type: Types.CREATE_BRANDING,
          payload: res.data,
        });
        history.push("/management");
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: Types.FAIL,
        });
      });
  };

// Details branding
export const brandingListAction = () => (dispatch) => {
  axios
    .get(brandingURL)
    .then(({ data }) => {
      dispatch({
        type: Types.BRANDING_LIST,
        payload: data,
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({
        type: Types.FAIL,
      });
    });
};

// Details branding
export const brandingDetailsAction = (id) => (dispatch) => {
  axios
    .get(`${brandingURL}${id}/`)
    .then((res) => {
      // console.log(res.data);
      dispatch({
        type: Types.RETRIVE_BRANDING,
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

// Update branding
export const brandingUpdateAction =
  ({ id, formData, history }) =>
  (dispatch) => {
    axios
      .patch(`${brandingURL}${id}/`, formData)
      .then(({data}) => {
        dispatch({
          type: Types.UPDATE_BRANDING,
          payload: data,
        });
        console.log(data)
        // history.push(`/brand-details/${data.id}/${data.sub_domain}`)
        window.location.reload(`/brand-details/${data.id}/${data.sub_domain}`)
        // window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: Types.FAIL,
        });
      });
  };

// Update branding
export const brandingDeleteAction = (id) => (dispatch) => {
  axios
    .delete(`${brandingURL}${id}/`)
    .then((res) => {
      dispatch({
        type: Types.DELETE_BRANDING,
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
