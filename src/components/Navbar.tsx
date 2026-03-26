import { useState, useEffect } from "react";
import "./Navbar.css";
import logoFiorire from "../assets/img/logo.svg";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Nossa História", href: "#sobre" },
    { label: "Cardápio", href: "#cardapio" },
    { label: "Espaços", href: "#espacos" },
    { label: "Agendamento", href: "#agendamento" },
  ];

  return (
    <nav className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="navbar__inner container">
        <a href="#hero" className="navbar__logo">
          <img src={logoFiorire} alt="" className="navbar__logo-icon" />
          <span className="navbar__logo-text">Fiorire</span>
        </a>

        <ul
          className={`navbar__links ${menuOpen ? "navbar__links--open" : ""}`}
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="navbar__link"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#agendamento"
              className="navbar__cta"
              onClick={() => setMenuOpen(false)}
            >
              Reservar Mesa
            </a>
          </li>
        </ul>

        <button
          className={`navbar__burger ${menuOpen ? "navbar__burger--open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
