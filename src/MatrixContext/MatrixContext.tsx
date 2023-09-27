import React, {createContext, useContext, useReducer} from 'react';
import {Cell, Matrix} from '../dataTypes/dataTypes';

interface MatrixContextProps {
    matrix: Matrix;
    sums: number[];
    columnsNumber: number;
    highlightCellsNumber: number;
    rowsNumber: number;
    averages: number[];
}

export const MatrixContext = createContext<any | undefined>(undefined);

const matrixReducer = (state: any, action: any) => {
    switch (action.type) {
        case 'SET_MATRIX':
            return {
                ...state,
                matrix: action.payload,
            };
        case 'SET_ROWS':
            return {...state, rowsNumber: action.payload};
        case 'SET_COLUMNS':
            return {...state, columnsNumber: action.payload};
        case 'SET_HIGHLIGHT_CELLS':{
            return {
                ...state,
                highlightCellsNumber: action.payload > state.columnsNumber * state.rowsNumber
                    ? state.columnsNumber * state.rowsNumber
                    : action.payload,
            };
        }
        default:
            return state;
    }
};

export const useMatrixContext = () => {
    const context = useContext(MatrixContext);
    if (!context) {
        throw new Error('useMatrixContext must be used within a MatrixProvider');
    }
    return context;
};

export const MatrixProvider = ({children}: any) => {
    const initialState: MatrixContextProps = {
        matrix: [],
        sums: [],
        averages: [],
        columnsNumber: 0,
        rowsNumber: 0,
        highlightCellsNumber: 0,
    };

    const [state, dispatch] = useReducer(matrixReducer, initialState);

    const setMatrix = (matrixData: Cell) => {
        dispatch({type: 'SET_MATRIX', payload: matrixData});
    };
    const setRowsNumber = (value: number) => {
        dispatch({type: 'SET_ROWS', payload: value});
    };

    const setColumnsNumber = (value: number) => {
        dispatch({type: 'SET_COLUMNS', payload: value});
    };

    const setHighlightCellsNumber = (value: number) => {
        dispatch({type: 'SET_HIGHLIGHT_CELLS', payload: value});
    };

    return (
        <MatrixContext.Provider value={{...state, setMatrix, setHighlightCellsNumber, setColumnsNumber, setRowsNumber}}>
            {children}
        </MatrixContext.Provider>
    );
};
