import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addItemToCart } from "../redux/slices/cartSlice";

const PizzaItem = ({ pizzaItem }) => {
  const { id, imageUrl, name, types, sizes, price } = pizzaItem;
  const dispatch = useDispatch();

  const typeNames = ["тонкое", "традиционное"];
  const [pizzaType, setPizzaType] = useState(types[0]);
  const currentPizzaType = typeNames[pizzaType];

  const [pizzaSize, setPizzaSize] = useState(0);
  const currentPizzaSize = sizes[pizzaSize];

  const isItemInCart = useSelector((state) =>
    state.cart.items.find((el) => el.id === id)
  );
  const pizzasCount = isItemInCart ? isItemInCart.count : 0;

  const onAddToCartClick = () => {
    dispatch(
      addItemToCart({
        id,
        imageUrl,
        name,
        price,
        currentPizzaType,
        currentPizzaSize,
        count: 1,
      })
    );
  };

  return (
    <div className="pizza-block-wrapper">
      <div className="pizza-block">
        <img className="pizza-block__image" src={imageUrl} alt="Pizza" />
        <h4 className="pizza-block__title">{name}</h4>
        <div className="pizza-block__selector">
          <ul>
            {types.map((typeIndex) => (
              <li
                key={typeIndex}
                className={pizzaType === typeIndex ? "active" : ""}
                onClick={() => setPizzaType(typeIndex)}
              >
                {typeNames[typeIndex]}
              </li>
            ))}
          </ul>
          <ul>
            {sizes.map((oneSize, index) => (
              <li
                className={pizzaSize === index ? "active" : ""}
                key={index}
                onClick={() => setPizzaSize(index)}
              >
                {oneSize}
              </li>
            ))}
          </ul>
        </div>
        <div className="pizza-block__bottom">
          <div className="pizza-block__price">от {price} ₽</div>
          <button
            onClick={onAddToCartClick}
            className="button button--outline button--add"
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.8 4.8H7.2V1.2C7.2 0.5373 6.6627 0 6 0C5.3373 0 4.8 0.5373 4.8 1.2V4.8H1.2C0.5373 4.8 0 5.3373 0 6C0 6.6627 0.5373 7.2 1.2 7.2H4.8V10.8C4.8 11.4627 5.3373 12 6 12C6.6627 12 7.2 11.4627 7.2 10.8V7.2H10.8C11.4627 7.2 12 6.6627 12 6C12 5.3373 11.4627 4.8 10.8 4.8Z"
                fill="white"
              />
            </svg>
            <span>Добавить</span>
            <i>{pizzasCount}</i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PizzaItem;