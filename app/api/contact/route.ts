import { NextResponse } from "next/server";

const requiredFields = [
  "name",
  "company",
  "segment",
  "city",
  "whatsapp",
  "email",
  "interest",
  "message"
];

type ContactPayload = Record<string, string>;

function sanitize(value: unknown) {
  return String(value ?? "").trim();
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function buildText(payload: ContactPayload) {
  return [
    "Novo lead pelo site da Snow Agência de Crescimento",
    "",
    `Nome: ${payload.name}`,
    `Empresa: ${payload.company}`,
    `Segmento: ${payload.segment}`,
    `Cidade: ${payload.city}`,
    `WhatsApp: ${payload.whatsapp}`,
    `E-mail: ${payload.email}`,
    `Serviço de interesse: ${payload.interest}`,
    "",
    "Mensagem:",
    payload.message
  ].join("\n");
}

function buildHtml(payload: ContactPayload) {
  const rows = [
    ["Nome", payload.name],
    ["Empresa", payload.company],
    ["Segmento", payload.segment],
    ["Cidade", payload.city],
    ["WhatsApp", payload.whatsapp],
    ["E-mail", payload.email],
    ["Serviço de interesse", payload.interest]
  ];

  return `
    <div style="font-family: Arial, sans-serif; color: #120030;">
      <h1>Novo lead pelo site da Snow</h1>
      <p>Um visitante preencheu o formulário de contato.</p>
      <table cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="font-weight: 700; border-bottom: 1px solid #eee;">${label}</td>
                <td style="border-bottom: 1px solid #eee;">${escapeHtml(value)}</td>
              </tr>
            `
          )
          .join("")}
      </table>
      <h2>Mensagem</h2>
      <p style="white-space: pre-line;">${escapeHtml(payload.message)}</p>
    </div>
  `;
}

export async function POST(request: Request) {
  const body = (await request.json()) as Record<string, unknown>;
  const payload = Object.fromEntries(
    Object.entries(body).map(([key, value]) => [key, sanitize(value)])
  ) as ContactPayload;

  const missingField = requiredFields.find((field) => !payload[field]);

  if (missingField) {
    return NextResponse.json(
      { message: "Preencha todos os campos obrigatórios." },
      { status: 400 }
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const contactTo = process.env.CONTACT_EMAIL_TO ?? "snowmktdigital@gmail.com";
  const contactFrom =
    process.env.CONTACT_EMAIL_FROM ??
    "Snow Agência de Crescimento <onboarding@resend.dev>";

  if (!resendApiKey) {
    return NextResponse.json(
      {
        message:
          "Envio por e-mail preparado. Configure RESEND_API_KEY na Vercel para ativar o disparo."
      },
      { status: 202 }
    );
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: contactFrom,
      to: [contactTo],
      reply_to: payload.email,
      subject: `Novo lead Snow: ${payload.company}`,
      text: buildText(payload),
      html: buildHtml(payload)
    })
  });

  if (!response.ok) {
    return NextResponse.json(
      { message: "Não foi possível enviar o e-mail agora. Tente pelo WhatsApp." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    message: "Mensagem enviada. Em breve a Snow entra em contato."
  });
}
