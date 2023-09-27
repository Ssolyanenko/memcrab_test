import React, { useEffect } from "react";
import { MatrixItem } from "../MatrixItem";
import {RowSum} from "../RowSum";
import {ColumnAverage} from "../ColumnAvarage";
import {useMatrixContext} from "../../MatrixContext/MatrixContext";
import {Cell} from "../../dataTypes/dataTypes";
import "./Matrix.css";

const randomGenerator = (item:Cell, i:number) => ({
    amount: Math.floor(Math.random() * 100),
    id: i,
    isHighlight: false,
});

export const Matrix = ({ columnsNumber, rowsNumber,highlightCellsNumber }: { columnsNumber: number; rowsNumber: number,highlightCellsNumber:number }) => {
    const { matrix,setMatrix } = useMatrixContext();
    useEffect(() => {
        const tmp = Array(+columnsNumber * +rowsNumber).fill(0).map(randomGenerator);
        setMatrix(tmp)
    }, [columnsNumber, rowsNumber]);

    const gridShape = {
        gridTemplateColumns: `repeat(${+columnsNumber + 1}, 1fr)`,
        gridTemplateRows: `repeat(${+rowsNumber + 1}, 1fr)`,
    };

    const rowSums = Array(+rowsNumber).fill(0).map((item, rowIndex) =>
        matrix?.reduce((acc:number, mat:Cell, i:number) => {
            if (i >= rowIndex * columnsNumber && i < (rowIndex + 1) * columnsNumber) {
                return acc + mat.amount;
            }

            return acc;
        }, 0)
    );

    let columnAverage:any[] = [];
    if (rowSums.length) {
        columnAverage = Array(+columnsNumber).fill(0).map((item, columnIndex) => {
            let acc = 0;
            for (let i = columnIndex; i <= columnsNumber * rowsNumber - 1; i += columnsNumber) {
                acc += typeof matrix[i] === 'undefined' ? 0 : matrix[i].amount;
            }
            return Math.floor(acc / rowsNumber);
        });
    }

    return (
        <div className="matrix" style={gridShape}>
            {matrix.map((item:any, index:any) => (
                ((index % +columnsNumber) === (+columnsNumber - 1))
                    ? (
                        <>
                            <MatrixItem
                                key={item.id}
                                matrixItem={item}
                                percentage={item.amount / rowSums[Math.floor(+index / +columnsNumber)]}
                                amount={item.amount}
                                highlightCellsNumber={highlightCellsNumber}
                                isHighlight={item.isHighlight}
                                id={item.id}
                            />
                            <RowSum
                                key={item.index}
                                amount={rowSums[Math.floor(+index / +columnsNumber)]}
                            />
                        </>
                    )
                    : (
                        <MatrixItem
                            key={index}
                            matrixItem={item}
                            percentage={item.amount / rowSums[Math.floor(+index / +columnsNumber)]}
                            amount={item.amount}
                            highlightCellsNumber={highlightCellsNumber}
                            isHighlight={item.isHighlight}
                            id={item.id}
                        />
                    )
            ))}
            {columnAverage.map((item,index) => (
                <ColumnAverage
                    key={index}
                    amount={item}
                />
            ))}
        </div>
    );
};


