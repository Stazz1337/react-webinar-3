import React from "react";
import PropTypes from "prop-types";
import { plural } from "../../utils";
import "./style.css";

function Controls({ toggleCart, buttonText, quantity, total }) {
  return (
    <div className="Controls">
      <div className="Controls-info">
        {quantity > 0 ? (
          <span className="Controls-span">
            В корзине:{" "}
            <span className="Controls-span-bold">
              {quantity.toLocaleString("ru-RU")}{" "}
              {plural(quantity, {
                one: "товар",
                few: "товара",
                many: "товаров",
              })}{" "}
              / {total.toLocaleString("ru-RU")} ₽
            </span>
          </span>
        ) : (
          <span className="Controls-span">
            В корзине: <span className="Controls-span-bold">пусто</span>
          </span>
        )}
      </div>
      <button className="Controls-button" onClick={() => toggleCart()}>
        {buttonText}
      </button>
    </div>
  );
}

Controls.propTypes = {
  onAdd: PropTypes.func,
};

Controls.defaultProps = {
  onAdd: () => {},
};

export default React.memo(Controls);
