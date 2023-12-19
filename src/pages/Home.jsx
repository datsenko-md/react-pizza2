import React from 'react';
import axios from 'axios';
import qs from 'qs';
// import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sorts } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import SearchContext from '../context/SearchContext';
import { setFilters } from '../slices/filterSlice';

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
  const {
    categoryId,
    sortBy,
    order,
    currentPage,
  } = useSelector((state) => state.filter);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const [items, setItems] = React.useState([]);
  const [state, setState] = React.useState('loading');
  const { searchValue } = React.useContext(SearchContext);

  React.useEffect(() => {
    if (window.location.search.length > 0) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sorts.find((s) => s.sort === params.sortBy);
      dispatch(setFilters({
        ...params,
        sort,
      }));
      // navigate('');
      isSearch.current = true;
    }
  }, []);

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
        window.scrollTo(0, 0);
      } catch (err) {
        // eslint-disable-next-line
        console.log(err);
      }
    };

    if (!isSearch.current) {
      getItems();
    }

    isSearch.current = false;
  }, [categoryId, sortBy, order, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        categoryId,
        order,
        currentPage,
        sortBy: sortBy.sort,
      });
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sortBy, order, currentPage]);

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
      <Pagination currentPage={currentPage} />
    </div>
  );
}
