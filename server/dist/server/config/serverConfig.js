"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// eslint-disable-next-line import/no-relative-packages
const config_json_1 = __importDefault(require("../../src/config.json"));
// eslint-disable-next-line import/no-mutable-exports
let config;
if (config_json_1.default.server) {
    config = config_json_1.default.server;
}
exports.default = config;
