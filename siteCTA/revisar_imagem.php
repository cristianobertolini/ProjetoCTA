<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php
            include("include/conexao.php");
            include("cabecalho.php");
            $pagina = 'RE';
            
            if(isset($_POST['imagem'])){
                $id = $mysqli->real_escape_string($_POST['imagem']);

                $sqlImg =  "SELECT i.`img_codigo`, i.`usu_codigo`, i.`img_data`, i.`img_hora`, i.`img_audiodescricao`, i.`img_nome`, i.`img_nome_original`,i.`img_situacao`, i.`cat_codigo`  
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
            echo '  </div>';
            echo '</div>';
            $queryImg->free();            
        }
        
        
        $sqlLog = "SELECT `log_codigo`, `log_data_hora`, `user_codigo`, `img_codigo`, `log_tipo`, `log_observacao` 
                   FROM `log` 
                   WHERE `img_codigo` = $id";

        $queryLog = $mysqli->query($sqlLog);              

        if (mysqli_num_rows($queryLog) > 0){
            echo '<div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">';
            echo '    <h3>Log de alteração da imagem:</h3>';
            echo '<table class="w3-table w3-striped w3-border">';
            echo '    <thead>';
            echo '    <tr class="w3-green">';
            echo '      <th>Data/Hora</th>';
            echo '      <th>Tipo</th>';
            echo '      <th>Usuário</th>';
            echo '      <th>Observação</th>';
            echo '    </tr>';
            echo '    </thead>';

            while ($registroLog = $queryLog->fetch_assoc()) {    
                echo '<tr>';
                $timestamp  = strtotime($registroLog['log_data_hora']);
                echo '  <td>'.date('d/m/Y H:i:s', $timestamp).'</td>';
                if ($registroLog['log_tipo'] == 1) { echo '  <td>Usuário</td>'; } else 
                if ($registroLog['log_tipo'] == 2) { echo '  <td>Audiodescritor</td>'; } else
                if ($registroLog['log_tipo'] == 3) { echo '  <td>Revisor</td>'; }
                echo '  <td>'.BuscaDado('usu_nome', 'usuario', 'usu_codigo = '.$registroLog['user_codigo']).'</td>';
                echo '  <td>'.$registroLog['log_observacao'].'</td>';
                echo '</tr>';                        
            }
            echo '</table>';
            echo '</div>';
        }  
        

        $sqlTag = "SELECT it.`tag_codigo`,
                          t.`tag_descricao`,
                          t.`tag_cont`,
                          t.`tag_ultima_busca`,
                          it.`img_codigo`
                   FROM `imagem_tag` as it 
                       INNER JOIN `tag` as t
                           ON t.`tag_codigo` = it.`tag_codigo`
                   WHERE it.`img_codigo` = $id
                   ORDER BY t.`tag_descricao`";
        $queryTag = $mysqli->query($sqlTag);              

        if (mysqli_num_rows($queryTag) > 0){
            echo '<div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">';
            echo '    <h3>Palavra-chave associada:</h3>';
            echo '<table class="w3-table w3-striped w3-border">';
            echo '    <thead>';
            echo '    <tr class="w3-green">';
            echo '      <th>Palavra-chave</th>';
            echo '      <th WIDTH="140" class="w3-center">Núm. de buscas</th>';
            echo '      <th>Última busca</th>';
            echo '      <th WIDTH="75">Excluir</th>';
            echo '    </tr>';
            echo '    </thead>';

            while ($registroTag = $queryTag->fetch_assoc()) {    
                echo '<tr>';
                echo '  <td>'.$registroTag['tag_descricao'].'</td>';
                echo '  <td WIDTH="140" class="w3-center">'.$registroTag['tag_cont'].'</td>';
                $timestampTag  = strtotime($registroTag['tag_ultima_busca']);
                echo '  <td>'.date('d/m/Y H:i:s', $timestampTag).'</td>';
                echo '  <td WIDTH="75"><form id="tag_alteracao" action="tag_alteracao.php" method="post">';
                echo '          <input id="img" name="img" type="hidden" value="'.$registroTag['img_codigo'].'"/>';
                echo '          <input id="tag" name="tag" type="hidden" value="'.$registroTag['tag_codigo'].'"/>';
                echo '          <input id="tipo" name="tipo" type="hidden" value="1"/>';
                echo '          <button id="Deletar" type="submit" class="w3-btn w3-red"><i class="fi-x"></i></button>';
                echo '      </form>'; 
                echo '  </td>';                        
                echo '</tr>';                        
            }
            echo '</table>';
            echo '</div>';
        }                              
    ?>
    <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">
        <h3>Revisar imagem:</h3> 
        <form id="revisor" action="revisar_imagem_upload.php" method="post">
            <div class="w3-section">
                <label for="situacao" class="w3-label"><strong>Situação</strong>
                    <select class="w3-select" name="situacao" id="situacao" required>
                        <option value=""disabled> Selecione uma opção </option>
                        <option value="revisar" selected>Revisar (Situação atual da imagem)</option>
                        <option value="publicar">Publicar (Tornar a imagem pública)</option>
                        <option value="descrever">Audiodescrever (Enviar novamente para audiodescrição)</option>
                        <option value="cancelar">Cancelar (Remove imagem - imagem inadequada)</option>
                    </select>  <br/>
                </label>    
                <br>
          
                <label class="w3-label"><strong>Categoria: </strong></label> 
                <div class="w3-row">
                    <div class="w3-col s6">
                        <select class="w3-select" name="categoria" required > 
                            <option value="" disabled> Escolha uma opção</option>  
                    <?php
                        //Carrega as categorias do banco de dados
                        $sqlCat = "SELECT `cat_codigo`, `cat_nome` FROM `categoria` ORDER BY `cat_nome`"; 

                        $queryCat = $mysqli->query($sqlCat);       

                        $rowsCat = mysqli_num_rows($queryCat);       
                        if ($rowsCat > 0) {
                            //Mostra as categorias
                            while ($registroCat = $queryCat->fetch_assoc()) {
                                echo '<option  value="'.$registroCat['cat_codigo'].'"';
                                if ($registroImg['cat_codigo'] == $registroCat['cat_codigo']) { echo ' selected';}
                                echo '> '.$registroCat['cat_nome'].'</option>';
                            }   
                        } else {
                            echo '<option value="" disabled selected>Nenhuma categoria encontrada</option>';
                        }    
                    ?>
                    </select> <br><br> 
                    </div>
                    <div class="w3-col s6">
                        <p><button class="w3-btn-block w3-teal" type="button" onClick="NovaCat()">Adicionar Nova Categoria</button></p></div>
                </div>
                
                <label class="w3-label" for="obs"><strong>Observação: (opcional)</strong></label> 
                <textarea class="w3-input w3-border" name="obs" id="obs"></textarea></br>
                
                <label class="w3-label" for="tag"><strong>Tag (palavra-chave separada por vírgula):</strong></label> 
                <input class="w3-input w3-border" name="tag" id="tag" type="text"/>                
                    
                <input id="img" name="img" type="hidden" value="<?php echo $id; ?>"/>
                
                <div class="w3-row">
                    <input class="w3-input w3-green w3-half" type="submit" value="Enviar" />
                    <input class="w3-input w3-blue-grey w3-half" type="reset" value="Limpar" />
                </div> 
            </div>
        </form>
    </div>       
      
        <script type="text/javascript">
            function NovaCat(){
            location.href=" categoria_nova.php"
            }
        </script>
        
    <?php
          include("rodape.php");
    ?>    
</body>
</html> 
