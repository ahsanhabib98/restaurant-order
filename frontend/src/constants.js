const BASE_URL = process.env.REACT_APP_BACKEND_API || "http://localhost:8000";
const apiURL = "/api";

export const BASE_DOMAIN =
  process.env.REACT_APP_BASE_DOMAIN || "localhost:3000";

export const endpoint = `${BASE_URL}${apiURL}`;

export const account = `${endpoint}/accounts`;
export const restaurant = `${endpoint}/restaurants`;
export const restaurantDiscountURL = `${restaurant}/restaurant-discount`;
export const invitation = `${account}/invitation`;

export const loginURL = `${account}/login/`;
export const signupURL = `${account}/register/`;
export const passwordChangeURL = (id) => `${account}/password-change/${id}/`;
export const accountUpdateURL = (id) => `${account}/${id}/update-account/`;
export const accountDeleteURL = (id) => `${account}/${id}/delete-account/`;
export const accountDetailURL = (id) => `${account}/${id}/account/`;
export const sendOtpCodeURL = (phone_number) =>
  `${account}/send-otp-code/${phone_number}/`;
export const otpCodeWiseUserURL = (phone_number) =>
  `${account}/otp-codewise-user/${phone_number}/`;
export const verifyUserURL = (phone_number) =>
  `${account}/verify-user/${phone_number}/`;
export const smsGetWayURL = (phone_number, otp_code) =>
  `${account}/sms-getway/${phone_number}/${otp_code}/`;

export const companyURL = `${restaurant}/company/`;
export const companyDiscountURL = `${restaurant}/company-discount/`;
export const marketingBrandURL = `${restaurant}/marketing-brand/`;
export const customerURL = `${restaurant}/branding-customer/`;
export const companyDetailsURL = (id) => `${restaurant}/company/${id}/`;
export const restaurantCreateURL = `${restaurant}/my-restaurant/`;
export const updateSubdomainURL = (id) => `${restaurant}/my-restaurant/${id}/`;

export const companyBrandingManagerListURL = (id) =>
  `${restaurant}/company-branding-manager/${id}/`;
export const locationListURL = `${restaurant}/location/`;
export const addRestaurantURL = `${restaurant}/restaurant-user/`;
export const brandingOrderListURL = (subdomain) =>
  `${restaurant}/branding-wise-order-list/${subdomain}/`;
export const dashboardWiseCustomerOrderURL = `${restaurant}/dashboard-wise-customer-order/`;
export const restaurantOrderDeliveryURL = `${restaurant}/order-delivery/`;
export const userIDURL = `${restaurant}/user-id/`;
export const itemListURL = `${restaurant}/inventory/`;
export const itemDetailURL = (id) => `${restaurant}/items/${id}/`;
export const orderItemDeleteURL = (id) =>
  `${restaurant}/order-item/${id}/delete/`;
export const orderItemUpdateURL = `${restaurant}/order-item/update/`;
export const liveOrdersAll = `${restaurant}/live-order/${0}/`;
export const liveOrdersNew = `${restaurant}/live-order/${1}/`;
export const liveOrdersKitchen = `${restaurant}/live-order/${2}/`;
export const liveOrdersReadyURL = `${restaurant}/live-order/${3}/`;
export const orderHistoryList = `${restaurant}/order-history-list/`;
export const addToCartURL = `${restaurant}/add-to-cart/`;
export const removeFalseOrder = `${restaurant}/remove-false-order/`;
export const orderSummaryURL = `${restaurant}/order-summary/`;
export const orderUpdateURL = (id) => `${restaurant}/order-update/${id}/`;
export const InventoryURL = `${restaurant}/inventory/`;
export const checkoutURL = `${restaurant}/checkout/`;
export const addCouponURL = `${restaurant}/add-coupon/`;
export const addressListURL = (addressType) =>
  `${restaurant}/addresses/?address_type=${addressType}`;
export const addressURL = `${restaurant}/address/`;
export const outLetURL = `${restaurant}/outlet/`;
export const paymentListURL = `${restaurant}/payments/`;
export const paymentURL = `${restaurant}/customer-payment/`;
export const menusURL = `${restaurant}/menus/`;
export const modifierURL = `${restaurant}/modifier/`;
export const brandingURL = `${restaurant}/branding/`;
export const brandingWiseCompanyURL = (subdomain) => `${restaurant}/branding-wise-company/${subdomain}/`;
export const brandingUserRL = `${restaurant}/branding-user/`;
export const orderURL = `${restaurant}/order`;
export const addRestaurantUser = (subdomain) =>
  `${restaurant}/add-user-restaurant/${subdomain}/`;

// Dashboard superuser
export const companyRequestListURL = `${restaurant}/company-request-owners/`;
