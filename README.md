# Curso de SQL — do zero ao avançado

Plataforma web de aprendizado de SQL em Português, com **40+ exercícios práticos** organizados em 9 módulos progressivos. Tudo roda no navegador — sem instalação, sem servidor, sem login.

## ✨ O que tem

- **9 módulos, 30+ aulas**: do "o que é um banco de dados?" até window functions e CTEs
- **Editor com syntax highlighting** (CodeMirror)
- **Banco SQL real** rodando no navegador (SQLite via WebAssembly)
- **Enciclopédia** com 55+ termos SQL (Ctrl+K pra abrir)
- **Hover tooltips** em termos no texto
- **Conquistas** discretas pra marcar marcos
- **Streak counter** de dias consecutivos
- **Persistência local** — progresso salva no navegador automaticamente

## 🚀 Como usar localmente

Basta abrir o arquivo `index.html` no navegador (Chrome, Firefox, Edge — qualquer um moderno).

Na primeira vez precisa de internet pra baixar:
- sql.js (motor SQLite, ~1 MB)
- CodeMirror (editor, ~200 KB)
- Google Fonts (Inter, JetBrains Mono)

Depois disso, funciona offline.

## 🌐 Como compartilhar com amigos (3 opções)

### Opção 1: GitHub Pages (recomendada, URL permanente)

1. Crie uma conta em [github.com](https://github.com) (grátis).
2. Crie um **novo repositório** público chamado, por exemplo, `curso-sql`.
3. No seu computador, abra o terminal/PowerShell na pasta do projeto:
   ```bash
   git init
   git add .
   git commit -m "Curso de SQL"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/curso-sql.git
   git push -u origin main
   ```
4. No GitHub, vá em **Settings → Pages**. Em "Source", selecione **Deploy from a branch**, branch **main**, pasta **/ (root)**. Salve.
5. Em ~1 minuto seu curso fica disponível em `https://SEU_USUARIO.github.io/curso-sql/`. Compartilhe esse link.

### Opção 2: Vercel (deploy drag-and-drop, sem terminal)

1. Crie uma conta em [vercel.com](https://vercel.com) (grátis, login com GitHub ou e-mail).
2. Clique em **Add New → Project**.
3. **Arraste a pasta** `Teste` inteira pra área de upload (ou conecte um repositório).
4. Vercel detecta automático que é site estático e faz deploy em 30 segundos.
5. Vai te dar uma URL tipo `https://curso-sql-rafael.vercel.app/`. Compartilhe.

### Opção 3: Netlify Drop (mais simples ainda)

1. Vai em [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arrasta a pasta `Teste` inteira pra área indicada.
3. Em 20 segundos te dá uma URL. Sem cadastro pra teste rápido (com cadastro grátis a URL fica permanente).

### Opção 4: Pasta zipada (offline, sem URL)

Compactar a pasta `Teste/` em zip, mandar pro amigo, ele extrai e abre `index.html` no navegador. Funciona, mas precisa de internet na 1ª carga (CDN libs).

## 📚 Conteúdo do curso

| Módulo | Tema | Aulas |
|---|---|---|
| **M1** | Fundamentos | O que é SQL, tabelas, anatomia de query |
| **M2** | SELECT em detalhe | Aliases com AS |
| **M3** | Filtrando com WHERE | Operadores, AND/OR/NOT, IN, BETWEEN, LIKE |
| **M4** | Ordenando e Limitando | ORDER BY, DISTINCT, LIMIT, OFFSET |
| **M5** | Agregação | COUNT/SUM/AVG/MIN/MAX, GROUP BY, HAVING |
| **M6** | JOINs | INNER, LEFT, múltiplas tabelas, alias |
| **M7** | Manipulando Dados | CASE WHEN, strings, datas (STRFTIME), COALESCE |
| **M8** | Queries Complexas | Subqueries, CTEs (WITH), Window functions |
| **M9** | Capstone | Resolvendo um case real de entrevista de dados |

## 🔒 Privacidade

- **Nenhum dado é enviado pra fora**. Todo progresso salva em `localStorage` do navegador local.
- **Cada amigo tem progresso independente** (são localStorages separados em cada navegador).
- O motor SQL roda 100% no cliente — suas queries nunca saem da sua máquina.

## 🤝 Para amigos que vão usar

Quem receber o link só precisa:
1. Abrir no navegador
2. Começar pela Aula 1.1
3. Não pular pra solução — tentar errar 2-3 vezes antes
4. Voltar todo dia (mesmo 15 minutos) — streak ajuda

Boa jornada!
