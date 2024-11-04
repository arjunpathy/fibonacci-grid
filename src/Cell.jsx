import "./Cell.css";
import {PropTypes} from "prop-types";

const Cell = ({ value, handleClick, cellColorCondition }) => {
  let [isHighlighted, isFibonacci] = cellColorCondition;
  return (
    <div
      className={`cell ${isHighlighted ? "highlight" : ""} ${
        isFibonacci ? "fibonacci" : ""
      }`}
      onClick={handleClick}
    >
      {value > 0 ? value : ""}
    </div>
  );
};

Cell.propTypes = {
  value: PropTypes.number.isRequired,
  handleClick: PropTypes.func.isRequired,
  cellColorCondition: PropTypes.array.isRequired
};

export default Cell;
