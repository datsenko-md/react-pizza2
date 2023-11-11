/* eslint-disable react/jsx-filename-extension */
/* eslint-disable */
import React from 'react';
import axios from 'axios';

import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';

// import pizzas from './assets/pizzas.json';

const renderPizza = (pizza) => (
  <PizzaBlock
    key={pizza.id}
    title={pizza.title}
    price={pizza.price}
    imageUrl={pizza.imageUrl}
    sizes={pizza.sizes}
    types={pizza.types}
  />
);

const itemsUrl = 'https://654f0f0e358230d8f0ccfb7e.mockapi.io/items';

function App() {
  const [items, setItems] = React.useState([]);
  React.useEffect(() => {
    const getItems = async () => {
      try {
        const response = await axios.get(itemsUrl);
        setItems(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    getItems();
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map(renderPizza)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
