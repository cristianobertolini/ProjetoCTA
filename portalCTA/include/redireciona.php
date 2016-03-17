<?php
    include("../restrito.php");    
    include("conexao.php");
    include("funcoes.php");    
    
    $codigo = $_POST['categoria'];
    switch ($codigo) {
        case 1: $_SESSION['categoriaUsuario'] = 1;
                header("Location: ../coordenador");
                exit; break;
        case 2: $_SESSION['categoriaUsuario'] = 2;
                header("Location: ../orientador"); 
                exit; break;
        case 3: $_SESSION['categoriaUsuario'] = 3;
                header("Location: ../avaliador"); 
                exit; break;
        case 4: $_SESSION['categoriaUsuario'] = 4;
                $_SESSION['AlunoTurma'] = PegaTurma($_SESSION['UsuarioCOD']);
                $_SESSION['AlunoOrientador'] = PegaOrientador($_SESSION['UsuarioCOD']);
                header("Location: ../aluno"); 
                exit; break;
    }
    $mysqli->Close();     
?>
