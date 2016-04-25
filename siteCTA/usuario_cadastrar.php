<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <?php
            include("cabecalho.php");
            $pagina = 'IN';
        ?>    
            
        <title>colabAD | Cadastrar </title>  
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
            <h1>Cadastrar Usuário</h1>
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
                <form id="cadastro_usuario" action="usuario_inserir.php" method="POST">
                    <div class="w3-section">
                       <label><strong>Nome</strong></label>
                        <input class="w3-input w3-border w3-margin-bottom" id="nome" name="nome" type="text" placeholder="Insira seu nome completo" required>

                        <label><strong>Login (E-mail)</strong></label>
                        <input class="w3-input w3-border" id="email" name="email" type="text" placeholder="Insira seu email" required>

                        <label><strong>Senha</strong></label>
                        <input class="w3-input w3-border w3-margin-bottom" id="senha" name="senha" type="password" placeholder="Insira sua senha" required>

                               
                        <label for="escolaridade"><strong>Escolaridade</strong>
                            <select class="w3-select" name="escolaridade" id="escolaridade" required>
                                <option value=""disabled selected> Selecione uma opção </option>
                                <option value="Primeiro Grau Incompleto">1º Grau - Incompleto</option>
                                <option value="Primeiro Grau Completo">1º Grau - Completo</option>
                                <option value="Segundo Grau Incompleto">2º Grau - Incompleto</option>
                                <option value="Segundo Grau Completo">2º Grau - Completo</option>
                                <option value="Terceiro Grau Incompleto">3º Grau - Superior Incompleto</option>
                                <option value="Terceiro Grau Completo">3º Grau - Superior Completo</option>
                                <option value="Especializa&ccedil;&atilde;o">Especialização</option>
                                <option value="Mestrado">Mestrado</option>
                                <option value="Doutorado">Doutorado</option>
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
                                        echo '<option value="'.$registroEstado['est_codigo'].'">'.$registroEstado['est_uf'].' - '.(utf8_encode($registroEstado['est_nome'])).'</option>';
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
                        <textarea class="w3-input w3-border" name="descricao" id="descricao"></textarea></br>

                        <label required><strong>Deseja contribuir também como:</strong> (Para ser aceito seu usuário será avaliado pelo administrador do sistema)<br>    
                            <input type='hidden' class="w3-check"  id='categoria' name='categoria[]' value='1'checked>
                            <label for='categoria1' class="w3-validate"></label></p>
                            <input class="w3-check" id='categoria' name='categoria[]' type='checkbox' value='2'>
                            <label for='categoria2' class="w3-validate"><strong>Áudio-descritor</strong> (O usuário tem permissão de fazer áudio-descricao nas imagens)</label></p>
                            <p>
                            <input class="w3-check" id='categoria' name='categoria[]' type='checkbox' value='3'>
                            <label for='categoria3' class="w3-validate"><strong> Revisor</strong> (O usuário tem permissão de fazer revisões das imagens com áudio-descrição)</label></p>

        <div class="w3-container w3-border-top w3-padding-16 w3-light-grey">
          <button class="w3-btn w3-btn-block w3-green">Enviar</button>
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