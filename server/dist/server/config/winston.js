"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
const { colorize, errors } = winston_1.format;
const getFormatedDate = () => {
    function padStr(i) {
        return i < 10 ? `0${i}` : `${i}`;
    }
    const temp = new Date();
    const dateStr = padStr(temp.getFullYear()) +
        padStr(1 + temp.getMonth()) +
        padStr(temp.getDate()) +
        padStr(temp.getHours()) +
        padStr(temp.getMinutes()) +
        padStr(temp.getSeconds());
    return dateStr;
};
const logConfiguration = {
    transports: [
        new winston_1.transports.Console({
            level: 'warn',
        }),
        new winston_1.transports.File({
            level: 'info',
            filename: 'logs/info.log',
            maxsize: 1024 * 1024 * 20,
            rotationFormat: () => getFormatedDate(),
            format: winston_1.format.combine(errors({ stack: true }), colorize(), winston_1.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), winston_1.format.align(), winston_1.format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`)),
        }),
        new winston_1.transports.File({
            level: 'error',
            filename: 'logs/error.log',
            maxsize: 1024 * 1024 * 20,
            rotationFormat: () => getFormatedDate(),
            format: winston_1.format.combine(errors({ stack: true }), colorize(), winston_1.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), winston_1.format.align(), winston_1.format.printf((error) => `${error.level}: ${[error.timestamp]}: ${error.message}`)),
        }),
        new winston_1.transports.File({
            level: 'debug',
            filename: 'logs/debug.log',
            maxsize: 1024 * 1024 * 20,
            rotationFormat: () => getFormatedDate(),
            format: winston_1.format.combine(errors({ stack: true }), colorize(), winston_1.format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }), winston_1.format.align(), winston_1.format.printf((debug) => `${debug.level}: ${[debug.timestamp]}: ${debug.message}`)),
        }),
    ],
};
// eslint-disable-next-line import/prefer-default-export
const logger = () => (0, winston_1.createLogger)(logConfiguration);
exports.default = logger();
