import { Board } from "./types/chess";
import { getChessPiece } from "./utils";

import "./chess.scss";

const board: Board = [
  [
    {
      color: "black",
      piece: "rook",
    },
    {
      color: "black",
      piece: "knight",
    },
    {
      color: "black",
      piece: "bishop",
    },
    {
      color: "black",
      piece: "king",
    },
    {
      color: "black",
      piece: "queen",
    },
    {
      color: "black",
      piece: "bishop",
    },
    {
      color: "black",
      piece: "knight",
    },
    {
      color: "black",
      piece: "rook",
    },
  ],
  [
    {
      color: "black",
      piece: "pawn",
    },
    {
      color: "black",
      piece: "pawn",
    },
    {
      color: "black",
      piece: "pawn",
    },
    {
      color: "black",
      piece: "pawn",
    },
    {
      color: "black",
      piece: "pawn",
    },
    {
      color: "black",
      piece: "pawn",
    },
    {
      color: "black",
      piece: "pawn",
    },
    {
      color: "black",
      piece: "pawn",
    },
  ],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [{}, {}, {}, {}, {}, {}, {}, {}],
  [
    {
      color: "white",
      piece: "pawn",
    },
    {
      color: "white",
      piece: "pawn",
    },
    {
      color: "white",
      piece: "pawn",
    },
    {
      color: "white",
      piece: "pawn",
    },
    {
      color: "white",
      piece: "pawn",
    },
    {
      color: "white",
      piece: "pawn",
    },
    {
      color: "white",
      piece: "pawn",
    },
    {
      color: "white",
      piece: "pawn",
    },
  ],
  [
    {
      color: "white",
      piece: "rook",
    },
    {
      color: "white",
      piece: "knight",
    },
    {
      color: "white",
      piece: "bishop",
    },
    {
      color: "white",
      piece: "king",
    },
    {
      color: "white",
      piece: "queen",
    },
    {
      color: "white",
      piece: "bishop",
    },
    {
      color: "white",
      piece: "knight",
    },
    {
      color: "white",
      piece: "rook",
    },
  ],
];

const InitChessBoard = () => {
  let chessBoard = document.createElement("div");
  chessBoard.classList.add("board");

  board.forEach((chessPieces, row) => {
    let container = document.createElement("div");
    container.classList.add("row");

    chessPieces.forEach(({ color, piece }, column) => {
      let chessPiece = document.createElement("button");
      chessPiece.classList.add("piece");
      chessPiece.setAttribute("data-row", row.toString());
      chessPiece.setAttribute("data-column", column.toString());
      if (color && piece) {
        chessPiece.setAttribute("data-color", color);
        chessPiece.setAttribute("data-piece", piece);
        let image = document.createElement("img");
        image.src = getChessPiece(color, piece);
        chessPiece.append(image);
      }
      container.append(chessPiece);
    });

    chessBoard.append(container);
  });

  document.body.append(chessBoard);
};

export default InitChessBoard;
