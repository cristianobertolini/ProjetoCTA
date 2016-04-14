
  <?php
	include "include/conexao.php";
        include "include/funcoes.php";

//        // Verifica se houve POST e se o usuário ou a senha é(são) vazio(s)
//        if (!empty($_POST) AND (empty($_POST['nome']) OR empty($_POST['senha']))) {
////            echo "<script>location.href='index.php';</script>";
//            echo"uhuuuu";
//            exit;
//        }

        $login = $mysqli->real_escape_string($_POST["email"]);
        $senha = $mysqli->real_escape_string($_POST["senha"]);

          // Validação do usuário/senha digitados
        $sql = "SELECT u.`usu_codigo`, u.`usu_nome`
                FROM `usuario` as u  
                WHERE (u.`usu_email` = '". $login ."') AND (u.`usu_senha` = SHA1('".$senha."'))  
                LIMIT 1"; 
        
        $query = $mysqli->query($sql);       
        
        $rows = mysqli_num_rows($query);       
        if ($rows != 1) {
            // Mensagem de erro quando os dados são inválidos e/ou o usuário não foi encontrado
//            echo "<script>location.href='index.php?mensagem=Login inválido!';</script>";   
            echo"usu não encontrado".$login,$senha;
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
            $sql2 = "SELECT c.`cat_usu_codigo` FROM `usuario_categoria_usuario` as c WHERE (c.`usu_codigo` = '". $resultado['usu_codigo'] ."')";
            
            $resposta = $mysqli->query($sql2);
            
            if (mysqli_num_rows($resposta) < 1) {
                // Mensagem de erro quando os dados são inválidos e/ou o usuário não foi encontrado
//                echo "<script>location.href='index.php?mensagem=Categoria inválida! Entre em contato com o administrador do sistema.';</script>";
                echo "oiiiiii";
                session_destroy();
                exit;
            }
            
            $rows = mysqli_num_rows($resposta);
            $_SESSION['Categorias'] = $rows;
            
            if (mysqli_num_rows($resposta) == 1){
                $registro = $resposta->fetch_assoc();
                switch ($registro['cat_codigo']) {
                    case '1': $_SESSION['categoriaUsuario'] = 1;
                              header("Location: usuario"); 
                              exit; break;
                          
                    case '2': $_SESSION['categoriaUsuario'] = 2;
                              header("Location: audiodescritor"); 
                              exit; break;
                          
                    case '3': $_SESSION['categoriaUsuario'] = 3;
                              header("Location: revisor"); 
                              exit; break;
                          
                    
                }
            } else {
                header("Location: escolher-visualizacao.php");
                exit;
            }          
        } 
    $mysqli->Close();        
?>

