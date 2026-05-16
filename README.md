# Snow Agência de Crescimento

Site institucional premium para a Snow Agência de Crescimento, criado com Next.js App Router, TypeScript, Tailwind CSS, Framer Motion e Lucide React.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Formulário de contato

O formulário envia para a rota `app/api/contact/route.ts` e está preparado para envio por e-mail via Resend.

Configure as variáveis na Vercel:

```bash
CONTACT_EMAIL_TO=snowmktdigital@gmail.com
CONTACT_EMAIL_FROM=Snow Agência de Crescimento <contato@snowagencia.com>
RESEND_API_KEY=sua_chave_resend
```

O domínio remetente precisa estar verificado no Resend para envio em produção. No futuro, o remetente pode ser alterado para um endereço profissional do domínio, como `contato@snowagencia.com`.

## Estrutura

- `app/`: páginas, layout, SEO e API route.
- `components/`: componentes reutilizáveis do site.
- `data/site.ts`: textos, serviços, clientes, métricas, logos e links editáveis.
- `public/logos/`: logos reais dos clientes.
- `public/images/snow-hero-orb.png`: asset visual gerado para a hero section.

## Deploy

O projeto está pronto para deploy na Vercel. Depois de conectar o repositório, configure as variáveis de ambiente acima e publique.
