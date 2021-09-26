import React, { useCallback, useEffect, useState, Fragment } from "react";
import "./index.css";

interface Colums {
  title: string;
  dataIndex: string;
  key: string;
  render: (data: any) => React.ReactElement;
}
interface TableProps {
  columns: Colums[];
  dataSource: any[];
  className: string;
  pageSize?: number;
  pageNumber?: number;
}
let mouseFlag = false;
export default function Table(props: TableProps) {
  const { columns, dataSource, className, pageNumber, pageSize } = props;
  const [activeCellIndex, setActiveCellIndex] = useState<any>(null);
  const [activeRange, setActiveRange] = useState<any>({});
  const [sTop, setTop] = useState(0);
  const [curIndex, setCurIndex] = useState<any>(null);
  const [cellInfo, setCellInfo] = useState<any>({});
  // const [pageSize, setPageSize] = useState(10);
  // const [pageNumber, setPageNum] = useState(1);
  const [fRenderBottom, setRenderBottom] = useState<any>(null);
  function getCurrentPageData(dataSource: any) {
    return dataSource;
  }
  function GetColGroup(): any {
    return columns.map((item: Colums, index) => (
      <col style={{ width: 200 }} key={`${index}_col`}></col>
    ));
  }
  function GetThead(): any {
    return columns.map((item: Colums, index) => (
      <th key={`${index}_th`} style={{ padding: "16px" }} className="table-th">
        {item.title}
      </th>
    ));
  }
  function GetTableBodyCell(data: any, rowIndex: number): any {
    return columns.map((item: Colums, colIndex) => {
      const key = item.key;
      const targetIndex = `${rowIndex}_${colIndex}`;
      const bActive =
        activeCellIndex?.rowIndex === rowIndex &&
        activeCellIndex?.colIndex === colIndex;
      const bActiveRange = activeRange[targetIndex];
      return (
        <td
          className={"table-cell"}
          key={`${colIndex}_cell`}
          onClick={(e) =>
            clickTableCell(e, rowIndex, colIndex, { data: data[key], key })
          }
          key-name={`${rowIndex}_${colIndex}`}
        >
          {item.render ? item.render(data[key]) : data[key]}
          {bActive && (
            <div className="cur-box">
              <div
                className="cur-box-dot"
                onMouseDown={(e) => mouseDown(e, rowIndex, colIndex)}
              ></div>
            </div>
          )}
          {bActiveRange && <div className="cur-box-left"></div>}
        </td>
      );
    });
  }
  function GetTableBodyTr(): any {
    if (getCurrentPageData(dataSource).length > 0) {
      return getCurrentPageData(dataSource).map((data: any, index: number) => {
        return (
          <tr className="body-tr" key={`${index}_body_tr`}>
            {GetTableBodyCell(data, index)}
          </tr>
        );
      });
    }
  }
  function clickTableCell(
    e: any,
    rowIndex: number,
    colIndex: number,
    cellData: { data: any; key: string }
  ) {
    if (colIndex === 0 || e.target.className !== "table-cell") {
      return;
    }
    const activeIndex = { rowIndex, colIndex, cellData };
    setActiveRange({});
    setActiveCellIndex(activeIndex);
  }
  function mouseDown(
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    rowIndex: number,
    colIndex: number
  ) {
    if (colIndex === 0) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    mouseFlag = true;
  }
  function findActiveIndex(x: number, y: number) {
    if (!mouseFlag) return;
    const ret: any = {};
    document.body.style.cursor = "crosshair";
    const startX = activeCellIndex.rowIndex;
    const startY = activeCellIndex.colIndex;
    const cellValue = activeCellIndex.cellData;
    const box: any = document.querySelector(".auto-fill-table");
    const diff = fRenderBottom - cellInfo["0_0"]["info"].bottom;
    for (const key in cellInfo) {
      const perCell = cellInfo[key];
      const perY = perCell.info.bottom;
      const Y = perCell.y;
      const X = perCell.x;
      if (
        startX < X &&
        y + box.scrollTop + perCell.info.height - (diff + perY) > -10 &&
        startY == Y
      ) {
        ret[key] = key;
        const targetKey = cellValue["key"];
        if (getCurrentPageData(dataSource)[X]?.[targetKey].data) {
          getCurrentPageData(dataSource)[X][targetKey].data =
            cellValue["data"]["data"];
        }
      }
    }
    interate(y, ret);
    deleteStartPos(ret);
    setActiveRange({ ...ret });
  }
  function interate(y: number, ret: { [x: string]: string }) {
    const box = document.querySelector(".auto-fill-table");
    if (!box) return;
    const bottom = box.getBoundingClientRect().bottom;
    const scrollPosition = Math.abs(y - bottom);
    const arr = Object.keys(ret);
    const lasteActiveKey = arr[arr.length - 1];
    const lasteCell = cellInfo[lasteActiveKey];
    const cellValue = activeCellIndex.cellData;
    setTimeout(function () {
      // box.removeEventListener("mousemove", mouseMoveAction);
      if (scrollPosition > 0 && scrollPosition < 30 && mouseFlag) {
        if (lasteCell) {
          let newTop = lasteCell.info.height;
          setTop(newTop);
          setCurIndex(lasteActiveKey);
          ret[`${Number(lasteCell.x) + 1}_${Number(lasteCell.y)}`] = `${
            Number(lasteCell.x) + 1
          }_${Number(lasteCell.y)}`;
          const targetKey = cellValue["key"];
          if (getCurrentPageData(dataSource)[Number(lasteCell.x) + 1]) {
            getCurrentPageData(dataSource)[Number(lasteCell.x) + 1][
              targetKey
            ].data = cellValue["data"]["data"];
          }
          deleteStartPos(ret);
          setActiveRange({ ...ret });
        }
        interate(y, ret);
      }
    }, 1000);
  }
  function mouseMove(event: React.MouseEvent<HTMLElement, MouseEvent>) {
    event.preventDefault();
    event.stopPropagation();
    findActiveIndex(event.clientX, event.clientY);
  }
  function throttle(
    fn: {
      (event: React.MouseEvent<HTMLElement, MouseEvent>): void;
      (arg0: any): void;
    },
    delay: number
  ) {
    let timer = null;
    if (timer) {
      return;
    }
    return function (args: any) {
      timer = setTimeout(function () {
        fn(args);
      }, delay);
    };
  }
  const throttleMouseMove: any = throttle(mouseMove, 300);
  const mouseMoveAction = useCallback(
    (value) => throttleMouseMove(value),
    [activeCellIndex, mouseFlag, pageNumber, pageSize]
  );
  function globalMouseUp() {
    mouseFlag = false;
    document.body.style.cursor = "pointer";
    setActiveRange({});
    setActiveCellIndex(null);
  }
  function deleteStartPos(ret: { [x: string]: any }) {
    const startX = activeCellIndex.rowIndex;
    const startY = activeCellIndex.colIndex;
    delete ret[`${startX}_${startY}`];
  }
  useEffect(() => {
    document.body.style.cursor = "pointer";
    const tBody: any = document.querySelector(".auto-fill-table");
    const cells = tBody.querySelectorAll(".table-cell");
    const length = cells.length;
    if (cells.length > 0) {
      for (let i = 0; i < length; i += 1) {
        const perCell = cells[i];
        const keyName = perCell.attributes["key-name"]["nodeValue"];
        const posArr = keyName.split("_");
        cellInfo[keyName] = {
          info: perCell.getBoundingClientRect(),
          x: posArr[0],
          y: posArr[1],
        };
      }
    }
    mouseFlag = false;
    setCellInfo({ ...cellInfo });
    if (cellInfo["0_0"] && !fRenderBottom) {
      setRenderBottom(cellInfo["0_0"]["info"].bottom);
    }
  }, [columns, dataSource, pageSize, pageNumber]);
  useEffect(() => {
    if (activeCellIndex) {
      const dom: any = document.querySelector(".auto-fill-table");
      dom.addEventListener("mousemove", mouseMoveAction);
      return () => dom.removeEventListener("mousemove", mouseMoveAction);
    } else {
      return;
    }
  }, [activeCellIndex, mouseFlag, cellInfo, dataSource, pageSize, pageNumber]);
  useEffect(() => {
    window.addEventListener("mouseup", globalMouseUp);
    return () => window.removeEventListener("mouseup", globalMouseUp);
  }, []);
  useEffect(() => {
    const box = document.querySelector(".auto-fill-table");
    if (!box) return;
    if (mouseFlag) {
      box.scrollTop += sTop;
    }
  }, [curIndex]);
  useEffect(() => {
    const tBody: any = document.querySelector(".auto-fill-table");
    tBody.scrollTop = 0;
  }, [pageSize, pageNumber]);
  return (
    <Fragment>
      <table className={`${className} auto-fill-table`}>
        <colgroup>{GetColGroup()}</colgroup>
        <thead className="table-head">
          <tr className="table-thd-tr">{GetThead()}</tr>
        </thead>
        <tbody className="table-body">
          <colgroup>{GetColGroup()}</colgroup>
          {GetTableBodyTr()}
        </tbody>
      </table>
    </Fragment>
  );
}
