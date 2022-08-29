import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import "./css/style.scss";
import reportWebVitals from "./reportWebVitals";
import { WebsiteOrderingReducer } from "./store//reducers/websiteOrderingReducer";
import authReducer from "./store/reducers/auth";
import LoginAuthReducer from "./store/reducers/authReducer";
import companyReducer from "./store/reducers/companyReducer";
import { inventoryReducer } from "./store/reducers/inventoryReducer";
import {
  liveAllOrderReducer,
  liveKitchenOderReducer,
  liveNewOderReducer,
  liveReadyOderReducer,
} from "./store/reducers/liveOrderReducer";
import { menuReducer } from "./store/reducers/menuReducer";
import { menusPlateformReduer } from "./store/reducers/menusPlateformReduer";
import { modifierReduer } from "./store/reducers/modifierReducer";
import outletReducer from "./store/reducers/outletReducer";
import { passwordChangeReduer } from "./store/reducers/passwordChagneReducer";
import restaurantOrderReducer from "./store/reducers/restaurantOrderReducer";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";

import init from "./init";

// import cartReducer from "./store/reducers/cart";

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  auth: authReducer,
  login_auth: LoginAuthReducer,
  orders: restaurantOrderReducer,
  live_all_orders: liveAllOrderReducer,
  live_new_orders: liveNewOderReducer,
  live_kitchen_orders: liveKitchenOderReducer,
  live_ready_orders: liveReadyOderReducer,
  inventory: inventoryReducer,
  outlet: outletReducer,
  menus: menuReducer,
  menuPlatefrom: menusPlateformReduer,
  modifier: modifierReduer,
  passwordChange: passwordChangeReduer,
  website: WebsiteOrderingReducer,
  company: companyReducer,
  // cart: cartReducer
});

const store = createStore(rootReducer, composeEnhances(applyMiddleware(thunk)));

init(store.dispatch);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

reportWebVitals();
