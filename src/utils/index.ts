import { Colors, Pieces } from "types/chess";
import blackRook from "assets/images/black/rook.png";
import blackQueen from "assets/images/black/queen.png";
import blackKing from "assets/images/black/king.png";
import blackBishop from "assets/images/black/bishop.png";
import blackKnight from "assets/images/black/knight.png";
import blackPawn from "assets/images/black/pawn.png";
import whiteRook from "assets/images/white/rook.png";
import whiteQueen from "assets/images/white/queen.png";
import whiteKing from "assets/images/white/king.png";
import whiteBishop from "assets/images/white/bishop.png";
import whiteKnight from "assets/images/white/knight.png";
import whitePawn from "assets/images/white/pawn.png";

const pieces = {
  black: {
    rook: blackRook,
    queen: blackQueen,
    king: blackKing,
    knight: blackKnight,
    bishop: blackBishop,
    pawn: blackPawn,
  },
  white: {
    rook: whiteRook,
    queen: whiteQueen,
    king: whiteKing,
    knight: whiteKnight,
    bishop: whiteBishop,
    pawn: whitePawn,
  },
};

export const getChessPiece = (color: Colors, piece: Pieces): string => {
  return pieces[color][piece];
};
