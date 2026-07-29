import { GiCoffeeCup } from "react-icons/gi";

import "./AppBootLoader.scss";

const AppBootLoader = () => {
  return (
    <div className="app-loader">
      <GiCoffeeCup className="app-loader__icon" />
    </div>
  );
};

export default AppBootLoader;
