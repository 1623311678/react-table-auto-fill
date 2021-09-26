"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./pagination.css");
var SWITCH_TYPE;
(function (SWITCH_TYPE) {
    SWITCH_TYPE[SWITCH_TYPE["PRE"] = 0] = "PRE";
    SWITCH_TYPE[SWITCH_TYPE["NEXT"] = 1] = "NEXT";
})(SWITCH_TYPE || (SWITCH_TYPE = {}));
function Pagination(props) {
    var _a = (0, react_1.useState)({
        start: 2,
        end: 6
    }), range = _a[0], setRange = _a[1];
    var count = props.count, changePageSize = props.changePageSize, changePageNum = props.changePageNum, pageSizeOption = props.pageSizeOption;
    var _b = (0, react_1.useState)(0), activeIndex = _b[0], setActiveIndex = _b[1];
    var _c = (0, react_1.useState)(__spreadArray([], pageSizeOption, true)), nums = _c[0], setNums = _c[1];
    var _d = (0, react_1.useState)(false), bExpand = _d[0], setExpandStatus = _d[1];
    var _e = (0, react_1.useState)(nums[0]), curSize = _e[0], setCurSize = _e[1];
    var arr = new Array(count).fill(0);
    var length = arr.length;
    function bShowRange(index) {
        var curRange = index + 1;
        if (range.start <= curRange && curRange <= range.end) {
            return true;
        }
        if (curRange === 1 || curRange === length) {
            return true;
        }
        return false;
    }
    function linkToPrePage(e) {
        e.stopPropagation();
        e.preventDefault();
        var start = range.start;
        var end = range.end;
        if (start - 5 > 1) {
            end = start;
            start -= 5;
        }
        else {
            start = 2;
            end = 6;
        }
        setRange({
            start: start,
            end: end
        });
    }
    function linkToNextPage(e) {
        e.stopPropagation();
        e.preventDefault();
        var start = range.start;
        var end = range.end;
        if (start + 5 <= length) {
            start += 5;
        }
        if (start + 5 <= length) {
            end = start + 5;
        }
        else {
            end = length - 1;
            start = length - 1 - 5;
        }
        setRange({
            start: start,
            end: end
        });
    }
    function JumpDot() {
        return react_1.default.createElement("div", { className: "jump-dot" }, "\u2022\u2022\u2022");
    }
    function getPreContent(index) {
        return (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement("li", { className: "pagination-num switch-pre-btn", onClick: function (e) { return switchPreNextNum(e, SWITCH_TYPE.PRE); } },
                react_1.default.createElement("svg", { viewBox: "64 64 896 896", focusable: "false", "data-icon": "left", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true" },
                    react_1.default.createElement("path", { d: "M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z" }))),
            react_1.default.createElement("li", { className: "pagination-num " + (activeIndex === index ? "auto-fill-active" : ""), onClick: function () { return switchPageNum(index); } }, index + 1),
            react_1.default.createElement("li", { className: "pagination-num pagination-jump-icon" },
                react_1.default.createElement(JumpDot, null),
                react_1.default.createElement("div", { className: "jump-icon", title: "向后5页", onClick: linkToPrePage },
                    react_1.default.createElement("svg", { viewBox: "64 64 896 896", focusable: "false", "data-icon": "double-left", width: "1em", height: "1em", fill: "#40a9ff", "aria-hidden": "true" },
                        react_1.default.createElement("path", { d: "M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z" }))))));
    }
    function getNextContent(index) {
        return (react_1.default.createElement(react_1.Fragment, null,
            react_1.default.createElement("li", { className: "pagination-num pagination-jump-icon" },
                react_1.default.createElement(JumpDot, null),
                react_1.default.createElement("div", { className: "jump-icon", title: "向后5页", onClick: linkToNextPage },
                    react_1.default.createElement("svg", { viewBox: "64 64 896 896", focusable: "false", "data-icon": "double-right", width: "1em", height: "1em", fill: "#40a9ff", "aria-hidden": "true" },
                        react_1.default.createElement("path", { d: "M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 00188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 00492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z" })))),
            react_1.default.createElement("li", { className: "pagination-num " + (activeIndex === index ? "auto-fill-active" : ""), onClick: function () { return switchPageNum(index); } }, index + 1),
            react_1.default.createElement("li", { className: "pagination-num switch-next-btn", onClick: function (e) { return switchPreNextNum(e, SWITCH_TYPE.NEXT); } },
                react_1.default.createElement("svg", { viewBox: "64 64 896 896", focusable: "false", "data-icon": "right", width: "1em", height: "1em", fill: "currentColor", "aria-hidden": "true" },
                    react_1.default.createElement("path", { d: "M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z" })))));
    }
    function getNormalContent(index) {
        return (react_1.default.createElement("li", { className: "pagination-num " + (activeIndex === index ? "auto-fill-active" : ""), onClick: function () { return switchPageNum(index); } }, index + 1));
    }
    function switchPageNum(index) {
        setActiveIndex(index);
        changePageNum(index + 1);
    }
    function switchPreNextNum(e, type) {
        e.stopPropagation();
        e.preventDefault();
        var start = range.start;
        var end = range.end;
        var targetIndex = activeIndex + 1;
        switch (type) {
            case SWITCH_TYPE.PRE: {
                targetIndex -= 1;
                start = targetIndex;
                targetIndex -= 1;
                end = start + 5;
                if (start <= 1) {
                    start = 2;
                    end = 6;
                }
                if (end >= length) {
                    end = length - 1;
                    start = end - 5;
                }
                break;
            }
            case SWITCH_TYPE.NEXT: {
                start = targetIndex + 1;
                end = start + 5;
                if (end >= length) {
                    end = length - 1;
                    start = end - 5;
                }
                break;
            }
        }
        if (targetIndex < length) {
            setActiveIndex(targetIndex);
            setRange({
                start: start,
                end: end
            });
        }
    }
    function expandSelector(e) {
        e.stopPropagation();
        e.preventDefault();
        setExpandStatus(function (status) { return !status; });
    }
    function switchPageSize(e, item) {
        e.stopPropagation();
        e.preventDefault();
        setCurSize(item);
        setExpandStatus(function (status) { return !status; });
        changePageSize(item);
        setActiveIndex(0);
    }
    return (react_1.default.createElement("div", { className: "auto-fill-pagination" },
        react_1.default.createElement("div", null,
            react_1.default.createElement("ul", null, arr.map(function (item, index) {
                if (bShowRange(index)) {
                    switch (index + 1) {
                        case 1: {
                            return getPreContent(index);
                        }
                        case length: {
                            return getNextContent(index);
                        }
                        default: {
                            return getNormalContent(index);
                        }
                    }
                }
                else {
                    return '';
                }
            }))),
        react_1.default.createElement("div", { className: "pagination-selector" },
            react_1.default.createElement("div", { className: "selector-input" },
                react_1.default.createElement("input", { autoComplete: "off", value: curSize + "\u6761/\u9875", className: "select-search", readOnly: true }),
                react_1.default.createElement("div", { className: "selector-expand-icon", onClick: function (e) { return expandSelector(e); } },
                    react_1.default.createElement("svg", { viewBox: "64 64 896 896", focusable: "false", "data-icon": "down", width: "1em", height: "1em", "aria-hidden": "true", fill: "#ccc" },
                        react_1.default.createElement("path", { d: "M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z" })))),
            bExpand && (react_1.default.createElement("ul", { className: "selector-content" }, nums.map(function (item, index) { return (react_1.default.createElement("li", { key: item + "_" + index, onClick: function (e) { return switchPageSize(e, item); }, className: "" + (curSize == item ? 'active' : "") }, item + "\u6761/\u9875")); }))))));
}
exports.default = Pagination;
