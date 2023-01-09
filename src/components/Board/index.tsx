import { useState } from "react";
import { Board } from "types/chess";

import styles from "./Board.module.scss";

const ChessBoard = () => {
  const [board, setBoard] = useState<Board>([
    [
      "black-rook",
      "black-knight",
      "black-bishop",
      "black-king",
      "black-queen",
      "black-bishop",
      "black-knight",
      "black-rook",
    ],
    [
      "black-pawn",
      "black-pawn",
      "black-pawn",
      "black-pawn",
      "black-pawn",
      "black-pawn",
      "black-pawn",
      "black-pawn",
    ],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [
      "white-pawn",
      "white-pawn",
      "white-pawn",
      "white-pawn",
      "white-pawn",
      "white-pawn",
      "white-pawn",
      "white-pawn",
    ],
    [
      "white-rook",
      "white-knight",
      "white-bishop",
      "white-king",
      "white-queen",
      "white-bishop",
      "white-knight",
      "white-rook",
    ],
  ]);

  return (
    <div className={styles.container}>
      {board.map((chessPieces, index) => {
        return (
          <div key={index} className={styles.row}>
            {chessPieces.map((chessPiece, index) => {
              let [color = null, piece = null] = chessPiece
                ? chessPiece.split("-")
                : [];
              return (
                <div
                  key={index}
                  className={styles.column}
                  {...(color &&
                    piece && {
                      "data-color": color,
                      "data-piece": piece,
                    })}
                ></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChessBoard;
