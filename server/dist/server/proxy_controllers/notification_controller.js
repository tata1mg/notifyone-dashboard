"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationProxy = void 0;
const proxy = require("express-http-proxy");
const serverConfig_1 = __importDefault(require("../config/serverConfig"));
const constants_1 = require("../utility/constants");
/**
Proxy Middleware for Notification (Communication) App
*/
function notificationProxy() {
    return proxy(serverConfig_1.default.base_notification_url, {
        reqAsBuffer: true,
        reqBodyEncoding: null,
        limit: 15728640,
        proxyReqOptDecorator: (proxyReqOpts, srcReq) => {
            /**
             * Modify Proxy Req Options
             */
            const proxyReq = proxyReqOpts;
            // const authorization = srcReq.get('authorization');
            // if (
            //   authorization &&
            //   authorization.toLowerCase().startsWith(BEARER_TOKEN)
            // ) {
            //   const jwtToken = authorization.substring(BEARER_TOKEN.length);
            //   try {
            //     const decodedToken = jwt.verify(
            //       jwtToken,
            //       config.jwt_secret
            //     ) as jwtTokenPayload;
            //     logger.info(
            //       `user is trying to proxy ${SERVICE_IDENTIFIER.NOTIFICATION_CORE}`
            //     );
            //     // proxyReq.headers = proxyReq.headers ?? {};
            //     // proxyReq.headers.Authorization = decodedToken.auth_token;
            //   } catch (error) {
            //     logger.error(
            //       `${JWT_DECODE_AT_PROXY} ${SERVICE_IDENTIFIER.NOTIFICATION_CORE}`
            //     );
            //     //   console.error("JSON Timeout Or Decode Error");
            //   }
            // }
            return proxyReq;
        },
        userResDecorator(proxyRes, proxyResData, userReq, userRes) {
            var _a;
            /**
             * Response is intercepted
             */
            try {
                const data = JSON.parse(proxyResData.toString('utf8'));
                if ((_a = data === null || data === void 0 ? void 0 : data.error) === null || _a === void 0 ? void 0 : _a.startsWith('Your session')) {
                    // Session Expired Error == JWT Error
                    data.error = `${constants_1.JWT_EXPIRED_ERROR}`;
                }
            }
            catch (error) {
                const data = proxyResData.toString('utf8');
                return data;
            }
            // data.newProperty = 'exciting data';
            return proxyResData;
        },
    });
}
exports.notificationProxy = notificationProxy;
