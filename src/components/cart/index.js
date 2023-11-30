import React from "react";
import PropTypes from "prop-types";
import "./style.css";

function Cart({ children, toggleCart }) {
  return (
    <div className="Cart" onClick={toggleCart}>
      <div className="Cart-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}

Cart.propTypes = {
  children: PropTypes.node,
};

export default React.memo(Cart);
