# Fiorire Caffetteria 

O projeto **Fiorire** é uma plataforma digital para uma cafeteria moderna que vai além da gastronomia, focando em workshops, palestras e networking. O sistema permite que usuários conheçam o espaço e realizem reservas de lugares de forma automatizada.

🔗 **Acesse o projeto:** [fiorirecoffe.netlify.app](https://fiorirecoffe.netlify.app/)

---

## 🛠 Tecnologias

Este projeto foi construído utilizando as tecnologias mais modernas do ecossistema JavaScript:

- **Frontend:** React + TypeScript
- **Build Tool:** Vite
- **Backend as a Service:** Supabase (PostgreSQL)
- **Serverless:** Supabase Edge Functions (Deno runtime)
- **E-mail:** Resend (Notificações transacionais)
- **Deploy:** Netlify

---

## ✨ Funcionalidades

- [x] **Landing Page Responsiva:** Interface otimizada para mobile e desktop.
- [x] **Gestão de Reservas:** Sistema de formulário integrado ao banco de dados.
- [x] **Automação de E-mail:** Envio de confirmação em tempo real via Edge Functions.
- [x] **Check-in via QR Code:** Geração dinâmica de QR Code para validação presencial da reserva.

---

## 📐 Arquitetura e Decisões Técnicas

A escolha do **Supabase** foi estratégica para garantir que a lógica de negócio (como o processamento de reservas) ocorresse no lado do servidor através de **Edge Functions**, mantendo a segurança e performance.

### Fluxo de Reserva:
1. **Persistência:** Os dados são validados e salvos no PostgreSQL.
2. **Processamento:** Uma *Edge Function* é disparada para processar as informações da reserva.
3. **Notificação:** O serviço **Resend** é acionado para enviar um e-mail ao cliente contendo um **QR Code único**, garantindo segurança e agilidade no atendimento presencial.

