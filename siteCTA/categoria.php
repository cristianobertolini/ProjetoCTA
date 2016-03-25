<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php
            include("include/conexao.php");
            include("cabecalho.php");
            $pagina = 'IN';
            
            if(isset($_GET['id'])){
                $id = $mysqli->real_escape_string($_GET['id']);

                $sqlCat =  "SELECT c.`cat_nome`, c.`cat_codigo` 
                            FROM `categoria` as c  
                            WHERE c.`cat_codigo` = $id"; 

                $queryCat = $mysqli->query($sqlCat);       
                    
                $rowsCat = mysqli_num_rows($queryCat);

                if ($rowsCat > 0){
                    $registroCat = $queryCat->fetch_assoc();
                    $nome = $registroCat['cat_nome'];
                } else {
                    $id   = 0;
                    $nome = 'não encontrada.';
                }
            } else {
                $id   = 0; 
                $nome = 'não encontrada.';
            }                   
            ?>    
            
        <title>colabAD | Categoria <?php echo $nome; ?> </title>           
    </head>    

    <body>
        
    <?php
        include("navegacao.php");
        
        echo '<div id="main" class="w3-container" style="margin-left:300px;margin-top:118px">';
        echo '  <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">';
        echo '      <h1>Categoria '.$nome.'</h1>';
        echo '  </div>';
        
        if ($id > 0) {
            $sqlImg =  "SELECT i.`img_codigo`, i.`img_audiodescricao`, i.`img_nome`, i.`img_imagem` 
                        FROM `imagens` as i 
                        WHERE i.`cat_codigo` = $id
                    ORDER BY i.`img_nome`";
            $queryImg = $mysqli->query($sqlImg) OR trigger_error($MySQLi->error, E_USER_ERROR);
            
            $rowsImg = mysqli_num_rows($queryImg);
            
            if ($rowsImg > 0) {
                // Exibe o total de registros encontrados
                echo "Imagens encontradas: {$queryImg->num_rows}";
                
                while ($registroImg = $queryImg->fetch_object()) {    
                    echo '<div class="w3-row-padding w3-margin-top">';
                    echo '  <div class="w3-third">';
                    echo '      <div class="w3-card-2">';
                    echo '          <img src="./img/img_5terre.png" style="width:100%">';
                    echo '          <div class="w3-container">';
                    echo '              <h5>'.$registroImg->img_nome.'</h5>';
                    echo '          </div>';
                    echo '      </div>';
                    echo '  </div>';
                    echo '</div>';
                } 
                $queryImg->free();
            } else {
                echo '<div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">';
                echo '  <h3>Categoria não possui imagens cadastradas.</h3>';
                echo '</div>';                
            } 
        }  
    ?>
   
    <?php
        include("rodape.php");
    ?>    
</body>
</html> 
