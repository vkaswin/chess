import {
  Board,
  ChessDataAttributes,
  HandleChessPiece,
  HightLightPossibleMoves,
  Pieces,
  PossibleMoves,
  SelectedPiece,
} from "./types/chess";

import "./chess.scss";

const Chess = (() => {
  let board: Board = [
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
      null,
      null,
      null,
      null,
      { color: "black", piece: "knight" },
      null,
      null,
      null,
    ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
      null,
      { color: "white", piece: "knight" },
      null,
      null,
      null,
      null,
      null,
      null,
    ],
    [null, null, null, null, null, null, null, null],
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
    console.log(selectedPiece, possibleMoves, "Pawn");
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

      let chessPiece = getChessPiece({ row, column });

      if (chessPiece && chessPiece.color === selectedPiece.color) {
        continue;
      } else {
        className = chessPiece ? ClassNames.CAPTURE : ClassNames.HIGHLIGHT;
      }

      possibleMoves.push({ row, column, className });
    }
  };

  const handleRook: HandleChessPiece = (possibleMoves) => {
    let direction = {
      row: NaN,
      column: NaN,
    };

    const executeLoop = (key: "row" | "column") => {
      if (!selectedPiece) return;

      direction[key] =
        selectedPiece[key] !== 7
          ? selectedPiece[key] + 1
          : selectedPiece[key] - 1;

      while (direction[key] >= 0) {
        let data;
        if (key === "row") {
          data = {
            row: direction.row,
            column: selectedPiece.column,
          };
        } else {
          data = {
            row: selectedPiece.row,
            column: direction.column,
          };
        }

        let chessPiece = getChessPiece(data);

        if (chessPiece) {
          if (chessPiece.color !== selectedPiece.color) {
            possibleMoves.push({
              ...data,
              className: ClassNames.CAPTURE,
            });
          }

          if (direction[key] < selectedPiece[key]) {
            break;
          } else {
            direction[key] =
              direction[key] > selectedPiece[key]
                ? selectedPiece[key] - 1
                : selectedPiece[key] + 1;

            continue;
          }
        } else {
          possibleMoves.push({
            ...data,
            className: ClassNames.HIGHLIGHT,
          });
        }

        direction[key] =
          direction[key] === 7
            ? selectedPiece[key] - 1
            : direction[key] < selectedPiece[key]
            ? direction[key] - 1
            : direction[key] + 1;
      }
    };

    executeLoop("row");
    executeLoop("column");
  };

  const handleBishop: HandleChessPiece = (possibleMoves) => {
    if (!selectedPiece) return;

    const executeLoop = (key: "right" | "left") => {
      if (!selectedPiece) return;

      let i = 1;
      let row =
        selectedPiece.row !== 7 ? selectedPiece.row + 1 : selectedPiece.row - 1;

      while (row >= 0) {
        let column: number = NaN;

        if (key === "right" && selectedPiece.column + i <= 7) {
          column = selectedPiece.column + i;
        } else if (key === "left" && selectedPiece.column - i >= 0) {
          column = selectedPiece.column - i;
        } else {
          break;
        }

        if (isNaN(column)) continue;

        let data = {
          row,
          column,
        };

        let chessPiece = getChessPiece(data);

        let className =
          chessPiece && chessPiece.color !== selectedPiece?.color
            ? ClassNames.CAPTURE
            : ClassNames.HIGHLIGHT;

        possibleMoves.push({ ...data, className: className });

        if (className === ClassNames.CAPTURE) break;

        if (row === 7) {
          row = selectedPiece.row - 1;
          i = 1;
        } else if (row < selectedPiece.row) {
          row = row - 1;
          i = i + 1;
        } else {
          row = row + 1;
          i = i + 1;
        }
      }
    };

    executeLoop("right");
    executeLoop("left");

    // let i = 1;

    // while (row >= 0) {
    //   let columns: number[] = [];

    //   if (selectedPiece.column + i <= 7) {
    //     columns.push(selectedPiece.column + i);
    //   }
    //   if (selectedPiece.column - i >= 0) {
    //     columns.push(selectedPiece.column - i);
    //   }

    //   let breakLoop = false;

    //   columns.forEach((column) => {
    //     let data = {
    //       row,
    //       column,
    //     };

    //     let chessPiece = getChessPiece(data);
    //     let className: string = "";

    //     if (chessPiece && chessPiece.color !== selectedPiece?.color) {
    //       className = ClassNames.CAPTURE;
    //     } else {
    //       className = ClassNames.HIGHLIGHT;
    //     }

    //     possibleMoves.push({ ...data, className: className });

    //     if (className === ClassNames.CAPTURE) {
    //       breakLoop = true;
    //       return;
    //     }
    //   });

    //   if (breakLoop) break;

    //   if (row === 7) {
    //     row = selectedPiece.row - 1;
    //     i = 1;
    //   } else if (row < selectedPiece.row) {
    //     row = row - 1;
    //     i = i + 1;
    //   } else {
    //     row = row + 1;
    //     i = i + 1;
    //   }
    // }

    console.log(possibleMoves);
  };

  const handleKnight: HandleChessPiece = (possibleMoves) => {
    console.log(selectedPiece, possibleMoves, "Knight");
  };

  const handleQueen: HandleChessPiece = (possibleMoves) => {
    console.log(selectedPiece, possibleMoves, "Queen");
    handleRook(possibleMoves);
    handleBishop(possibleMoves);
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
      let isExist = getChessPiece({ row: +row, column: +column });

      if (isExist && !this.classList.contains(ClassNames.CAPTURE)) return;

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

/*let board: Board = [
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
];*/
