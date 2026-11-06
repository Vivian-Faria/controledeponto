# Ponto de Presença

Ponto eletrônico em página única: registra entrada e saída por unidade com localização e gera relatórios diário, semanal e mensal.

- `public/index.html`: o app (sem build).
- `netlify/functions/ponto.mjs`: API que guarda o histórico no Netlify Blobs, protegida por senha.

## Deploy (Netlify, via Git)
1. Add new site → Import from Git → escolha este repositório (build vazio, publicação em `public`, já no `netlify.toml`).
2. Site configuration → Environment variables → crie `PONTO_TOKEN` com uma senha longa.
3. Deploys → Trigger deploy (para a função enxergar a variável).
4. Abra o site, digite a senha uma vez em cada aparelho.

Sem a função (ou sem a senha), o app continua funcionando e guarda os dados só no navegador. Use Unidades → Exportar backup.
