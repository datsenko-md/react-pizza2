import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { ReactComponent as CartLogo } from '../assets/img/cart-cart.svg';
import { ReactComponent as ClearLogo } from '../assets/img/clear-cart.svg';
import { ReactComponent as ArrowLeftLogo } from '../assets/img/arrow-left-cart.svg';

import { clearItems } from '../slices/cartSlice';
import CartItem from '../components/CartItem';

const renderItems = (items) => items.map((i) => (
  <CartItem
    key={i.id}
    id={i.id}
    title={i.title}
    price={i.price}
    count={i.count}
    type={i.type}
    size={i.size}
    imageUrl={i.imageUrl}
  />
));

export default function Cart() {
  const dispatch = useDispatch();
  const { totalPrice, items } = useSelector((state) => state.cart);
  const totalCount = items.reduce((acc, item) => acc + item.count, 0);

  return (
    <div className="container container--cart">
      <div className="cart">
        <div className="cart__top">
          <h2 className="content__title">
            <CartLogo />
            Корзина
          </h2>
          <div onClick={() => dispatch(clearItems())} className="cart__clear">
            <ClearLogo />
            <span>Очистить корзину</span>
          </div>
        </div>
        <div className="content__items">
          {renderItems(items)}
        </div>
        <div className="cart__bottom">
          <div className="cart__bottom-details">
            <span> Всего пицц: <b>{totalCount} шт.</b> </span>
            <span> Сумма заказа: <b>{totalPrice} ₽</b> </span>
          </div>
          <div className="cart__bottom-buttons">
            <Link to="/" className="button button--outline button--add go-back-btn">
              <ArrowLeftLogo />
              <span>Вернуться назад</span>
            </Link>
            <div className="button pay-btn">
              <span>Оплатить сейчас</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
