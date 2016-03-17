<?php
    include("include/config.php");

    session_start(); // Inicia a sessão
    session_destroy(); // Destrói a sessão limpando todos os valores salvos
    header("Location: ".$URL_PADRAO); exit; // Redireciona o visitante
    exit();  
?>