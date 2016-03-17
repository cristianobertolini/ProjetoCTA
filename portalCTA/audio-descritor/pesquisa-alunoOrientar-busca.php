<?php
    //Define a página como sendo do orientador para uso restrito
    session_start();
    $_SESSION['categoriaPagina'] = 2;
    include("../restrito.php");
    include("cabecalho.php");
    include("../navbar.php");
    include("navbar_orientador.php");
    
    include("../include/conexao.php");
    include("../include/funcoes.php"); 
    
    date_default_timezone_set('America/Sao_Paulo');    
    
    if (!empty($_POST)){
        $ano = $mysqli->real_escape_string($_POST['ano']);
        
        if ($ano != ''){
            $semestre  = $mysqli->real_escape_string($_POST['semestre']);
        } else {
          $semestre = 0; 
        }
        
        if (($ano != '') && ($semestre > 0)){
            $cabecalho = '- '.$semestre.'º Semestre de '.$ano;            
        } else if ($ano != ''){
            $cabecalho = '- Ano de '.$ano;  
        } else {
            $cabecalho = '- Todos';
        }
    } else {
        echo "<script>location.href='pesquisa-alunoOrientar.php';</script>";
        $mysqli->Close();
        die();        
    }
    
    $Orientador = $_SESSION['UsuarioCOD'];
?>
    <!-- main -->
    <div class="band">
        <div class="container">
            <h2 class="primary stroked-bottom text-shadowed margin-bottom "> Pesquisa de alunos orientados <?php echo $cabecalho; ?></h2>
            <!--tabela-->                    
            <?php
                $sqlBusca = "SELECT td.`tud_codigo`, 
                                    td.`tur_codigo`, 
                                    td.`usu_aluno`, 
                                    td.`usu_orientador`, 
                                    td.`usu_coorientador`, 
                                    td.`tud_titulo`,
                                    t.`tur_ano`,
                                    t.`tur_semestre`
                             FROM `turma_detalhe` as td
                                INNER JOIN `turma` as t
                                    ON t.`tur_codigo` = td.`tur_codigo`
                             WHERE `usu_orientador` = ".$Orientador;

                if (($ano != '') && ($semestre > 0)){
                    $sqlBusca = $sqlBusca." AND t.`tur_ano` = $ano
                                            AND t.`tur_semestre` = $semestre";            
                } else if ($ano != ''){
                    $sqlBusca = $sqlBusca." AND t.`tur_ano` = $ano";  
                }
                $sqlBusca = $sqlBusca." ORDER BY t.`tur_ano`, t.`tur_semestre`, td.`usu_aluno`";

                $queryBusca = $mysqli->query($sqlBusca);

                /*se quantidade de encontrada for maior que zero*/
                if(mysqli_num_rows($queryBusca) > 0){
                    echo '<br>';
                    echo '<div id="paginationWrapper">'; 
                    echo '    <table class="bordered rounded diced striped hovered shadowed narrow table">';                             
                    echo '      <thead class="header">';
                    echo '          <tr>';
                    echo '              <th WIDTH="60">Ano</th>';
                    echo '              <th WIDTH="60">Sem.</th>';
                    echo '              <th WIDTH="100">Matrícula</th>'; 
                    echo '              <th WIDTH="200">Aluno</th>'; 
                    echo '              <th>Descrição</th>'; 
                    echo '              <th>E-mail</th>'; 
                    echo '              <th WIDTH="200">Coorientador</th>';                   
                    echo '          </tr>'; 
                    echo '      </thead>';
                    echo '      <tbody>'; 

                    while ($Resultado = $queryBusca->fetch_assoc()) {
                        echo '    <tr data-role="tableRow" data-id="">';
                        echo '        <td WIDTH="60">'.$Resultado['tur_ano'].'</td>';
                        echo '        <td WIDTH="60">'.$Resultado['tur_semestre'].'</td>';
                        echo '        <td WIDTH="100">';
                        echo BuscaDado('USU_MATRICULA', 'usuario', 'usu_codigo = '.$Resultado['usu_aluno']);
                        echo '        </td>';
                        echo '        <td WIDTH="200">';
                        echo BuscaDado('usu_nome', 'usuario', 'usu_codigo = '.$Resultado['usu_aluno']);
                        echo '        </td>';
                        echo '        <td>'.$Resultado['tud_titulo'].'</td>';
                        echo '        <td>';
                        echo BuscaDado('usu_email', 'usuario', 'usu_codigo = '.$Resultado['usu_aluno']);
                        echo '        </td>';
                        echo '        <td WIDTH="200">';
                        echo BuscaDado('usu_nome', 'usuario', 'usu_codigo = '.$Resultado['usu_coorientador']);
                        echo '        </td>';                       
                        echo '    </tr>'; 
                    }
                    echo '        </tbody>'; 
                    echo '    </table>'; 
                    echo '</div>';     
                } else {
                    echo "<div class='row'><div class='span8'><div class='box error";
                    echo "'><button type='button' class='close' data-dismiss='box'>&times;</button>Nada encontrado.";
                    echo "</div></div></div>";                           
                }
            ?>
            <br>
            <button class="btn left" id="voltar" name="voltar" type="button" onclick="parent.location='pesquisa-alunoOrientar.php'"> 
            <i class="icon-arrow-left"></i> Voltar</button> 
        </div>
    </div>
<?php
	include("../rodape.php");
?>