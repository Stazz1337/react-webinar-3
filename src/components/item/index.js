import React, { useCallback } from "react";
import PropTypes from "prop-types";
import "./style.css";

function Item(props) {
  const callbacks = {
    onClickButton: useCallback((e) => {
      e.stopPropagation();
      props.onClickButton(props.item);
    }),
  };

  return (
    <div className="Item">
      <div className="Item-code">{props.item.code}</div>
      <div className="Item-title">{props.item.title}</div>

      <div className="Item-price">{props.item.price.toLocaleString("ru-RU")} ₽</div>

      <div className="Item-actions">
        <button onClick={callbacks.onClickButton}>{props.buttonText}</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
};

Item.defaultProps = {
  onDelete: () => {},
  onSelect: () => {},
};

export default React.memo(Item);
