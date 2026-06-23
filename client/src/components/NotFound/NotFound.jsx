import { Link } from "react-router-dom";

import { HiOutlineEmojiSad } from "react-icons/hi";

import "./NotFound.scss";

const NotFound = () => {
  return (
    <div className="notfound">
      <HiOutlineEmojiSad className="notfound__icon" />
      <p className="notfound__text">
        Whoopsie <br />
        There's nothing here!
      </p>
      <Link to="/" className="notfound__link">
        Go back
      </Link>
    </div>
  );
};

export default NotFound;
