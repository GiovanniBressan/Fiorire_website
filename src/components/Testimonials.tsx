import './Testimonials.css'

const testimonials = [
  {
    name: 'Mariana Costa',
    role: 'Designer UX',
    text: 'A Varanda Jardim é meu escritório favorito. O café é incrível, a conexão é boa e o ambiente me deixa super produtiva. Já perdi a conta de quantas vezes voltei.',
    rating: 5,
    initial: 'M',
  },
  {
    name: 'Ricardo Almeida',
    role: 'Diretor Comercial',
    text: 'Realizamos nossa reunião trimestral na Sala Espresso e o resultado foi impressionante. A equipe preparou tudo com perfeição e o café durante a apresentação fez toda a diferença.',
    rating: 5,
    initial: 'R',
  },
  {
    name: 'Fernanda Luz',
    role: 'Empreendedora',
    text: 'Fiz meu workshop no Lounge Fiorire para 25 pessoas e foi um sucesso total. O espaço é lindo, o atendimento é gentilíssimo e o catering era delicioso.',
    rating: 5,
    initial: 'F',
  },
  {
    name: 'João Henrique',
    role: 'Engenheiro de Software',
    text: 'Melhor cappuccino da cidade, sem dúvida. Venho sempre nos fins de semana para ler e trabalhar. A atmosfera rústica e o jazz ao fundo criam a vibe perfeita.',
    rating: 5,
    initial: 'J',
  },
  {
    name: 'Camila Rocha',
    role: 'Professora',
    text: 'Fiz a experiência na Mesa do Barista como presente para meu namorado. Foi simplesmente mágico. Aprendemos tanto sobre café e ainda levamos grãos de presente!',
    rating: 5,
    initial: 'C',
  },
  {
    name: 'Pedro Melo',
    role: 'Fotógrafo',
    text: 'A decoração da Fiorire é uma obra de arte por si só. Vim para um café, fiquei três horas fotografando cada canto. O ambiente conta histórias em cada detalhe.',
    rating: 5,
    initial: 'P',
  },
]

const Testimonials = () => {
  return (
    <section className="testimonials">
      <div className="container">
        <div className="testimonials__header">
          <p className="section-label">Depoimentos</p>
          <h2 className="testimonials__title">O que nossos clientes dizem</h2>
        </div>

        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <div className="testimonial-card" key={i} style={{ animationDelay: `${i * 0.08}s` }}>
              <div className="testimonial-card__stars">
                {'★'.repeat(t.rating)}
              </div>
              <p className="testimonial-card__text">"{t.text}"</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">{t.initial}</div>
                <div>
                  <strong className="testimonial-card__name">{t.name}</strong>
                  <span className="testimonial-card__role">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Rating summary */}
        <div className="testimonials__summary">
          <div className="testimonials__summary-score">
            <span className="testimonials__summary-number">4.9</span>
            <div>
              <div className="testimonials__summary-stars">★★★★★</div>
              <span className="testimonials__summary-label">Baseado em 200+ avaliações</span>
            </div>
          </div>
          <div className="testimonials__summary-divider" />
          <div className="testimonials__summary-platforms">
            <span>⭐ Google: 4.9</span>
            <span>📍 TripAdvisor: 5.0</span>
            <span>📸 Instagram: @fiorire.caffetteria</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
