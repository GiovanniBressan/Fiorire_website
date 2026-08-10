import "./Footer.css";
import logoFiorire from "../assets/img/arvoreLogo.svg";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          {/* Brand */}
          <div className="footer__brand">
            <div className="footer__logo">
              <img src={logoFiorire} alt="" className="LogoIcon" />

              <span>Fiorire </span>
            </div>
            <p className="footer__tagline">Onde há beleza no instante</p>
            <div className="footer__social">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Instagram"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect
                    x="2"
                    y="2"
                    width="20"
                    height="20"
                    rx="5"
                    ry="5"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Facebook"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                href="https://wa.me/5541999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="footer__col">
            <h4 className="footer__col-title">Navegação</h4>
            <ul className="footer__links">
              <li>
                <a href="#sobre">Nossa História</a>
              </li>
              <li>
                <a href="#cardapio">Cardápio</a>
              </li>
              <li>
                <a href="#espacos">Espaços</a>
              </li>
              <li>
                <a href="#agendamento">Agendamento</a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer__col">
            <h4 className="footer__col-title">Contato</h4>
            <ul className="footer__contact-list">
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 10.8 19.79 19.79 0 01.22 2.18 2 2 0 012.18 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                (41) 9 9762-4667
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <polyline
                    points="22,6 12,13 2,6"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                contato@fiorire.com.br
              </li>
              <li>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle
                    cx="12"
                    cy="10"
                    r="3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                Rua das Flores, 123 — Batel, Curitiba
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div className="footer__col">
            <h4 className="footer__col-title">Horários</h4>
            <table className="footer__hours">
              <tbody>
                <tr>
                  <td>Seg – Sex</td>
                  <td>08h – 21h</td>
                </tr>
                <tr>
                  <td>Sábado</td> <td>09h – 22h</td>
                </tr>
                <tr>
                  <td>Domingo</td> <td>10h – 18h</td>
                </tr>
              </tbody>
            </table>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__maps-link"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Ver no Google Maps
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="footer__divider" />

        {/* Bottom */}
        <div className="footer__bottom">
          <p className="footer__copy">
            © {currentYear} Fiorire Caffetteria · Todos os direitos reservados
          </p>
          <p className="footer__made">Dev by Giovanni Bressan</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
