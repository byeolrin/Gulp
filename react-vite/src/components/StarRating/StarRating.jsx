import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({ averageRating }) => {
  const renderStars = () => {
    const starArray = [];
    for (let i = 0; i < 5; i++) {
      if (i < Math.floor(averageRating)) {
        starArray.push(<FaStar key={i} className="star-icon" />);
      } else if (i === Math.floor(averageRating) && averageRating % 1 !== 0) {
        starArray.push(<FaStarHalfAlt key={i} className="star-icon-half" />);
      } else {
        starArray.push(<FaStar key={i} className="star-icon-empty" />);
      }
    }
    return starArray;
  };

  return <div className="star-container">{renderStars()}</div>;
};

export default StarRating;