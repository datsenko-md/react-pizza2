import React from 'react';
import cn from 'classnames';
import { useDispatch, useSelector } from 'react-redux';

import { addItem } from '../../slices/cartSlice';
import { ReactComponent as PlusLogo } from '../../assets/img/plus-pizza.svg';

const getItemCount = (id, items) => {
  const item = items.find((i) => i.id === id);
  return item ? item.count : 0;
};

export const typeNames = ['тонкое', 'традиционное'];

export default function PizzaBlock({
  id, title, price, imageUrl, sizes, types,
}) {
  const dispatch = useDispatch();
  const [activeType, setActiveType] = React.useState(types[0]);
  const [activeSize, setActiveSize] = React.useState(0);
  const cart = useSelector((state) => state.cart);
  const count = getItemCount(id, cart.items);
  const item = {
    id,
    title,
    price,
    imageUrl,
    size: sizes[activeSize],
    type: activeType,
  };

  return (
    <div className="pizza-block">
      <img
        className="pizza-block__image"
        src={imageUrl}
        alt="Pizza"
      />
      <h4 className="pizza-block__title">{title}</h4>
      <div className="pizza-block__selector">
        <ul>
          {types.map((type) => (
            <li
              key={type}
              className={cn({ active: type === activeType })}
              onClick={() => setActiveType(type)}
            >{typeNames[type]}
            </li>
          ))}
        </ul>
        <ul>
          {sizes.map((size, sizeId) => (
            <li
              key={size}
              className={cn({ active: sizeId === activeSize })}
              onClick={() => setActiveSize(sizeId)}
            >{size} см.
            </li>
          ))}
        </ul>
      </div>
      <div className="pizza-block__bottom">
        <div className="pizza-block__price">от {price} ₽</div>
        <button
          onClick={() => dispatch(addItem(item))}
          type="button"
          className="button button--outline button--add"
        >
          <PlusLogo />
          <span>Добавить</span>
          {count > 0 && <i>{count}</i>}
        </button>
      </div>
    </div>
  );
}

PizzaBlock.defaultProps = {
  title: 'Чизбургер-пицца',
  price: 395,
};
