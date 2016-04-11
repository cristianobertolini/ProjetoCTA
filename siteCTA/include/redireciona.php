<?php
    include("../restrito.php");    
    include("conexao.php");
    include("funcoes.php");    
    
    $codigo = $_POST['categoria'];
    switch ($codigo) {
        case 1: $_SESSION['categoriaUsuario'] = 1;
                header("Location: ../usuario");
                exit; break;
        case 2: $_SESSION['categoriaUsuario'] = 2;
                header("Location: ../audiodescritor"); 
                exit; break;
        case 3: $_SESSION['categoriaUsuario'] = 3;
                header("Location: ../revisor"); 
                exit; break;
        
    }
    $mysqli->Close();     
?>
