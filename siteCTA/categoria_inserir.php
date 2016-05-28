<?php include("include/config.php"); 
      include("include/conexao.php");
      include("include/funcoes.php");

      
    $nomeCat = $mysqli->real_escape_string($_POST['nome']);
            
            $sql = "INSERT INTO `categoria` (`cat_nome`) 
                    VALUES ('$nomeCat');";        
            //insere nova categoria
            $mysqli->query($sql);

            echo "<script>location.href='categoria_nova.php?mensagem=w3-green&texto=Categoria cadastrada com sucesso! $emailret';</script>";
            $mysqli->Close();
            die();         

?>

