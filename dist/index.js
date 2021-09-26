"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Table = exports.Pagination = void 0;
var pagination_1 = require("./react-table/pagination");
Object.defineProperty(exports, "Pagination", { enumerable: true, get: function () { return __importDefault(pagination_1).default; } });
var table_1 = require("./react-table/table");
Object.defineProperty(exports, "Table", { enumerable: true, get: function () { return __importDefault(table_1).default; } });
