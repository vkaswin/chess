import {
  Board,
  ChessDataAttributes,
  Colors,
  HandleChessPiece,
  HightLightPossibleMoves,
  Pieces,
  PossibleMoves,
  Position,
  SelectedPiece,
  GetHeaderHtml,
} from "./types";
import confetti from "canvas-confetti";

import blackAvatar from "./assets/images/black-avatar.png";
import whiteAvatar from "./assets/images/white-avatar.png";

import "./chess.scss";

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

const ClassNames = {
  HIGHLIGHT: "highlight",
  SELECTED: "selected",
  CAPTURE: "capture",
  DANGER: "danger",
};

let selectedPiece: SelectedPiece = null;

let turn: Colors = "white";

let gameOver = false;

function handleClickBoard(event: MouseEvent) {
  let element = event.target;

  if (
    element instanceof HTMLButtonElement &&
    element.classList.contains("tile")
  ) {
    handleClickTile.call(element);
  }
}

const initChess = () => {
  let chessBoard = document.createElement("div");
  chessBoard.classList.add("board");

  let html = "";

  board.forEach((chessPieces, row) => {
    let tiles = chessPieces.reduce((tilesHtml, chessPiece, column) => {
      tilesHtml += `<button class='tile' data-row='${row}' data-column='${column}' ${
        !chessPiece ? `disabled='true'` : ""
      } ${
        chessPiece
          ? `data-color='${chessPiece.color}' data-piece='${chessPiece.piece}'`
          : ""
      }></button>`;

      return tilesHtml;
    }, "");

    html += `<div class='row'>${tiles}</div>`;
  });

  chessBoard.addEventListener("click", handleClickBoard);

  chessBoard.innerHTML = html;

  let blackHeader = document.createElement("div");
  let whiteHeader = document.createElement("div");

  blackHeader.innerHTML = getHeaderHtml({
    img: blackAvatar,
    name: "Player B",
    color: "black",
  });
  whiteHeader.innerHTML = getHeaderHtml({
    img: whiteAvatar,
    name: "Player A",
    color: "white",
    highlight: true,
  });

  let app = document.querySelector("#app") as HTMLDivElement;

  app.append(blackHeader, chessBoard, whiteHeader);
};

const getHeaderHtml: GetHeaderHtml = ({
  img,
  name,
  color,
  highlight = false,
}) => {
  let html = `<div class='header'>
        <img src='${img}' />
        <div>
            <span class='${
              highlight ? ClassNames.HIGHLIGHT : ""
            }' data-user-color='${color}'>${name}</span>
            <span>${color}</span>
        </div> 
    </div>`;

  return html;
};

