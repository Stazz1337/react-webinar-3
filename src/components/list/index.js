import React from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";
import ItemCart from "../item-cart";

function List({ list, onClickButton, buttonText, isCartOpen }) {
  return (
    <div className="List">
      {list.map((item) => (
        <div key={item.code} className="List-item">
          {isCartOpen ? (
            <ItemCart
              item={item}
              onClickButton={onClickButton}
              buttonText={buttonText}
            />
          ) : (
            <Item
              item={item}
              onClickButton={onClickButton}
              buttonText={buttonText}
            />
          )}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    })
  ).isRequired,
  onDeleteItem: PropTypes.func,
  onSelectItem: PropTypes.func,
};

List.defaultProps = {
  onDeleteItem: () => {},
  onSelectItem: () => {},
};

export default React.memo(List);
