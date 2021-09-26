"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
require("./index.css");
var mouseFlag = false;
function Table(props) {
    var columns = props.columns, dataSource = props.dataSource, className = props.className, pageNumber = props.pageNumber, pageSize = props.pageSize;
    var _a = (0, react_1.useState)(null), activeCellIndex = _a[0], setActiveCellIndex = _a[1];
    var _b = (0, react_1.useState)({}), activeRange = _b[0], setActiveRange = _b[1];
    var _c = (0, react_1.useState)(0), sTop = _c[0], setTop = _c[1];
    var _d = (0, react_1.useState)(null), curIndex = _d[0], setCurIndex = _d[1];
    var _e = (0, react_1.useState)({}), cellInfo = _e[0], setCellInfo = _e[1];
    // const [pageSize, setPageSize] = useState(10);
    // const [pageNumber, setPageNum] = useState(1);
    var _f = (0, react_1.useState)(null), fRenderBottom = _f[0], setRenderBottom = _f[1];
    function getCurrentPageData(dataSource) {
        return dataSource;
    }
    function GetColGroup() {
        return columns.map(function (item, index) { return (react_1.default.createElement("col", { style: { width: 200 }, key: index + "_col" })); });
    }
    function GetThead() {
        return columns.map(function (item, index) { return (react_1.default.createElement("th", { key: index + "_th", style: { padding: "16px" }, className: "table-th" }, item.title)); });
    }
    function GetTableBodyCell(data, rowIndex) {
        return columns.map(function (item, colIndex) {
            var key = item.key;
            var targetIndex = rowIndex + "_" + colIndex;
            var bActive = (activeCellIndex === null || activeCellIndex === void 0 ? void 0 : activeCellIndex.rowIndex) === rowIndex &&
                (activeCellIndex === null || activeCellIndex === void 0 ? void 0 : activeCellIndex.colIndex) === colIndex;
            var bActiveRange = activeRange[targetIndex];
            return (react_1.default.createElement("td", { className: "table-cell", key: colIndex + "_cell", onClick: function (e) {
                    return clickTableCell(e, rowIndex, colIndex, { data: data[key], key: key });
                }, "key-name": rowIndex + "_" + colIndex },
                item.render ? item.render(data[key]) : data[key],
                bActive && (react_1.default.createElement("div", { className: "cur-box" },
                    react_1.default.createElement("div", { className: "cur-box-dot", onMouseDown: function (e) { return mouseDown(e, rowIndex, colIndex); } }))),
                bActiveRange && react_1.default.createElement("div", { className: "cur-box-left" })));
        });
    }
    function GetTableBodyTr() {
        if (getCurrentPageData(dataSource).length > 0) {
            return getCurrentPageData(dataSource).map(function (data, index) {
                return (react_1.default.createElement("tr", { className: "body-tr", key: index + "_body_tr" }, GetTableBodyCell(data, index)));
            });
        }
    }
    function clickTableCell(e, rowIndex, colIndex, cellData) {
        if (colIndex === 0 || e.target.className !== "table-cell") {
            return;
        }
        var activeIndex = { rowIndex: rowIndex, colIndex: colIndex, cellData: cellData };
        setActiveRange({});
        setActiveCellIndex(activeIndex);
    }
    function mouseDown(e, rowIndex, colIndex) {
        if (colIndex === 0) {
            return;
        }
        e.preventDefault();
        e.stopPropagation();
        mouseFlag = true;
    }
    function findActiveIndex(x, y) {
        var _a;
        if (!mouseFlag)
            return;
        var ret = {};
        document.body.style.cursor = "crosshair";
        var startX = activeCellIndex.rowIndex;
        var startY = activeCellIndex.colIndex;
        var cellValue = activeCellIndex.cellData;
        var box = document.querySelector(".auto-fill-table");
        var diff = fRenderBottom - cellInfo["0_0"]["info"].bottom;
        for (var key in cellInfo) {
            var perCell = cellInfo[key];
            var perY = perCell.info.bottom;
            var Y = perCell.y;
            var X = perCell.x;
            if (startX < X &&
                y + box.scrollTop + perCell.info.height - (diff + perY) > -10 &&
                startY == Y) {
                ret[key] = key;
                var targetKey = cellValue["key"];
                if ((_a = getCurrentPageData(dataSource)[X]) === null || _a === void 0 ? void 0 : _a[targetKey].data) {
                    getCurrentPageData(dataSource)[X][targetKey].data =
                        cellValue["data"]["data"];
                }
            }
        }
        interate(y, ret);
        deleteStartPos(ret);
        setActiveRange(__assign({}, ret));
    }
    function interate(y, ret) {
        var box = document.querySelector(".auto-fill-table");
        if (!box)
            return;
        var bottom = box.getBoundingClientRect().bottom;
        var scrollPosition = Math.abs(y - bottom);
        var arr = Object.keys(ret);
        var lasteActiveKey = arr[arr.length - 1];
        var lasteCell = cellInfo[lasteActiveKey];
        var cellValue = activeCellIndex.cellData;
        setTimeout(function () {
            // box.removeEventListener("mousemove", mouseMoveAction);
            if (scrollPosition > 0 && scrollPosition < 30 && mouseFlag) {
                if (lasteCell) {
                    var newTop = lasteCell.info.height;
                    setTop(newTop);
                    setCurIndex(lasteActiveKey);
                    ret[Number(lasteCell.x) + 1 + "_" + Number(lasteCell.y)] = Number(lasteCell.x) + 1 + "_" + Number(lasteCell.y);
                    var targetKey = cellValue["key"];
                    if (getCurrentPageData(dataSource)[Number(lasteCell.x) + 1]) {
                        getCurrentPageData(dataSource)[Number(lasteCell.x) + 1][targetKey].data = cellValue["data"]["data"];
                    }
                    deleteStartPos(ret);
                    setActiveRange(__assign({}, ret));
                }
                interate(y, ret);
            }
        }, 1000);
    }
    function mouseMove(event) {
        event.preventDefault();
        event.stopPropagation();
        findActiveIndex(event.clientX, event.clientY);
    }
    function throttle(fn, delay) {
        var timer = null;
        if (timer) {
            return;
        }
        return function (args) {
            timer = setTimeout(function () {
                fn(args);
            }, delay);
        };
    }
    var throttleMouseMove = throttle(mouseMove, 300);
    var mouseMoveAction = (0, react_1.useCallback)(function (value) { return throttleMouseMove(value); }, [activeCellIndex, mouseFlag, pageNumber, pageSize]);
    function globalMouseUp() {
        mouseFlag = false;
        document.body.style.cursor = "pointer";
        setActiveRange({});
        setActiveCellIndex(null);
    }
    function deleteStartPos(ret) {
        var startX = activeCellIndex.rowIndex;
        var startY = activeCellIndex.colIndex;
        delete ret[startX + "_" + startY];
    }
    (0, react_1.useEffect)(function () {
        document.body.style.cursor = "pointer";
        var tBody = document.querySelector(".auto-fill-table");
        var cells = tBody.querySelectorAll(".table-cell");
        var length = cells.length;
        if (cells.length > 0) {
            for (var i = 0; i < length; i += 1) {
                var perCell = cells[i];
                var keyName = perCell.attributes["key-name"]["nodeValue"];
                var posArr = keyName.split("_");
                cellInfo[keyName] = {
                    info: perCell.getBoundingClientRect(),
                    x: posArr[0],
                    y: posArr[1],
                };
            }
        }
        mouseFlag = false;
        setCellInfo(__assign({}, cellInfo));
        if (cellInfo["0_0"] && !fRenderBottom) {
            setRenderBottom(cellInfo["0_0"]["info"].bottom);
        }
    }, [columns, dataSource, pageSize, pageNumber]);
    (0, react_1.useEffect)(function () {
        if (activeCellIndex) {
            var dom_1 = document.querySelector(".auto-fill-table");
            dom_1.addEventListener("mousemove", mouseMoveAction);
            return function () { return dom_1.removeEventListener("mousemove", mouseMoveAction); };
        }
        else {
            return;
        }
    }, [activeCellIndex, mouseFlag, cellInfo, dataSource, pageSize, pageNumber]);
    (0, react_1.useEffect)(function () {
        window.addEventListener("mouseup", globalMouseUp);
        return function () { return window.removeEventListener("mouseup", globalMouseUp); };
    }, []);
    (0, react_1.useEffect)(function () {
        var box = document.querySelector(".auto-fill-table");
        if (!box)
            return;
        if (mouseFlag) {
            box.scrollTop += sTop;
        }
    }, [curIndex]);
    (0, react_1.useEffect)(function () {
        var tBody = document.querySelector(".auto-fill-table");
        tBody.scrollTop = 0;
    }, [pageSize, pageNumber]);
    return (react_1.default.createElement(react_1.Fragment, null,
        react_1.default.createElement("table", { className: className + " auto-fill-table" },
            react_1.default.createElement("colgroup", null, GetColGroup()),
            react_1.default.createElement("thead", { className: "table-head" },
                react_1.default.createElement("tr", { className: "table-thd-tr" }, GetThead())),
            react_1.default.createElement("tbody", { className: "table-body" },
                react_1.default.createElement("colgroup", null, GetColGroup()),
                GetTableBodyTr()))));
}
exports.default = Table;
