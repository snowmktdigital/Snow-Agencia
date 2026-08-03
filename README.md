# Snow Agência de Crescimento

Site institucional da Snow Agência de Crescimento, uma agência de crescimento para negócios locais em São José dos Pinhais - PR, com atendimento para Curitiba e região metropolitana.

A Snow une estratégia, conteúdo, tráfego pago, vídeos, sites e consultoria para transformar presença digital em autoridade, relacionamento e oportunidades reais de venda.

## Sobre o projeto

Este repositório contém o site oficial da Snow, desenvolvido com foco em performance, responsividade, SEO básico, experiência premium e captação de leads por WhatsApp e formulário de contato.

Principais áreas do site:

- Home institucional com proposta comercial direta.
- Página Sobre Nós.
- Portfólio e resultados com marcas locais atendidas.
- Página de localização.
- Página de contato com formulário integrado ao e-mail profissional da agência.

## Experiência visual

O site foi construído com uma estética dark premium, tecnológica e futurista, alinhada à identidade da Snow. A interface usa motion suave, partículas, glassmorphism, efeitos de glow roxo/lilás e componentes responsivos para transmitir autoridade, sofisticação e crescimento.

## Serviços apresentados

- Social Media.
- Tráfego Pago.
- Vídeos/Reels.
- Identidade Visual.
- Criação de Sites.
- Consultoria Estratégica.

## Tecnologias

- Next.js com App Router.
- TypeScript.
- Tailwind CSS.
- Framer Motion.
- Lucide React.
- Node.js para execução em hospedagem compatível.
- Nodemailer para envio SMTP do formulário.

## Formulário de contato

O formulário envia leads pela rota app/api/contact/route.ts.

A integração principal usa SMTP da Hostinger, com possibilidade de fallback via Resend.

Variáveis de ambiente:

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

Nunca exponha senhas, tokens ou chaves no front-end.

## Rodando localmente

~~~bash
npm install
npm run dev
~~~

Acesse http://localhost:3000.

## Build de produção

~~~bash
npm run build
npm run start
~~~

O comando npm run start executa server.js, preparado para ambiente Node.js.

## Deploy na Hostinger

Requisitos recomendados:

- Node.js 20.11 ou superior.
- Instalar dependências com npm install.
- Gerar build com npm run build.
- Iniciar a aplicação com npm run start.
- Configurar as variáveis de ambiente do formulário no painel da hospedagem.

Entrada principal da aplicação: server.js.

## Estrutura

- app/: páginas, layout, SEO e API route.
- components/: componentes reutilizáveis do site.
- data/site.ts: textos, métricas, serviços, clientes, logos e links editáveis.
- public/logos/: logos dos clientes.
- public/images/: assets visuais do site.

## Marca

Snow Agência de Crescimento  
Estratégia, conteúdo e tráfego pago para negócios locais que querem crescer com presença digital profissional.

Site: https://snowagencia.com  
Instagram: https://instagram.com/snowmktdigital
