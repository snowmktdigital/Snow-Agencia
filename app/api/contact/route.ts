import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

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

function getContactConfig() {
  const contactTo = process.env.CONTACT_EMAIL_TO ?? "contato@snowagencia.com";
  const smtpUser = process.env.SMTP_USER;

  return {
    contactTo,
    contactFrom:
      process.env.CONTACT_EMAIL_FROM ??
      (smtpUser
        ? `Snow Agência de Crescimento <${smtpUser}>`
        : "Snow Agência de Crescimento <contato@snowagencia.com>"),
    resendApiKey: process.env.RESEND_API_KEY,
    smtp: {
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? "465"),
      secure:
        process.env.SMTP_SECURE !== undefined
          ? process.env.SMTP_SECURE === "true"
          : Number(process.env.SMTP_PORT ?? "465") === 465,
      user: smtpUser,
      pass: process.env.SMTP_PASS
    }
  };
}

async function sendWithSmtp(payload: ContactPayload, config: ReturnType<typeof getContactConfig>) {
  const { host, port, secure, user, pass } = config.smtp;

  if (!host || !user || !pass) {
    throw new Error("SMTP_NOT_CONFIGURED");
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    auth: {
      user,
      pass
    }
  });

  await transporter.sendMail({
    from: config.contactFrom,
    to: config.contactTo,
    replyTo: payload.email,
    subject: `Novo lead Snow: ${payload.company}`,
    text: buildText(payload),
    html: buildHtml(payload)
  });
}

async function sendWithResend(payload: ContactPayload, config: ReturnType<typeof getContactConfig>) {
  if (!config.resendApiKey) {
    throw new Error("RESEND_NOT_CONFIGURED");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.resendApiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: config.contactFrom,
      to: [config.contactTo],
      reply_to: payload.email,
      subject: `Novo lead Snow: ${payload.company}`,
      text: buildText(payload),
      html: buildHtml(payload)
    })
  });

  if (!response.ok) {
    const responseText = await response.text().catch(() => "");
    throw new Error(`RESEND_ERROR_${response.status}: ${responseText}`);
  }
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json(
      { message: "Não conseguimos enviar sua mensagem agora. Tente novamente ou fale direto pelo WhatsApp." },
      { status: 400 }
    );
  }

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

  const config = getContactConfig();
  const hasSmtpConfig = Boolean(config.smtp.host && config.smtp.user && config.smtp.pass);
  const hasResendConfig = Boolean(config.resendApiKey);

  if (!hasSmtpConfig && !hasResendConfig) {
    console.error("Contact form email provider is not configured. Set SMTP_* or RESEND_API_KEY on Vercel.");
    return NextResponse.json(
      {
        message:
          "Não conseguimos enviar sua mensagem agora. Tente novamente ou fale direto pelo WhatsApp."
      },
      { status: 503 }
    );
  }

  try {
    if (hasSmtpConfig) {
      await sendWithSmtp(payload, config);
    } else {
      await sendWithResend(payload, config);
    }
  } catch (error) {
    console.error("Contact form email send failed.", error);

    if (hasSmtpConfig && hasResendConfig) {
      try {
        await sendWithResend(payload, config);
      } catch (fallbackError) {
        console.error("Contact form Resend fallback failed.", fallbackError);

        return NextResponse.json(
          {
            message:
              "Não conseguimos enviar sua mensagem agora. Tente novamente ou fale direto pelo WhatsApp."
          },
          { status: 502 }
        );
      }
    } else {
      return NextResponse.json(
        {
          message:
            "Não conseguimos enviar sua mensagem agora. Tente novamente ou fale direto pelo WhatsApp."
        },
        { status: 502 }
      );
    }
  }

  return NextResponse.json({
    message: "Mensagem enviada com sucesso! Em breve nossa equipe vai entrar em contato."
  });
}
