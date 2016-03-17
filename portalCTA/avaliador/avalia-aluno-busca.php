<?php
    //Define a página como sendo do coordenador para uso restrito
    session_start();
    $_SESSION['categoriaPagina'] = 3;
    include("../restrito.php");
    include("cabecalho.php");
    include("../navbar.php");
    include("navbar_avaliador.php");
    
    include("../include/conexao.php");
    include("../include/funcoes.php");    
    
    if (!isset($_POST['tipo'])) {
        //echo "<script>location.href='index.php';</script>";
        //die();
    } else {
        $tipo = $mysqli->real_escape_string($_POST['tipo']);;
        
        switch ($tipo){
            case 1: $tipoNome = 'Proposta'; Break; 
            case 2: $tipoNome = 'TGSI1'; Break; 
            case 3: $tipoNome = 'TGSI2'; Break;
            case 4: $tipoNome = 'Proposta Inicial'; Break; 
        }
        
        $aluno     = $mysqli->real_escape_string($_POST['aluno']);
        $alunoNome = BuscaDado('usu_nome', 'usuario', 'usu_codigo = '.$aluno);
        $banca     = $mysqli->real_escape_string($_POST['banca']);
        $detalhe   = $mysqli->real_escape_string($_POST['detalhe']);
        $data      = $mysqli->real_escape_string($_POST['data']);
        $data      = date('d/m/Y', strtotime($data));
        $hora      = $mysqli->real_escape_string($_POST['hora']);
        $hora      = date('H:i', strtotime($hora));
        $local     = $mysqli->real_escape_string($_POST['local']);
        $descricao = $mysqli->real_escape_string($_POST['descricao']);
        $orientadorNome = $alunoNome = BuscaDado('usu_nome', 'usuario', 'usu_codigo = '.$aluno);
        
        $sqlArquivo = "SELECT `arq_codigo`, `arq_nome` 
                        FROM `arquivo` 
                        WHERE `usu_aluno` = $aluno
                          AND `arq_tipo` = $tipo    
                        ORDER BY `arq_data` DESC, `arq_hora` DESC 
                        lIMIT 1";
        $queryArquivo = $mysqli->query($sqlArquivo);
        if(mysqli_num_rows($queryArquivo) > 0){
            $ResultArquivo = $queryArquivo->fetch_assoc();
            $arquivo   = $ResultArquivo['arq_nome'];
            $arqCodigo = $ResultArquivo['arq_codigo'];
        } else {
            $arquivo   = '';
            $arqCodigo = 0;
        }
        
        $sqlNota = "SELECT `bav_codigo`, 
                           `bav_nota1`, 
                           `bav_nota2`, 
                           `bav_nota3`, 
                           `bav_nota4`, 
                           `bav_nota5`, 
                           `bav_nota6`, 
                           `bav_nota7`, 
                           `bav_nota_soma`, 
                           `bav_obs`, 
                           `band_codigo`
                    FROM `banca_detalhe_avaliacao` 
                    WHERE `band_codigo` = $detalhe";
        $queryNota = $mysqli->query($sqlNota);
        $resultNota = $queryNota->fetch_assoc();
        
        $nota1  = $resultNota['bav_nota1'];
        $nota2  = $resultNota['bav_nota2'];
        $nota3  = $resultNota['bav_nota3'];
        $nota4  = $resultNota['bav_nota4'];
        $nota5  = $resultNota['bav_nota5'];
        $nota6  = $resultNota['bav_nota6'];
        $nota7  = $resultNota['bav_nota7'];
        $soma   = $resultNota['bav_nota_soma'];
        $texto  = $resultNota['bav_obs'];
    }
?>

