import React from "react";

const Shimmer = () => {
  return (
    <div className="flex flex-wrap">
      {Array(5)
        .fill("")
        .map((e, index) => (
          <div
            className="bg-gray-300 w-72 h-36 shadow-lg m-4 rounded-lg"
            key={index}
          >
            <ul className="mt-40">
              <li className="bg-gray-300 w-44 h-4 shadow-lg m-4 rounded-lg"></li>
              <li className="bg-gray-300 w-44 h-4 shadow-lg m-4 rounded-lg"></li>
              <li className="bg-gray-300 w-44 h-4 shadow-lg m-4 rounded-lg"></li>
            </ul>
          </div>
        ))}
      {Array(10)
        .fill("")
        .map((e, index) => (
          <div
            className="bg-gray-300 w-72 h-36 shadow-lg m-4 mt-24 rounded-lg"
            key={index}
          >
            <ul className="mt-40">
              <li className="bg-gray-300 w-44 h-4 shadow-lg m-4 rounded-lg"></li>
              <li className="bg-gray-300 w-44 h-4 shadow-lg m-4 rounded-lg"></li>
              <li className="bg-gray-300 w-44 h-4 shadow-lg m-4 rounded-lg"></li>
            </ul>
          </div>
        ))}
    </div>
  );
};

export default Shimmer;
