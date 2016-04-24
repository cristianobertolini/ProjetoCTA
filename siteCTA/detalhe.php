<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php
            include("include/conexao.php");
            include("cabecalho.php");
            $pagina = 'IN';
            
            if(isset($_GET['id'])){
                $id = $mysqli->real_escape_string($_GET['id']);

                $sqlImg =  "SELECT i.`img_codigo`, i.`usu_codigo`, i.`img_data`, i.`img_hora`, i.`img_audiodescricao`, i.`img_nome`, i.`img_nome_original` 
                            FROM `imagens` as i 
                            WHERE i.`img_codigo` = $id";
                
                $queryImg = $mysqli->query($sqlImg) OR trigger_error($mysqli->error, E_USER_ERROR);

                $rowsImg = mysqli_num_rows($queryImg);                

                if ($rowsImg > 0){
                    $registroImg = $queryImg->fetch_assoc();
                    $nome = $registroImg['img_nome'];
                } else {
                    $id   = 0;
                    $nome = 'Imagem não encontrada.';
                }
            } else {
                $id   = 0; 
                $nome = 'Imagem não encontrada.';
            }                   
            ?>    
            
        <title>colabAD | Imagem <?php echo $nome; ?> </title>           
    </head>    

    <body>
        
    <?php
        include("navegacao.php");
        
        echo '<div id="main" class="w3-container" style="margin-left:300px;margin-top:118px">';
        echo '  <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">';
        echo '      <h1>'.$nome.'</h1>';
        echo '  </div>';
        
        if ($id > 0) {
            echo '<div class="w3-row-padding w3-margin-top">';
            echo '  <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">';
            echo '      <br>';             
            echo '      <div class="w3-justify">'.$registroImg['img_audiodescricao'].'</div>';
            echo '      <br>';            
            echo '      <img src="./img/'.$registroImg['img_nome_original'].'" style="width:45%" alt="'.$registroImg['img_nome'].'">';                                       
            echo '      <br><br>';
            echo '  </div>';
            echo '</div>';
            $queryImg->free();            
        } 
    ?>
        
    <?php
        include("rodape.php");
    ?>    
</body>
</html> 
