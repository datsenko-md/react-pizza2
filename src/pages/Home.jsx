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

export default function Home({ searchValue }) {
  const [items, setItems] = React.useState([]);
  const [state, setState] = React.useState('loading');
  const [categoryId, setCategoryId] = React.useState(1);
  const [sortBy, setSortBy] = React.useState({ id: 1, name: 'популярности', sort: 'rating' });
  const [order, setOrder] = React.useState('asc');

  React.useEffect(() => {
    const getItems = async () => {
      try {
        const response = await axios({
          method: 'get',
          url: itemsUrl,
          params: {
            category: categoryId === 1 ? null : categoryId,
            sortBy: sortBy.sort,
            order: order === 'asc' ? null : order,
            search: searchValue === '' ? null : searchValue,
          },
        });
        setItems(response.data);
        setState('loaded');
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
    };
    window.scrollTo(0, 0);

    getItems();
  }, [categoryId, sortBy, order, searchValue]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onClickCategory={(id) => setCategoryId(id)} />
        <Sort
          sortBy={sortBy}
          onClickSort={(sort) => setSortBy(sort)}
          order={order}
          onClickOrder={(newOrder) => setOrder(newOrder)}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {renderMap[state](items)}
      </div>
    </div>
  );
}
