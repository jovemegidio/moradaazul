## Guia de Deploy para GitHub Pages (Passo-a-passo)

Este guia mostra duas formas simples e seguras de publicar este site no GitHub Pages.

Opção A — Publicação simples (recomendado se for um site estático sem backend PHP)

1. Crie um repositório no GitHub (ou use um existente): `seu-usuario/espacomoradaazul.com.br`.
2. No seu computador, dentro da pasta do projeto, inicialize o git (se ainda não):

```powershell
git init
git add .
git commit -m "Initial site commit"
git branch -M main
git remote add origin https://github.com/seu-usuario/espacomoradaazul.com.br.git
git push -u origin main
```

3. No GitHub, vá em Settings → Pages. Em *Source* escolha `main` e `/ (root)` e clique em Save.

4. Aguarde alguns minutos e acesse a URL do Pages conforme o tipo de site (user/site):
- User site: `https://seu-usuario.github.io/`
- Project site: `https://seu-usuario.github.io/espacomoradaazul.com.br/`

5. Se usar domínio customizado (há um arquivo `CNAME`), confirme o domínio em Settings → Pages → Custom domain. Verifique também os registros DNS com seu provedor (A record ou CNAME apontando para GitHub Pages). Consulte o painel do seu domínio para adicionar os registros corretos.

Opção B — Deploy automático para `gh-pages` via GitHub Actions (útil se preferir manter `main` como branch de trabalho)

1. Crie/edite o arquivo `.github/workflows/deploy.yml` (este repositório já inclui um exemplo). O workflow faz deploy automático para a branch `gh-pages` sempre que houver push na `main`.
2. Se preferir, ajuste a branch de origem (por exemplo `deploy` em vez de `main`) editando o `on.push.branches` no workflow.

Observações sobre o formulário de contato

- O arquivo `enviar_email.php` não será executado no GitHub Pages porque é PHP (backend). Para manter o formulário funcional sem servidor, escolha uma alternativa estática:
	- Formspree (https://formspree.io) — simples de configurar; substitua `action` do form pelo endpoint Formspree;
	- Netlify Forms — se fizer deploy no Netlify;
	- Google Forms ou uma integração com um serviço de e-mail (Zapier, Make).

Testar localmente

PowerShell (com Python instalado):

```powershell
python -m http.server 8000
# Abra: http://localhost:8000
```

Com Node.js (serve):

```powershell
npx serve .
# Abra: http://localhost:5000 (ou porta exibida)
```

Links úteis

- GitHub Pages: https://docs.github.com/en/pages
- Custom domains: https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site
- Formspree: https://formspree.io/

Se quiser, eu: (1) atualizo automaticamente o formulário para Formspree e aplico as alterações em `index.html`; (2) comito o workflow de deploy automático; ou (3) configuro o deploy para `main` sem workflow. Escolha uma opção que preferir.
