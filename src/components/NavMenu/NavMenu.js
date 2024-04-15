import React from "react";
import { categoryNames } from "../../utils.js";
import "./NavMenu.css";
import logo from "../../imgs/logo.svg";

export const NavMenu = ({ onNavClick, category }) => {
  return (
    <>
      <a
        onClick={onNavClick}
        href="#"
        data-cat="index"
        className="navigation__logo"
      >
        <img className="navigation__image" src={logo} alt="Логотип" />
      </a>
      <ul className="navigation__list">
        {["index", "fashion", "technologies", "other", "politics"].map(
          (cat) => {
            return (
              <li className="navigation__item" key={cat}>
                <a
                  onClick={onNavClick}
                  data-cat={cat}
                  href="#"
                  className={`navigation__link ${
                    category === cat ? "navigation__link--active" : ""
                  }`}
                >
                  {categoryNames[cat]}
                </a>
              </li>
            );
          }
        )}
      </ul>
    </>
  );
};
