<<<<<<< HEAD
(The file `c:\Users\Administrator\Pictures\espacomoradaazul.com.br\GITHUB_PAGES_SETUP.md` exists, but is empty)
# Configuração para GitHub Pages

Este arquivo descreve as etapas rápidas para publicar este projeto no GitHub Pages (portfólio). Está escrito em Português para facilitar o uso.

Opções de publicação:

- Site do usuário/organização (username.github.io): renomeie o repositório para `seu-usuario.github.io` e publique a partir da branch `main` (root). O conteúdo ficará disponível em `https://seu-usuario.github.io/`.
- Site de projeto (project page): mantenha o nome do repositório como `espacomoradaazul.com.br` (ou outro) e publique a partir da branch `main` (root) ou da pasta `docs/`. A URL será `https://seu-usuario.github.io/espacomoradaazul.com.br/`.

Passos rápidos (recomendado, publicar a partir da branch `main` root):

1. Commit e push de todo o conteúdo deste diretório para o `main` do repositório no GitHub.
2. No repositório no GitHub: Settings → Pages. Em *Source* selecione `main` e `/ (root)`. Salve.
3. Se existir `CNAME` (neste repositório já existe), confirme o domínio personalizado nas configurações de Pages (Settings → Pages → Custom domain). O GitHub cria/renova automaticamente os registros ACME se estiver habilitado.

Notas importantes:

- Todos os assets (css/, js/, img/) usam caminhos relativos (por exemplo `css/main2.css`), então servir o site a partir do root funciona sem alterações.
- Arquivos de backend (como `enviar_email.php`) não funcionam no GitHub Pages, que é um serviço de hospedagem estática. Veja `CONTACT_SETUP.md` para alternativas (Formspree, Netlify Forms, Google Forms, ou um servidor externo).
- Se usar um fluxo de deploy automático (workflow), o repositório pode publicar em `gh-pages` branch; o arquivo `.github/workflows/deploy.yml` incluído neste repositório demonstra como fazer deploy automático para a branch `gh-pages` quando houver push na `main`.

Ver também `DEPLOY_GUIDE.md` para instruções passo-a-passo e `CONTACT_SETUP.md` para configurar o formulário de contato sem PHP.

Se quiser que eu: (a) altere o formulário para um provedor estático (Formspree) e auto-implemente, ou (b) adicione redirect/404 para um site de projeto, diga qual opção prefere e eu aplico as mudanças.
=======
(The file `c:\Users\Administrator\Pictures\espacomoradaazul.com.br\GITHUB_PAGES_SETUP.md` exists, but is empty)
# Configuração para GitHub Pages

Este arquivo descreve as etapas rápidas para publicar este projeto no GitHub Pages (portfólio). Está escrito em Português para facilitar o uso.

Opções de publicação:

- Site do usuário/organização (username.github.io): renomeie o repositório para `seu-usuario.github.io` e publique a partir da branch `main` (root). O conteúdo ficará disponível em `https://seu-usuario.github.io/`.
- Site de projeto (project page): mantenha o nome do repositório como `espacomoradaazul.com.br` (ou outro) e publique a partir da branch `main` (root) ou da pasta `docs/`. A URL será `https://seu-usuario.github.io/espacomoradaazul.com.br/`.

Passos rápidos (recomendado, publicar a partir da branch `main` root):

1. Commit e push de todo o conteúdo deste diretório para o `main` do repositório no GitHub.
2. No repositório no GitHub: Settings → Pages. Em *Source* selecione `main` e `/ (root)`. Salve.
3. Se existir `CNAME` (neste repositório já existe), confirme o domínio personalizado nas configurações de Pages (Settings → Pages → Custom domain). O GitHub cria/renova automaticamente os registros ACME se estiver habilitado.

Notas importantes:

- Todos os assets (css/, js/, img/) usam caminhos relativos (por exemplo `css/main2.css`), então servir o site a partir do root funciona sem alterações.
- Arquivos de backend (como `enviar_email.php`) não funcionam no GitHub Pages, que é um serviço de hospedagem estática. Veja `CONTACT_SETUP.md` para alternativas (Formspree, Netlify Forms, Google Forms, ou um servidor externo).
- Se usar um fluxo de deploy automático (workflow), o repositório pode publicar em `gh-pages` branch; o arquivo `.github/workflows/deploy.yml` incluído neste repositório demonstra como fazer deploy automático para a branch `gh-pages` quando houver push na `main`.

Ver também `DEPLOY_GUIDE.md` para instruções passo-a-passo e `CONTACT_SETUP.md` para configurar o formulário de contato sem PHP.

Se quiser que eu: (a) altere o formulário para um provedor estático (Formspree) e auto-implemente, ou (b) adicione redirect/404 para um site de projeto, diga qual opção prefere e eu aplico as mudanças.
>>>>>>> 5a7c400 (Normalize asset filenames and update references)
