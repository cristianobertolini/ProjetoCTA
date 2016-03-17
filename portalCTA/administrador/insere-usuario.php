<?php
    include("../include/conexao.php");       
    
    $codigo    = $mysqli->real_escape_string($_POST['codigo']);
    $login     = $mysqli->real_escape_string($_POST['login']);
    $senha     = $mysqli->real_escape_string($_POST['senha']);
    $matricula = $mysqli->real_escape_string($_POST['matricula']);
    $nome      = $mysqli->real_escape_string($_POST['nome']);
    $email     = $mysqli->real_escape_string($_POST['email']);
    $situacao  = $mysqli->real_escape_string($_POST['situacao']);
    
    foreach ($_POST['categoria'] as $key => $value){
            $categoria[$key] = $value;
    }    
    //$categoria = $mysqli->fetch_array($_POST['categoria']);
     
    if (($codigo >= 0)  && ($codigo != '')) {
        $sql = "DELETE FROM `usuario_categoria` WHERE `usu_codigo`= '$codigo'";     
        $mysqli->query($sql); 
    
        $sql = "UPDATE `usuario`
                SET `usu_login`='$login',`usu_senha`='".SHA1($senha)."',`usu_nome`='$nome',`usu_email`='$email'
                    `usu_matricula`='$matricula',`usu_situacao`='$situacao'
                WHERE `usu_codigo`= '$codigo'";
    } else {
        $sql = "INSERT INTO `usuario` (`usu_login`, `usu_senha`, `usu_nome`, `usu_email`, `usu_matricula`, `usu_situacao`) 
                VALUES ('$login', '".SHA1($senha)."', '$nome', '$email', '$matricula', '$situacao');";        
    }    

    $mysqli->query($sql);
    //$queryInsert->execute();   
    if (($codigo >= 0)  && ($codigo != '')) {
        $sqlUsu = "SELECT `usu_codigo`
                 FROM `usuario`  
                 WHERE `usu_codigo`= '$codigo'    
                 LIMIT 1";
    } else {
        $sqlUsu = "SELECT `usu_codigo`
                 FROM `usuario`  
                 WHERE (`usu_login` = '". $login ."') AND (`usu_senha` = '". SHA1($senha) ."')    
                 LIMIT 1";     
    }
    $queryUsu = $mysqli->query($sqlUsu);    
    
    if (mysqli_num_rows($queryUsu) > 0) { 
        if (!empty($categoria)) {
            $N = count($categoria);
            $resultado = $queryUsu->fetch_assoc();
            for($i=0; $i < $N; $i++)
            {
                $sqlCategoria = "INSERT INTO `usuario_categoria` (`usu_codigo`, `cat_codigo`) VALUES ('". $resultado['usu_codigo'] ."', '". $categoria[$i] ."')";
                $mysqli->query($sqlCategoria);
            }
        }
    }  

    include("../include/funcoes.php");
    
    $emailmsg = montaMensagem($login, $senha); 
    
    $emailret = smtpmailer($email, 'gerenciador.tgsi@gmail.com', $nome, 'Cadastro Gerenciador TGSI', $emailmsg);
    
    echo "<script>location.href='cadastrar.php?mensagem=success&texto=Usuário inserido com sucesso! $emailret';</script>";
    $mysqli->Close();
    die();
?>
