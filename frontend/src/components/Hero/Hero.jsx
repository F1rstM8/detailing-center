import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import "./Hero.scss";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <div className="hero__container">
        <div className="hero__content">
          <h1
            dangerouslySetInnerHTML={{
              __html: t("hero_title").replace(
                "Кракове",
                "<span>Кракове</span>",
              ),
            }}
          />
          <p>{t("hero_subtitle")}</p>

          <Link to="/services" className="hero__btn">
            {t("hero_btn")}
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
