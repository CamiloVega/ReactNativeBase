// let BASE_URL = "https://floating-fortress-22466.herokuapp.com/api/test";
let BASE_URL = "http://192.168.0.10:5000/mobile";

let GET_USERS = BASE_URL + '/users';

export const USER_LOGIN_ROUTE =  GET_USERS + '/login'
export const USER_TEST_NOTIFICATIONS_ROUTE =  GET_USERS + '/test_notifications'
export const USER_LIST_ROUTE =  GET_USERS + '/user_list'
export const PING_ROUTE =  BASE_URL
