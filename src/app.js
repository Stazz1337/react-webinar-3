import React from 'react';
import { createElement } from './utils.js';
import './styles.css';
/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const list = store.getState().list;

  return (
    <div className='App'>
      <div className='App-head'>
        <h1>Приложение на чистом JS</h1>
      </div>
      <div className='App-controls'>
        <button onClick={() => store.addItem()}>Добавить</button>
      </div>
      <div className='App-center'>
        <div className='List'>
          {list.map((item) => (
            <div key={item.code} className='List-item'>
              <div
                className={'Item' + (item.selected ? ' Item_selected' : '')}
                onClick={(e) => store.selectItem(item.code)}>
                <div className='Item-code'>{item.code}</div>
                <div className='Item-title'>
                  {`${item.title} ${
                    item.count > 0
                      ? `| Выделяли ${item.count} ${
                          item.count % 10 >= 2 &&
                          item.count % 10 <= 4 &&
                          (item.count % 100 < 10 || item.count % 100 >= 20)
                            ? 'раза'
                            : 'раз'
                        }`
                      : ''
                  }`}
                </div>
                <div className='Item-actions'>
                  <button onClick={(e) => store.deleteItem(e, item.code)}>Удалить</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
