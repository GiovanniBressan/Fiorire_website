import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

const RESEND_KEY = Deno.env.get("RESEND_API_KEY")!;
const FROM_EMAIL = "onboarding@resend.dev";
const ADMIN_EMAIL = Deno.env.get("ADMIN_EMAIL")!;

// ─── Headers CORS ─────────────────────────────────────────────
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

// ─── Handler  ────────────────────────────────────────
serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { reserva, qrCodeUrl } = await req.json();

    const isSandbox = FROM_EMAIL === "onboarding@resend.dev";

    const emailCliente = {
      from: `Fiorire Caffetteria <${FROM_EMAIL}>`,
      to: isSandbox ? [ADMIN_EMAIL] : [reserva.email],
      subject: `✅ Reserva confirmada — ${reserva.espaco}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2C1A0E;">
          <div style="background: #FAF6F0; padding: 32px; border-radius: 12px;">
            <h1 style="color: #FF5686; font-weight: 400; margin-bottom: 8px;">Fiorire Caffetteria</h1>
            <p style="color: #8A7E72; font-size: 14px; margin-top: 0;">Onde há beleza no instante</p>
          </div>
          <div style="padding: 32px 0;">
            <h2 style="font-weight: 400;">Olá, ${reserva.nome}!</h2>
            <p>Sua reserva foi recebida com sucesso. Confira os detalhes:</p>
            <table style="width: 100%; border-collapse: collapse; margin: 24px 0;">
              <tr style="background: #FAF6F0;">
                <td style="padding: 12px 16px; font-weight: 600;">Espaço</td>
                <td style="padding: 12px 16px;">${reserva.espaco}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; font-weight: 600;">Data</td>
                <td style="padding: 12px 16px;">${reserva.data}</td>
              </tr>
              <tr style="background: #FAF6F0;">
                <td style="padding: 12px 16px; font-weight: 600;">Horário</td>
                <td style="padding: 12px 16px;">${reserva.horario}</td>
              </tr>
              <tr>
                <td style="padding: 12px 16px; font-weight: 600;">Pessoas</td>
                <td style="padding: 12px 16px;">${reserva.pessoas}</td>
              </tr>
            </table>
            <p style="font-weight: 600;">Seu QR Code de entrada:</p>
            <img src="${qrCodeUrl}" alt="QR Code da reserva" width="200"
              style="border-radius: 8px; display: block; margin: 16px 0;" />
            <p style="font-size: 13px; color: #8A7E72;">
              Código da reserva: <strong style="font-family: monospace;">${reserva.id}</strong>
            </p>
            <p>Apresente este QR Code ao chegar. Aguardamos você! ☕</p>
          </div>
          <div style="background: #2C1A0E; color: #FAF6F0; padding: 20px 32px; border-radius: 12px;
                      font-size: 13px; text-align: center;">
            Fiorire Caffetteria · Rua das Flores, 123 · Batel, Curitiba
          </div>
        </div>
      `,
    };

    const emailAdmin = {
      from: `Fiorire Caffetteria <${FROM_EMAIL}>`,
      to: [ADMIN_EMAIL],
      subject:
        `📋 Nova reserva — ${reserva.nome} | ${reserva.data} às ${reserva.horario}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; color: #2C1A0E;">
          <h2 style="font-weight: 400;">Nova reserva recebida</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #FAF6F0;">
              <td style="padding: 10px 14px; font-weight: 600;">Nome</td>
              <td style="padding: 10px 14px;">${reserva.nome}</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-weight: 600;">E-mail</td>
              <td style="padding: 10px 14px;">${reserva.email}</td>
            </tr>
            <tr style="background: #FAF6F0;">
              <td style="padding: 10px 14px; font-weight: 600;">Espaço</td>
              <td style="padding: 10px 14px;">${reserva.espaco}</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-weight: 600;">Data</td>
              <td style="padding: 10px 14px;">${reserva.data}</td>
            </tr>
            <tr style="background: #FAF6F0;">
              <td style="padding: 10px 14px; font-weight: 600;">Horário</td>
              <td style="padding: 10px 14px;">${reserva.horario}</td>
            </tr>
            <tr>
              <td style="padding: 10px 14px; font-weight: 600;">Pessoas</td>
              <td style="padding: 10px 14px;">${reserva.pessoas}</td>
            </tr>
            <tr style="background: #FAF6F0;">
              <td style="padding: 10px 14px; font-weight: 600;">Observações</td>
              <td style="padding: 10px 14px;">${reserva.observacoes || "—"}</td>
            </tr>
          </table>
          <p style="margin-top: 24px;">
            QR Code: <a href="${qrCodeUrl}">visualizar</a>
          </p>
          <p style="font-size: 12px; color: #8A7E72;">
            ID da reserva: <code>${reserva.id}</code>
          </p>
        </div>
      `,
    };

    // ── sending the e-mails ──────────────────────────────────────

    const emailsParaEnviar = isSandbox
      ? [emailAdmin] // sandbox: 1 e-mail para o admin
      : [emailCliente, emailAdmin]; // produção: 2 e-mails

    const resultados = await Promise.all(
      emailsParaEnviar.map(async (email) => {
        const res = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(email),
        });

        if (!res.ok) {
          const erro = await res.text();
          console.error("[send-booking-email] Resend error:", erro);
          throw new Error(`Resend retornou ${res.status}: ${erro}`);
        }

        return res.json();
      }),
    );

    console.log("[send-booking-email] E-mails enviados:", resultados);

    return new Response(JSON.stringify({ ok: true, resultados }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[send-booking-email] Erro:", err);
    return new Response(
      JSON.stringify({ ok: false, error: String(err) }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
