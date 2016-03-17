<?php
	include "include/conexao.php";
        include "include/funcoes.php";

        // Verifica se houve POST e se o usuário ou a senha é(são) vazio(s)
        if (!empty($_POST) AND (empty($_POST['j_username']) OR empty($_POST['j_password']))) {
            echo "<script>location.href='index.php';</script>";
            exit;
        }

        $login = $mysqli->real_escape_string($_POST["j_username"]);
        $senha = $mysqli->real_escape_string($_POST["j_password"]);

          // Validação do usuário/senha digitados
        $sql = "SELECT u.`usu_codigo`, u.`usu_nome`
                FROM `usuario` as u  
                WHERE (u.`usu_login` = '". $login ."') AND (u.`usu_senha` = SHA1('".$senha."')) AND (u.`usu_situacao` = 0)    
                LIMIT 1"; 
        
        $query = $mysqli->query($sql);       
        
        $rows = mysqli_num_rows($query);       
        if ($rows != 1) {
            // Mensagem de erro quando os dados são inválidos e/ou o usuário não foi encontrado
            echo "<script>location.href='index.php?mensagem=Login inválido!';</script>";   
            exit;
        } else {
            // Salva os dados encontados na variável $resultado
            $resultado = $query->fetch_assoc();            
            // Se a sessão não existir, inicia uma
            session_start();            
            // Salva os dados encontrados na sessão
                $_SESSION['UsuarioCOD'] = $resultado['usu_codigo'];
                $_SESSION['UsuarioNome'] = $resultado['usu_nome'];
                
            //$mysqli = $conexao;
            $sql2 = "SELECT c.`cat_codigo` FROM `usuario_categoria` as c WHERE (c.`usu_codigo` = '". $resultado['usu_codigo'] ."')";
            
            $resposta = $mysqli->query($sql2);
            
            if (mysqli_num_rows($resposta) < 1) {
                // Mensagem de erro quando os dados são inválidos e/ou o usuário não foi encontrado
                echo "<script>location.href='index.php?mensagem=Categoria inválida! Entre em contato com o administrador do sistema.';</script>";
                session_destroy();
                exit;
            }
            
            $rows = mysqli_num_rows($resposta);
            $_SESSION['Categorias'] = $rows;
            
            if (mysqli_num_rows($resposta) == 1){
                $registro = $resposta->fetch_assoc();
                switch ($registro['cat_codigo']) {
                    case '1': $_SESSION['categoriaUsuario'] = 1;
                              header("Location: coordenador"); 
                              exit; break;
                          
                    case '2': $_SESSION['categoriaUsuario'] = 2;
                              header("Location: orientador"); 
                              exit; break;
                          
                    case '3': $_SESSION['categoriaUsuario'] = 3;
                              header("Location: avaliador"); 
                              exit; break;
                          
                    case '4': $_SESSION['categoriaUsuario'] = 4;
                              $_SESSION['AlunoTurma'] = PegaTurma($_SESSION['UsuarioCOD']);
                              $_SESSION['AlunoOrientador'] = PegaOrientador($_SESSION['UsuarioCOD']); 
                              header("Location: aluno");
                              exit; break;
                }
            } else {
                header("Location: escolher-visualizacao.php");
                exit;
            }          
        } 
    $mysqli->Close();        
?>


