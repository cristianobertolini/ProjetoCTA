<?php include("include/config.php"); 
      include("include/conexao.php");
      include("include/funcoes.php");

      
    $email = $mysqli->real_escape_string($_POST['email']);
    $senha = $mysqli->real_escape_string($_POST['senha']);
    $nome = $mysqli->real_escape_string($_POST['nome']);
    $escolaridade = $mysqli->real_escape_string($_POST['escolaridade']);
    $endereco = $mysqli->real_escape_string($_POST['endereco']); //pegar estado e cidade separados depois colocar também tipo de usuario
    
//        /*pega no banco de dados do usuario */
//    $query = "SELECT `USU_CODIGO`, `USU_LOGIN`,`USU_EMAIL`, `USU_ESCOLARIDADE`, `USU_ENDERECO` 
//              FROM `usuario` 
//              WHERE `USU_EMAIL` = '$email'";
//    
//   /*retorna a quantidade registros encontrados na consulta acima */
// 
//    $queryUsu = $mysqli->query($query);
//    
//    
//    /*se quantidade de linhas maior que zero então já existe usuario cadastrado*/
//    if(mysqli_num_rows($queryUsu) > 0){
//        $resultado = $queryUsu->fetch_assoc();
//       
//        echo "Usuário já existe, email ja cadastrado";
//          
//            } else {
            $sql = "INSERT INTO `usuario` (`usu_senha`, `usu_nome`, `usu_email`, `usu_escolaridade`, `usu_endereco`) 
                VALUES ('".SHA1($senha)."', '$nome', '$email', '$escolaridade', '$endereco');";     
 
               $mysqli->query($sql);        
//          } 
    $mysqli->Close();
    
    
        ?>

