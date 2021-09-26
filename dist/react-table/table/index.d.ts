import React from "react";
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
export default function Table(props: TableProps): JSX.Element;
export {};
