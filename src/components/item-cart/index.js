import React, { useCallback } from "react";
import PropTypes from "prop-types";
import "./style.css";

function ItemCart(props) {
  const callbacks = {
    onClickButton: useCallback((e) => {
      e.stopPropagation();
      props.onClickButton(props.item);
    }),
  };

  return (
    <div className="ItemCart">
      <div className="ItemCart-code">{props.item.code}</div>
      <div className="ItemCart-title">{props.item.title}</div>

      <div className="ItemCart-price">
        {props.item.price.toLocaleString("ru-RU")} ₽
      </div>

      <div className="ItemCart-quantity">{props.item.quantity || 0} шт.</div>

      <div className="ItemCart-actions">
        <button className="ItemCart-button" onClick={callbacks.onClickButton}>{props.buttonText}</button>
      </div>
    </div>
  );
}

ItemCart.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    selected: PropTypes.bool,
    count: PropTypes.number,
  }).isRequired,
  onDelete: PropTypes.func,
  onSelect: PropTypes.func,
};

ItemCart.defaultProps = {
  onDelete: () => {},
  onSelect: () => {},
};

export default React.memo(ItemCart);
