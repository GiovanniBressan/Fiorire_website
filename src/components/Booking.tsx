import { useState, useRef } from 'react'
import emailjs from 'emailjs-com'
import './Booking.css'

type ContactType = 'email' | 'phone'
type FormStatus = 'idle' | 'loading' | 'success' | 'error'

interface FormData {
  name: string
  contactType: ContactType
  email: string
  phone: string
  space: string
  date: string
  time: string
  guests: string
  message: string
}

const spaces = [
  'Varanda Jardim (até 12 pessoas)',
  'Sala Espresso (até 8 pessoas)',
  'Lounge Fiorire (até 30 pessoas)',
  'Mesa do Barista (até 6 pessoas)',
]

const timeSlots = [
  '08:00', '09:00', '10:00', '11:00',
  '13:00', '14:00', '15:00', '16:00',
  '17:00', '18:00', '19:00', '20:00',
]

// ─── CONFIGURE EMAILJS ────────────────────────────────────────
// 1. Crie uma conta em https://www.emailjs.com
// 2. Adicione um serviço de e-mail (Gmail, Outlook, etc.)
// 3. Crie um template com as variáveis abaixo
// 4. Substitua as constantes:
const EMAILJS_SERVICE_ID  = 'SEU_SERVICE_ID'
const EMAILJS_TEMPLATE_ID = 'SEU_TEMPLATE_ID'
const EMAILJS_PUBLIC_KEY  = 'SUA_PUBLIC_KEY'
// ─────────────────────────────────────────────────────────────

