import React from 'react';
import './RowSum.css'

interface IRowSum {
    amount: number;
}
export const RowSum = ({amount = 0}: IRowSum) => {
    return (
        <div  className="matrix__row-sum">{amount}</div>
    )
}

