import React from "react";
import "./style.css";

function Total({ total }) {
  return (
    <div className="Total">
      <p>Итого {total.toLocaleString("ru-RU")} ₽</p>
    </div>
  );
}

export default React.memo(Total);
