<<<<<<< HEAD
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST["nome"];
    $email = $_POST["email"];
    $telefone = $_POST["telefone"];
    $assunto = $_POST["assunto"];
    $mensagem = $_POST["mensagem"];
    
    // Destinatário (coloque seu endereço de e-mail do domínio)
    $destinatario = "contato@espacomoradaazul.com.br";
    
    // Cabeçalhos do e-mail
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Mensagem do e-mail
    $mensagem_email .= "**** E-mail enviado via formulario do site ****\r\n";
    $mensagem_email .= "\r\n"; // Deixe uma linha em branco
    $mensagem_email = "Nome: $nome\r\n";
    $mensagem_email .= "Email: $email\r\n";
    $mensagem_email .= "Telefone: $telefone\r\n";
    $mensagem_email .= "Assunto: $assunto\r\n";
    $mensagem_email .= "\r\n"; // Deixe uma linha em branco
    $mensagem_email .= "Mensagem:\r\n$mensagem\r\n";
    
    // Processar o anexo (se fornecido)
    if (isset($_FILES["anexo"])) {
        $anexo_nome = $_FILES["anexo"]["name"];
        $anexo_temp = $_FILES["anexo"]["tmp_name"];
        $anexo_tamanho = $_FILES["anexo"]["size"];
        
        if ($anexo_tamanho > 0) {
            $anexo_conteudo = file_get_contents($anexo_temp);
            $anexo_codificado = chunk_split(base64_encode($anexo_conteudo));
            
            $boundary = md5(time());
            
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
            
            // Mensagem do e-mail comum
            $mensagem_email = "--$boundary\r\n";
            $mensagem_email .= "Content-type: text/plain; charset=utf-8\r\n";
            $mensagem_email .= "\r\n"; // Deixe uma linha em branco
            
            // Adicione o conteúdo da mensagem
            $mensagem_email .= "**** E-mail enviado via formulario do site ****\r\n"; 
            $mensagem_email .= "\r\n"; // Deixe uma linha em branco
            $mensagem_email .= "Nome: $nome\r\n";
            $mensagem_email .= "Email: $email\r\n";
            $mensagem_email .= "Telefone: $telefone\r\n";
            $mensagem_email .= "Assunto: $assunto\r\n";
            $mensagem_email .= "\r\n"; // Deixe uma linha em branco
            $mensagem_email .= "Mensagem:\r\n$mensagem\r\n";
            
            // Anexo
            $mensagem_email .= "--$boundary\r\n";
            $mensagem_email .= "Content-Type: application/octet-stream; name=\"$anexo_nome\"\r\n";
            $mensagem_email .= "Content-Disposition: attachment; filename=\"$anexo_nome\"\r\n";
            $mensagem_email .= "Content-Transfer-Encoding: base64\r\n";
            $mensagem_email .= "\r\n";
            $mensagem_email .= $anexo_codificado . "\r\n";
            
            $mensagem_email .= "--$boundary--\r\n";
        }
    }
    
    // Enviar o e-mail
    mail($destinatario, $assunto, $mensagem_email, $headers);
    
    // Mensagem de confirmação formatada
    echo '<html>
    <head>
        <title>Confirmação de Envio</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <meta http-equiv="refresh" content="3;url=index.html">
    </head>
    <body>
        <div class="container-fluid d-flex justify-content-center align-items-center vh-100" style="background: linear-gradient(to left, #259591 0%, #00a39e 50.39%, #008b86 100%); background-size: 200% auto;">
        <div class="text-center text-white">
            <h1 class="display-4" style="font-weight: 600;">Mensagem Enviada com Sucesso!</h1>
            <p class="lead">Sua mensagem foi entregue com sucesso. Obrigado por entrar em contato conosco.</p>
        </div>
    </div>
    </body>
    </html>';
} else {
    // Se o método de requisição não for POST, redirecionar para o formulário
    header("Location: index.html");
}
?>
=======
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST["nome"];
    $email = $_POST["email"];
    $telefone = $_POST["telefone"];
    $assunto = $_POST["assunto"];
    $mensagem = $_POST["mensagem"];
    
    // Destinatário (coloque seu endereço de e-mail do domínio)
    $destinatario = "contato@espacomoradaazul.com.br";
    
    // Cabeçalhos do e-mail
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    // Mensagem do e-mail
    $mensagem_email .= "**** E-mail enviado via formulario do site ****\r\n";
    $mensagem_email .= "\r\n"; // Deixe uma linha em branco
    $mensagem_email = "Nome: $nome\r\n";
    $mensagem_email .= "Email: $email\r\n";
    $mensagem_email .= "Telefone: $telefone\r\n";
    $mensagem_email .= "Assunto: $assunto\r\n";
    $mensagem_email .= "\r\n"; // Deixe uma linha em branco
    $mensagem_email .= "Mensagem:\r\n$mensagem\r\n";
    
    // Processar o anexo (se fornecido)
    if (isset($_FILES["anexo"])) {
        $anexo_nome = $_FILES["anexo"]["name"];
        $anexo_temp = $_FILES["anexo"]["tmp_name"];
        $anexo_tamanho = $_FILES["anexo"]["size"];
        
        if ($anexo_tamanho > 0) {
            $anexo_conteudo = file_get_contents($anexo_temp);
            $anexo_codificado = chunk_split(base64_encode($anexo_conteudo));
            
            $boundary = md5(time());
            
            $headers .= "MIME-Version: 1.0\r\n";
            $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";
            
            // Mensagem do e-mail comum
            $mensagem_email = "--$boundary\r\n";
            $mensagem_email .= "Content-type: text/plain; charset=utf-8\r\n";
            $mensagem_email .= "\r\n"; // Deixe uma linha em branco
            
            // Adicione o conteúdo da mensagem
            $mensagem_email .= "**** E-mail enviado via formulario do site ****\r\n"; 
            $mensagem_email .= "\r\n"; // Deixe uma linha em branco
            $mensagem_email .= "Nome: $nome\r\n";
            $mensagem_email .= "Email: $email\r\n";
            $mensagem_email .= "Telefone: $telefone\r\n";
            $mensagem_email .= "Assunto: $assunto\r\n";
            $mensagem_email .= "\r\n"; // Deixe uma linha em branco
            $mensagem_email .= "Mensagem:\r\n$mensagem\r\n";
            
            // Anexo
            $mensagem_email .= "--$boundary\r\n";
            $mensagem_email .= "Content-Type: application/octet-stream; name=\"$anexo_nome\"\r\n";
            $mensagem_email .= "Content-Disposition: attachment; filename=\"$anexo_nome\"\r\n";
            $mensagem_email .= "Content-Transfer-Encoding: base64\r\n";
            $mensagem_email .= "\r\n";
            $mensagem_email .= $anexo_codificado . "\r\n";
            
            $mensagem_email .= "--$boundary--\r\n";
        }
    }
    
    // Enviar o e-mail
    mail($destinatario, $assunto, $mensagem_email, $headers);
    
    // Mensagem de confirmação formatada
    echo '<html>
    <head>
        <title>Confirmação de Envio</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        <meta http-equiv="refresh" content="3;url=index.html">
    </head>
    <body>
        <div class="container-fluid d-flex justify-content-center align-items-center vh-100" style="background: linear-gradient(to left, #259591 0%, #00a39e 50.39%, #008b86 100%); background-size: 200% auto;">
        <div class="text-center text-white">
            <h1 class="display-4" style="font-weight: 600;">Mensagem Enviada com Sucesso!</h1>
            <p class="lead">Sua mensagem foi entregue com sucesso. Obrigado por entrar em contato conosco.</p>
        </div>
    </div>
    </body>
    </html>';
} else {
    // Se o método de requisição não for POST, redirecionar para o formulário
    header("Location: index.html");
}
?>
>>>>>>> 5a7c400 (Normalize asset filenames and update references)
