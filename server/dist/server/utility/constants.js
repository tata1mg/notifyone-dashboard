"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BEARER_TOKEN = exports.JWT_EXPIRE_TIME = exports.JWT_DECODE_AT_PROXY = exports.INSUFFICIENT_ROLES = exports.JWT_EXPIRED_ERROR = void 0;
// Errors
exports.JWT_EXPIRED_ERROR = `JWT Token Expired or Decode Error. Login again to continue.`;
exports.INSUFFICIENT_ROLES = `It seems like you do not have sufficient roles to access the dashboard.`;
exports.JWT_DECODE_AT_PROXY = `JWT Decode/Timeout Error Recorded while accessing`;
exports.JWT_EXPIRE_TIME = '10h';
exports.BEARER_TOKEN = 'bearer ';
