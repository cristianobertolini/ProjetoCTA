<?php   
    include("conexao.php");
    
    $login = $mysqli->real_escape_string($_POST['email']);
                   
    $sql = "SELECT `usu_codigo`, `usu_nome`, `usu_email`, `usu_senha`
            FROM `usuario`
            WHERE `usu_email` = '".$login."'";
    
    $resposta = $mysqli->query($sql);
    
    if (mysqli_num_rows($resposta) > 0){
        include("funcoes.php"); 
        include("config.php");
        
        $resultado = $resposta->fetch_assoc();
        $nome  = $resultado['usu_nome'];
        $codigo = $resultado['usu_codigo'];
        // Gera uma senha com 9 carecteres: letras min�sculas e n�meros
        $senha = geraSenha(9, false, true);
        
        $update = "update usuario set usu_senha = '".sha1($senha)."' where usu_codigo = '$codigo' ";
        $mysqli->query($update);        
        
        $emailmsg =
            "<html>
                <body>
                    Olá ".$nome."!<p>
                    Sua senha foi recuperada com sucesso pelo ColabAD!<br>
                    Login: ".$login." <br>
                    Nova Senha: ".$senha."<br></p> 
                    <p>Utilize a nova senha pra acessar o sistema e troque por uma senha de sua escolha.</p><br>
                    <p>Para efetuar login acesse: <a href='".$URL_PADRAO."'>ColabAD</a></p>

                    <p>---------------------------------------------------------------<br>
                    <em>Não Responder! Mensagem gerada automaticamente pelo servidor.<br></em></p>
                </body>
            </html>";                
        
        $emailret = smtpmailer($login, 'gerenciador.tgsi@gmail.com', 'naoresponder', '[ColabAD] Esqueci minha senha', $emailmsg, 0);        
        
        echo "<script>location.href='../esqueciSenha.php?mensagem=w3-green&texto=Operação realizada com sucesso!<br>A nova senha foi enviada para o seguinte endereço: $login <br>A entrega do e-mail com a nova senha pode demorar alguns minutos. Caso não o encontre, verifique a caixa de Spam.';</script>";
    } else {        
        echo "<script>location.href='../esqueciSenha.php?mensagem=w3-red&texto=Nenhum login (E-mail) de usuário encontrado.';</script>";                
    }
    $mysqli->Close();
    die(); 
?>    
  