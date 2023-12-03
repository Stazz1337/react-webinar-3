import React from "react";
import "./style.css";

function Total({ total }) {
  return (
    <div className="Total">
      <p className="Total-text">Итого<span className="Total-span">{total.toLocaleString("ru-RU")} ₽</span> </p>
    </div>
  );
}

export default React.memo(Total);