const highLightPossibleMoves: HightLightPossibleMoves = (possibleMoves) => {
  if (possibleMoves.length === 0) return;

  if (selectedPiece) {
    selectedPiece.possibleMoves = possibleMoves;
  }

  possibleMoves.forEach(({ row, column, className }) => {
    let element = getChessPieceElement({ row, column });
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

  const updateMove = (data: Position): boolean => {
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

  const updateMove = (data: Position): boolean => {
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

  const updateMove = (data: Position) => {
    let { row, column } = data;

    if (row < 0 || row > 7 || column < 0 || column > 7) return;

    let chessPiece = getChessPiece(data);

    if (chessPiece) {
      if (chessPiece.color !== selectedPiece?.color) {
        possibleMoves.push({ ...data, className: ClassNames.CAPTURE });
      }
      return;
    }

    possibleMoves.push({ ...data, className: ClassNames.HIGHLIGHT });
  };

  // Top Left
  for (let i = 1; i <= 2; i++) {
    let row = selectedPiece.row - i;
    let column = selectedPiece.column - (i === 1 ? 2 : 1);
    updateMove({ row, column });
  }

  // Top Right
  for (let i = 1; i <= 2; i++) {
    let row = selectedPiece.row - i;
    let column = selectedPiece.column + (i === 1 ? 2 : 1);
    updateMove({ row, column });
  }

  // Bottom Left
  for (let i = 1; i <= 2; i++) {
    let row = selectedPiece.row + i;
    let column = selectedPiece.column - (i === 1 ? 2 : 1);
    updateMove({ row, column });
  }

  // Bottom Right
  for (let i = 1; i <= 2; i++) {
    let row = selectedPiece.row + i;
    let column = selectedPiece.column + (i === 1 ? 2 : 1);
    updateMove({ row, column });
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

  let selectedElement = getChessPieceElement({
    row: selectedPiece.row,
    column: selectedPiece.column,
  });

  if (
    selectedElement.hasAttribute("data-piece") &&
    selectedElement.hasAttribute("data-color")
  ) {
    selectedElement.disabled = false;
  }

  selectedElement.classList.remove(
    ClassNames.HIGHLIGHT,
    ClassNames.SELECTED,
    ClassNames.CAPTURE,
    ClassNames.DANGER
  );

  if (selectedPiece.possibleMoves) {
    selectedPiece.possibleMoves.forEach(({ row, column, className }) => {
      let element = getChessPieceElement({ row, column });
      element.disabled =
        selectedPiece?.selectedMove !== `${row}${column}` &&
        className !== ClassNames.CAPTURE;
      element.classList.remove(
        ClassNames.HIGHLIGHT,
        ClassNames.CAPTURE,
        ClassNames.DANGER
      );
    });
  }

  selectedPiece = null;
};

function handleCheckMate(this: HTMLButtonElement) {
  if (!selectedPiece) return;

  let color = turn === "black" ? "white" : "black";

  let element = document.querySelector<HTMLButtonElement>(
    `[data-piece='king'][data-color='${color}']`
  );

  if (!element) {
    let userElement = document.querySelector<HTMLSpanElement>(
      `[data-user-color='${turn}']`
    );

    if (userElement) {
      userElement.classList.add(ClassNames.HIGHLIGHT);
      userElement.append(" (Winner)");
    }

    const canvas = document.createElement("canvas");
    document.body.append(canvas);

    const Confetti = confetti.create(canvas, {
      resize: true,
    });

    Confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    let element = document.querySelector<HTMLDivElement>(".board");

    if (element) {
      element.removeEventListener("click", handleClickBoard);
    }

    setTimeout(() => {
      canvas.remove();
    }, 3000);

    gameOver = true;

    return;
  }

  let { row, column, piece } = this.dataset as ChessDataAttributes;

  if (!piece) return;

  let oldRow = selectedPiece.row;
  let oldColumn = selectedPiece.column;

  selectedPiece.row = +row;
  selectedPiece.column = +column;

  let possibleMoves = getPossibleMoves(piece);

  selectedPiece.row = oldRow;
  selectedPiece.column = oldColumn;

  if (possibleMoves.length === 0) return;

  let { row: kingRow, column: kingColumn } =
    element.dataset as ChessDataAttributes;

  let index = possibleMoves.findIndex(
    (move) => move.row === +kingRow && move.column === +kingColumn
  );

  if (index === -1) return;

  element.classList.add(ClassNames.DANGER);
}

const handlePlayerTurn = () => {
  turn = turn === "black" ? "white" : "black";
  let elements = document.querySelectorAll<HTMLDivElement>("[data-user-color]");
  elements.forEach((element) => {
    element.dataset.userColor === turn
      ? element.classList.add(ClassNames.HIGHLIGHT)
      : element.classList.remove(ClassNames.HIGHLIGHT);
  });
};

const getPossibleMoves = (piece: Pieces): PossibleMoves => {
  let possibleMoves: PossibleMoves = [];

  switch (piece) {
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
      return [];
  }

  return possibleMoves;
};

function handleClickTile(this: HTMLButtonElement) {
  let { color, piece, row, column } = this.dataset as ChessDataAttributes;

  if (selectedPiece) {
    let kingElement = document.querySelector<HTMLButtonElement>(
      `.${ClassNames.DANGER}`
    );

    if (kingElement) {
      kingElement.classList.remove(ClassNames.DANGER);
    }

    let chessPiece = getChessPiece({ row: +row, column: +column });

    if (chessPiece && !this.classList.contains(ClassNames.CAPTURE)) {
      clearSelectedPiece();
      handleClickTile.call(this);
      return;
    }

    let selectedElement = getChessPieceElement({
      row: selectedPiece.row,
      column: selectedPiece.column,
    });
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
    handleCheckMate.call(this);
    clearSelectedPiece();
    if (gameOver) return;
    handlePlayerTurn();
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

    let possibleMoves = getPossibleMoves(piece);

    highLightPossibleMoves(possibleMoves);
  }
}

const getChessPiece = ({ row, column }: { row: number; column: number }) => {
  return board[row][column];
};

const getChessPieceElement = ({ row, column }: Position) => {
  return document.querySelector(
    `[data-row='${row}'][data-column='${column}']`
  ) as HTMLButtonElement;
};

export default initChess;
