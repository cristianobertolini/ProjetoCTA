<?php
    include("include/config.php"); 

    session_start(); // Inicia a sess�o
    session_destroy(); // Destr�i a sess�o limpando todos os valores salvos
    header("Location: ".$URL_PADRAO); exit; // Redireciona o visitante
?>