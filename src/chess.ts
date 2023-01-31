import {
  Board,
  ChessDataAttributes,
  HandleChessPiece,
  HightLightPossibleMoves,
  isExist,
  Pieces,
  PossibleMoves,
  SelectedPiece,
} from "./types/chess";

import "./chess.scss";

const Chess = (() => {
  let board: Board = [
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
    [
      null,
      { color: "black", piece: "pawn" },
      null,
      null,
      null,
      null,
      null,
      null,
    ],
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

  const ClassNames = {
    HIGHLIGHT: "highlight",
    SELECTED: "selected",
    CAPTURE: "capture",
  };

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

  const isExist: isExist = ({ row, column, color }) => {
    let chessPiece = board[row][column];

    return chessPiece && chessPiece.color !== color ? true : false;
  };

  const highLightPossibleMoves: HightLightPossibleMoves = (possibleMoves) => {
    if (possibleMoves.length === 0) return;

    if (selectedPiece) {
      selectedPiece.possibleMoves = possibleMoves;
    }

    possibleMoves.forEach(({ row, column, className }) => {
      let element = getElementByRowAndColumn(row, column);
      element.disabled = false;
      element.classList.add(className);
    });
  };

  const handlePawn: HandleChessPiece = (possibleMoves) => {
    if (!selectedPiece) return;

    if (
      selectedPiece.color === "black"
        ? selectedPiece.row >= 7
        : selectedPiece.row <= 1
    )
      return;

    let row =
      selectedPiece.color === "black"
        ? selectedPiece.row + 1
        : selectedPiece.row - 1;

    for (let i = -1; i <= 1; i++) {
      let column = selectedPiece.column + i;

      if (column < 0 || column > 7) continue;

      let className: string;

      let exist = isExist({ row, column, color: selectedPiece.color });

      if (column === selectedPiece.column) {
        if (exist) {
          continue;
        } else {
          className = ClassNames.HIGHLIGHT;
        }
      } else {
        className = exist ? ClassNames.CAPTURE : ClassNames.HIGHLIGHT;
      }

      possibleMoves.push({ row, column, className });
    }
  };

  const handleRook: HandleChessPiece = (possibleMoves) => {
    console.log(selectedPiece, possibleMoves, "Rook");
  };

  const handleBishop: HandleChessPiece = (possibleMoves) => {
    console.log(selectedPiece, possibleMoves, "Bishop");
  };

  const handleKnight: HandleChessPiece = (possibleMoves) => {
    console.log(selectedPiece, possibleMoves, "Knight");
  };

  const handleQueen: HandleChessPiece = (possibleMoves) => {
    console.log(selectedPiece, possibleMoves, "Queen");
  };

  const handleKing: HandleChessPiece = (possibleMoves) => {
    console.log(selectedPiece, possibleMoves, "King");
  };

  const clearSelectedPiece = () => {
    if (!selectedPiece) return;

    let selectedElement = getElementByRowAndColumn(
      selectedPiece.row,
      selectedPiece.column
    );

    if (
      selectedElement.hasAttribute("data-piece") &&
      selectedElement.hasAttribute("data-color")
    ) {
      selectedElement.disabled = false;
    }

    selectedElement.classList.remove(
      ClassNames.HIGHLIGHT,
      ClassNames.SELECTED,
      ClassNames.CAPTURE
    );

    if (selectedPiece.possibleMoves) {
      selectedPiece.possibleMoves.forEach(({ row, column, className }) => {
        let element = getElementByRowAndColumn(row, column);
        element.disabled =
          selectedPiece?.selectedMove !== `${row}${column}` &&
          className !== ClassNames.CAPTURE;
        element.classList.remove(ClassNames.HIGHLIGHT, ClassNames.CAPTURE);
      });
    }

    selectedPiece = null;
  };

  function handleClickPiece(this: HTMLButtonElement) {
    let { color, piece, row, column } = this.dataset as ChessDataAttributes;

    if (selectedPiece) {
      let canMoveThePiece =
        selectedPiece.possibleMoves?.findIndex(
          (piece) => piece.row === +row && piece.column === +column
        ) !== -1;

      if (!canMoveThePiece || selectedPiece.color === color) return;

      let selectedElement = getElementByRowAndColumn(
        selectedPiece.row,
        selectedPiece.column
      );
      selectedElement.removeAttribute("data-piece");
      selectedElement.removeAttribute("data-color");

      this.setAttribute("data-piece", selectedPiece.piece);
      this.setAttribute("data-color", selectedPiece.color);

      board[+row][+column] = {
        color: selectedPiece.color,
        piece: selectedPiece.piece,
      };
      board[selectedPiece.row][selectedPiece.column] = null;

      selectedPiece.selectedMove = `${row}${column}`;
      this.disabled = false;

      clearSelectedPiece();
    } else if (piece && color) {
      this.disabled = true;
      this.classList.add(ClassNames.SELECTED);

      clearSelectedPiece();

      selectedPiece = {
        piece,
        color,
        row: +row,
        column: +column,
      };

      let possibleMoves: PossibleMoves = [];

      switch (piece as Pieces) {
        case "pawn":
          handlePawn(possibleMoves);
          break;

        case "rook":
          handleRook(possibleMoves);
          break;

        case "bishop":
          handleBishop(possibleMoves);
          break;

        case "knight":
          handleKnight(possibleMoves);
          break;

        case "queen":
          handleQueen(possibleMoves);
          break;

        case "king":
          handleKing(possibleMoves);
          break;

        default:
          return;
      }

      highLightPossibleMoves(possibleMoves);
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
