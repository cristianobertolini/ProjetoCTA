<?php include("include/config.php"); 
      include("include/conexao.php");
      include("include/funcoes.php");

      
    $login = $mysqli->real_escape_string($_POST['email']);
    $senha = $mysqli->real_escape_string($_POST['senha']);
    $nome = $mysqli->real_escape_string($_POST['nome']);
    $escolaridade = $mysqli->real_escape_string($_POST['escolaridade']);
    $estado = $mysqli->real_escape_string($_POST['estado']); 
    $cidade = $mysqli->real_escape_string($_POST['cidade']); 
    $descricao = $mysqli->real_escape_string($_POST['descricao']); 
    
     foreach ($_POST['categoria'] as $key => $value){
                $categoria[$key] = $value;
        }    
//        $categoria = $mysqli->fetch_array($_POST['categoria']);
//        echo $categoria;

//        if (($codigo >= 0)  && ($codigo != '')) {
//            $sql = "DELETE FROM `usuario_categoria` WHERE `usu_codigo`= '$codigo'";     
//            $mysqli->query($sql); 
//
//            $sql = "UPDATE `usuario`
//                    SET `usu_login`='$login',`usu_senha`='".SHA1($senha)."',`usu_nome`='$nome',`usu_email`='$email'
//                        `usu_matricula`='$matricula',`usu_situacao`='$situacao'
//                    WHERE `usu_codigo`= '$codigo'";
//        } else {
            $sql = "INSERT INTO `usuario` (`usu_nome`, `usu_email`, `usu_senha`, `usu_escolaridade`, `usu_estado`, `usu_cidade`, `usu_descricao`) 
                    VALUES ('$nome', '$login','".SHA1($senha)."', '$escolaridade', '$estado', '$cidade', '$descricao');";        
//            }    

        $mysqli->query($sql);
        
//        $queryInsert->execute(); 
        
//        if (($codigo >= 0)  && ($codigo != '')) {
//            $sqlUsu = "SELECT `usu_codigo`
//                     FROM `usuario`  
//                     WHERE `usu_codigo`= '$codigo'    
//                     LIMIT 1";
//        } else {
            $sqlUsu = "SELECT `usu_codigo`
                     FROM `usuario`  
                     WHERE (`usu_email` = '". $login ."') AND (`usu_senha` = '". SHA1($senha) ."')    
                     LIMIT 1";     
//        }
        $queryUsu = $mysqli->query($sqlUsu);    

        if (mysqli_num_rows($queryUsu) > 0) { 
            if (!empty($categoria)) {
                $N = count($categoria);
                $resultado = $queryUsu->fetch_assoc();
                for($i=0; $i < $N; $i++)
                {
                    $sqlCategoria = "INSERT INTO `usuario_categoria_usuario` (`usu_codigo`, `cat_usu_codigo`) VALUES ('". $resultado['usu_codigo'] ."', '". $categoria[$i] ."');";
                    $mysqli->query($sqlCategoria);
                }
            }
        }  

        include("../include/funcoes.php");
//
//        $emailmsg = montaMensagem($login, $senha); 
        echo "<script>location.href='usuario_cadastrar.php?mensagem=w3-green&texto=Inserido com sucesso!';</script>";
        $mysqli->Close();
        die();
    ?>

