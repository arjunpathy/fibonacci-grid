/* eslint-disable react/prop-types */
import './Cell.css';

const Cell = ({value, handleClick, cellColorCondition}) => {
  let [isHighlighted,isFibonacci] = cellColorCondition;
  return (
    <div
    className={`cell ${isHighlighted ? 'highlight' : ''} ${isFibonacci ? 'fibonacci' : ''}`}
    onClick={handleClick}
    >
      {value > 0 ? value : ''}
    </div>
  );
};

export default Cell;
