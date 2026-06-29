import paperImage from "../assets/logos/paper-logo.png";
import brewingImage from "../assets/logos/brewing-logo.png";
import grinderImage from "../assets/logos/grinder-logo.png";

import espressoImage from "../assets/logos/espresso-logo.png";
import filterImage from "../assets/logos/filter-logo.png";
import decafImage from "../assets/logos/decaf-logo.png";

export const accessoriesItems = [
  {
    name: "Paper Filters",
    image: paperImage,
    desc: "High-quality paper filters for a clean and smooth coffee extraction.",
    link: "/accessories/paper",
  },
  {
    name: "Brewing Methods",
    image: brewingImage,
    desc: "Explore various brewing methods to enhance your coffee experience.",
    link: "/accessories/brewing",
  },
  {
    name: "Grinders",
    image: grinderImage,
    desc: "High-quality grinders for a consistent and precise coffee grind.",
    link: "/accessories/grinders",
  },
];

export const coffeeItems = [
  {
    name: "Espresso",
    image: espressoImage,
    desc: "Bold and rich, best enjoyed in small, concentrated doses or with milk.",
    link: "/coffee/espresso",
  },
  {
    name: "Filter",
    image: filterImage,
    desc: "Smooth and balanced, ideal for a relaxing coffee break.",
    link: "/coffee/filter",
  },
  {
    name: "Decaf",
    image: decafImage,
    desc: "Enjoy the taste of coffee without the caffeine.",
    link: "/coffee/decaf",
  },
];
