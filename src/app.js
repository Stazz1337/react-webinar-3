import React, { useCallback, useState } from "react";
import List from "./components/list";
import Controls from "./components/controls";
import Head from "./components/head";
import PageLayout from "./components/page-layout";
import Cart from "./components/cart";
import Total from "./components/total";

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;
  const cart = store.getState().cart;

  const [isCartOpen, setIsCartOpen] = useState(false);

  const callbacks = {
    addToCart: useCallback(
      (newItem) => {
        store.addToCart(newItem.code);
      },
      [store]
    ),

    removeFromCart: useCallback(
      (newItem) => {
        store.removeFromCart(newItem.code);
      },
      [store]
    ),

    toggleCart: useCallback(() => {
      setIsCartOpen((prev) => !prev);
    }, []),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls
        toggleCart={callbacks.toggleCart}
        buttonText={"Перейти"}
        isCartOpen={isCartOpen}
        quantity={cart.quantity}
        total={cart.total}
      />
      <List
        list={list}
        onClickButton={callbacks.addToCart}
        buttonText={"Добавить"}
        isCartOpen={isCartOpen}
      />

      {isCartOpen && (
        <Cart toggleCart={callbacks.toggleCart}>
          <Head
            title="Корзина"
            toggleCart={callbacks.toggleCart}
            isCartOpen={isCartOpen}
          />
          <List
            list={cart.list}
            onClickButton={callbacks.removeFromCart}
            buttonText={"Удалить"}
            isCartOpen={isCartOpen}
          />
          <Total total={cart.total} />
        </Cart>
      )}
    </PageLayout>
  );
}

export default App;
