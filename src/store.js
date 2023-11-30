import { generateCode } from "./utils";

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter((item) => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    this.setState({
      ...this.state,
      list: [
        ...this.state.list,
        { code: generateCode(), title: "Новая запись" },
      ],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      // Новый список, в котором не будет удаляемой записи
      list: this.state.list.filter((item) => item.code !== code),
    });
  }

  addToCart(code) {
    const { list: cartList, total: cartTotal, quantity: cartQuantity } = this.state.cart;
    const { list: itemList } = this.state;

    const item = itemList.find(item => item.code === code);
    const existingItem = cartList.find(item => item.code === code);

    const newTotal = existingItem ? cartTotal - existingItem.price * existingItem.quantity + item.price * (existingItem.quantity + 1) : cartTotal + item.price;
    const newQuantity = existingItem ? cartQuantity : cartQuantity + 1;

    const newList = existingItem ? cartList.map(item => item.code === code ? { ...item, quantity: item.quantity + 1 } : item) : [...cartList, { ...item, quantity: 1 }];

    this.setState({
      ...this.state,
      cart: {
        ...this.state.cart,
        list: newList,
        total: newTotal,
        quantity: newQuantity,
      },
    });
   }




  removeFromCart(code) {
    const { cart } = this.state;
    const { list } = cart;

    const newList = list.filter(item => item.code !== code);
    const total = newList.reduce((total, item) => total + item.price * item.quantity, 0);

    this.setState({
      ...this.state,
      cart: {
        ...cart,
        list: newList,
        total,
        quantity: newList.length,
      },
    });
   }
}

export default Store;
