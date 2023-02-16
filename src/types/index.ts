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

type Moves = {
  row: number;
  column: number;
  className: string;
};

export type PossibleMoves = Moves[];

export type HightLightPossibleMoves = (possibleMoves: PossibleMoves) => void;

export type SelectedPiece = {
  row: number;
  column: number;
  color: Colors;
  piece: Pieces;
  possibleMoves?: PossibleMoves;
  selectedMove?: string;
} | null;

export type HandleChessPiece = (possibleMoves: PossibleMoves) => void;

export type Position = Omit<Moves, "className">;

export type GetPossibleMoves = (
  data: { piece: Pieces } & Position
) => PossibleMoves;

export type GetHeaderHtml = (options: {
  img: string;
  name: string;
  color: string;
  highlight?: boolean;
}) => string;
