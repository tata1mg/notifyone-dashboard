"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unknownEndpoint = exports.errorHandler = exports.tokenExtractor = void 0;
const winston_1 = __importDefault(require("../config/winston"));
/**
 * Middleware to extract bearer token from request and attach to "token" to request object
 * @param  {AuthCustomRequest} request Http Request
 * @param  {AuthCustomResponse} response Http Response
 * @param  {NextFunction} next Express Next Function
 */
const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization');
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7);
    }
    next();
};
exports.tokenExtractor = tokenExtractor;
/**
 * Middleware to handle common error's and send response from middleware
 * @param  {any} error Error
 * @param  {Request} request Http Request
 * @param  {Response} response Http Response
 * @param  {NextFunction} next Express Next function
 */
const errorHandler = (error, request, response, next) => {
    winston_1.default.error(error.message);
    if (error.name === 'CastError') {
        response.status(400).send({ error: 'malformatted id' });
    }
    if (error.name === 'ValidationError') {
        response.status(400).json({ error: error.message });
    }
    if (error.name === 'JsonWebTokenError' ||
        error.name === 'TokenExpiredError') {
        response.status(401).json({
            error: 'invalid token! Logout and Retry',
        });
    }
    next(error);
};
exports.errorHandler = errorHandler;
/**
 * Middleware to return unknown endpoint for not defined routes
 * @param  {Request} request Http Request
 * @param  {Response} response Http Response
 */
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' });
};
exports.unknownEndpoint = unknownEndpoint;
