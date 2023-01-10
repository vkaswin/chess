import { ComponentProps, useMemo } from "react";
import { Colors, Pieces } from "types/chess";
import { getChessPiece } from "utils";

type PieceProps = {
  color?: Colors;
  piece?: Pieces;
} & ComponentProps<"button">;

const Piece = ({ color, piece, ...rest }: PieceProps) => {
  const icon = useMemo(() => {
    if (!piece || !color) return;
    return getChessPiece(color, piece);
  }, [color, piece]);

  return <button {...rest}>{color && piece && <img src={icon} />}</button>;
};

export default Piece;
