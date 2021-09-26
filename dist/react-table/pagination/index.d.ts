/// <reference types="react" />
import "./pagination.css";
interface pagination {
    count: number;
    changePageSize: (pageSize: number) => void;
    changePageNum: (pageNum: number) => void;
    pageSizeOption: number[] | string[];
}
export default function Pagination(props: pagination): JSX.Element;
export {};
