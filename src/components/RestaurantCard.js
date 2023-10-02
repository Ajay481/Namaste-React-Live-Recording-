import { useContext } from "react";
import { CDN_URL } from "../utils/constants";
import UserContext from "../utils/UserContext";

const RestaurantCard = (props) => {
  const { resData } = props;
  const { user } = useContext(UserContext);

  const {
    cloudinaryImageId,
    name,
    cuisines,
    deliveryTime,
    costForTwo,
    avgRating,
  } = resData?.data;

  return (
    <div className="w-80 m-5 p-2 border border-black bg-pink-100">
      <img className="h-48" src={CDN_URL + cloudinaryImageId} alt="foodlogo" />
      <h3 className="font-bold">{name}</h3>
      <h4>{cuisines.join(",")}</h4>
      <h4>{avgRating} star</h4>
      <h4>{deliveryTime} MINS</h4>
      <h4>{costForTwo / 100} FOR TWO</h4>
      <h4>
        {user.name}-{user.email}
      </h4>
    </div>
  );
};

export default RestaurantCard;
