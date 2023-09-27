export type CellId = number;
export type CellValue = number;

export type Cell = {
    id: CellId;
    amount: CellValue;
    isHighlight: boolean;
};

export type Matrix = Cell[][];
