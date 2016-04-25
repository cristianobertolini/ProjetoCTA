<?php include("include/config.php"); 
      include("include/conexao.php");
      include("include/funcoes.php");

    session_start();   
      
    $codUsu       = $_SESSION['UsuarioCOD'];
    $login        = $mysqli->real_escape_string($_POST['email']);
    $senha        = $mysqli->real_escape_string($_POST['senha']);
    $nome         = $mysqli->real_escape_string($_POST['nome']);
    $escolaridade = $mysqli->real_escape_string($_POST['escolaridade']);
    $cidade       = $mysqli->real_escape_string($_POST['cid_codigo']); 
    $descricao    = $mysqli->real_escape_string($_POST['descricao']);
    
    foreach ($_POST['categoria'] as $key => $value){
        $categoria[$key] = $value;
    }    
    
    //Validações
    // Verifica se $email realmente existe e se é um email.
    if ( !isset( $login ) || ! filter_var( $login, FILTER_VALIDATE_EMAIL ) ) {
        echo "<script>location.href='usuario_cadastrar.php?mensagem=w3-red&texto=Envie um Login (E-mail) válido.';</script>";
    } else {
        $sqlUsuarioExistente = "SELECT `usu_codigo` 
                                FROM `usuario` 
                                WHERE `usu_email` = '$login' and `usu_codigo` <> $codUsu";

        //Se encontrar esse e-mail em outro usuário então já existe, pede se quer recuperar a senha?
        $queryUsuarioExistente = $mysqli->query($sqlUsuarioExistente);    

        if (mysqli_num_rows($queryUsuarioExistente) > 0) {   
            echo "<script>location.href='usuario_editar.php?mensagem=w3-red&texto=O e-mail de login ".$login." já está sendo usado por outro usuário!';</script>";       
        } else {     
            $sql = "DELETE FROM `usuario_categoria_usuario` WHERE `usu_codigo`= '$codUsu'";     
            $mysqli->query($sql); 

            $sql = "UPDATE `usuario`
                    SET `usu_senha` = '".SHA1($senha)."',
                        `usu_nome` = '$nome',
                        `usu_email` = '$login',
                        `usu_escolaridade` = '$escolaridade',
                        `cid_codigo` = '$cidade',
                        `usu_descricao` = '$descricao'
                    WHERE `usu_codigo` = '$codUsu'";
            $mysqli->query($sql);

            if (!empty($categoria)) {
                $N = count($categoria);
                for($i=0; $i < $N; $i++)
                {
                    $sqlCategoria = "INSERT INTO `usuario_categoria_usuario` (`usu_codigo`, `cat_usu_codigo`) VALUES ('$codUsu', '". $categoria[$i] ."');";
                    $mysqli->query($sqlCategoria);
                }
            }
  
            echo "<script>location.href='usuario_editar.php?mensagem=w3-green&texto=Cadastro atualizado com sucesso!';</script>";
            $mysqli->Close();
            die();         
        }   
    }
?>

