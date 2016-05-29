<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php
            include("include/conexao.php");
            include("cabecalho.php");
            $pagina = 'IN';
            
            if(isset($_GET['id'])){
                $id = $mysqli->real_escape_string($_GET['id']);

                $sqlImg =  "SELECT i.`img_codigo`, 
                                   i.`usu_codigo`, 
                                   i.`img_data`, 
                                   i.`img_hora`, 
                                   i.`img_audiodescricao`, 
                                   i.`img_nome`, 
                                   i.`img_nome_original`,
                                   i.`cat_codigo`
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
            
        <title>colabAD | Imagem <?php echo utf8_encode($nome); ?> </title>           
    </head>    

    <body>
        
    <?php
        include("navegacao.php");
        
        echo '<div id="main" class="w3-container" style="margin-left:300px;margin-top:118px">';
        echo '  <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">';
        echo '      <h1>'.utf8_encode($nome).'</h1>';
        echo '  </div>';
        
        if ($id > 0) {
            echo '<div class="w3-row-padding w3-margin-top">';
            echo '  <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">';
            echo '      <br>';             
            echo '      <div class="w3-justify">'.$registroImg['img_audiodescricao'].'</div>';
            echo '      <br>';            
            echo '      <img src="./img/'.$registroImg['img_nome_original'].'" style="width:45%" alt="'.$registroImg['img_nome'].'">';                                       
            echo '      <br><br>'; 
            echo '      <strong>Categoria:</strong> '.BuscaDado('cat_nome', 'categoria', 'cat_codigo = '.$registroImg['cat_codigo']);
            echo '      <br>'; 
            echo '      <strong>Palavras-chave:</strong> ';
            
            $sqlTag = "SELECT it.`tag_codigo`,
                              t.`tag_descricao`,
                              t.`tag_cont`
                       FROM `imagem_tag` as it 
                           INNER JOIN `tag` as t
                               ON t.`tag_codigo` = it.`tag_codigo`
                       WHERE it.`img_codigo` = ".$registroImg['img_codigo']."
                       ORDER BY t.`tag_cont` DESC";
            $queryTag = $mysqli->query($sqlTag);
            while ($registroTag = $queryTag->fetch_assoc()) {
                echo '<a href="./tag.php?id='.$registroTag['tag_codigo'].'"><span class="w3-tag w3-green">'.$registroTag['tag_descricao'].' <span class="w3-badge">';
                echo $registroTag['tag_cont'];
                echo '</span> </span></a> ';
            }            
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
