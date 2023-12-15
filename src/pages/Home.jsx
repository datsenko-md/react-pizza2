import React from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import SearchContext from '../context/SearchContext';

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
  const { categoryId, sortBy, order } = useSelector((state) => state.filter);
  const [items, setItems] = React.useState([]);
  const [state, setState] = React.useState('loading');
  const [currentPage, setCurrentPage] = React.useState(1);
  const { searchValue } = React.useContext(SearchContext);

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
            page: currentPage,
            limit: 4,
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
  }, [categoryId, sortBy, order, searchValue, currentPage]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {renderMap[state](items)}
      </div>
      <Pagination onPageChange={setCurrentPage} />
    </div>
  );
}
