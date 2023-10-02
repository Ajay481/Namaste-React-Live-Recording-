import RestaurantCard from "./RestaurantCard";
import resCard from "../utils/mockData";
import { useState, useEffect, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";
import useOnline from "../utils/useOnline";
import UserContext from "../utils/UserContext";

const Body = () => {
  // Array Destructuring
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [search, setSearch] = useState("");
  const { user, setUser } = useContext(UserContext);

  const searchHandler = () => {
    const data = filterData(search, listOfRestaurants);
    setFilteredRestaurants(data);
  };

  // empty dependency array => once after render
  // dep array [search] => once after initial render + everytime after render my search changes
  useEffect(() => {
    // API call
    getRestaurant();
  }, []);

  const getRestaurant = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=20.402695486085722&lng=72.88256753236055&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();

    //Optional Chaining
    setListOfRestaurants(json?.data?.cards[2]?.data?.data?.cards);
    setFilteredRestaurants(json?.data?.cards[2]?.data?.data?.cards);
  };

  const isOnline = useOnline();
  if (!isOnline) {
    return <h1>Offline, Please Check Your Internet Connection</h1>;
  }

  // not render component (Early Return)
  // if (!listOfRestaurants) return null;

  // if (filteredRestaurants?.length === 0)
  //   return <h1>No Restaurant match your Filter!!!</h1>;

  // Conditional Rendering
  // if restaurant is empty => Shimmer UI
  // if restaurant has data => actual data UI
  return listOfRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="bg-slate-200">
      <div>
        <input
          className="border border-black ml-2 p-2 rounded-lg"
          name="search"
          type="text"
          placeholder=""
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />
        <button
          className="ml-2 p-2 bg-pink-400 rounded-lg"
          onClick={searchHandler}
        >
          Search
        </button>
        <button
          className="ml-2 p-2 bg-blue-400 rounded-md"
          onClick={() => {
            const filteredItems = listOfRestaurants?.filter(
              (res) => res?.data?.avgRating > 3
            );
            setFilteredRestaurants(filteredItems);
          }}
        >
          Top Rated Restaurants
        </button>
        <input
          className="border border-black ml-2 p-2 rounded-lg"
          value={user.name}
          onChange={(e) =>
            setUser({
              ...user,
              name: e.target.value,
            })
          }
        />
        <input
          className="border border-black ml-2 p-2 rounded-lg"
          value={user.email}
          onChange={(e) =>
            setUser({
              ...user,
              email: e.target.value,
            })
          }
        />
      </div>
      <div className="flex flex-wrap">
        {filteredRestaurants?.map((restaurant) => (
          <Link
            to={"/restaurant/" + restaurant?.data?.id}
            key={restaurant?.data?.id}
          >
            <RestaurantCard resData={restaurant} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
