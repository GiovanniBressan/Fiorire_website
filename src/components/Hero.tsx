import "./Hero.css";

const Hero = () => {
  return (
    <section id="hero" className="hero">
      {/* Decorative background elements */}
      <div className="hero__bg">
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
        <div className="hero__circle hero__circle--1" />
        <div className="hero__circle hero__circle--2" />
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <p className="section-label hero__label">Bem-vindo à</p>

          <h1 className="hero__title">
            <span className="hero__title-main">Fiorire</span>
            <span className="hero__title-sub">Caffetteria</span>
          </h1>

          <p className="hero__tagline">
            <em>Onde há beleza no instante</em>
          </p>

          <p className="hero__desc">
            Um espaço cuidadosamente pensado para quem valoriza bons momentos —
            seja no silêncio de um café solitário ou na energia de uma reunião
            produtiva.
          </p>

          <div className="hero__actions">
            <a href="#cardapio" className="btn btn--primary">
              Explorar o Cardápio
            </a>
            <a href="#agendamento" className="btn btn--outline">
              Agendar Espaço
            </a>
          </div>

          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-number">4+</span>
              <span className="hero__stat-label">Anos de história</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">3</span>
              <span className="hero__stat-label">Ambientes exclusivos</span>
            </div>
            <div className="hero__stat-divider" />
            <div className="hero__stat">
              <span className="hero__stat-number">12+</span>
              <span className="hero__stat-label">Cafés especiais</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__image-frame">
            <div className="hero__image-placeholder">
              <div className="hero__coffee-art">
                <svg
                  viewBox="0 0 300 300"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Cup */}
                  <path
                    d="M80 140 L90 240 Q150 260 210 240 L220 140 Z"
                    fill="#A0622A"
                    opacity="0.15"
                  />
                  <path
                    d="M80 140 L90 240 Q150 260 210 240 L220 140 Z"
                    stroke="#A0622A"
                    strokeWidth="2.5"
                    fill="none"
                  />
                  {/* Saucer */}
                  <ellipse
                    cx="150"
                    cy="245"
                    rx="85"
                    ry="18"
                    fill="#5C3D2E"
                    opacity="0.12"
                  />
                  <ellipse
                    cx="150"
                    cy="245"
                    rx="85"
                    ry="18"
                    stroke="#5C3D2E"
                    strokeWidth="2"
                    fill="none"
                  />
                  {/* Handle */}
                  <path
                    d="M220 165 Q260 165 260 195 Q260 225 220 225"
                    stroke="#A0622A"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                  />
                  {/* Steam */}
                  <path
                    d="M120 110 Q115 95 120 80 Q125 65 120 50"
                    stroke="#A0622A"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                  <path
                    d="M150 105 Q145 90 150 75 Q155 60 150 45"
                    stroke="#A0622A"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                  <path
                    d="M180 110 Q175 95 180 80 Q185 65 180 50"
                    stroke="#A0622A"
                    strokeWidth="1.5"
                    fill="none"
                    strokeLinecap="round"
                    opacity="0.4"
                  />
                  {/* Decorative dots */}
                  <circle cx="60" cy="80" r="4" fill="#FF5686" opacity="0.4" />
                  <circle
                    cx="240"
                    cy="100"
                    r="3"
                    fill="#FF5686"
                    opacity="0.3"
                  />
                  <circle
                    cx="50"
                    cy="200"
                    r="2.5"
                    fill="#A0622A"
                    opacity="0.3"
                  />
                  <circle
                    cx="255"
                    cy="200"
                    r="4"
                    fill="#A0622A"
                    opacity="0.2"
                  />
                  {/* Branch decoration */}
                  <path
                    d="M30 260 Q60 240 80 220 Q100 200 90 180"
                    stroke="#7A8C6E"
                    strokeWidth="1.5"
                    fill="none"
                    opacity="0.5"
                  />
                  <circle cx="85" cy="175" r="5" fill="#7A8C6E" opacity="0.4" />
                  <circle
                    cx="100"
                    cy="185"
                    r="4"
                    fill="#7A8C6E"
                    opacity="0.3"
                  />
                  <circle cx="75" cy="195" r="3" fill="#7A8C6E" opacity="0.3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <a
        href="#sobre"
        className="hero__scroll-hint"
        aria-label="Rolar para baixo"
      >
        <div className="hero__scroll-line" />
        <span>Descubra mais</span>
      </a>
    </section>
  );
};

export default Hero;
