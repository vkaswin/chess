import ReactDOM from "react-dom/client";
import ChessBoard from "components/Board";

import "assets/scss/index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(<ChessBoard />);

export default {};