const Booking = () => {
  const formRef = useRef<HTMLFormElement>(null)
  const [status, setStatus] = useState<FormStatus>('idle')
  const [form, setForm] = useState<FormData>({
    name: '',
    contactType: 'email',
    email: '',
    phone: '',
    space: '',
    date: '',
    time: '',
    guests: '',
    message: '',
  })

  const today = new Date().toISOString().split('T')[0]

  const set = (field: keyof FormData, value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    const templateParams = {
      from_name:    form.name,
      contact_type: form.contactType === 'email' ? 'E-mail' : 'Telefone',
      contact:      form.contactType === 'email' ? form.email : form.phone,
      space:        form.space,
      date:         new Date(form.date + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
      time:         form.time,
      guests:       form.guests,
      message:      form.message || 'Nenhuma observação.',
    }

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      )
      setStatus('success')
      setForm({ name: '', contactType: 'email', email: '', phone: '', space: '', date: '', time: '', guests: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="agendamento" className="booking">
      <div className="container">
        <div className="booking__inner">
          {/* Left info panel */}
          <div className="booking__info">
            <p className="section-label">Agendamento</p>
            <h2 className="booking__title">
              Reserve seu espaço<br />
              <em>com antecedência</em>
            </h2>
            <p className="booking__desc">
              Planeje seu evento ou reunião com toda a atenção que merece.
              Nossa equipe confirmará a reserva em até 2 horas úteis.
            </p>

            <div className="booking__steps">
              {[
                { n: '01', title: 'Preencha o formulário', desc: 'Informe seus dados, espaço desejado e horário.' },
                { n: '02', title: 'Confirmação rápida',    desc: 'Retornamos em até 2h úteis para confirmar a reserva.' },
                { n: '03', title: 'Aproveite!',            desc: 'Chegue e encontre tudo preparado para você.' },
              ].map(step => (
                <div className="booking__step" key={step.n}>
                  <div className="booking__step-num">{step.n}</div>
                  <div>
                    <strong>{step.title}</strong>
                    <p>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="booking__hours">
              <p className="booking__hours-title">🕐 Horário de funcionamento</p>
              <div className="booking__hours-grid">
                <span>Seg – Sex</span><span>08h às 21h</span>
                <span>Sábado</span>   <span>09h às 22h</span>
                <span>Domingo</span>  <span>10h às 18h</span>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="booking__form-wrap">
            {status === 'success' ? (
              <div className="booking__success">
                <div className="booking__success-icon">✓</div>
                <h3>Reserva enviada!</h3>
                <p>
                  Recebemos seu pedido, <strong>{form.name || 'amigo(a)'}</strong>!
                  Nossa equipe entrará em contato em breve para confirmar todos os detalhes.
                </p>
                <button className="btn btn--primary" onClick={() => setStatus('idle')}>
                  Fazer nova reserva
                </button>
              </div>
            ) : (
              <form ref={formRef} className="booking__form" onSubmit={handleSubmit} noValidate>
                <h3 className="booking__form-title">Solicitar Reserva</h3>

                {/* Name */}
                <div className="field">
                  <label className="field__label" htmlFor="name">Nome completo *</label>
                  <input
                    id="name"
                    className="field__input"
                    type="text"
                    placeholder="Seu nome"
                    value={form.name}
                    onChange={e => set('name', e.target.value)}
                    required
                  />
                </div>

                {/* Contact toggle */}
                <div className="field">
                  <label className="field__label">Forma de contato *</label>
                  <div className="field__toggle">
                    <button
                      type="button"
                      className={`field__toggle-btn ${form.contactType === 'email' ? 'active' : ''}`}
                      onClick={() => set('contactType', 'email')}
                    >
                      ✉️ E-mail
                    </button>
                    <button
                      type="button"
                      className={`field__toggle-btn ${form.contactType === 'phone' ? 'active' : ''}`}
                      onClick={() => set('contactType', 'phone')}
                    >
                      📱 Telefone
                    </button>
                  </div>
                </div>

                {/* Email or Phone */}
                {form.contactType === 'email' ? (
                  <div className="field">
                    <label className="field__label" htmlFor="email">E-mail *</label>
                    <input
                      id="email"
                      className="field__input"
                      type="email"
                      placeholder="seu@email.com"
                      value={form.email}
                      onChange={e => set('email', e.target.value)}
                      required
                    />
                  </div>
                ) : (
                  <div className="field">
                    <label className="field__label" htmlFor="phone">Telefone / WhatsApp *</label>
                    <input
                      id="phone"
                      className="field__input"
                      type="tel"
                      placeholder="(41) 99999-9999"
                      value={form.phone}
                      onChange={e => set('phone', e.target.value)}
                      required
                    />
                  </div>
                )}

                {/* Space */}
                <div className="field">
                  <label className="field__label" htmlFor="space">Espaço desejado *</label>
                  <select
                    id="space"
                    className="field__input field__select"
                    value={form.space}
                    onChange={e => set('space', e.target.value)}
                    required
                  >
                    <option value="">Selecione um espaço</option>
                    {spaces.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>

                {/* Date & Time */}
                <div className="field__row">
                  <div className="field">
                    <label className="field__label" htmlFor="date">Data *</label>
                    <input
                      id="date"
                      className="field__input"
                      type="date"
                      min={today}
                      value={form.date}
                      onChange={e => set('date', e.target.value)}
                      required
                    />
                  </div>
                  <div className="field">
                    <label className="field__label" htmlFor="time">Horário *</label>
                    <select
                      id="time"
                      className="field__input field__select"
                      value={form.time}
                      onChange={e => set('time', e.target.value)}
                      required
                    >
                      <option value="">Selecione</option>
                      {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Guests */}
                <div className="field">
                  <label className="field__label" htmlFor="guests">Número de pessoas *</label>
                  <input
                    id="guests"
                    className="field__input"
                    type="number"
                    min="1"
                    max="30"
                    placeholder="Ex: 8"
                    value={form.guests}
                    onChange={e => set('guests', e.target.value)}
                    required
                  />
                </div>

                {/* Message */}
                <div className="field">
                  <label className="field__label" htmlFor="message">Observações (opcional)</label>
                  <textarea
                    id="message"
                    className="field__input field__textarea"
                    placeholder="Necessidades especiais, equipamentos, catering..."
                    value={form.message}
                    onChange={e => set('message', e.target.value)}
                    rows={3}
                  />
                </div>

                {status === 'error' && (
                  <div className="booking__error">
                    ⚠️ Ocorreu um erro ao enviar. Tente novamente ou ligue: (41) 99999-9999
                  </div>
                )}

                <button
                  type="submit"
                  className={`booking__submit ${status === 'loading' ? 'loading' : ''}`}
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <><span className="booking__spinner" /> Enviando...</>
                  ) : (
                    'Solicitar Reserva →'
                  )}
                </button>

                <p className="booking__privacy">
                  🔒 Seus dados são usados apenas para o agendamento e não são compartilhados.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Booking
