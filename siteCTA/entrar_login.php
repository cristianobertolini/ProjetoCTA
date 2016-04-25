
  <?php
	include "include/conexao.php";
        include "include/funcoes.php";

        $login = $mysqli->real_escape_string($_POST["email"]);
        $senha = $mysqli->real_escape_string($_POST["senha"]);

        // Validação do usuário/senha digitados
        $sql = "SELECT u.`usu_codigo`, u.`usu_nome`
                FROM `usuario` as u  
                WHERE u.`usu_email` = '$login' AND u.`usu_senha` = SHA1('$senha')  
                LIMIT 1"; 
        
        $query = $mysqli->query($sql);       
        
        $rows = mysqli_num_rows($query);       
        if ($rows != 1) {
            // Mensagem de erro quando os dados são inválidos e/ou o usuário não foi encontrado 
            echo "<script>location.href='entrar.php?mensagem=w3-red&texto=Login inválido!';</script>";
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
            $sqlCat = "SELECT `cat_usu_codigo` FROM `usuario_categoria_usuario` WHERE `usu_codigo` = '". $resultado['usu_codigo'] ."' AND `cat_usu_situacao` = 'ativo'";
            
            $resposta = $mysqli->query($sqlCat);
            
            if (mysqli_num_rows($resposta) < 1) {
                // Mensagem de erro quando os dados são inválidos e/ou o usuário não foi encontrado
                echo "<script>location.href='entrar.php?mensagem=w3-red&texto=Categoria inválida! Entre em contato com o administrador do sistema.';</script>";
                session_destroy();
                exit;
            }
            
            while ($registroCat = $resposta->fetch_assoc()) {
                // cria um array de nomes
                $categorias[] = $registroCat['cat_usu_codigo'];
            }
            
            // coloca o array na sessão
            $_SESSION['Categorias'] = $categorias; 
        } 
    $mysqli->Close();   
    echo "<script>location.href='index.php';</script>";
?>

