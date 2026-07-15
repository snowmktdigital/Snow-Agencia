# Snow Agência de Crescimento

Site institucional premium para a Snow Agência de Crescimento, criado com Next.js App Router, TypeScript, Tailwind CSS, Framer Motion, Lucide React e Node.js.

## Rodando localmente

~~~bash
npm install
npm run dev
~~~

Abra http://localhost:3000.

## Formulário de contato

O formulário envia para a rota app/api/contact/route.ts e está preparado para envio por e-mail via SMTP da Hostinger, com Resend opcional como fallback.

Configure as variáveis de ambiente na hospedagem:

~~~bash
CONTACT_EMAIL_TO=contato@snowagencia.com
CONTACT_EMAIL_FROM=Snow Agência de Crescimento <contato@snowagencia.com>
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contato@snowagencia.com
SMTP_PASS=sua_senha_da_caixa_de_email
RESEND_API_KEY=opcional
~~~

## Estrutura

- app/: páginas, layout, SEO e API route.
- components/: componentes reutilizáveis do site.
- data/site.ts: textos, serviços, clientes, métricas, logos e links editáveis.
- public/logos/: logos reais dos clientes.
- public/images/snow-hero-orb.png: asset visual da hero section.

## Deploy na Hostinger com Node.js

O projeto está preparado para hospedagem Node.js. A entrada principal é server.js e o comando de inicialização é:

~~~bash
npm run start
~~~

Fluxo recomendado:

~~~bash
npm install
npm run build
npm run start
~~~

Use Node.js 20.11 ou superior. Configure as variáveis de ambiente do formulário no painel da hospedagem antes de publicar.
