import React, {useState} from "react";
import {useMatrixContext} from "../../MatrixContext/MatrixContext";
import {Cell} from "../../dataTypes/dataTypes";
import "./MatrixItem.css"

interface MatrixItemProps {
    matrixItem: Cell
    percentage: number;
    amount: number;
    highlightCellsNumber: number;
    isHighlight: boolean;
    id: number;
}

export const MatrixItem = ({
                               matrixItem,
                               percentage,
                               amount,
                               highlightCellsNumber,
                               isHighlight,
                               id
                           }: MatrixItemProps) => {

    const [isPercentageShow, setPercentageShow] = useState(false);
    const {matrix, setMatrix } = useMatrixContext();
    const percentageToSrt = (percent: number) => (percent * 100).toLocaleString(undefined, {
        minimumFractionDigits: 1,
        maximumFractionDigits: 1,
    }) + '%';

    const onClickMatrixItem = (id: number) => {
        const incrementItemAmount = (item: Cell) => (
            item.id === id
                ? {...item, amount: item.amount + 1}
                : item
        );

        const updatedMatrix = matrix.map(incrementItemAmount);
        setMatrix(updatedMatrix);
    };

    const onMouseEnterHandler = () => {
        setPercentageShow(true);

        const closestCells = matrix
            .map((item: Cell) => ({
                ...item,
                amountDelta: Math.abs(item.amount - amount),
            }))
            .sort((a: any, b: any) => a.amountDelta - b.amountDelta)
            .slice(0, highlightCellsNumber);
        setMatrix(matrix.map((item: any) => {
            return {
                ...item,
                isHighlight: closestCells.some((hashItem: any) => {
                    return hashItem.id === item.id;
                }),
            };
        }));
    };

    const onMouseLeaveHandler = () => {
        setPercentageShow(false);
        setMatrix(matrix.map((item: Cell) => ({
            ...item,
            isHighlight: false,
        })));
    };
    return (
        <button
            type="button"
            className={`matrix__item ${isHighlight ? 'matrix__item_higlight' : ''}`}
            onClick={() => onClickMatrixItem(id)}
            onMouseEnter={onMouseEnterHandler}
            onMouseLeave={onMouseLeaveHandler}
        >
            {isPercentageShow
                ? (
                    <span className="matrix__button-text">
            {percentageToSrt(percentage)}
          </span>
                )
                : (
                    <span className="matrix__button-text">
            {matrixItem.amount}
          </span>
                )}
        </button>
    );

};

