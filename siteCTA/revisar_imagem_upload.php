<?php   
    include("include/conexao.php");
    include("include/funcoes.php"); 
    include("include/config.php");
    session_start();
    
    $situacao = $mysqli->real_escape_string($_POST['situacao']);
    $obs      = $mysqli->real_escape_string($_POST['obs']);
    $codigo   = $mysqli->real_escape_string($_POST['img']);
    $categoria = $mysqli->real_escape_string($_POST['categoria']);
    $usuario  = $_SESSION['UsuarioCOD'];

    $update = "update `imagens` 
               set `img_situacao` = '$situacao',
                   `cat_codigo`   = '$categoria'
               where `img_codigo` = '$codigo' ";
    $mysqli->query($update);        

    gravaLog($usuario, $codigo, 3, $obs);
    
    echo "<script>location.href='./revisar.php?mensagem=w3-green&texto=Operação realizada com sucesso!';</script>";
    $mysqli->Close();
    die(); 
?>    
  