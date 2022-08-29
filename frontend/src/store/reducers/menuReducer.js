import * as Types from '../actions/types';

const initial = {
    menus: [],
    menu: {}
}

export const menuReducer = (state=initial, action) =>{
    switch (action.type){
        case Types.FETCH_MENU:
            return {
                ...state,
                menus: action.payload.menus,
            }
        case Types.DETAIL_MENU:
            return{
                ...state,
                menu: action.payload
            }
        case Types.FAIL:
            return{
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}
