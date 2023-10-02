import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import { useContext } from "react";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const isOnline = useOnline();
  const { user } = useContext(UserContext);
  const cartQuantity = useSelector((store) => store.cart.quantity);

  return (
    <div className="flex border border-black m-2 bg-pink-100">
      <div>
        <img className="h-28 p-2" src={LOGO_URL} />
      </div>
      <div>
        <ul className="flex m-12 justify-evenly w-full right-0">
          <h4>{user.name}</h4>
          <span>Online Status : {isOnline ? "Online" : "Offline"}</span>
          <Link to="/">
            <li>Home</li>
          </Link>
          <Link to="/about">
            <li>About</li>
          </Link>
          <Link to="/contact">
            <li>Contact Us</li>
          </Link>
          <Link to="/instamart">
            <li>Instamart</li>
          </Link>
          <Link to="/cart">
            <li>
              Cart{" "}
              <button className="pl-[2px] pr-[2px] font-bold bg-purple-800 text-white">
                {cartQuantity}
              </button>{" "}
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
