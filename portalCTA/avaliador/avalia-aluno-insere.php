<?php 
    include("../include/conexao.php");

    //as variaveis recebem os dados do formulário
    $bancaDet = $mysqli->real_escape_string($_POST['bancaDet']);
    
    $nota1 = $mysqli->real_escape_string($_POST['nota1']);    
    $nota2 = $mysqli->real_escape_string($_POST['nota2']); 
    $nota3 = $mysqli->real_escape_string($_POST['nota3']); 
    $nota4 = $mysqli->real_escape_string($_POST['nota4']); 
    $nota5 = $mysqli->real_escape_string($_POST['nota5']); 
    $nota6 = $mysqli->real_escape_string($_POST['nota6']); 
    $nota7 = $mysqli->real_escape_string($_POST['nota7']); 
    
    $soma = $nota1 + $nota2 + $nota3 + $nota4 + $nota5 + $nota6 + $nota7;
    
    $texto = $mysqli->real_escape_string($_POST['texto']);

    $sql = "INSERT INTO `banca_detalhe_avaliacao`
                    (`bav_nota1`, `bav_nota2`, `bav_nota3`, `bav_nota4`, `bav_nota5`, `bav_nota6`, `bav_nota7`, `bav_nota_soma`, `bav_obs`, `band_codigo`)
            VALUES ('$nota1','$nota2','$nota3','$nota4','$nota5','$nota6','$nota7','$soma','$texto','$bancaDet')";    

    $mysqli->query($sql);
    
    echo "<script>location.href='index.php?mensagem=success&texto=Aluno avaliado com sucesso!';</script>";
    $mysqli->Close();
    die();            
?>     
