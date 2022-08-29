import axios from 'axios';
import { InventoryURL } from "../../constants";
import * as Types from '../actions/types';


// Inventory list action
export const inventoryActionList = (subdomain) => dispatch => {
    axios.get(`${InventoryURL}?subdomain=${subdomain}`)
        .then((res) => {
            // console.log(res.data);
            dispatch({
                type: Types.FETCH_INVENTORIES,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: Types.FAIL
            })
        })
}

// Inventory list action
export const inventoryDetailsAction = ({ subdomain, id }) => dispatch => {
    axios.get(`${InventoryURL}${id}/?subdomain=${subdomain}`)
        .then((res) => {
            // console.log(res.data);
            dispatch({
                type: Types.FETCH_INVENTORY,
                payload: res.data
            })
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: Types.FAIL
            })
        })
}

export const inventoryDeleteAction = ({ subdomain, id }) => dispatch => {
    axios.delete(`${InventoryURL}${id}/?subdomain=${subdomain}`)
        .then((res) => {
            dispatch({
                type: Types.INVENTORY_DELETE,
                id: id
            })
        })
        .catch(err => {
            console.log(err);
            dispatch({
                type: Types.FAIL
            })
        })
}

// // Inventory list action
// export const inventoryCreateOrUpdateAction = ({ subdomain, id, formData }) => dispatch => {
//     let url = InventoryURL;
//     let method = axios.post;
//     if (id) {
//         method = axios.patch;
//         url = `${InventoryURL}${id}/`;
//     }
//     method(`${url}?subdomain=${subdomain}`, formData)
//         .then((res) => {
//             // console.log(res.data);
//             dispatch({
//                 type: Types.FETCH_INVENTORY,
//                 payload: res.data
//             })
//         })
//         .catch(err => {
//             console.log(err);
//             dispatch({
//                 type: Types.FAIL
//             })
//         })
// }