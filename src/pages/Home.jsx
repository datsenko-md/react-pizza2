import React from 'react';
import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sorts } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import PizzaBlock from '../components/PizzaBlock';
import Pagination from '../components/Pagination';
import { selectFilter, setFilters } from '../slices/filterSlice';
import { fetchPizzas, selectPizzas } from '../slices/pizzasSlice';

const renderItems = (items, Component) => items.map((item) => (
  <Component
    id={item.id}
    key={item.id}
    title={item.title}
    price={item.price}
    imageUrl={item.imageUrl}
    sizes={item.sizes}
    types={item.types}
  />
));

const getFakeItems = (length) => [...Array(length)].map((_, id) => ({ id }));

export default function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);
  const {
    categoryId, sortBy, order, currentPage, searchValue, itemsLimit,
  } = useSelector(selectFilter);

  const renderMap = {
    loading: () => renderItems(getFakeItems(itemsLimit), Skeleton),
    idle: (items) => renderItems(items, PizzaBlock),
  };

  const { items, loadingStatus } = useSelector(selectPizzas);

  React.useEffect(() => {
    if (window.location.search.length > 0) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sorts.find((s) => s.sort === params.sortBy);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    if (!isSearch.current) {
      dispatch(fetchPizzas());
      window.scrollTo(0, 0);
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
      {loadingStatus === 'failed' ? (
        <div className="content__error-info">
          <h2>Произошла ошибка <icon>😕</icon></h2>
          <p>Не удалось получить пиццы</p>
        </div>
      ) : (
        <>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {renderMap[loadingStatus](items)}
          </div>
        </>
      )}
      <Pagination currentPage={currentPage} />
    </div>
  );
}
