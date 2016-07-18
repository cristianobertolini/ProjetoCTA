<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php
            include("include/conexao.php");
            include("cabecalho.php");
            $pagina = 'IN';
            
            if(isset($_GET['id'])){
                $id = $mysqli->real_escape_string($_GET['id']);

                $sqlCat =  "SELECT `tag_codigo`, 
                                   `tag_descricao`, 
                                   `tag_cont`, 
                                   `tag_ultima_busca` 
                              FROM `tag` 
                             WHERE `tag_codigo` = '$id';"; 

                $queryCat = $mysqli->query($sqlCat);       
                    
                $rowsCat = mysqli_num_rows($queryCat);

                if ($rowsCat > 0){
                    $registroCat = $queryCat->fetch_assoc();
                    $nome = $registroCat['tag_descricao'];
                } else {
                    $id   = 0;
                    $nome = 'não encontrada.';
                }
            } else {
                $id   = 0; 
                $nome = 'não encontrada.';
            }                   
            ?>    
            
        <title>colabAD | Palavra-chave <?php echo utf8_encode($nome); ?> </title>           
    </head>    

<body>  
    <?php
        include("navegacao.php");
    ?>        
    <div id="main" class="w3-container" style="margin-left:300px;margin-top:118px">
            
        <?php            
            echo '  <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">';
            echo '      <h1>Palavra-chave '.$nome.'</h1>';
            echo '  </div>';

            if ($id > 0) {
                $sqlupdTag = "UPDATE `tag` 
                                 SET `tag_cont` = `tag_cont` + 1,
                                     `tag_ultima_busca` = now()
                               WHERE `tag_codigo` = $id";
                $queryUpdTag = $mysqli->query($sqlupdTag);

                $sqlImg = "SELECT i.`img_codigo`, 
                                  i.`usu_codigo`, 
                                  i.`img_data`, 
                                  i.`img_hora`, 
                                  i.`img_audiodescricao`, 
                                  i.`img_nome`, 
                                  i.`img_nome_original` 
                             FROM `imagens` as i
                                INNER JOIN `imagem_tag` as it
                                    ON it.`img_codigo` = i.`img_codigo`
                            WHERE it.`tag_codigo` = $id 
                              AND i.`img_situacao` = 'publicar'
                         ORDER BY i.`img_nome`";
                $queryImg = $mysqli->query($sqlImg) OR trigger_error($mysqli->error, E_USER_ERROR);

                $rowsImg = mysqli_num_rows($queryImg);

                if ($rowsImg > 0) {
                    // Exibe o total de registros encontrados
                    echo "Imagens encontradas: {$queryImg->num_rows}";
                $count = 0;
                echo '<div class="w3-row-padding w3-margin-top">';
                    while ($registroImg = $queryImg->fetch_assoc()) {
                        if ($count == 0) {
                            echo '<div class="w3-row-padding w3-margin-top">';
                        }
                        $count = $count + 1;
                        echo '  <div class="w3-third">';
                        echo '      <div class="w3-card-2">';
                        echo '          <a href="./detalhe.php?id='.$registroImg['img_codigo'].'" target="_self"><img src="./img/'.$registroImg['img_nome_original'].'" style="width:100%" alt="'.utf8_encode($registroImg['img_nome']).'" class="w3-hover-opacity"></a>';
                        echo '          <div class="w3-container">';
                        echo '              <h5>'.utf8_encode($registroImg['img_nome']).'</h5>';
                        echo '          </div>';                                       
                        echo '      </div>';
                        echo '  </div>';
                        if ($count == 3) {
                            $count = 0;
                            echo '</div>';
                        }
                    } 
                echo '</div></div>';
                    $queryImg->free();
                } else {
                    echo '<div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">';
                    echo '  <h3>Palavra-chave não possui imagens cadastradas.</h3>';
                    echo '</div>';                
                } 
            }  
        ?>

    <?php
        include("rodape.php");
    ?>    
</body>
</html> 
