import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!SUPABASE_URL) {
  throw new Error(
    "[Supabase] VITE_SUPABASE_URL não encontrada.\n" +
      "Verifique se o arquivo .env.local existe na raiz do projeto\n" +
      "e reinicie o servidor com: npm run dev",
  );
}
if (!SUPABASE_ANON_KEY) {
  throw new Error(
    "[Supabase] VITE_SUPABASE_ANON_KEY não encontrada.\n" +
      "Verifique se o arquivo .env.local existe na raiz do projeto\n" +
      "e reinicie o servidor com: npm run dev",
  );
}

// ───  Supabase Client ─────────────────────────────────────────
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── reserva type ──────────────────────────────────────────
export interface Reserva {
  id?: string;
  nome: string;
  email: string;
  espaco: string;
  data: string;
  horario: string;
  pessoas: string;
  observacoes?: string;
  status?: "pendente" | "confirmado" | "cancelado";
  created_at?: string;
}
