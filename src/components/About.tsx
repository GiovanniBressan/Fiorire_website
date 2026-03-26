import "./About.css";
import xicara from "../assets/img/xicaraCafe.svg";
import Handshake from "../assets/img/iconeHans.svg";
import support from "../assets/img/heartSupport.svg";
import fachada from "../assets/img/fachada-fiorire.svg";

const About = () => {
  const pillars = [
    {
      icon: <img src={support} className="coffe-cup" />,
      title: "Ambiente Acolhedor",
      desc: "Cada detalhe foi pensado para criar uma atmosfera que combina o rústico do café italiano com o conforto moderno.",
    },
    {
      icon: <img src={Handshake} className="coffe-cup" />,
      title: "Para Todos os Momentos",
      desc: "Seja para um coffee break solo, encontros informais ou reuniões de negócios — temos o espaço ideal para você.",
    },
    {
      icon: <img src={xicara} className="coffe-cup" />,
      title: "Café de Origem",
      desc: "Trabalhamos com grãos selecionados de microlotes brasileiros, preparados com técnicas que ressaltam cada nuance.",
    },
  ];

  return (
    <section id="sobre" className="about">
      <div className="container">
        <div className="about__grid">
          <div className="about__text">
            <p className="section-label">Nossa História</p>
            <h2 className="about__title">
              Um lugar onde o tempo
              <em> desacelera</em>
            </h2>
            <p className="about__body">
              A <strong>Fiorire Caffetteria</strong> nasceu do sonho de criar um
              espaço onde o café fosse mais do que uma bebida — uma experiência.
              O nome vem do italiano
              <em> fiorire</em>, que significa <em>florescer</em>, e é
              exatamente isso que queremos que aconteça em cada visita.
            </p>
            <p className="about__body">
              Localizados no coração da cidade, unimos a estética rústica das
              antigas cafeterias italianas com a funcionalidade moderna que o
              dia a dia exige. Aqui, o Wi-Fi é tão bom quanto o espresso.
            </p>
            <div className="about__quote">
              <span className="about__quote-mark">"</span>
              <p>
                O melhor café é aquele compartilhado na hora certa, no lugar
                certo.
              </p>
            </div>
          </div>

          <div className="about__visual">
            <div className="about__image-main">
              <img
                src={fachada}
                alt=""
                className="about__image-placeholder about__image-placeholder--main"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Pillars */}
      <div className="about__pillars">
        {pillars.map((p, i) => (
          <div
            className="about__pillar"
            key={i}
            style={{ animationDelay: `${i * 0.15}s` }}
          >
            <span className="about__pillar-icon">{p.icon}</span>
            <h3 className="about__pillar-title">{p.title}</h3>
            <p className="about__pillar-desc">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
