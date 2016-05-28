<?php
    include("include/config.php");
    // A sess�o precisa ser iniciada em cada p�gina diferente
    if (!isset($_SESSION)){ session_start();}
       
    // Verifica se n�o h� a vari�vel da sess�o que identifica o usu�rio
    if (!isset($_SESSION['UsuarioCOD']) || empty($_SESSION['UsuarioCOD'])) {
        // Destr�i a sess�o por seguran�a
        session_destroy();
        //echo 'Sess�o terminada';
        // Redireciona o visitante de volta pro login
        header("Location: ".$URL_PADRAO); 
        exit();  
    }