<!-- main -->
<div class="band">
    <div class="container">
        <fieldset class="bordered rounded shadowed margin-bottom"> 
            <legend class="h3 primary text-shadowed no-margin-bottom">Dados do Aluno e <?php echo $tipoNome; ?></legend>
            <div class="row">
                <div class="span5">
                    <span class="label">Aluno</span><br>
                    <label for="nome_aluno"><?php echo $alunoNome; ?></label>
                </div>
                <div class="span2">
                    <span class="label">Tipo de Avaliação</span><br>
                    <label for="tipo_avaliacao"><?php echo $tipoNome; ?></label>
                </div>
                <div class="span2">
                    <span class="label">Data e Hora</span><br>
                    <label for="data"><?php echo $data.' - '.$hora; ?></label>
                </div>
                <div class="span3">
                   <span class="label">Professor(Orientador)</span> <br>
                   <label for="orientador"><?php echo $orientadorNome; ?></label>
                </div>
            </div>

            <div class="row">
                <div class="span9">
                    <span class="label">Título do TGSI</span><br>
                    <label for="tipo_avaliacao"><?php echo $descricao; ?></label>
                    <?php
                        if ($arqCodigo > 0){
                            echo '<br><br>';
                            echo '<button class="btn small" id="baixar" name="baixar"  type="button" onclick="window.open(\'../aluno/uploads/'.$arquivo.'\', \'_blank\')">';
                            echo '    <i class="icon-download-alt"></i> Download do arquivo';
                            echo '</button>';
                        }
                    ?>
                </div>

                <div class="span3">
                    <span class="label">Local</span><br>
                    <label for="data"><?php echo $local; ?></label>    
                </div>
            </div>
        </fieldset> 
        <br>
        <!-- tabela de Avaliacao -->
        <form id="buscaUsuario" action="avalia-aluno-insere.php" method="post">               
            <table class="bordered rounded diced striped hovered shadowed narrow table">
                <h2 class="primary stroked-bottom text-shadowed margin-bottom "> Avaliação de <?php echo $tipoNome; ?></h2>
                <thead class="header"> 
                    <tr>
                        <th> Critério</th> 
                        <th WIDTH="90">Peso</th>
                        <th WIDTH="120">Nota Atribuída</th> 
                    </tr> 
                </thead>
                
                <tbody>
                    <tr>
                        <td>Motivacao e/ou justificativa </td>
                        <td>1,0</td> 
                        <td> <input disabled class="textfield width-4em" type=number id="nota1" name="nota1" value="<?php echo $nota1; ?>"></td>
                    </tr> 

                    <tr>
                        <td>Redação adequada do artigo (ortografia, gramática)</td>
                        <td> 0,5</td> 
                        <td><input disabled class="textfield width-4em" type="number" id="nota2" name="nota2" value="<?php echo $nota2; ?>"> </td>
                    </tr> 
                    
                    <tr>
                        <td>Formatacão do artigo adequada (normas científicas)</td>         
                        <td>0,5</td> 
                        <td><input disabled class="textfield width-4em" type=number id="nota3" name="nota3" value="<?php echo $nota3; ?>"></td>
                    </tr>
                    
                    <tr>
                        <td>Coerência na fundamentação, metodologia e desenvolvimento da produção com a temática estabelecida e objetivos propostos</td>
                        <td>4,0</td>    
                        <td><input disabled class="textfield width-4em" type=number id="nota4" name="nota4" value="<?php echo $nota4; ?>"> </td>
                    </tr>
                    
                    <tr>
                        <td>Resultados compatíveis com os previstos no cronograma estabelecido na proposta do TGSI</td>
                        <td>1,0 </td>     
                        <td><input disabled class="textfield width-4em" type=number id="nota5" name="nota5" value="<?php echo $nota5; ?>"></td>
                    </tr>
                    
                    <tr>
                        <td>Cumprimento das atividades definidas na proposta do TGSI</td>
                        <td>1,0 </td>     
                        <td><input disabled class="textfield width-4em" type=number id="nota6" name="nota6" value="<?php echo $nota6; ?>"></td>
                    </tr>
                    
                    <tr>
                        <td>Apresentação perante a banca</td>
                        <td>2,0 </td>     
                        <td><input disabled class="textfield width-4em" type=number id="nota7" name="nota7" value="<?php echo $nota7; ?>"> </td>
                    </tr>
                    <tr>
                        <td><strong>Nota Final</strong></td>
                        <td><strong>10</strong></td>     
                        <td><span class="label"><strong> <?php echo $soma; ?> </strong></span><br></td>
                    </tr>
                </tbody>
            </table>
            
            <br>
            <div class="span11,1">
                <span class="label">Parecer Descritivo Opcional</span>
                <br>
                <div class="">
                    <textarea disabled id="texto" name="texto" class="textarea" rows="5" maxlength="1024"><?php echo $texto; ?></textarea>                 
                </div>
                <span id="contadorParecer"></span>  
            </div>
            <br><br>
        </form>
    </div>
</div>    
          
                                    
<?php include("../rodape.php"); 
  

