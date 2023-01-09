export type Board = ChessPiece[][];

export type Pieces = "king" | "queen" | "bishop" | "knight" | "rook" | "pawn";

export type Colours = "black" | "white";

export type ChessPiece = `${Colours}-${Pieces}` | null;

export type HandleChessPiece = (event: MouseEvent) => void;

export type FindPossibleMove = (data: {
    piece: string;
    color: string;
    row: string;
    column: string;
}) => void;

export type MoveChessPiece = (data: { row: string; column: string }) => void;
