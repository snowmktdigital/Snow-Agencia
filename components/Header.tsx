"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, MessageCircle, Snowflake, X } from "lucide-react";
import { useState } from "react";
import { navLinks, WHATSAPP_URL } from "@/data/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-snow-border bg-snow-bg/[0.72] backdrop-blur-2xl">
      <nav className="container-snow flex h-20 items-center justify-between" aria-label="Navegação principal">
        <Link href="/" className="flex items-center gap-3" aria-label="Snow Agência de Crescimento">
          <span className="grid h-11 w-11 place-items-center rounded-lg border border-snow-border bg-white/[0.07] shadow-glow">
            <Snowflake aria-hidden="true" className="h-5 w-5 text-snow-lilac" />
          </span>
          <span className="leading-tight">
            <span className="block text-base font-black text-white">Snow</span>
            <span className="block text-xs font-medium text-snow-muted">Agência de Crescimento</span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href.split("#")[0]);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium text-snow-muted transition hover:bg-white/[0.06] hover:text-white",
                  active && link.href !== "/#servicos" && "bg-white/[0.08] text-white"
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href={WHATSAPP_URL} size="sm" showArrow>
            Falar no WhatsApp
          </Button>
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full border border-snow-border bg-white/[0.06] text-white lg:hidden"
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((current) => !current)}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.22 }}
            className="border-t border-snow-border bg-snow-bg/95 backdrop-blur-2xl lg:hidden"
          >
            <div className="container-snow flex flex-col gap-2 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg px-4 py-3 text-sm font-semibold text-snow-muted transition hover:bg-white/[0.07] hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                onClick={() => setIsOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-snow-gradient px-5 py-3 text-sm font-bold text-white shadow-glow"
              >
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                Falar no WhatsApp
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
