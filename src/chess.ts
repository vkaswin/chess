import {
  Board,
  ChessDataAttributes,
  HightLightPossibleMoves,
  isExist,
  Pieces,
  SelectedPiece,
} from "./types/chess";

import "./chess.scss";

const Chess = (() => {
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

  const HIGHLIGHT = "highlight";
  const SELECTED = "selected";

  let selectedPiece: SelectedPiece = null;

  const init = () => {
    let chessBoard = document.createElement("div");
    chessBoard.classList.add("board");

    board.forEach((chessPieces, row) => {
      let container = document.createElement("div");
      container.classList.add("row");

      chessPieces.forEach((chessPiece, column) => {
        let button = document.createElement("button");
        button.classList.add("tile");
        button.setAttribute("data-row", row.toString());
        button.setAttribute("data-column", column.toString());
        button.addEventListener("click", handleClickPiece);
        button.disabled = !chessPiece;
        if (chessPiece) {
          let { color, piece } = chessPiece;
          button.setAttribute("data-color", color);
          button.setAttribute("data-piece", piece);
        }
        let element = document.createElement("div");
        element.classList.add("icon");
        button.append(element);
        container.append(button);
      });

      chessBoard.append(container);
    });

    document.body.append(chessBoard);
  };

  const highLightPossibleMoves: HightLightPossibleMoves = (possibleMoves) => {
    if (possibleMoves.length === 0) return;

    if (selectedPiece) {
      selectedPiece.possibleMoves = possibleMoves;
    }

    possibleMoves.forEach((position) => {
      let [row, column] = position.split("");
      let element = getElementByRowAndColumn(row, column);
      element.disabled = false;
      element.classList.add(HIGHLIGHT);
    });
  };

  const handlePawn = () => {
    console.log(selectedPiece, "Pawn");
    if (!selectedPiece) return;

    let row =
      selectedPiece.color === "black"
        ? selectedPiece.row + 1
        : selectedPiece.row - 1;

    if (isExist(row, selectedPiece.column)) return;

    if (
      selectedPiece.color === "black"
        ? selectedPiece.row >= 7
        : selectedPiece.row <= 1
    )
      return;

    let move = `${row}${selectedPiece.column}`;

    highLightPossibleMoves([move]);
  };

  const isExist: isExist = (row, column) => {
    return !!board[row][column];
  };

  const handleRook = () => {
    console.log(selectedPiece, "Rook");
  };

  const handleBishop = () => {
    console.log(selectedPiece, "Bishop");
  };

  const handleKnight = () => {
    console.log(selectedPiece, "Knight");
  };

  const handleQueen = () => {
    console.log(selectedPiece, "Queen");
  };

  const handleKing = () => {
    console.log(selectedPiece, "King");
  };

  const clearSelectedPiece = () => {
    if (!selectedPiece) return;

    let element = getElementByRowAndColumn(
      selectedPiece.row,
      selectedPiece.column
    );
    if (
      element.hasAttribute("data-piece") &&
      element.hasAttribute("data-color")
    ) {
      element.disabled = false;
    }
    element.classList.remove(HIGHLIGHT, SELECTED);

    if (selectedPiece.possibleMoves) {
      selectedPiece.possibleMoves.forEach((position) => {
        let [row, column] = position.split("");
        let element = getElementByRowAndColumn(row, column);
        element.disabled = selectedPiece?.selectedMove !== position;
        element.classList.remove(HIGHLIGHT);
      });
    }

    selectedPiece = null;
  };

  function handleClickPiece(this: HTMLButtonElement) {
    let { color, piece, row, column } = this.dataset as ChessDataAttributes;

    if (selectedPiece) {
      if (!color && !piece) {
        let element = getElementByRowAndColumn(
          selectedPiece.row,
          selectedPiece.column
        );
        element.removeAttribute("data-piece");
        element.removeAttribute("data-color");
        this.setAttribute("data-piece", selectedPiece.piece);
        this.setAttribute("data-color", selectedPiece.color);
        board[selectedPiece.row][selectedPiece.column] = null;
        board[+row][+column] = {
          color: selectedPiece.color,
          piece: selectedPiece.piece,
        };
        selectedPiece.selectedMove = `${row}${column}`;
        this.disabled = false;
      }

      clearSelectedPiece();
    } else {
      if (!piece || !color) return;

      clearSelectedPiece();

      selectedPiece = {
        piece,
        color,
        row: +row,
        column: +column,
      };

      switch (piece as Pieces) {
        case "pawn":
          handlePawn();
          break;

        case "rook":
          handleRook();
          break;

        case "bishop":
          handleBishop();
          break;

        case "knight":
          handleKnight();
          break;

        case "queen":
          handleQueen();
          break;

        case "king":
          handleKing();
          break;

        default:
          return;
      }

      this.disabled = true;
      this.classList.add(SELECTED);
    }
  }

  const getElementByRowAndColumn = (
    row: string | number,
    column: string | number
  ) => {
    return document.querySelector(
      `[data-row='${row}'][data-column='${column}']`
    ) as HTMLButtonElement;
  };

  return {
    init,
  };
})();

export default Chess;
