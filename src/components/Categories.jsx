import React from 'react';
import cn from 'classnames';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId } from '../slices/filterSlice';

export default function Categories() {
  const categories = [
    { name: 'Все', id: 1 },
    { name: 'Мясные', id: 2 },
    { name: 'Вегетарианские', id: 3 },
    { name: 'Гриль', id: 4 },
    { name: 'Острые', id: 5 },
    { name: 'Закрытые', id: 6 },
  ];

  const categoryId = useSelector((state) => state.filter.activeCategoryId);
  const dispatch = useDispatch();

  const renderItem = ({ name, id }) => (
    <li
      id={id}
      key={id}
      className={cn({ active: id === categoryId })}
      onClick={() => dispatch(setCategoryId(id))}
    >
      {name}
    </li>
  );

  return (
    <div className="categories">
      <ul>
        {categories.map(renderItem)}
      </ul>
    </div>
  );
}
