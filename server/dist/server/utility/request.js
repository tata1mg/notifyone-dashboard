"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestInstance = void 0;
/* eslint-disable camelcase */
const axios_1 = __importDefault(require("axios"));
const serverConfig_1 = __importDefault(require("../config/serverConfig"));
/**
Creates a Axios Custom Request Object
*/
// OLD API OBJECT
// const axiosCustom = axios.create({
//     baseURL: `${config.auth_api_url}/auth/v6`,
//     responseType: 'json',
//   });
const axiosCustom = axios_1.default.create({
    baseURL: `${serverConfig_1.default.auth_api_url}/`,
    responseType: 'json',
});
/**
Creates a Axios Custom Request Object
*/
const labsAxiosCustom = axios_1.default.create({
    baseURL: `${serverConfig_1.default.labs_api_url}/admin/users`,
    responseType: 'json',
});
/**
 * Returns custom axios request object for user/pass login
 * @param  {userloginData} data User Login Credentials
 */
const login = (data) => labsAxiosCustom.request({
    url: '/authenticate',
    method: 'POST',
    headers: {
        accept: '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'x-1mglabs-platform': 'web_admin',
    },
    data,
});
/**
 * Returns custom axios request object for google login
 * @param  {userloginData} data User Login Credentials
 */
const googleSignin = (data) => axiosCustom.request({
    url: 'v6/google_signin',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    data,
});
const userInfoRequest = (auth_code) => {
    const headers = {};
    if (auth_code)
        headers['x-authorization'] = auth_code;
    return axiosCustom.request({
        url: 'v7/info/',
        method: 'GET',
        headers,
    });
};
/**
 * Returns custom axios request object for logout
 * @param  {authToken} string User AuthToken
 */
const logout = (authToken) => axiosCustom.request({
    url: '/logout',
    method: 'POST',
    headers: {
        'X-SHARED-CONTEXT': `{"user_context": {"auth_token": "${authToken}}}`,
    },
});
/**
 * Utility method to check for errors
 * @param  {any} errors Errors Objects
 */
const hasErrors = (errors) => errors && errors.length > 0;
/**
 * Utility method to return error actual message from verbose error object
 * @param  {any} errors Error Objects
 */
const getErrors = (errors) => errors.map((error) => error.msg);
exports.requestInstance = {
    login,
    googleSignin,
    hasErrors,
    getErrors,
    userInfoRequest,
    logout,
};
