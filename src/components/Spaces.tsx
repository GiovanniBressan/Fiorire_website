import "./Spaces.css";
import jardim from "../assets/img/Varanda Jardim.png";
import espresso from "../assets/img/Sala Espresso.png";
import lounge from "../assets/img/Lounge Fiorire.png";
import barista from "../assets/img/Mesa do Barista.png";

interface Space {
  img: [string];
  id: number;
  name: string;
  subtitle: string;
  desc: string;
  capacity: string;
  features: string[];
  accent: string;
}

const spaces: Space[] = [
  {
    img: jardim,
    id: 1,
    name: "Varanda Jardim",
    subtitle: "Para momentos ao ar livre",
    desc: "Espaço aberto com vista para o jardim interno, ideal para encontros descontraídos e reuniões criativas. Atmosfera leve com luz natural durante todo o dia.",
    capacity: "Até 12 pessoas",
    features: [
      "Luz natural",
      "Área ao ar livre",
      "Wi-Fi 5G",
      "Projetor portátil",
      "Serviço de mesa",
    ],
    accent: "#FF5686",
  },
  {
    img: espresso,
    id: 2,
    name: "Sala Espresso",
    subtitle: "Para reuniões executivas",
    desc: 'Ambiente fechado e climatizado, com mesa de reunião, TV 65" para apresentações e isolamento acústico. Pensado para reuniões formais e confidenciais.',
    capacity: "Até 8 pessoas",
    features: [
      'TV 65" 4K',
      "Isolamento acústico",
      "Ar condicionado",
      "Wi-Fi dedicado",
      "Coffee break incluso",
    ],
    accent: "#FF5686",
  },
  {
    img: lounge,
    id: 3,
    name: "Lounge Fiorire",
    subtitle: "Para grupos e workshops",
    desc: "Nosso maior ambiente, com mobiliário modular que se adapta ao formato do seu evento. Perfeito para workshops, treinamentos e confraternizações.",
    capacity: "Até 30 pessoas",
    features: [
      "Mobiliário modular",
      "Projetor 4K",
      "Sonorização",
      "Palco removível",
      "Catering personalizado",
    ],
    accent: "#FF5686",
  },
  {
    img: barista,
    id: 4,
    name: "Mesa do Barista",
    subtitle: "Experiência interativa de café",
    desc: "Um espaço único onde nosso barista conduz uma experiência sensorial de café para seu grupo. Ideal para confraternizações e team buildings diferenciados.",
    capacity: "Até 6 pessoas",
    features: [
      "Degustação guiada",
      "Aulas de preparo",
      "Grãos de origem",
      "Certificado",
      "Brinde exclusivo",
    ],
    accent: "#FF5686",
  },
];

const Spaces = () => {
  return (
    <section id="espacos" className="spaces">
      <div className="spaces__bg-text" aria-hidden="true">
        ESPAÇOS
      </div>

      <div className="container">
        <div className="spaces__header">
          <p className="section-label">Nossos Ambientes</p>
          <h2 className="spaces__title">
            Cada espaço conta uma história diferente
          </h2>
          <p className="spaces__subtitle">
            Quatro ambientes projetados para que cada tipo de encontro aconteça
            no cenário perfeito.
          </p>
        </div>

        <div className="spaces__grid">
          {spaces.map((space, i) => (
            <div
              className="space-card"
              key={space.id}
              style={
                {
                  "--accent": space.accent,
                  animationDelay: `${i * 0.1}s`,
                } as React.CSSProperties
              }
            >
              <div className="space-card__header">
                <div className="space-card__icon-wrap"></div>
                <div className="space-card__capacity">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle
                      cx="9"
                      cy="7"
                      r="4"
                      stroke="currentColor"
                      strokeWidth="2"
                    />
                    <path
                      d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  {space.capacity}
                </div>
              </div>

              <div className="space-card__body">
                <div className="img_style">
                  <img src={space.img} alt="" className="space_style" />
                </div>

                <p className="space-card__subtitle">{space.subtitle}</p>
                <h3 className="space-card__name">{space.name}</h3>
                <p className="space-card__desc">{space.desc}</p>
              </div>

              <div className="space-card__features">
                {space.features.map((f, j) => (
                  <span className="space-card__feature" key={j}>
                    <span className="space-card__feature-dot" />
                    {f}
                  </span>
                ))}
              </div>

              <a href="#agendamento" className="space-card__cta">
                Agendar este espaço
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12h14M12 5l7 7-7 7"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          ))}
        </div>

        {/* Info banner */}
        <div className="spaces__banner">
          <div className="spaces__banner-icon">📋</div>
          <div className="spaces__banner-text">
            <strong>Precisa de algo especial?</strong>
            <span>
              Adaptamos o espaço para o seu evento. Entre em contato e vamos
              criar algo único juntos.
            </span>
          </div>
          <a href="#agendamento" className="btn btn--primary">
            Fale Conosco
          </a>
        </div>
      </div>
    </section>
  );
};

export default Spaces;
