<?php
    include("include/config.php");
    // A sessão precisa ser iniciada em cada página diferente
    if (!isset($_SESSION)) session_start();
       
    // Verifica se não há a variável da sessão que identifica o usuário
    if (!isset($_SESSION['UsuarioCOD'])) {
        // Destrói a sessão por segurança
        session_destroy();
        //echo 'Sessão terminada';
        // Redireciona o visitante de volta pro login
        header("Location: ".$URL_PADRAO); 
        exit();  
    }
    
    if (isset($_SESSION['categoriaPagina']) && isset($_SESSION['categoriaUsuario'])) {
        if ($_SESSION['categoriaPagina'] != $_SESSION['categoriaUsuario']) {
            $codigoCat = $_SESSION['categoriaUsuario'];
            switch ($codigoCat) {
                case 1: header("Location: ../coordenador"); exit; break; 
                case 2: header("Location: ../orientador"); exit; break; 
                case 3: header("Location: ../avaliador"); exit; break;
                case 4: header("Location: ../aluno"); exit; break;    
            }
        }
    }
