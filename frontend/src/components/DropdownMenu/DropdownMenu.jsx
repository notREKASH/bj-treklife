"use client";

import { useRef, useState } from "react";
import "./DropdownMenu.scss";

const filterButtons = [
  {
    name: "Tous",
    filter: "Tous",
  },
  {
    name: "Chaussure",
    filter: "Chaussure",
  },
  {
    name: "Sac à dos",
    filter: "Sac à dos",
  },
  {
    name: "Tente",
    filter: "Tente",
  },
  {
    name: "Duvet",
    filter: "Duvet",
  },
  {
    name: "Réchaud",
    filter: "Réchaud",
  },
  {
    name: "Kit Popote",
    filter: "Kit Popote",
  },
  {
    name: "Matelas",
    filter: "Matelas",
  },
  {
    name: "Frontale",
    filter: "Frontale",
  },
  {
    name: "Filtre à eau",
    filter: "Filtre à eau",
  },
  {
    name: "Polaire",
    filter: "Polaire",
  },
  {
    name: "Veste imperméable",
    filter: "Veste imperméable",
  },
  {
    name: "Doudoune",
    filter: "Doudoune",
  },
  {
    name: "Pantalon",
    filter: "Pantalon",
  },
];

function DropdownMenu() {
  const [currentFilter, setCurrentFilter] = useState("Filtrer par catégorie");
  const customSelect = useRef(null);

  const handleShowMenu = () => {
    customSelect.current.classList.toggle("active");
  };

  const handleClickFilter = (filter) => {
    setCurrentFilter(filter);
    handleShowMenu();
    console.log(filter);
  };

  return (
    <div className="dropdownMenu">
      <div className="dropdownMenu__custom-select" ref={customSelect}>
        <button
          className="dropdownMenu__custom-select__select-button"
          onClick={handleShowMenu}
        >
          <span>{currentFilter}</span>
          <span className="dropdownMenu__custom-select__select-button--arrow"></span>
        </button>
        <ul className="dropdownMenu__custom-select--select-dropdown">
          {filterButtons.map(({ name, filter }) => (
            <li
              key={name}
              className={filter === currentFilter ? "selected" : ""}
              onClick={() => handleClickFilter(filter)}
            >
              {name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DropdownMenu;
