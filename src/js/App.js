import { NavMenu } from "./NavMenu.js";
import { Articles } from "./Articles.js";
import { categoryIds } from "./utils.js";
import React from "react";

const URL2 = "https://frontend.karpovcourses.net/api/v2/ru/news";

export const App = () => {
  const [category, setCategory] = React.useState("index");
  const [articles, setArticles] = React.useState({
    items: [],
    categories: [],
    sources: [],
  });

  const onNavClick = (e) => {
    e.preventDefault();
    setCategory(e.currentTarget.dataset.cat);
  };

  React.useEffect(() => {
    fetch(`${URL2}/${categoryIds[category]}`)
      .then((response) => response.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error(new Error(error)));
  }, [category]);

  return (
    <>
      <header className="header">
        <div className="container">
          <nav className="navigation grid header__navigation">
            <NavMenu onNavClick={onNavClick} category={category} />
          </nav>
        </div>
      </header>

      <main className="main">
        <Articles articles={articles} />
      </main>

      <footer className="footer">
        <div className="container">
          <nav className="navigation grid footer__navigation">
            <NavMenu onNavClick={onNavClick} category={category} />
          </nav>
          <div className="footer__column">
            <p className="footer__text">
              Сделано на Frontend курсе в{" "}
              <a
                href="https://karpov.courses/frontend"
                target="_blank"
                className="footer__link"
              >
                Karpov.Courses
              </a>
            </p>
            <p className="footer__copyright">© 2021</p>
          </div>
        </div>
      </footer>
    </>
  );
};
