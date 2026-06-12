# A Semana à Mesa

App de cardápio da semana (Seg–Qui), lista de compras automática e envio por WhatsApp.
Feito em React + Vite. Os dados ficam salvos no próprio aparelho (localStorage).

---

## Publicar SEM terminal (recomendado) — GitHub + Vercel

1. **Crie uma conta** em github.com e em vercel.com (pode entrar na Vercel com o login do GitHub).
2. No GitHub, clique em **New repository**, dê um nome (ex.: `cardapio-app`), deixe público ou privado e crie.
3. Na página do repositório vazio, clique em **uploading an existing file** e **arraste todos os arquivos e pastas deste projeto** (a pasta `src`, a pasta `public`, o `index.html`, o `package.json`, etc.). Confirme com **Commit changes**.
   - Importante: NÃO suba a pasta `node_modules` (ela nem existe aqui — é criada no build).
4. Vá em vercel.com → **Add New… → Project** → **Import** o repositório que você criou.
5. A Vercel detecta o Vite sozinho. Deixe as opções padrão e clique em **Deploy**.
6. Em ~1 minuto sai uma URL tipo `https://cardapio-app.vercel.app`. Pronto.

A cada vez que você atualizar um arquivo no GitHub, a Vercel republica sozinha.

---

## Publicar COM terminal (se preferir)

Precisa do Node.js instalado (nodejs.org).

```bash
npm install        # instala as dependências
npm run dev        # testa local em http://localhost:5173
npm run build      # gera a pasta dist/ para produção
```

Para subir: instale a CLI da Vercel (`npm i -g vercel`) e rode `vercel` na pasta.
Ou arraste a pasta `dist/` em app.netlify.com/drop.

---

## Instalar como app no celular (depois de no ar)

- **iPhone (Safari):** abra a URL → botão Compartilhar → **Adicionar à Tela de Início**.
- **Android (Chrome):** abra a URL → menu (⋮) → **Instalar app** / **Adicionar à tela inicial**.

Vira ícone próprio e abre em tela cheia, como um app.

---

## Estrutura

```
cardapio-app/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── manifest.webmanifest
│   ├── icon-192.png
│   ├── icon-512.png
│   └── apple-touch-icon.png
└── src/
    ├── main.jsx
    └── App.jsx        ← todo o app + catálogo embutido
```

Para trocar pratos do catálogo, edite as listas `PRATOS` e `ING` no topo de `src/App.jsx`.
