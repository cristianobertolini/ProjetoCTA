<?php
    //Define a página como sendo do coordenador para uso restrito
    session_start();
    $_SESSION['categoriaPagina'] = 1;
    include("../restrito.php");
    include("cabecalho.php");
    include("../navbar.php");
    include("navbar-coordenador.php");
    
    include("../include/conexao.php");
    include("../include/funcoes.php");
?>

    <!-- main -->
    <div class="band">
        <div class="container">
            <h2 class="primary stroked-bottom text-shadowed margin-bottom ">Formulário para Definição do Tema e Professor Orientador</h2>
            
            <form id="formRelatorio" action="form-definir-tema-e-orientador.php" method="post"> 
                <div class="row"> 
                    <div class="span2"> 
                        <label class="label" for="ano">Ano<span class="required"></span></label>
                        <br >
                        <input id="ano" name="ano" class="textfield width-100 integer" type="text" required>  
                    </div> 
                    <div class="span3"> 
                        <span class="label">Período<span class="required"></span></span>
                        <br >
                        <select id="semestre" name="semestre" class="textfield width-100" required> 
                            <option value="1" selected>1. Semestre</option>
                            <option value="2">2. Semestre</option>
                        </select>
                    </div>
                </div>               
                
                <div class="form-actions bottom ">            
                    <button class="btn primary gerarBtn" id="gerar" name="gerar" type="submit">
                        <i class="icon-save"></i> Gerar relatório
                    </button>
                </div>
                <br> 
            </form>
        </div>
    </div>
    
<?php include("../rodape.php"); ?>

<?php
    if (!empty($_POST)){
        $ano      = $mysqli->real_escape_string($_POST['ano']);
        $semestre = $mysqli->real_escape_string($_POST['semestre']);
        
        $sqlTurma = 'SELECT t.`tur_codigo`, t.`tur_ano`, t.`tur_semestre`, t.`tur_descricao`, t.`tur_data_proposta`,
	   td.`usu_aluno`, td.`usu_orientador`, td.`usu_coorientador`, td.`tud_titulo`

            FROM `turma` as t 
                    INNER JOIN `turma_detalhe` as td
                    ON t.`tur_codigo` = t.`tur_codigo` 

            WHERE t.`tur_ano` = '.$ano.'
              AND t.`tur_semestre` = '.$semestre;
        
        $queryTurma = $mysqli->query($sqlTurma);
        if(mysqli_num_rows($queryTurma) > 0){
            $corpo = '';
            while ($Resultado = $queryTurma->fetch_assoc()) {
                $corpo = 'oi oi';
            }
            
            if ($corpo != ''){
                gerar_pdf($corpo);
            }
        } 
    }
?>
