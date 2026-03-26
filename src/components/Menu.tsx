import { useState } from "react";
import "./Menu.css";

type Category = "cafes" | "doces" | "salgados";

interface MenuItem {
  name: string;
  desc: string;
  price: string;
  tag?: string;
}

const menuData: Record<Category, { label: string; items: MenuItem[] }> = {
  cafes: {
    label: "Cafés Especiais",
    items: [
      {
        name: "Espresso Fiorire",
        desc: "Blend exclusivo de grãos brasileiros, extraído com precisão para uma crema perfeita.",
        price: "R$ 9,00",
        tag: "Favorito",
      },
      {
        name: "Cappuccino Veludo",
        desc: "Espresso encorpado com leite vaporizado de fazenda local. Cremoso e equilibrado.",
        price: "R$ 14,00",
      },
      {
        name: "Cold Brew Caramel",
        desc: "Extração a frio por 18 horas, servido com calda artesanal de caramelo e gelo esculpido.",
        price: "R$ 16,00",
        tag: "Novo",
      },
      {
        name: "Latte de Baunilha",
        desc: "Espresso suave com leite vaporizado e extrato natural de baunilha do interior de SP.",
        price: "R$ 15,00",
      },
      {
        name: "Affogato al Caffè",
        desc: "Sorvete artesanal de creme coberto com espresso quente. Contraste perfeito.",
        price: "R$ 18,00",
      },
      {
        name: "Café Coado Especial",
        desc: "Método pour over com grão de origem única, notas de frutas vermelhas e chocolate.",
        price: "R$ 12,00",
      },
    ],
  },
  doces: {
    label: "Doces & Bolos",
    items: [
      {
        name: "Bolo de Laranja com Gengibre",
        desc: "Bolo úmido de laranja siciliana com toque de gengibre fresco e cobertura de glacê cítrico.",
        price: "R$ 14,00",
        tag: "Favorito",
      },
      {
        name: "Croissant de Amêndoas",
        desc: "Folhado artesanal recheado com creme de amêndoas tostadas. Assado fresh diariamente.",
        price: "R$ 12,00",
      },
      {
        name: "Torta de Maçã Rústica",
        desc: "Massa podre de manteiga, maçã caramelizada com canela e crumble de nozes.",
        price: "R$ 16,00",
        tag: "Novo",
      },
      {
        name: "Brownie de Cacau 70%",
        desc: "Denso e fudgy, feito com cacau premium 70% e flor de sal. Acompanha sorvete.",
        price: "R$ 15,00",
      },
      {
        name: "Pão de Mel Artesanal",
        desc: "Especiarias brasileiras, mel de abelha nativa e cobertura de chocolate meio amargo.",
        price: "R$ 8,00",
      },
      {
        name: "Cheesecake de Frutas Vermelhas",
        desc: "Base de biscoito de aveia, recheio cremoso de cream cheese e calda de frutas silvestres.",
        price: "R$ 17,00",
      },
    ],
  },
  salgados: {
    label: "Salgados & Lanches",
    items: [
      {
        name: "Tábua Fiorire",
        desc: "Seleção de frios italianos, queijos maturados, picles artesanais e pão de fermentação natural.",
        price: "R$ 48,00",
        tag: "Para 2",
      },
      {
        name: "Bruschetta Tricolore",
        desc: "Pão rústico tostado, tomate confit, burrata fresca e pesto de manjericão.",
        price: "R$ 22,00",
        tag: "Favorito",
      },
      {
        name: "Quiche de Alho-poró",
        desc: "Massa crocante, recheio cremoso de alho-poró caramelizado e queijo gruyère.",
        price: "R$ 18,00",
      },
      {
        name: "Focaccia do Dia",
        desc: "Pão de fermentação longa com alecrim, azeite extra virgem e cobertura que varia diariamente.",
        price: "R$ 14,00",
      },
      {
        name: "Wrap de Frango Defumado",
        desc: "Frango defumado artesanalmente, guacamole, tomate, rúcula e cream cheese de ervas.",
        price: "R$ 24,00",
      },
      {
        name: "Crostini de Salmão",
        desc: "Pão campanha com cream cheese, salmão defumado, alcaparras e limão siciliano.",
        price: "R$ 26,00",
        tag: "Novo",
      },
    ],
  },
};

const Menu = () => {
  const [active, setActive] = useState<Category>("cafes");

  const current = menuData[active];

  return (
    <section id="cardapio" className="menu">
      <div className="container">
        <div className="menu__header">
          <p className="section-label">Nosso Cardápio</p>
          <h2 className="menu__title">Sabores que contam histórias</h2>
          <p className="menu__subtitle">
            Ingredientes selecionados, preparados com dedicação — porque cada
            detalhe importa.
          </p>
        </div>

        <div className="menu__tabs">
          {(Object.keys(menuData) as Category[]).map((cat) => (
            <button
              key={cat}
              className={`menu__tab ${active === cat ? "menu__tab--active" : ""}`}
              onClick={() => setActive(cat)}
            >
              <span>{menuData[cat].label}</span>
            </button>
          ))}
        </div>

        <div className="menu__grid">
          {current.items.map((item, i) => (
            <div
              className="menu__card"
              key={i}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              {item.tag && <span className="menu__card-tag">{item.tag}</span>}
              <h3 className="menu__card-name">{item.name}</h3>
              <p className="menu__card-desc">{item.desc}</p>
              <div className="menu__card-footer">
                <span className="menu__card-price">{item.price}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Menu;
