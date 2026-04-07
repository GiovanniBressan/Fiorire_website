import QRCode from "qrcode";
import { type Reserva, supabase } from "../lib/supabase";

const generateBookingId = (): string => {
  const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  const random = Array.from(
    { length: 12 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join("");
  return `FIO-${random}`;
};

// ───  QR Code with base64 img ─────────────────────────
export const generateQRCode = async (bookingId: string): Promise<string> => {
  const url = `${window.location.origin}/reserva/${bookingId}`;
  return QRCode.toDataURL(url, {
    width: 300,
    margin: 2,
    color: {
      dark: "#2C1A0E",
      light: "#FAF6F0",
    },
  });
};

// ─── Tipos públicos ───────────────────────────────────────────
export interface BookingPayload {
  nome: string;
  email: string;
  espaco: string;
  data: string;
  horario: string;
  pessoas: string;
  observacoes?: string;
}

export interface BookingResult {
  success: boolean;
  bookingId?: string;
  qrCodeDataUrl?: string;
  error?: string;
}

// ─── Função principal ─────────────────────────────────────────
export const sendBooking = async (
  payload: BookingPayload,
): Promise<BookingResult> => {
  try {
    const bookingId = generateBookingId();
    const qrCodeDataUrl = await generateQRCode(bookingId);

    const reserva: Reserva = {
      id: bookingId,
      nome: payload.nome,
      email: payload.email,
      espaco: payload.espaco,
      data: payload.data,
      horario: payload.horario,
      pessoas: payload.pessoas,
      observacoes: payload.observacoes ?? "",
      status: "pendente",
    };

    const { error: dbError } = await supabase
      .from("reservas")
      .insert(reserva);

    if (dbError) {
      console.error("[sendBooking] Erro ao inserir:", dbError);

      // Erro de tipo na coluna id — tabela criada com uuid em vez de text
      if (
        dbError.message?.includes("invalid input syntax for type uuid") ||
        dbError.message?.includes("uuid")
      ) {
        return {
          success: false,
          error: "Estrutura da tabela incorreta. Execute o SQL do arquivo " +
            "src/lib/supabase.ts no Supabase para recriar a tabela com id text.",
        };
      }

      // PermissionErro  — policy RLS not config
      if (dbError.code === "42501") {
        return {
          success: false,
          error:
            "Permissão negada. Configure a policy 'allow public insert' no Supabase.",
        };
      }

      return {
        success: false,
        error: `Erro ao salvar reserva: ${dbError.message}`,
      };
    }

    // 4.  Edge Function key to e-mail with Resend
    try {
      const { error: fnError } = await supabase.functions.invoke(
        "send-booking-email",
        {
          body: {
            reserva: { ...reserva, id: bookingId },
            qrCodeUrl: qrCodeDataUrl,
          },
        },
      );

      if (fnError) {
        console.warn(
          "[sendBooking] Edge Function error (reserva salva):",
          fnError.message,
        );
      }
    } catch (fnEx) {
      console.warn(
        "[sendBooking] Edge Function não disponível (reserva salva):",
        fnEx,
      );
    }

    return {
      success: true,
      bookingId,
      qrCodeDataUrl,
    };
  } catch (err) {
    console.error("[sendBooking] Erro inesperado:", err);
    return {
      success: false,
      error: "Ocorreu um erro inesperado. Tente novamente.",
    };
  }
};
