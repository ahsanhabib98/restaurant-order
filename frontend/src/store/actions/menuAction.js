import axios from 'axios';
import { menusURL } from "../../constants";
import * as Types from '../actions/types';


/*
    Here Menu means list of inventory
*/

// Show menu list action
export const menuListAction = (subdomain) => dispatch => {
    axios.get(`${menusURL}?subdomain=${subdomain}`)
        .then((res) => {
            // console.log(res.data);
            dispatch({
                type: Types.FETCH_MENU,
                payload:{
                    menus: res.data
                }
            })
        })
        .catch(err =>{
            console.log(err);
            dispatch({
                type: Types.FAIL
            })
        })
}


// Details menus
export const menuDetailsAction = ({id, subdomain}) => dispatch => {
    axios.get(`${menusURL}${id}/?subdomain=${subdomain}`)
        .then((res) => {
            console.log(res.data);
            dispatch({
                type: Types.DETAIL_MENU,
                payload: res.data
            })
        })
        .catch(err =>{
            console.log(err);
            dispatch({
                type: Types.FAIL
            })
        })
}
