export type Board = ChessPiece[][];

export type Pieces = "king" | "queen" | "bishop" | "knight" | "rook" | "pawn";

export type Colors = "black" | "white";

export type ChessPiece = {
  color: Colors;
  piece: Pieces;
} | null;

export type ChessDataAttributes = {
  row: string;
  column: string;
  color?: Colors;
  piece?: Pieces;
};

export type PossibleMoves = string[];

export type HightLightPossibleMoves = (possibleMoves: PossibleMoves) => void;

export type SelectedPiece = {
  row: number;
  column: number;
  color: Colors;
  piece: Pieces;
  possibleMoves?: PossibleMoves;
  selectedMove?: string;
} | null;

export type isExist = (row: number, column: number) => boolean;
