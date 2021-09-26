import React, { useState, useEffect, Fragment } from "react";
import "./pagination.css";
interface pagination{
  count:number,
  changePageSize:(pageSize:number)=>void
  changePageNum:(pageNum:number)=>void
  pageSizeOption:number[]|string[]
}
enum SWITCH_TYPE {
  PRE,
  NEXT
}
export default function Pagination(props:pagination) {
  const [range, setRange] = useState({
    start: 2,
    end: 6
  });
  const { count,changePageSize,changePageNum,pageSizeOption} = props
  const [activeIndex, setActiveIndex] = useState(0);
  const [nums, setNums] = useState([...pageSizeOption]);
  const [bExpand, setExpandStatus] = useState(false);
  const [curSize,setCurSize] = useState(nums[0])
  const arr = new Array(count).fill(0);
  const length = arr.length;
  function bShowRange(index:number) {
    const curRange = index + 1;
    if (range.start <= curRange && curRange <= range.end) {
      return true;
    }
    if (curRange === 1 || curRange === length) {
      return true;
    }
    return false;
  }
  function linkToPrePage(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    let start = range.start;
    let end = range.end;
    if (start - 5 > 1) {
      end = start;
      start -= 5;
    } else {
      start = 2;
      end = 6;
    }
    setRange({
      start,
      end
    });
  }
  function linkToNextPage(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    let start = range.start;
    let end = range.end;
    if (start + 5 <= length) {
      start += 5;
    }
    if (start + 5 <= length) {
      end = start + 5;
    } else {
      end = length - 1;
      start = length - 1 - 5;
    }
    setRange({
      start,
      end
    });
  }
  function JumpDot() {
    return <div className="jump-dot">•••</div>;
  }
  function getPreContent(index: number) {
    return (
      <Fragment>
        <li
          className="pagination-num switch-pre-btn"
          onClick={e => switchPreNextNum(e, SWITCH_TYPE.PRE)}
        >
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="left"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M724 218.3V141c0-6.7-7.7-10.4-12.9-6.3L260.3 486.8a31.86 31.86 0 000 50.3l450.8 352.1c5.3 4.1 12.9.4 12.9-6.3v-77.3c0-4.9-2.3-9.6-6.1-12.6l-360-281 360-281.1c3.8-3 6.1-7.7 6.1-12.6z"></path>
          </svg>
        </li>
        <li
          className={`pagination-num ${
            activeIndex === index ? "auto-fill-active" : ""
          }`}
          onClick={() => switchPageNum(index)}
        >
          {index + 1}
        </li>
        <li className="pagination-num pagination-jump-icon">
          <JumpDot></JumpDot>
          <div className="jump-icon" title={"向后5页"} onClick={linkToPrePage}>
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="double-left"
              width="1em"
              height="1em"
              fill="#40a9ff"
              aria-hidden="true"
            >
              <path d="M272.9 512l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L186.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H532c6.7 0 10.4-7.7 6.3-12.9L272.9 512zm304 0l265.4-339.1c4.1-5.2.4-12.9-6.3-12.9h-77.3c-4.9 0-9.6 2.3-12.6 6.1L490.8 492.3a31.99 31.99 0 000 39.5l255.3 326.1c3 3.9 7.7 6.1 12.6 6.1H836c6.7 0 10.4-7.7 6.3-12.9L576.9 512z"></path>
            </svg>
          </div>
        </li>
      </Fragment>
    );
  }
  function getNextContent(index: number) {
    return (
      <Fragment>
        <li className="pagination-num pagination-jump-icon">
          <JumpDot></JumpDot>
          <div className="jump-icon" title={"向后5页"} onClick={linkToNextPage}>
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="double-right"
              width="1em"
              height="1em"
              fill="#40a9ff"
              aria-hidden="true"
            >
              <path d="M533.2 492.3L277.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H188c-6.7 0-10.4 7.7-6.3 12.9L447.1 512 181.7 851.1A7.98 7.98 0 00188 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5zm304 0L581.9 166.1c-3-3.9-7.7-6.1-12.6-6.1H492c-6.7 0-10.4 7.7-6.3 12.9L751.1 512 485.7 851.1A7.98 7.98 0 00492 864h77.3c4.9 0 9.6-2.3 12.6-6.1l255.3-326.1c9.1-11.7 9.1-27.9 0-39.5z"></path>
            </svg>
          </div>
        </li>
        <li
          className={`pagination-num ${
            activeIndex === index ? "auto-fill-active" : ""
          }`}
          onClick={() => switchPageNum(index)}
        >
          {index + 1}
        </li>
        <li
          className="pagination-num switch-next-btn"
          onClick={e => switchPreNextNum(e, SWITCH_TYPE.NEXT)}
        >
          <svg
            viewBox="64 64 896 896"
            focusable="false"
            data-icon="right"
            width="1em"
            height="1em"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M765.7 486.8L314.9 134.7A7.97 7.97 0 00302 141v77.3c0 4.9 2.3 9.6 6.1 12.6l360 281.1-360 281.1c-3.9 3-6.1 7.7-6.1 12.6V883c0 6.7 7.7 10.4 12.9 6.3l450.8-352.1a31.96 31.96 0 000-50.4z"></path>
          </svg>
        </li>
      </Fragment>
    );
  }
  function getNormalContent(index: number) {
    return (
      <li
        className={`pagination-num ${
          activeIndex === index ? "auto-fill-active" : ""
        }`}
        onClick={() => switchPageNum(index)}
      >
        {index + 1}
      </li>
    );
  }
  function switchPageNum(index: number) {
    setActiveIndex(index);
    changePageNum(index+1)
  }
  function switchPreNextNum(e: React.MouseEvent, type: SWITCH_TYPE) {
    e.stopPropagation();
    e.preventDefault();
    let start = range.start;
    let end = range.end;
    let targetIndex = activeIndex + 1;
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
        start,
        end
      });
    }
  }
  function expandSelector(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    setExpandStatus(status => !status);
  }
  function switchPageSize(e: React.MouseEvent,item: any){
    e.stopPropagation();
    e.preventDefault();
    setCurSize(item)
    setExpandStatus(status => !status);
    changePageSize(item)
    setActiveIndex(0)
  }
  return (
    <div className="auto-fill-pagination">
      <div>
        <ul>
          {arr.map((item, index) => {
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
            }else{
              return ''
            }
          })}
        </ul>
      </div>
      <div className="pagination-selector">
        <div className="selector-input">
          <input
            autoComplete="off"
            value={`${curSize}条/页`}
            className="select-search"
            readOnly
          />
          <div
            className="selector-expand-icon"
            onClick={e => expandSelector(e)}
          >
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="down"
              width="1em"
              height="1em"
              aria-hidden="true"
              fill="#ccc"
            >
              <path d="M884 256h-75c-5.1 0-9.9 2.5-12.9 6.6L512 654.2 227.9 262.6c-3-4.1-7.8-6.6-12.9-6.6h-75c-6.5 0-10.3 7.4-6.5 12.7l352.6 486.1c12.8 17.6 39 17.6 51.7 0l352.6-486.1c3.9-5.3.1-12.7-6.4-12.7z"></path>
            </svg>
          </div>
        </div>
        {bExpand && (
          <ul className="selector-content">
            {nums.map((item, index) => (
              <li key={`${item}_${index}`} onClick={(e)=>switchPageSize(e,item)} className={`${curSize==item?'active':""}`}>{`${item}条/页`}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}