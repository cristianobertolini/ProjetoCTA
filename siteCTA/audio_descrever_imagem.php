<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php
            include("include/conexao.php");
            include("cabecalho.php");
            $pagina = 'AU';
            
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
        echo '      <h1>'.$nome.'</h1>';
        echo '  </div>';
        
        if ($id > 0) {
            echo '<div class="w3-row-padding w3-margin-top">';
            echo '  <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">';
            echo '      <br>';             
            echo '      <div class="w3-justify">'.utf8_encode($registroImg['img_audiodescricao']).'</div>';
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
    ?>
    <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">
        <h3>Descrever imagem:</h3> 
        <form id="revisor" action="audio_descrever_upload_imagem.php" method="post">
            <div class="w3-section">
                <label for="situacao" class="w3-label"><strong>Situação</strong>
                    <select class="w3-select" name="situacao" id="situacao" required>
                        <option value=""disabled> Selecione uma opção </option>
                        <option value="descrever" selected>Descrever (Situação atual da imagem)</option>
                         <option value="revisar">Revisar (Envia imagem para revisão)</option>
                        <option value="cancelar">Cancelar (Remove imagem - imagem inadequada)</option>
                    </select>  <br/>
                </label>    
                <br>
                <label class="w3-label"><strong>Categoria: </strong></label> 
                <select class="w3-select" name="categoria" required>
                    <option value="" disabled> Escolha uma opção se deseja trocar a categoria</option>
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
                </select>
                <br><br> 
                <label><strong>Observação: (opcional)</strong></label> 
                
                <textarea class="w3-input w3-border" name="obs" id="obs"></textarea></br>
                
                <label class="w3-label"><b>Áudio-descrição:</b></label> 

                <textarea class="w3-input w3-border" onkeyup="blocTexto(this.value)" id="audiodescricao" name="audiodescricao" class="textarea" rows="3" maxlength="5000"><?php echo utf8_encode($registroImg['img_audiodescricao']); ?></textarea>
                <label ><b>Restam <span id="cont">5000</span> caracteres</label>     
                <br>
 
                <input id="img" name="img" type="hidden" value="<?php echo $id; ?>"/>
                
                <div class="w3-row">
                    <input class="w3-input w3-green w3-half" type="submit" value="Enviar" />
                    <input class="w3-input w3-blue-grey w3-half" type="reset" value="Limpar" />
                </div> 
            </div>
        </form>
    </div>   
        
         <script type="text/javascript">
            function blocTexto(valor)
            {
                quant = 5000;
                total = valor.length;
                if(total <= quant)
                {
                    resto = quant - total;
                    document.getElementById('cont').innerHTML = resto;
                }
                else
                {
                    document.getElementById('texto').value = valor.substr(0,quant);
                }
            }
            </script>
    <?php
        include("rodape.php");
    ?>    
</body>
</html> 
