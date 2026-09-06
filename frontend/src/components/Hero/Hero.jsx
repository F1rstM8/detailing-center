import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";
import "./Hero.scss";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="hero">
      <h1 className="hero__title">
    
        <Trans i18nKey="hero_title" components={{ span: <span /> }} />
      </h1>
      
      <p className="hero__subtitle">{t("hero_subtitle")}</p>

      <Link to="/services" className="hero__btn">
        {t("hero_btn")}
      </Link>
    </section>
  );
};

export default Hero;