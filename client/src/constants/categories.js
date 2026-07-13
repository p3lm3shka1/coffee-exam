import paperImage from "../assets/logos/paper-logo.png";
import brewingImage from "../assets/logos/brewing-logo.png";
import grinderImage from "../assets/logos/grinder-logo.png";

import espressoImage from "../assets/logos/espresso-logo.png";
import filterImage from "../assets/logos/filter-logo.png";
import decafImage from "../assets/logos/decaf-logo.png";

import allCoffeeImage from "../assets/logos/all.png";

export const accessoriesItems = [
  { labelKey: "categories.all", image: allCoffeeImage, subcategory: "all" },
  {
    labelKey: "categories.paper_filters",
    image: paperImage,
    subcategory: "filters",
  },
  {
    labelKey: "categories.brewing_equipment",
    image: brewingImage,
    subcategory: "brewing",
  },
  {
    labelKey: "categories.grinders",
    image: grinderImage,
    subcategory: "grinders",
  },
];

export const coffeeItems = [
  { labelKey: "categories.all", image: allCoffeeImage, subcategory: "all" },
  {
    labelKey: "categories.espresso",
    image: espressoImage,
    subcategory: "espresso",
  },
  { labelKey: "categories.filter", image: filterImage, subcategory: "filter" },
  { labelKey: "categories.decaf", image: decafImage, subcategory: "decaf" },
];
