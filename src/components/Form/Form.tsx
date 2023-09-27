import React, { useContext } from 'react';
import {MatrixContext} from '../../MatrixContext/MatrixContext'
import {Matrix} from "../Matrix";
import  './Form.css';


const inputsArray = [
    {
        key: 'rowsNumber',
        text: 'Row Number',
    },
    {
        key: 'columnsNumber',
        text: 'Column Number',
    },
    {
        key: 'highlightCellsNumber',
        text: 'Highlight Cell Number',
    },
];

export const Form:React.FC = () => {
    const { columnsNumber, setColumnsNumber, highlightCellsNumber, setHighlightCellsNumber, rowsNumber, setRowsNumber } = useContext(MatrixContext);
    return (
        <div className="container">
        <form className="main-form">
            {inputsArray.map((input) => (
                <React.Fragment key={input.key}>
                <label  className="main-form__label">{input.text}</label>
                    <input
                        className="main-form__input"
                        key={input.key}
                        onChange={(event) => {
                            let newValue = +event.target.value;
                            if (newValue >= 0 && newValue <= 100 && Number.isInteger(newValue)) {
                                if (input.key === 'rowsNumber') setRowsNumber(newValue);
                                else if (input.key === 'columnsNumber') setColumnsNumber(newValue);
                                else if (input.key === 'highlightCellsNumber') setHighlightCellsNumber(newValue);
                            }
                        }}
                        value={input.key === 'rowsNumber' ? rowsNumber : input.key === 'columnsNumber' ? columnsNumber : highlightCellsNumber}
                        type="number"
                        min="0"
                        max="100"
                        step="1"
                    />
                </React.Fragment>
            ))}
        </form>
            <div className="matrix-container">
                <Matrix columnsNumber={columnsNumber} rowsNumber={rowsNumber} highlightCellsNumber={highlightCellsNumber} />
            </div>
        </div>
    );
};

