import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CDN_URL } from "../utils/constants";
import Shimmer from "./Shimmer";
import useRestaurant from "../utils/useRestaurant";
import { addItems, removeItems } from "../utils/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const RestaurantMenu = () => {
  const { resId } = useParams();

  const restaurant = useRestaurant(resId);

  const cartItem = useSelector((store) => store?.cart?.items);
  const cartQuantity = useSelector((store) => store?.cart?.quantity);

  const dispatch = useDispatch();

  const addHandler = (item) => {
    const { id, price, name, defaultPrice } = item?.card?.info;
    dispatch(addItems({ id, price, name, defaultPrice }));
  };

  const removeCartHandler = (item) => {
    const { id } = item?.card?.info;
    dispatch(removeItems(id));
  };

  if (!restaurant) return <Shimmer />;

  const {
    name,
    cuisines,
    costForTwoMessage,
    areaName,
    avgRating,
    cloudinaryImageId,
  } = restaurant?.cards[0]?.card?.card?.info;

  const { itemCards } =
    restaurant?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card;

  console.log(itemCards);

  return (
    <div className="flex bg-slate-200">
      <div className="ml-5">
        <h1>Restaurant Id: {resId}</h1>
        <h2 className="font-bold text-2xl">{name}</h2>
        <img src={CDN_URL + cloudinaryImageId} alt="food" />
        <h3>{areaName}</h3>
        <h3>{cuisines.join(",")}</h3>
        <h3>{avgRating} stars</h3>
        <h3>{costForTwoMessage}</h3>
      </div>
      <div className="ml-5">
        <h1 className="font-bold text-2xl ml-3">Menu</h1>
        <ul>
          {itemCards?.map((item) => (
            <li
              className="mt-2 w-[60rem] m-2 p-2 border border-black bg-pink-100 flex justify-between"
              key={item?.card?.info?.id}
            >
              <div>
                {item?.card?.info?.name}
                <li className="font-bold">
                  {"Rs."}
                  {(item?.card?.info?.price || item?.card?.info?.defaultPrice) /
                    100}
                </li>
                <li className="w-[48rem] text-gray-700 mt-3">
                  {item?.card?.info?.description}
                </li>
              </div>
              <div>
                {item?.card?.info?.imageId ? (
                  <img
                    className="w-36"
                    alt="dish-image"
                    src={CDN_URL + item?.card?.info?.imageId}
                  />
                ) : null}
                {cartItem.filter((items) => items?.id === item?.card?.info?.id)
                  .length > 0 ? (
                  <div className="flex">
                    <button
                      className="pl-4 pr-4 ml-7 bg-white font-bold text-gray-500"
                      onClick={() => removeCartHandler(item)}
                    >
                      -
                    </button>
                    <p className="bg-white font-bold text-green-700">
                      {
                        cartItem.filter(
                          (items) => item?.card?.info?.id === items?.id
                        )[0].quantity
                      }
                    </p>
                    <button
                      className="pl-4 pr-4 bg-white font-bold text-green-700"
                      onClick={() => addHandler(item)}
                    >
                      +
                    </button>
                  </div>
                ) : (
                  <button
                    className="px-4 bg-white font-bold text-green-700 ml-9"
                    onClick={() => addHandler(item)}
                  >
                    ADD
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RestaurantMenu;
