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
    
    if(isset($_GET['Turma'])){
        $descricao = $_GET['Turma'];
    } else {
        $descricao = '';
    }     
    
    if (isset($_SESSION['CodigoTurma'])) {
        $codigoTurma = $_SESSION['CodigoTurma'];
        unset($_SESSION['CodigoTurma']);
    } else {
        echo "<script>location.href='turma.php';</script>";
        $mysqli->Close();
        die();
    } 
?>

<div class="band">
    <div class="container">
        <h2 class='primary stroked-bottom text-shadowed margin-bottom'>Cadastro de Alunos da Turma <?php echo $descricao;?></h2>        
        <br>  
        <!--Formulário-->
        <!--envia dados para turma-aluno-insere.php ao clicar em Inserir-->
        <form id="insereUsuario" action="turma-aluno-insere.php" method="post">
            <div class="box shadowed bordered rounded">
                <div class="row">
                       <div class="span4">
                        <span class="label">Aluno<span class="required"></span></span>
                        <br>
                        <select class="textfield width-100" id="aluno" name="aluno" required>
                            <option value="0" selected=>Todos </option>
                            <?php
                                /*pega no banco de dados da turma */
                                $sqlAluno = "SELECT distinct u.`USU_CODIGO`, u.`USU_NOME`
                                             FROM `usuario` u
                                             INNER JOIN `usuario_categoria` uc
                                                     ON uc.`usu_codigo` = u.`USU_CODIGO`
                                                    AND uc.`cat_codigo` = 4
                                             WHERE u.`USU_SITUACAO` = 0
                                               AND u.`USU_CODIGO` not in (SELECT td.`usu_aluno` FROM `turma_detalhe` as td)";
                                                              
                                /*retorna a quantidade registros encontrados na consulta acima */
                                $queryAluno = $mysqli->query($sqlAluno);

                                /*se quantidade de linhas maior que zero*/
                                if(mysqli_num_rows($queryAluno) > 0){
                                    while ($Aluno = $queryAluno->fetch_assoc()) {
                                        echo '<option value="'.$Aluno['USU_CODIGO'].'">'.$Aluno['USU_NOME'].'</option>';
                                    }    
                                }
                            ?>
                        </select>
                    </div>
                    <div class="span4">
                        <span class="label">Orientador<span class="required"></span></span><br>
                        <select class="textfield width-100" id="orientador" name="orientador" required>
                            <option value=""></option>
                            <?php
                                /*pega no banco de dados da turma */
                                $sqlOrient = "SELECT distinct u.`USU_CODIGO`, u.`USU_NOME`
                                              FROM `usuario` u
                                              INNER JOIN `usuario_categoria` uc
                                                      ON uc.`usu_codigo` = u.`USU_CODIGO`
                                                      AND uc.`cat_codigo` = 2
                                              WHERE u.`USU_SITUACAO` = 0";
                                                              
                                /*retorna a quantidade registros encontrados na consulta acima */
                                $queryOrient = $mysqli->query($sqlOrient);

                                /*se quantidade de linhas maior que zero*/
                                if(mysqli_num_rows($queryOrient) > 0){
                                    while ($Orient = $queryOrient->fetch_assoc()) {
                                        echo '<option value="'.$Orient['USU_CODIGO'].'">'.$Orient['USU_NOME'].'</option>';
                                    }    
                                }
                            ?>
                          </select>
                    </div>
                    <div class="span4">
                        <span class="label">Coorientador</span><br>
                        <select class="textfield width-100" id="coorientador" name="coorientador">
                            <option value=""></option>
                            <?php
                                /*pega no banco de dados da turma */
                                $sqlCoorient = "SELECT distinct u.`USU_CODIGO`, u.`USU_NOME`
                                              FROM `usuario` u
                                              INNER JOIN `usuario_categoria` uc
                                                      ON uc.`usu_codigo` = u.`USU_CODIGO`
                                                      AND uc.`cat_codigo` = 2
                                              WHERE u.`USU_SITUACAO` = 0";
                                                              
                                /*retorna a quantidade registros encontrados na consulta acima */
                                $queryCoorient = $mysqli->query($sqlCoorient);

                                /*se quantidade de linhas maior que zero*/
                                if(mysqli_num_rows($queryCoorient) > 0){
                                    while ($Coorient = $queryCoorient->fetch_assoc()) {
                                        echo '<option value="'.$Coorient['USU_CODIGO'].'">'.$Coorient['USU_NOME'].'</option>';
                                    }    
                                }
                            ?>
                          </select>
                    </div>
                </div>
                <div class="row">
                    <div class="span12">
                        <span class="label">Título TGSI<span class="required"></span></span><br>
                        <input id="titulo" name="titulo" class="textfield width-100" type="text" maxlength="150" required>
                    </div>
                </div>                
                <input id="codigoturma" name="codigoturma" class="hidden" type="hidden" value="<?php echo $codigoTurma ?>">
                <input id="descricao" name="descricao" class="hidden" type="hidden" value="<?php echo $descricao ?>">
                <div class="form-actions">
                    <button class="btn left Reset" id="limpar" name="limpar" type="reset">
                        <i class="icon-eraser"></i> Limpar</button>
                    <button class="btn primary saveBtn" id="salvar" name="save" type="submit">
                        <i class="icon-plus-sign"></i> Inserir</button>
                </div>                        
            </div>
        </form>
        <?php
            /*pega no banco de dados da turma */
            $sqlTurma = "SELECT `tud_codigo`, `usu_aluno`, `usu_orientador`, `usu_coorientador`, `tud_titulo`
                      FROM `turma_detalhe` WHERE `tur_codigo` = $codigoTurma";
            /*retorna a quantidade registros encontrados na consulta acima */
            $queryTurma = $mysqli->query($sqlTurma);
            
            /*se quantidade de linhas maior que zero*/
            if(mysqli_num_rows($queryTurma) > 0){
                echo '<br>';
                echo '<div id="paginationWrapper">'; 
                echo '    <table class="bordered rounded diced striped hovered shadowed narrow table">'; 
                echo '        <thead class="header">'; 
                echo '            <tr>'; 
                echo '                <th WIDTH="150">Aluno</th>'; 
                echo '                <th WIDTH="150">Orientador</th>'; 
                echo '                <th WIDTH="150">Coorientador</th>'; 
                echo '                <th>Título TGSI</th>';
                echo '                <th WIDTH="90"></th>';
                echo '            </tr>'; 
                echo '        </thead>';                     
                echo '        <tbody>';                
                while ($Linha = $queryTurma->fetch_assoc()) { 
                    echo '        <tr data-role="tableRow" data-id="">'; 
                    echo '            <td WIDTH="150">';
                    echo BuscaDado('usu_nome', 'usuario', 'usu_codigo = '.$Linha['usu_aluno']);
                    echo              '</td>'; 
                    echo '            <td WIDTH="150">';
                    echo BuscaDado('usu_nome', 'usuario', 'usu_codigo = '.$Linha['usu_orientador']);
                    echo              '</td>'; 
                    echo '            <td WIDTH="150">';
                    echo BuscaDado('usu_nome', 'usuario', 'usu_codigo = '.$Linha['usu_coorientador']); 
                    echo              '</td>'; 
                    echo '            <td>'.$Linha['tud_titulo'].'</td>';
                    echo              '</td>';
                    echo              '<td WIDTH="90"><div class="btn-group mini">';
                    echo              '<button type="button" class="btn error" onclick="excluir('.$Linha['usu_aluno'].','.$codigoTurma.',\''.$descricao.'\')"><i class="icon-minus-sign-alt"></i> Excluir</button></div></td>';
                    echo '        </tr>';
                }            
                echo '        </tbody>'; 
                echo '    </table>'; 
                echo '</div>';                        
            } else {
                    echo "<br><div class='row'><div class='span8'><div class='box warning";
                    echo "'><button type='button' class='close' data-dismiss='box'>&times;</button>";
                    echo 'Turma ainda não possui alunos.';
                    echo "</div></div></div>";                
            }
        ?>      
    </div>
</div>

<script>
    function excluir(CodAluno, CodTurma, DescTurma){
        var resposta = confirm("Tem certeza que deseja remover esse registro?");
        if (resposta == true) {
            window.location.href = "turma-aluno-remover.php?id="+CodAluno+"&cod="+CodTurma+"&desc="+DescTurma;
        }        
    }
</script>
<?php
    include("../rodape.php");
    $mysqli->Close();
?>


