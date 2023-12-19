import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import { setSortBy, toggleOrder, setOrder } from '../slices/filterSlice';

import arrowDown from '../assets/img/arrow-down.svg';
import arrowUp from '../assets/img/arrow-up.svg';

export const sorts = [
  { id: 1, name: 'популярности', sort: 'rating' },
  { id: 2, name: 'цене', sort: 'price' },
  { id: 3, name: 'алфавиту', sort: 'title' },
];

export default function Sort() {
  const { order, sortBy } = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const selectSort = (id) => () => {
    dispatch(setSortBy(sorts.find((s) => s.id === id)));
    dispatch(setOrder('asc'));
    setOpen(false);
  };

  const renderSort = ({ id, name }) => (
    <li key={id} onClick={selectSort(id)} className={cn({ active: id === sortBy.id })}>{name}</li>
  );

  const orderMap = {
    asc: arrowUp,
    desc: arrowDown,
  };

  return (
    <div className="sort">
      <div className="sort__label">
        <img src={orderMap[order]} alt="arrow" onClick={() => dispatch(toggleOrder())} />
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sortBy.name}</span>
      </div>
      {open && (
      <div className="sort__popup">
        <ul>
          {sorts.map(renderSort)}
        </ul>
      </div>
      ) }
    </div>
  );
}
