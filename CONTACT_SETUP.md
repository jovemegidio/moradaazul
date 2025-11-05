<<<<<<< HEAD
Configuração do formulário de contato (sem PHP)

O site atual usa `enviar_email.php` como backend para processar o formulário. O GitHub Pages é apenas estático e não executa PHP. Aqui estão alternativas e como implementar cada uma.

Opções recomendadas:

1) Formspree (fácil, gratuito para uso básico)
  - Crie uma conta em https://formspree.io e registre um formulário. Você receberá um endpoint do tipo: `https://formspree.io/f/{form_id}`.
  - No `index.html`, altere o atributo `action` do `<form>` para o endpoint Formspree e `method="POST"`.
  - Exemplo mínimo:

```html
<form action="https://formspree.io/f/SEU_FORM_ID" method="POST" id="modernContactForm">
  <!-- campos: nome, email, telefone, assunto, mensagem -->
  <input type="text" name="nome" required>
  <input type="email" name="email" required>
  <textarea name="mensagem" required></textarea>
  <button type="submit">Enviar</button>
</form>
```

2) Netlify Forms (se fizer deploy no Netlify)
  - Basta adicionar `data-netlify="true"` no `<form>` e fazer deploy no Netlify. Funciona com anexos se configurado.

3) Usar um serviço de automação (Make/Zapier) ou um servidor externo
  - Deixar o formulário apontando para um servidor que aceite PHP (ex.: hospedagem compartilhada) ou usar um endpoint de function (AWS Lambda, Vercel, Azure Functions) que processe o envio.

Anexos / arquivos

- Serviços gratuitos (ex.: Formspree) têm limites em uploads; para suporte a anexos robusto, recomendo usar um backend próprio ou um serviço pago.

Sugestão prática que posso aplicar (diga qual prefere):

- Trocar o `action` do form para Formspree + adicionar mensagem de sucesso/erro com JavaScript.
- Ou manter `enviar_email.php` e documentar que o site necessita de hospedagem com suporte a PHP (ex.: Hostinger, Locaweb) para envio funcionar.

Se quiser que eu altere o `index.html` agora para Formspree, me informe o `form_id` ou autorize que eu deixe um placeholder `SEU_FORM_ID` para você preencher depois.
=======
Configuração do formulário de contato (sem PHP)

O site atual usa `enviar_email.php` como backend para processar o formulário. O GitHub Pages é apenas estático e não executa PHP. Aqui estão alternativas e como implementar cada uma.

Opções recomendadas:

1) Formspree (fácil, gratuito para uso básico)
  - Crie uma conta em https://formspree.io e registre um formulário. Você receberá um endpoint do tipo: `https://formspree.io/f/{form_id}`.
  - No `index.html`, altere o atributo `action` do `<form>` para o endpoint Formspree e `method="POST"`.
  - Exemplo mínimo:

```html
<form action="https://formspree.io/f/SEU_FORM_ID" method="POST" id="modernContactForm">
  <!-- campos: nome, email, telefone, assunto, mensagem -->
  <input type="text" name="nome" required>
  <input type="email" name="email" required>
  <textarea name="mensagem" required></textarea>
  <button type="submit">Enviar</button>
</form>
```

2) Netlify Forms (se fizer deploy no Netlify)
  - Basta adicionar `data-netlify="true"` no `<form>` e fazer deploy no Netlify. Funciona com anexos se configurado.

3) Usar um serviço de automação (Make/Zapier) ou um servidor externo
  - Deixar o formulário apontando para um servidor que aceite PHP (ex.: hospedagem compartilhada) ou usar um endpoint de function (AWS Lambda, Vercel, Azure Functions) que processe o envio.

Anexos / arquivos

- Serviços gratuitos (ex.: Formspree) têm limites em uploads; para suporte a anexos robusto, recomendo usar um backend próprio ou um serviço pago.

Sugestão prática que posso aplicar (diga qual prefere):

- Trocar o `action` do form para Formspree + adicionar mensagem de sucesso/erro com JavaScript.
- Ou manter `enviar_email.php` e documentar que o site necessita de hospedagem com suporte a PHP (ex.: Hostinger, Locaweb) para envio funcionar.

Se quiser que eu altere o `index.html` agora para Formspree, me informe o `form_id` ou autorize que eu deixe um placeholder `SEU_FORM_ID` para você preencher depois.
>>>>>>> 5a7c400 (Normalize asset filenames and update references)
