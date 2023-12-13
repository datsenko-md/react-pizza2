import React from 'react';
import cn from 'classnames';

export default function Sort({
  sortBy, onClickSort, order, onClickOrder,
}) {
  const sorts = [
    { id: 1, name: 'популярности', sort: 'rating' },
    { id: 2, name: 'цене', sort: 'price' },
    { id: 3, name: 'алфавиту', sort: 'title' },
  ];

  const [open, setOpen] = React.useState(false);

  const selectSort = (id) => () => {
    onClickSort(sorts.find((s) => s.id === id));
    onClickOrder('asc');
    setOpen(false);
  };

  const renderSort = ({ id, name }) => (
    <li key={id} onClick={selectSort(id)} className={cn({ active: id === sortBy.id })}>{name}</li>
  );

  const arrowUp = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-caret-up-fill"
      viewBox="0 0 16 16"
      onClick={() => onClickOrder('desc')}
    > <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
    </svg>
  );

  const arrowDown = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      fill="currentColor"
      className="bi bi-caret-down-fill"
      viewBox="0 0 16 16"
      onClick={() => onClickOrder('asc')}
    > <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
    </svg>
  );

  return (
    <div className="sort">
      <div className="sort__label">
        {order === 'asc' ? arrowUp : arrowDown}
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
