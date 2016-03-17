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
    }
?>

<script type="text/javascript">
function blocTexto(valor)
{
    quant = 1024;
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
                        <td> <input required class="textfield width-4em" type=number id="nota1" name="nota1" step="0.1" min="0" max="1"></td>
                    </tr> 

                    <tr>
                        <td>Redação adequada do artigo (ortografia, gramática)</td>
                        <td> 0,5</td> 
                        <td><input required class="textfield width-4em" type="number" id="nota2" name="nota2"  step="0.1" min="0" max="0.5"> </td>
                    </tr> 
                    
                    <tr>
                        <td>Formatacão do artigo adequada (normas científicas)</td>         
                        <td>0,5</td> 
                        <td><input required class="textfield width-4em" type=number id="nota3" name="nota3" step="0.1" min="0" max="0.5"></td>
                    </tr>
                    
                    <tr>
                        <td>Coerência na fundamentação, metodologia e desenvolvimento da produção com a temática estabelecida e objetivos propostos</td>
                        <td>4,0</td>    
                        <td><input required class="textfield width-4em" type=number id="nota4" name="nota4" step="0.1" min="0" max="4"> </td>
                    </tr>
                    
                    <tr>
                        <td>Resultados compatíveis com os previstos no cronograma estabelecido na proposta do TGSI</td>
                        <td>1,0 </td>     
                        <td><input required class="textfield width-4em" type=number id="nota5" name="nota5" step="0.1" min="0" max="1"></td>
                    </tr>
                    
                    <tr>
                        <td>Cumprimento das atividades definidas na proposta do TGSI</td>
                        <td>1,0 </td>     
                        <td><input required class="textfield width-4em" type=number id="nota6" name="nota6" step="0.1" min="0" max="1"></td>
                    </tr>
                    
                    <tr>
                        <td>Apresentação perante a banca</td>
                        <td>2,0 </td>     
                        <td><input required class="textfield width-4em" type=number id="nota7" name="nota7" step="0.1" min="0" max="2"> </td>
                    </tr>                            
                </tbody>
            </table>
            
            <br>
            <div class="span11,1">
                <span class="label">Parecer Descritivo Opcional</span>
                <br>
                <div class="">
                    <textarea onkeyup="blocTexto(this.value)" id="texto" name="texto" class="textarea" rows="5" maxlength="1024"></textarea>
                    <ul class="list-h inner-separated pull-right">
                        <li>Restam <span id="cont">1024</span> caracteres</li>
                    </ul>                    
                </div>
                <span id="contadorParecer"></span>  
            </div>
            <br><br>
            <hr>
            <input type="hidden" name="bancaDet" value="<?php echo $detalhe; ?>">
            <div class="form-actions">
                <button class="btn left cancelBtn" id="cancelar" name="cancel" type="button" onclick="parent.location='index.php'">
                    <i class="icon-ban-circle"></i> Cancelar</button>
                <button class="btn left Reset" id="limpar" name="limpar" type="reset">
                    <i class="icon-eraser"></i> Limpar</button>
                <button class="btn right primary saveBtn" id="Salvar" name="save" type="submit">
                    <i class="icon-save"></i> Salvar</button>
            </div> 
        </form>
    </div>
</div>    
          
                                    
<?php include("../rodape.php"); 
  

