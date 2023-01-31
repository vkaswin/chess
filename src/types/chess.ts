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

export type PossibleMoves = {
  row: number;
  column: number;
  className: string;
}[];

export type HightLightPossibleMoves = (possibleMoves: PossibleMoves) => void;

export type SelectedPiece = {
  row: number;
  column: number;
  color: Colors;
  piece: Pieces;
  possibleMoves?: PossibleMoves;
  selectedMove?: string;
} | null;

export type isExist = (data: {
  row: number;
  column: number;
  color: Colors;
}) => boolean;

export type HandleChessPiece = (possibleMoves: PossibleMoves) => void;
