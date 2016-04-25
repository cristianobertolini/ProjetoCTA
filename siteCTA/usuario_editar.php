<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php
            include("cabecalho.php");
            $pagina = 'US';
        ?>    
            
        <title>colabAD | Editar Perfil </title>  
        <style type="text/css">
            .carregando{
                color:#666;
                display:none;
            }
        </style>        
    </head>    

    <body>
        
    <?php
        include("navegacao.php");
    ?>
        
    <div id="main" class="w3-container" style="margin-left:300px;margin-top:118px">    
        <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">
            <h1>Editar Perfil</h1>
        </div>
        <div class="w3-container w3-section w3-padding-large w3-card-4 w3-light-grey">
            
            <?php
                if((isset($_GET['mensagem'])) && (isset($_GET['texto']))){
                    echo "<div class='w3-container ".$_GET['mensagem']."'><span onclick='this.parentElement.style.display=\"none\"' class='w3-closebtn'>X</span>";
                    echo $_GET['texto'];
                    echo "</div>";
                }
            ?>              
            
            <div class="w3-container">
                <form id="cadastro_usuario" action="usuario_editar_inserir.php" method="POST">
                    <div class="w3-section">
                        <?php
                            $codUsu = $_SESSION['UsuarioCOD'];

                            $sqlUsuario = "SELECT `usu_codigo`, `usu_nome`, `usu_email`, `usu_senha`, `usu_escolaridade`, `usu_descricao`, `cid_codigo`, `usu_data_hora_cad` 
                                           FROM `usuario` 
                                           WHERE `usu_codigo` = '$codUsu'";
                            
                            $queryUsuario = $mysqli->query($sqlUsuario);
                            $resulUsuario = $queryUsuario->fetch_assoc();
                            
                            $data_mysql = $resulUsuario['usu_data_hora_cad'];
                            $timestamp = strtotime($data_mysql);
                            
                            $nome           = $resulUsuario['usu_nome'];
                            $login          = $resulUsuario['usu_email'];
                            $escolaridade   = $resulUsuario['usu_escolaridade'];
                            $cidade         = $resulUsuario['cid_codigo'];
                            $descricao      = $resulUsuario['usu_descricao'];
                            
                            $sqlCidade = "SELECT `cid_codigo`, `est_codigo`, `cid_nome` FROM `cidades` WHERE `cid_codigo` = $cidade";
                            
                            $queryCidade = $mysqli->query($sqlCidade);
                            $resulCidade = $queryCidade->fetch_assoc();
                            
                            $estado = $resulCidade['est_codigo'];
                        ?>                        
                        <p>Você se cadastrou em: <?php echo date('d/m/Y H:i:s', $timestamp); ?></p>
                        <label><strong>Nome</strong></label>
                        <input value="<?php echo $nome; ?>" class="w3-input w3-border w3-margin-bottom" id="nome" name="nome" type="text" placeholder="Insira seu nome completo" required>

                        <label><strong>Login (E-mail)</strong></label>
                        <input value="<?php echo $login; ?>" class="w3-input w3-border" id="email" name="email" type="email" placeholder="Insira seu email" required>

                        <label><strong>Senha</strong></label>
                        <input class="w3-input w3-border w3-margin-bottom" id="senha" name="senha" type="password" placeholder="Insira sua nova senha" required>
                        
                        <label for="escolaridade"><strong>Escolaridade</strong>
                            <select class="w3-select" name="escolaridade" id="escolaridade" required>
                                <option value=""disabled> Selecione uma opção </option>
                                <option value="Primeiro Grau Incompleto" <?php if (strcmp('Primeiro Grau Incompleto', $escolaridade) == 0) { echo ' selected';} ?>>1º Grau - Incompleto</option>
                                <option value="Primeiro Grau Completo" <?php if (strcmp('Primeiro Grau Completo', $escolaridade) == 0) { echo ' selected';} ?>>1º Grau - Completo</option>
                                <option value="Segundo Grau Incompleto" <?php if (strcmp('Segundo Grau Incompleto', $escolaridade) == 0) { echo ' selected';} ?>>2º Grau - Incompleto</option>
                                <option value="Segundo Grau Completo" <?php if (strcmp('Segundo Grau Completo', $escolaridade) == 0) { echo ' selected';} ?>>2º Grau - Completo</option>
                                <option value="Terceiro Grau Incompleto" <?php if (strcmp('Terceiro Grau Incompleto', $escolaridade) == 0) { echo ' selected';} ?>>3º Grau - Superior Incompleto</option>
                                <option value="Terceiro Grau Completo" <?php if (strcmp('Terceiro Grau Completo', $escolaridade) == 0) { echo ' selected';} ?>>3º Grau - Superior Completo</option>
                                <option value="Especializa&ccedil;&atilde;o" <?php if (strcmp('Especializa&ccedil;&atilde;o', $escolaridade) == 0) { echo ' selected';} ?>>Especialização</option>
                                <option value="Mestrado" <?php if (strcmp('Mestrado', $escolaridade) == 0) { echo ' selected';} ?>>Mestrado</option>
                                <option value="Doutorado" <?php if (strcmp('Doutorado', $escolaridade) == 0) { echo ' selected';} ?>>Doutorado</option>
                            </select>  <br/>
                        </label>    
                        <br>
                        
                        
                        <label for="est_codigo"><strong>Estado:</strong></label>
                        <select class="w3-select" name="est_codigo" id="est_codigo" required>
                            <option value="">Selecione uma opção</option>
                                <?php
                                    $sqlEstado = "SELECT `est_codigo`, `est_uf`, `est_nome`
                                                  FROM estados
                                                  ORDER BY `est_uf`";
                                    $resEstado = $mysqli->query($sqlEstado);
                                    while ($registroEstado = $resEstado->fetch_assoc()) {
                                        echo '<option value="'.$registroEstado['est_codigo'].'"';
                                        if ($estado == $registroEstado['est_codigo']) { echo ' selected';}
                                        echo '>'.$registroEstado['est_uf'].' - '.(utf8_encode($registroEstado['est_nome'])).'</option>';
                                    }
                                ?>
                            </option>
                        </select>
                        <br> 
                        <br>
                        
                        <label for="cid_codigo"><strong>Cidade:</strong></label>
                        <span class="carregando">Aguarde, carregando...</span>
                        <select class="w3-select" name="cid_codigo" id="cid_codigo" required>
                            <option value="" disabled selected>-- Escolha um estado --</option> 
                        </select>                        
                        <br>
                        <br>
                        <label><strong>Conte-nos qual é o seu conhecimento sobre áudio-descrição: (opcional)</strong></label> 
                        <textarea class="w3-input w3-border" name="descricao" id="descricao"><?php echo $descricao; ?></textarea></br>

                        <label><strong>Deseja contribuir também como:</strong> (Para ser aceito seu usuário será avaliado pelo administrador do sistema)<br> 
                            <?php
                                /*pega no banco de dados as categorias */
                                $sqlCat = "SELECT `cat_usu_codigo`, `cat_usu_nome`, `cat_usu_descricao` 
                                           FROM `categoria_usuario`";
                                /*retorna a quantidade registros encontrados na consulta acima */
                                $queryCat = $mysqli->query($sqlCat);                            
                                
                                /*pega no banco de dados do usuario */
                                $sqlUsuCat = "SELECT `usu_codigo`, `cat_usu_codigo` 
                                           FROM `usuario_categoria_usuario`
                                           WHERE `usu_codigo` = $codUsu";
                                /*retorna a quantidade registros encontrados na consulta acima */
                                $queryUsuCat = $mysqli->query($sqlUsuCat);

                                /*se quantidade de linhas maior que zero então já existe usuario cadastrado*/
                                if(mysqli_num_rows($queryUsuCat) > 0){
                                    while ($registro = $queryUsuCat->fetch_assoc()) {
                                        $categoria[$registro['cat_usu_codigo']] = $registro['cat_usu_codigo'];
                                    }
                                }
                                
                                for ($i = 1; $i <= mysqli_num_rows($queryCat); $i++) {
                                    if (isset($categoria[$i])) {
                                        if ((int)$categoria[$i] == $i) {
                                            $categoriaFinal[$i] = 'checked';
                                        } else {
                                            $categoriaFinal[$i] = '';
                                        }
                                    } else {
                                        $categoriaFinal[$i] = '';
                                    }
                                } 
                                while ($registroCat = $queryCat->fetch_assoc()) {
                                    echo "<p><input class='w3-check' id='categoria' name='categoria[]' value='".$registroCat['cat_usu_codigo']."'";
                                    if($categoriaFinal[$registroCat['cat_usu_codigo']] == 'checked'){ echo " checked"; }
                                    if($registroCat['cat_usu_codigo'] == 1){
                                        echo " type='hidden'>"; 
                                    } else {                                    
                                        echo " type='checkbox'><label for='categoria2' class='w3-validate'><strong>".utf8_encode($registroCat['cat_usu_nome'])."</strong> ".utf8_encode($registroCat['cat_usu_descricao'])."</label></p>";                                    
                                    }
                                        
                                    }                                
                            ?>

        <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
          <button class="w3-btn w3-btn-block w3-green">Salvar</button>
        </div>
                </form>
              </div>
            </div>
        </div>
        
        <script src="http://www.google.com/jsapi"></script>
            <script type="text/javascript">
              google.load('jquery', '1.3');
            </script>        

            <script type="text/javascript">        
                $(function(){
                    $('#est_codigo').change(function(){
                        if( $(this).val() ) {
                            $('#cid_codigo').hide();
                            $('.carregando').show();
                            $.getJSON('cidades.ajax.php?search=', {est_codigo: $(this).val(), ajax: 'true'}, function(j){
                                    var options = '<option value="" disabled selected>-- Escolha uma cidade --</option>';
                                    for (var i = 0; i < j.length; i++) {
                                        options += '<option value="' + j[i].cid_codigo + '">' + j[i].cid_nome + '</option>';
                                    }	
                                    $('#cid_codigo').html(options).show();
                                    $('.carregando').hide();
                            });
                        } else {
                            $('#cid_codigo').html('<option value="">-- Escolha um estado --</option>');
                        }
                    });
                });      
            </script>          
        

        <?php
            include("rodape.php");
        ?>  
    </body>
</html> 