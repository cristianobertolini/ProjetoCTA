<?php   
    include("include/conexao.php");
    include("include/funcoes.php"); 
    include("include/config.php");
    
    session_start();
    
    $situacao = 'revisar';
    $obs      = $mysqli->real_escape_string($_POST['obs']);
    $codigo   = $mysqli->real_escape_string($_POST['img']);
    $categoria = $mysqli->real_escape_string($_POST['categoria']);
    $audiodescricao = $mysqli->real_escape_string($_POST['audiodescricao']);
    $usuario  = $_SESSION['UsuarioCOD'];

    $update = "update `imagens` 
               set `img_situacao` = '$situacao',
                   `cat_codigo`   = '$categoria',
                   `img_audiodescricao` = '$audiodescricao'
               where `img_codigo` = '$codigo' ";
    $mysqli->query($update);        

    gravaLog($usuario, $codigo, 2, $obs);
    
    echo "<script>location.href='./audio_descrever.php?mensagem=w3-green&texto=Operação realizada com sucesso!';</script>";
    $mysqli->Close();
    die(); 
?>    
  