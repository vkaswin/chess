import {
  Board,
  ChessDataAttributes,
  Colors,
  HandleChessPiece,
  HightLightPossibleMoves,
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
        color: "white",
        piece: "bishop",
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
        piece: "bishop",
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

  let turn: Colors = "white";

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
        : selectedPiece.row <= 0
    )
      return;

    for (
      let i = 1;
      i <=
      ((selectedPiece.color === "black" && selectedPiece.row === 1) ||
      (selectedPiece.color === "white" && selectedPiece.row === 6)
        ? 2
        : 1);
      i++
    ) {
      let data = {
        row:
          selectedPiece.color === "black"
            ? selectedPiece.row + i
            : selectedPiece.row - i,
        column: selectedPiece.column,
      };

      let chessPiece = getChessPiece(data);

      if (chessPiece) break;

      possibleMoves.push({ ...data, className: ClassNames.HIGHLIGHT });
    }

    let row =
      selectedPiece.color === "black"
        ? selectedPiece.row + 1
        : selectedPiece.row - 1;

    for (let i = -1; i <= 1; i++) {
      let column = selectedPiece.column + i;

      if (column < 0 || column > 7 || i === 0) continue;

      let data = {
        row,
        column,
      };

      let chessPiece = getChessPiece(data);

      if (chessPiece && chessPiece.color !== selectedPiece.color) {
        possibleMoves.push({ ...data, className: ClassNames.CAPTURE });
      }
    }
  };

  const handleRook: HandleChessPiece = (possibleMoves) => {
    if (!selectedPiece) return;

    const updateMove = (data: { row: number; column: number }): boolean => {
      let chessPiece = getChessPiece(data);

      if (chessPiece) {
        if (chessPiece.color !== selectedPiece?.color) {
          possibleMoves.push({ ...data, className: ClassNames.CAPTURE });
        }
        return true;
      }

      possibleMoves.push({ ...data, className: ClassNames.HIGHLIGHT });

      return false;
    };

    // Top
    let column = selectedPiece.column;
    for (let row = selectedPiece.row - 1; row >= 0; row--) {
      if (updateMove({ row, column })) break;
    }

    // Bottom
    for (let row = selectedPiece.row + 1; row <= 7; row++) {
      if (updateMove({ row, column })) break;
    }

    // Left
    let row = selectedPiece.row;
    for (let column = selectedPiece.column - 1; column >= 0; column--) {
      if (updateMove({ row, column })) break;
    }

    // Right
    for (let column = selectedPiece.column + 1; column <= 7; column++) {
      if (updateMove({ row, column })) break;
    }
  };

  const handleBishop: HandleChessPiece = (possibleMoves) => {
    if (!selectedPiece) return;

    const updateMove = (data: { row: number; column: number }): boolean => {
      let chessPiece = getChessPiece(data);

      if (chessPiece) {
        if (chessPiece.color !== selectedPiece?.color) {
          possibleMoves.push({ ...data, className: ClassNames.CAPTURE });
        }
        return true;
      }

      possibleMoves.push({ ...data, className: ClassNames.HIGHLIGHT });

      return false;
    };

    // Top Right
    let column = selectedPiece.column + 1;
    for (let row = selectedPiece.row - 1; row >= 0 && column <= 7; row--) {
      if (updateMove({ row, column })) break;
      column = column + 1;
    }

    // Top Left
    column = selectedPiece.column - 1;
    for (let row = selectedPiece.row - 1; row >= 0 && column >= 0; row--) {
      if (updateMove({ row, column })) break;
      column = column - 1;
    }

    // Bottom Left
    column = selectedPiece.column - 1;
    for (let row = selectedPiece.row + 1; row <= 7 && column >= 0; row++) {
      if (updateMove({ row, column })) break;
      column = column - 1;
    }

    // Bottom Right
    column = selectedPiece.column + 1;
    for (let row = selectedPiece.row + 1; row <= 7 && column <= 7; row++) {
      if (updateMove({ row, column })) break;
      column = column + 1;
    }
  };

  const handleKnight: HandleChessPiece = (possibleMoves) => {
    if (!selectedPiece) return;

    let j = 1;

    const updateValue = (val: number) => {
      if (val < 0) {
        j = j + 1;
      } else if (val > 0) {
        j = j - 1;
      }
    };

    for (let i = -2; i < 3; i++) {
      let row = selectedPiece.row + i;

      if (i === 0 || row < 0 || row > 7) {
        if (i === 0) {
          j = 2;
        }
        updateValue(i);
        continue;
      }

      let columns: number[] = [];

      if (selectedPiece.column + j >= 0 && selectedPiece.column + j <= 7) {
        columns.push(selectedPiece.column + j);
      }
      if (selectedPiece.column - j >= 0 && selectedPiece.column - j <= 7) {
        columns.push(selectedPiece.column - j);
      }

      columns.forEach((column) => {
        let data = {
          row,
          column,
        };
        let chessPiece = getChessPiece(data);

        if (chessPiece) {
          if (chessPiece.color !== selectedPiece?.color) {
            possibleMoves.push({ ...data, className: ClassNames.CAPTURE });
          }
        } else {
          possibleMoves.push({ ...data, className: ClassNames.HIGHLIGHT });
        }
      });

      updateValue(i);
    }
  };

  const handleQueen: HandleChessPiece = (possibleMoves) => {
    handleRook(possibleMoves);
    handleBishop(possibleMoves);
  };

  const handleKing: HandleChessPiece = (possibleMoves) => {
    if (!selectedPiece) return;

    for (let i = -1; i < 2; i++) {
      let row = selectedPiece.row + i;

      for (let j = -1; j < 2; j++) {
        let column = selectedPiece.column + j;

        if (
          (row === selectedPiece.row && column === selectedPiece.column) ||
          row < 0 ||
          row > 7 ||
          column < 0 ||
          column > 7
        )
          continue;

        let data = {
          row,
          column,
        };

        let chessPiece = getChessPiece(data);

        if (chessPiece?.color === selectedPiece.color) continue;

        if (chessPiece) {
          if (chessPiece.color !== selectedPiece.color) {
            possibleMoves.push({ ...data, className: ClassNames.CAPTURE });
          }

          continue;
        }

        possibleMoves.push({
          ...data,
          className: ClassNames.HIGHLIGHT,
        });
      }
    }
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
      let chessPiece = getChessPiece({ row: +row, column: +column });

      if (chessPiece && !this.classList.contains(ClassNames.CAPTURE)) {
        clearSelectedPiece();
        handleClickPiece.call(this);
        return;
      }

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

      turn = turn === "black" ? "white" : "black";
    } else if (piece && color) {
      if (turn !== color) return;
      this.disabled = true;
      this.classList.add(ClassNames.SELECTED);

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

  const getChessPiece = ({ row, column }: { row: number; column: number }) => {
    return board[row][column];
  };

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
