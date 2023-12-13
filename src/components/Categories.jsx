import React from 'react';
import cn from 'classnames';

export default function Categories(props) {
  const categories = [
    { name: 'Все', id: 1 },
    { name: 'Мясные', id: 2 },
    { name: 'Вегетарианские', id: 3 },
    { name: 'Гриль', id: 4 },
    { name: 'Острые', id: 5 },
    { name: 'Закрытые', id: 6 },
  ];

  const { value, onClickCategory } = props;

  const renderItem = ({ name, id }) => (
    <li
      id={id}
      key={id}
      className={cn({ active: id === value })}
      onClick={() => onClickCategory(id)}
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
