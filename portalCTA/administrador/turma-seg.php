<?php
    //Define a página como sendo do coordenador para uso restrito
    session_start();
    $_SESSION['categoriaPagina'] = 1;
    include("../restrito.php");
    
    include("cabecalho.php");
    include("../navbar.php");
    include("navbar-coordenador.php");
    include("../include/funcoes.php");
    include("../include/conexao.php"); 
   
    if (isset($_POST['ano'])) {
        $ano      = $mysqli->real_escape_string($_POST['ano']); /*pegando os valores do formulario*/
        $semestre = $mysqli->real_escape_string($_POST['semestre']);
    } else {
        echo "<script>location.href='turma.php';</script>";
        $mysqli->Close();
        die();
    }   
    
    /*pega no banco de dados da turma */
    $query = "SELECT  tur_codigo,tur_ano ,tur_semestre,tur_descricao, tur_data_proposta from turma where tur_ano = '$ano' and tur_semestre = '$semestre'";
    /*retorna a quantidade registros encontrados na consulta acima */
    $queryTurma = $mysqli->query($query);
    
    /*se quantidade de linhas maior que zero*/
    if(mysqli_num_rows($queryTurma) > 0){
        $resultado = $queryTurma->fetch_assoc();
        $descricao = $resultado['tur_descricao'];
        $proposta = $resultado['tur_data_proposta'];
        $codigo = $resultado['tur_codigo'];
    } else {
        $descricao = '';
        $proposta = '';
        $codigo = '';            
    }
?>

<div class="band">
    <div class="container">
        <?php
            if (($codigo >= 0) && ($codigo != '')){
                echo "<h2 class='primary stroked-bottom text-shadowed margin-bottom'> Cadastro de Turma - Editando turma</h2>";
            } else {
                echo "<h2 class='primary stroked-bottom text-shadowed margin-bottom'> Cadastro de Turma - Nova turma</h2>";
            }           
        ?>                      
        <br>  
        <!--Formulário-->
        <!--envia dados para insere-turma.php ao clicar em Salvar-->
        <form id="insereTurma" action="insere-turma.php" method="POST">      
            <div class="box shadowed bordered rounded">
                <div class="row">
                    <div class="span4">
                        <span class="label">Ano<span class="required"></span></span><br>
                        <input id="ano" value= "<?php echo $ano ?>" name="ano" class="textfield width-100" type="number" maxlength="150">
                    </div>
                    <div class="span4">
                        <span class="label">Período<span class="required"></span></span><br>
                        <select class="selectfield" id="semestre" name="semestre">
                            <?php
                                if ($semestre == 1){
                                    echo "<option value='1' selected='selected'>1. Semestre</option>";
                                    echo "<option value='2'>2. Semestre</option>";    
                                } else {
                                    echo "<option value='1'>1. Semestre</option>";
                                    echo "<option value='2' selected='selected'>2. Semestre</option>";                                        
                                }
                            ?>
                          </select>
                    </div>

                    <div class="span4">
                        <span class="label">Data de entrega da Proposta<span class="required"></span></span><br>
                        <input id="data" value="<?php echo $proposta ?>" name="data_proposta" value="" class="textfield width-100" type="date" maxlength="150" required>
                    </div>
                </div>

                <div class="row">
                    <div class="span12">
                        <span class="label">Descrição<span class="required"></span></span><br>
                        <input id="descricao" name="descricao" value="<?php echo $descricao ?>" class="textfield width-100" type="text" maxlength="150" required>
                    </div>
                </div>
                <input id="anoInicial" name="anoInicial" class="hidden" type="hidden" value="<?php echo $ano ?>">
                <input id="semestreInicial" name="semestreInicial" class="hidden" type="hidden" value="<?php echo $semestre ?>">
                <input id="codigo" name="codigo" class="hidden" type="hidden" value="<?php echo $codigo ?>">
            </div>            
            <div class="form-actions">
                <button class="btn left cancelBtn" id="cancelar" name="cancel" type="button" onclick="parent.location='index.php'">
                    <i class="icon-ban-circle"></i> Cancelar</button>
                <button class="btn left Reset" id="limpar" name="limpar" type="reset">
                    <i class="icon-eraser"></i> Limpar</button>
                <button class="btn primary saveBtn" id="salvar" name="save" type="submit">
                    <i class="icon-save"></i> Salvar e Continuar</button>
            </div>
        </form>
        
        <?php
            
        ?>
    </div>
</div>
<?php 
    include("../rodape.php");
    $mysqli->Close();
?>


