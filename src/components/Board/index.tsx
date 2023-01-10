import { useState } from "react";
import { Board } from "types/chess";
import Piece from "components/Piece";

import styles from "./Board.module.scss";

const ChessBoard = () => {
  const [board, setBoard] = useState<Board>([
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
  ]);

  return (
    <div className={styles.container}>
      {board.map((chessPieces, index) => {
        return (
          <div key={index} className={styles.wrapper}>
            {chessPieces.map(({ color, piece }, index) => {
              return (
                <Piece
                  key={index}
                  className={styles.piece}
                  {...(color &&
                    piece && {
                      color: color,
                      piece: piece,
                    })}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default ChessBoard;
