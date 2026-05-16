"use client";

import { FormEvent, useState } from "react";
import { Send } from "lucide-react";
import { interestOptions } from "@/data/site";

type SubmitState = {
  status: "idle" | "loading" | "success" | "error";
  message: string;
};

export function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>({
    status: "idle",
    message: ""
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    setSubmitState({
      status: "loading",
      message: "Enviando sua mensagem para a Snow..."
    });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(Object.fromEntries(formData.entries()))
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message ?? "Não foi possível enviar a mensagem.");
      }

      setSubmitState({
        status: "success",
        message:
          data.message ?? "Mensagem enviada. Em breve a Snow entra em contato."
      });
      form.reset();
    } catch (error) {
      setSubmitState({
        status: "error",
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível enviar a mensagem agora."
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel rounded-lg p-6 sm:p-8">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="block text-sm font-semibold text-white">
          Nome
          <input className="input-field mt-2" name="name" autoComplete="name" required placeholder="Seu nome" />
        </label>
        <label className="block text-sm font-semibold text-white">
          Nome da empresa
          <input className="input-field mt-2" name="company" required placeholder="Nome do negócio" />
        </label>
        <label className="block text-sm font-semibold text-white">
          Segmento
          <input className="input-field mt-2" name="segment" required placeholder="Ex.: academia, restaurante, ótica" />
        </label>
        <label className="block text-sm font-semibold text-white">
          Cidade
          <input className="input-field mt-2" name="city" autoComplete="address-level2" required placeholder="Cidade" />
        </label>
        <label className="block text-sm font-semibold text-white">
          WhatsApp
          <input className="input-field mt-2" name="whatsapp" autoComplete="tel" required placeholder="(41) 99999-9999" />
        </label>
        <label className="block text-sm font-semibold text-white">
          E-mail
          <input className="input-field mt-2" type="email" name="email" autoComplete="email" required placeholder="seuemail@empresa.com" />
        </label>
        <label className="block text-sm font-semibold text-white md:col-span-2">
          Serviço de interesse
          <select className="input-field mt-2" name="interest" required defaultValue="">
            <option value="" disabled>
              Selecione uma opção
            </option>
            {interestOptions.map((option) => (
              <option key={option} value={option} className="bg-snow-bg text-white">
                {option}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-semibold text-white md:col-span-2">
          Mensagem
          <textarea
            className="input-field mt-2 min-h-36 resize-y"
            name="message"
            required
            placeholder="Conte rapidamente o momento do seu negócio e o que você quer melhorar."
          />
        </label>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={submitState.status === "loading"}
          className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-snow-gradient px-6 text-base font-bold text-white shadow-glow transition duration-300 hover:shadow-[0_0_48px_rgba(184,140,255,0.46)] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Send aria-hidden="true" className="h-5 w-5" />
          {submitState.status === "loading" ? "Enviando..." : "Enviar mensagem"}
        </button>

        <p
          className="text-sm leading-6 text-snow-muted"
          role="status"
          aria-live="polite"
        >
          {submitState.message}
        </p>
      </div>
    </form>
  );
}
