# Ponto de Presença

Ponto eletrônico em página única (HTML/CSS/JS, sem build): registra entrada e saída por unidade com localização, e gera relatórios diário, semanal e mensal.

- Os dados ficam no `localStorage` do navegador. Use **Unidades → Exportar backup** de vez em quando.
- A localização só funciona em HTTPS (o Netlify já entrega assim).

## Deploy
Netlify: Add new site → Import from Git → escolha este repositório. Sem comando de build; diretório de publicação: `.`
