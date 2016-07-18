<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php
            include("include/conexao.php");
            include("cabecalho.php");
            $pagina = 'IN';
        ?>
        <title> ColabAD | Sistema Colaboratido de Áudiodescrição)</title>           
    </head>    

    <body>
        
    <?php
        include("navegacao.php");
    ?>  
        
    <div id="main" class="w3-container" style="margin-left:300px;margin-top:118px">
        <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">
            <h1>Últimas imagens</h1>
        </div>
    <?php
    
        $sqlImg =  "SELECT i.`img_codigo`, i.`usu_codigo`, i.`img_data`, i.`img_hora`, i.`img_audiodescricao`,
                           i.`img_nome`, i.`img_nome_original`, c.`cat_nome`, i.`cat_codigo` 
                    FROM `imagens` as i
                        INNER JOIN `categoria` as c ON c.`cat_codigo` = i.`cat_codigo`
                    WHERE i.`img_situacao` = 'publicar'
                    ORDER BY i.`img_data` DESC, `img_hora` DESC LIMIT 6";
            $queryImg = $mysqli->query($sqlImg) OR trigger_error($mysqli->error, E_USER_ERROR);
            
            $rowsImg = mysqli_num_rows($queryImg);
            
            if ($rowsImg > 0) {
            $count = 0;
            echo '<div class="w3-row-padding w3-margin-top">';
                while ($registroImg = $queryImg->fetch_assoc()) {
                    if ($count == 0) {
                        echo '<div class="w3-row-padding w3-margin-top">';
                    }
                    $count = $count + 1;
                    echo '  <div class="w3-third">';
                    echo '      <div class="w3-card-2">';
                    echo '          <a href="./detalhe.php?id='.$registroImg['img_codigo'].'" target="_self"><img src="./img/'.utf8_encode($registroImg['img_nome_original']).'" style="width:100%" alt="'.utf8_encode($registroImg['img_nome']).'" class="w3-hover-opacity"></a>';
                    echo '          <div class="w3-container w3-padding-medium">';
                    echo '              '.utf8_encode($registroImg['img_nome']).'<br><a href="./categoria.php?id='.$registroImg['cat_codigo'].'" target="_self"><strong>Categoria: </strong>'.$registroImg['cat_nome'].'</a>';
                    echo '          </div>';
                    echo '      </div>';
                    echo '  </div>';
                    if ($count == 3) {
                        $count = 0;
                        echo '</div>';
                    }
                } 
            echo '</div>';
                $queryImg->free();
            } else {
                echo '<div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">';
                echo '  <span class="w3-large">Nenhuma imagem cadastrada.</span>';
                echo '</div>';                
            }     
        include("rodape.php");
    ?>    
</body>
</html> 