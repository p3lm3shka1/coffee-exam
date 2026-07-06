import paperImage from "../assets/logos/paper-logo.png";
import brewingImage from "../assets/logos/brewing-logo.png";
import grinderImage from "../assets/logos/grinder-logo.png";

import espressoImage from "../assets/logos/espresso-logo.png";
import filterImage from "../assets/logos/filter-logo.png";
import decafImage from "../assets/logos/decaf-logo.png";

import allCoffeeImage from "../assets/logos/all.png";

export const accessoriesItems = [
  {
    name: "Paper Filters",
    image: paperImage,
    subcategory: "filters",
  },
  {
    name: "Brewing Equipment",
    image: brewingImage,
    subcategory: "brewing",
  },
  {
    name: "Grinders",
    image: grinderImage,
    subcategory: "grinders",
  },
];

export const coffeeItems = [
  {
    name: "Espresso",
    image: espressoImage,
    subcategory: "espresso",
  },
  {
    name: "Filter",
    image: filterImage,
    subcategory: "filter",
  },
  {
    name: "Decaf",
    image: decafImage,
    subcategory: "decaf",
  },
];

export const allCoffeeItem = {
  name: "All",
  image: allCoffeeImage,
  subcategory: "all",
};

export const allAccessoriesItem = {
  name: "All",
  image: allCoffeeImage,
  subcategory: "all",
};
