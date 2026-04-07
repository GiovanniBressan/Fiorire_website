import { useState } from "react";
import { sendBooking, type BookingPayload } from "../model/sendBooking";
import "./Booking.css";

type FormStatus = "idle" | "loading" | "success" | "error";

interface FormData {
  nome: string;
  email: string;
  espaco: string;
  data: string;
  horario: string;
  pessoas: string;
  observacoes: string;
}

const espacos = [
  "Varanda Jardim (até 12 pessoas)",
  "Sala Espresso (até 8 pessoas)",
  "Lounge Fiorire (até 30 pessoas)",
  "Mesa do Barista (até 6 pessoas)",
];

const horarios = [
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
];

const Booking = () => {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [bookingId, setBookingId] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [clientName, setClientName] = useState("");

  const [form, setForm] = useState<FormData>({
    nome: "",
    email: "",
    espaco: "",
    data: "",
    horario: "",
    pessoas: "",
    observacoes: "",
  });

  const today = new Date().toISOString().split("T")[0];

  const set = (field: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    const payload: BookingPayload = {
      nome: form.nome,
      email: form.email,
      espaco: form.espaco,
      data: form.data,
      horario: form.horario,
      pessoas: form.pessoas,
      observacoes: form.observacoes,
    };

    const result = await sendBooking(payload);

    if (result.success) {
      setBookingId(result.bookingId!);
      setQrCode(result.qrCodeDataUrl!);
      setClientName(form.nome);
      setStatus("success");
      setForm({
        nome: "",
        email: "",
        espaco: "",
        data: "",
        horario: "",
        pessoas: "",
        observacoes: "",
      });
    } else {
      setErrorMsg(result.error || "Erro ao processar reserva.");
      setStatus("error");
    }
  };

  return (
    <section id="agendamento" className="booking">
      <div className="container">
        <div className="booking__inner">
          {/* ── Painel informativo ── */}
          <div className="booking__info">
            <p className="section-label">Agendamento</p>
            <h2 className="booking__title">
              Reserve seu espaço
              <br />
              <em>com antecedência</em>
            </h2>
            <p className="booking__desc">
              Planeje seu evento ou reunião com toda a atenção que merece. Você
              receberá um e-mail de confirmação com um QR Code exclusivo para
              apresentar na chegada.
            </p>

            <div className="booking__steps">
              {[
                {
                  n: "01",
                  title: "Preencha o formulário",
                  desc: "Informe seus dados, espaço desejado e horário.",
                },
                {
                  n: "02",
                  title: "Receba o QR Code",
                  desc: "Um e-mail com QR Code é enviado imediatamente.",
                },
                {
                  n: "03",
                  title: "Apresente na chegada",
                  desc: "Mostre o QR Code e tudo estará pronto para você.",
                },
              ].map((step) => (
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
              <p className="booking__hours-title">
                🕐 Horário de funcionamento
              </p>
              <div className="booking__hours-grid">
                <span>Seg – Sex</span>
                <span>08h às 21h</span>
                <span>Sábado</span> <span>09h às 22h</span>
                <span>Domingo</span> <span>10h às 18h</span>
              </div>
            </div>
          </div>

          {/* ── Formulário / Sucesso ── */}
          <div className="booking__form-wrap">
            {status === "success" ? (
              <div className="booking__success">
                <div className="booking__success-icon">✓</div>
                <h3>Reserva enviada!</h3>
                <p>
                  Perfeito, <strong>{clientName}</strong>! Seu pedido foi
                  recebido.
                  <br />
                  Verifique seu e-mail — enviamos a confirmação com o QR Code
                  abaixo.
                </p>

                {qrCode && (
                  <div className="booking__qr">
                    <p className="booking__qr-label">Seu QR Code de reserva</p>
                    <img
                      src={qrCode}
                      alt="QR Code da reserva"
                      className="booking__qr-img"
                    />
                    <p className="booking__qr-id">#{bookingId}</p>
                    <p className="booking__qr-hint">
                      Apresente este QR Code ao chegar na Fiorire.
                    </p>
                    <a
                      href={qrCode}
                      download={`reserva-${bookingId}.png`}
                      className="booking__qr-download"
                    >
                      ⬇ Salvar QR Code
                    </a>
                  </div>
                )}

                <button
                  className="btn btn--outline"
                  onClick={() => setStatus("idle")}
                >
                  Fazer nova reserva
                </button>
              </div>
            ) : (
              <form
                className="booking__form"
                onSubmit={handleSubmit}
                noValidate
              >
                <h3 className="booking__form-title">Solicitar Reserva</h3>

                <div className="field">
                  <label className="field__label" htmlFor="nome">
                    Nome completo *
                  </label>
                  <input
                    id="nome"
                    className="field__input"
                    type="text"
                    placeholder="Seu nome"
                    value={form.nome}
                    onChange={(e) => set("nome", e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="email">
                    E-mail *
                  </label>
                  <input
                    id="email"
                    className="field__input"
                    type="email"
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    required
                  />
                  <span className="field__hint">
                    O QR Code de confirmação será enviado para este e-mail.
                  </span>
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="espaco">
                    Espaço desejado *
                  </label>
                  <select
                    id="espaco"
                    className="field__input field__select"
                    value={form.espaco}
                    onChange={(e) => set("espaco", e.target.value)}
                    required
                  >
                    <option value="">Selecione um espaço</option>
                    {espacos.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="field__row">
                  <div className="field">
                    <label className="field__label" htmlFor="data">
                      Data *
                    </label>
                    <input
                      id="data"
                      className="field__input"
                      type="date"
                      min={today}
                      value={form.data}
                      onChange={(e) => set("data", e.target.value)}
                      required
                    />
                  </div>
                  <div className="field">
                    <label className="field__label" htmlFor="horario">
                      Horário *
                    </label>
                    <select
                      id="horario"
                      className="field__input field__select"
                      value={form.horario}
                      onChange={(e) => set("horario", e.target.value)}
                      required
                    >
                      <option value="">Selecione</option>
                      {horarios.map((h) => (
                        <option key={h} value={h}>
                          {h}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="pessoas">
                    Número de pessoas *
                  </label>
                  <input
                    id="pessoas"
                    className="field__input"
                    type="number"
                    min="1"
                    max="30"
                    placeholder="Ex: 8"
                    value={form.pessoas}
                    onChange={(e) => set("pessoas", e.target.value)}
                    required
                  />
                </div>

                <div className="field">
                  <label className="field__label" htmlFor="observacoes">
                    Observações (opcional)
                  </label>
                  <textarea
                    id="observacoes"
                    className="field__input field__textarea"
                    placeholder="Necessidades especiais, equipamentos, catering..."
                    value={form.observacoes}
                    onChange={(e) => set("observacoes", e.target.value)}
                    rows={3}
                  />
                </div>

                {status === "error" && (
                  <div className="booking__error">
                    ⚠️ {errorMsg || "Ocorreu um erro. Tente novamente."}
                  </div>
                )}

                <button
                  type="submit"
                  className={`booking__submit ${status === "loading" ? "loading" : ""}`}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <span className="booking__spinner" /> Processando...
                    </>
                  ) : (
                    "Solicitar Reserva →"
                  )}
                </button>

                <p className="booking__privacy">
                  🔒 Seus dados são usados apenas para o agendamento e não são
                  compartilhados.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
