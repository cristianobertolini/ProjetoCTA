<?php
    // A sess�o precisa ser iniciada em cada página diferente
    if (!isset($_SESSION)){ session_start();}
       
    // Verifica se não há a variável da sessão que identifica o usuário
    if (!isset($_SESSION['UsuarioCOD']) || empty($_SESSION['UsuarioCOD'])) {
        include("include/config.php"); 

        session_start(); // Inicia a sess�o
        session_destroy(); // Destr�i a sess�o limpando todos os valores salvos
        header("Location: ".$URL_PADRAO); exit; // Redireciona o visitante    
    }
