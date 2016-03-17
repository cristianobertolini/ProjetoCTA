<?php 
    include("../include/conexao.php");

    if (isset($_GET['id'])) {
        $codigo      = $mysqli->real_escape_string($_GET['id']);
        $codigoTurma = $mysqli->real_escape_string($_GET['cod']);
        $descTurma   = $mysqli->real_escape_string($_GET['desc']);
    
        $sql = "DELETE FROM `turma_detalhe` WHERE usu_aluno = ".$codigo;    

        $mysqli->query($sql);

        session_start();
        $_SESSION['CodigoTurma'] = $codigoTurma;       
    } 
    
    echo "<script>location.href='turma-aluno.php?Turma=$descTurma';</script>";
    $mysqli->Close();
    die(); 
?>     
