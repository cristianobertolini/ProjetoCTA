<?php include("include/config.php"); 
      include("include/conexao.php");
      include("include/funcoes.php");

    $nomeCat = $mysqli->real_escape_string($_POST['nome']);
    
    $sqlSeExiste = "SELECT `cat_codigo` 
                                FROM `categoria` 
                                WHERE `cat_nome` = '$nomeCat'";
    $querySeExiste = $mysqli->query($sqlSeExiste); 
   
    if (mysqli_num_rows($querySeExiste) > 0) {   
            echo "<script>location.href='categoria_nova.php?mensagem=w3-red&texto=A categoria ".$nomeCat." já existe! Cadastre outro nome de categoria.';</script>";
       
        } else {     

    $sql = "INSERT INTO `categoria` (`cat_nome`) 
            VALUES ('$nomeCat');";        
    //insere nova categoria
    $mysqli->query($sql);

    echo "<script>location.href='categoria_nova.php?mensagem=w3-green&texto=A Categoria foi cadastrada com sucesso!';</script>";
    $mysqli->Close();
    die();  
        }
?>
