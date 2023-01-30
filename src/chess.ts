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
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
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

    chessPieces.forEach((chessPiece, column) => {
      let button = document.createElement("button");
      button.classList.add("piece");
      button.setAttribute("data-row", row.toString());
      button.setAttribute("data-column", column.toString());
      button.addEventListener("click", handleClickPiece);
      button.disabled = !chessPiece;
      if (chessPiece) {
        let { color, piece } = chessPiece;
        button.setAttribute("data-color", color);
        button.setAttribute("data-piece", piece);
        let image = document.createElement("img");
        image.src = getChessPiece(color, piece);
        button.append(image);
      }
      container.append(button);
    });

    chessBoard.append(container);
  });

  document.body.append(chessBoard);
};

function handleClickPiece(this: HTMLButtonElement) {
  let { color = null, piece = null, row, column } = this.dataset;
  console.log(color, piece, row, column);
}

export default InitChessBoard;
