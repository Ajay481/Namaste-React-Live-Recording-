import { useDispatch, useSelector } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItems, clearCart, removeItems } from "../utils/cartSlice";
import { useEffect, useState } from "react";

const Cart = () => {
  const cartItem = useSelector((store) => store?.cart?.items);
  const cartQuantity = useSelector((store) => store?.cart?.quantity);
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();
  console.log(cartItem);

  const clearCartHandler = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    const total = cartItem.reduce(getSum, 0);

    function getSum(total, cartItem) {
      return (
        total +
        ((cartItem?.price || cartItem?.defaultPrice) / 100) * cartItem?.quantity
      );
    }
    setAmount(total);
  }, [cartItem]);

  const addHandler = (item) => {
    const { id, price, name, defaultPrice } = item;
    dispatch(addItems({ id, price, name, defaultPrice }));
  };

  const removeCartHandler = (item) => {
    dispatch(removeItems(item));
  };

  return (
    <div className="bg-slate-200">
      <button
        className="ml-2 p-2 bg-orange-400 rounded-lg"
        onClick={() => clearCartHandler()}
      >
        Clear Cart
      </button>

      <div className="w-full ml-[42rem]">
        {cartItem?.map((item) => (
          <div
            key={item?.id}
            className="w-96 m-2 p-2 border border-black bg-pink-100 flex justify-between"
          >
            <p className="font-bold">{item?.name}</p>

            <div className="flex">
              <button
                className="pl-2 pr-2 bg-white font-bold text-gray-500"
                onClick={() => removeCartHandler(item.id)}
              >
                -
              </button>
              <p className="bg-white font-bold text-green-700">
                {item?.quantity}
              </p>
              <button
                className="pl-2 pr-2 bg-white font-bold text-green-700"
                onClick={() => addHandler(item)}
              >
                +
              </button>
            </div>
            <p>
              {"Rs."}
              {item?.totalPrice / 100}
            </p>
          </div>
        ))}
        <div className="w-96 m-2 p-2 border border-black bg-pink-100 flex justify-between">
          <p>Total Amount</p>
          <p>
            {"Rs."}
            {amount}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
