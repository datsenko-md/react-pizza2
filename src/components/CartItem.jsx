import React from 'react';
import { useDispatch } from 'react-redux';

import { ReactComponent as MinusLogo } from '../assets/img/minus-cart.svg';
import { ReactComponent as PlusLogo } from '../assets/img/plus-cart.svg';
import { ReactComponent as RemoveLogo } from '../assets/img/remove-cart.svg';
import { typeNames } from './PizzaBlock';
import { minusItem, plusItem, removeItem } from '../slices/cartSlice';

function CartItem({
  id, title, price, count, imageUrl, type, size,
}) {
  const dispatch = useDispatch();

  return (
    <div className="cart__item">
      <div className="cart__item-img">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
      </div>
      <div className="cart__item-info">
        <h3>{title}</h3>
        <p>{typeNames[type]} тесто, {size} см.</p>
      </div>
      <div className="cart__item-count">
        <div onClick={() => dispatch(minusItem(id))} className="button button--outline button--circle cart__item-count-minus">
          <MinusLogo />
        </div>
        <b>{count}</b>
        <div onClick={() => dispatch(plusItem(id))} className="button button--outline button--circle cart__item-count-plus">
          <PlusLogo />
        </div>
      </div>
      <div className="cart__item-price">
        <b>{price * count} ₽</b>
      </div>
      <div onClick={() => dispatch(removeItem(id))} className="cart__item-remove">
        <div className="button button--outline button--circle">
          <RemoveLogo />
        </div>
      </div>
    </div>
  );
}

export default CartItem;
