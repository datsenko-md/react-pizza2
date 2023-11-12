import React from 'react';
import axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';

const renderItems = (items, Component) => items.map((item) => (
  <Component
    key={item.id}
    title={item.title}
    price={item.price}
    imageUrl={item.imageUrl}
    sizes={item.sizes}
    types={item.types}
  />
));

const getFakeItems = (length) => [...Array(length)].map((_, id) => ({ id }));

const renderMap = {
  loading: () => renderItems(getFakeItems(6), Skeleton),
  loaded: (items) => renderItems(items, PizzaBlock),
};

const itemsUrl = 'https://654f0f0e358230d8f0ccfb7e.mockapi.io/items';

export default function Home() {
  const [items, setItems] = React.useState([]);
  const [state, setState] = React.useState('loading');

  React.useEffect(() => {
    const getItems = async () => {
      try {
        const response = await axios.get(itemsUrl);
        setItems(response.data);
        setState('loaded');
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
    };

    getItems();
  }, []);

  return (
    <>
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {renderMap[state](items)}
      </div>
    </>
  );
}
