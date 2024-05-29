import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

interface StarRatingProps {
  rating: number;
  voteCount: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, voteCount }) => {
  const roundedRating = Math.round(rating);

  return (
    <div className="flex flex-col items-center text-center">
      <div className="flex items-center justify-center">
        {[...Array(10)].map((_, index) => (
          <FontAwesomeIcon
            key={index}
            icon={faStar}
            className={
              index < roundedRating ? "text-yellow-500" : "text-gray-300"
            }
          />
        ))}
      </div>
      <span className="text-xs text-gray-500">{roundedRating} / 10</span>
      <span className="text-xs text-gray-500">{voteCount} votes</span>
    </div>
  );
};

export default StarRating;
