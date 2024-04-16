import React from "react";
import { RelatedSmallArticle } from "../RelatedSmallArticle/RelatedSmallArticle.js";
import { RelatedBigArticle } from "../RelatedBigArticle/RelatedBigArticle.js";
import "./FullArticle.css";
import defaultImg from "../../imgs/no_icon.png";

export const FullArticle = ({ image, category, title, text, source }) => {
  const [loaded, setLoaded] = React.useState(false);
  const handleLoad = () => {
    setLoaded(true);
  };
  return (
    <article className="full-article">
      <section className="hero-wImg">
        <div className="hero-wr">
          <div
            className="hero-wImg__background"
            style={{ display: loaded ? "block" : "none" }}
          >
            <img
              src="https://picsum.photos/1920/1080"
              onLoad={handleLoad}
            ></img>
          </div>
          <div className="grid container">
            <h2 className="hero-wImg__title">
              баскетбольный сезон стартует с очередной сенсации, которая
              шокировала фанатов спорта
            </h2>
          </div>
        </div>

        <div className="grid container">
          <div className="hero__category">НОВОСТИ</div>
          <div className="hero__date">9 ИЮЛЯ</div>
        </div>
      </section>

      <section className="fullArticle grid container">
        <div className="fullArticle__body">
          <div className="whImage grid" id="whImage">
            <div className="title-whImg">
              сезон баскетбола стартует с очередной сенсации, которая шокировала
              фанатов спорта
            </div>
            <div className="hero__category">НОВОСТИ</div>
            <div className="hero__date">9 ИЮЛЯ</div>
          </div>

          <div className="fullArticle__text">
            Женская сборная России по баскетболу 3х3 проиграла США (15:18) в
            финале Олимпиады. Печальный итог. Да, США — явный фаворит, но
            надежда на золото была реальной. Всё-таки в динамичном формате игр
            на выбывание в Токио фавориты далеко не всегда побеждают. К
            сожалению, наши девушки не смогли совершить апсет по примеру мужской
            команды, которая в полуфинале разгромила лидера мирового рейтинга
            Сербию (21:10). Победа США получилась слишком лёгкой. Американки с
            самого начала захватили инициативу и не давали России ни малейшего
            шанса совершить камбэк. Появилась хоть призрачная надежда на
            спасение, но американки сразу же попали из-за дуги и фактически
            сняли все вопросы — шансов отыграться при 12:17 не было.
          </div>
        </div>

        <div className="relatedSmallArticle">
          <RelatedSmallArticle />
          <RelatedSmallArticle />
          <RelatedSmallArticle />
          <RelatedSmallArticle />
          <RelatedSmallArticle />
          <RelatedSmallArticle />
        </div>
      </section>
      <div className="container">
        <div className="relatedBigArticles">
          <h2 className="relatedBigArticles__header">читайте также:</h2>
          <div className="grid">
            <RelatedBigArticle />
            <RelatedBigArticle />
            <RelatedBigArticle />
          </div>
        </div>
      </div>
    </article>
  );
};
