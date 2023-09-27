import React from "react";
import "./ColumAvarage.css"
interface ColumnAverageProps {
    amount: number;
}
export const ColumnAverage = ({ amount = 0 }:ColumnAverageProps) => {
    return (
        <div className="matrix__column-average">{amount}</div>
    );
}


