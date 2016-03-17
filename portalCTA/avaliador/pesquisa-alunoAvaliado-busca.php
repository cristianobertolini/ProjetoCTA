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
        echo "<script>location.href='pesquisa-alunoAvaliado.php';</script>";
        $mysqli->Close();
        die();        
    }
    
    $Avaliador = $_SESSION['UsuarioCOD'];
?>
    <!-- main -->
    <div class="band">
        <div class="container">
            <h2 class="primary stroked-bottom text-shadowed margin-bottom "> Pesquisa de alunos avaliados <?php echo $cabecalho; ?></h2>
            <!--tabela-->
            <?php
                $sqlBusca = "SELECT b.`ban_codigo`, 
                                    b.`ban_tipo`, 
                                    b.`ban_data`, 
                                    b.`ban_descricao`, 
                                    b.`ban_local`, 
                                    b.`usu_codigo`, 
                                    b.`tur_codigo`, 
                                    b.`ban_hora`,
                                    db.`band_codigo`, 
                                    db.`ban_codigo` 

                                    FROM `banca_detalhe` as db 
                                        INNER JOIN `banca_detalhe_avaliacao` as bav
                                            ON db.`band_codigo` = bav.`band_codigo`
                                        INNER JOIN `banca` as b
                                            ON b.`ban_codigo` = db.`ban_codigo`

                                    WHERE db.`usu_codigo` = ".$Avaliador."
                                        AND bav.`bav_codigo` > 0";

                if (($ano != '') && ($semestre > 0)){
                    $sqlBusca = $sqlBusca." AND b.`usu_codigo`IN (SELECT  td.`usu_aluno`
                        FROM `turma_detalhe` as td 
                            INNER JOIN `turma` as t
                                ON t.`tur_codigo` = td.`tur_codigo`
                        WHERE t.`tur_ano` = $ano
                            AND t.`tur_semestre` = $semestre)";            
                } else if ($ano != ''){
                    $sqlBusca = $sqlBusca." AND b.`usu_codigo`IN (SELECT  td.`usu_aluno`
                        FROM `turma_detalhe` as td 
                            INNER JOIN `turma` as t
                                ON t.`tur_codigo` = td.`tur_codigo`
                        WHERE t.`tur_ano` = $ano)";  
                }

                $sqlBusca = $sqlBusca." ORDER BY b.`ban_data`, b.`ban_hora`, b.`ban_tipo`";                        

                $queryBusca = $mysqli->query($sqlBusca);

                /*se quantidade de encontrada for maior que zero*/
                if(mysqli_num_rows($queryBusca) > 0){
                    echo '<br>';
                    echo '<div id="paginationWrapper">'; 
                    echo '    <table class="bordered rounded diced striped hovered shadowed narrow table">';                              
                    echo '        <thead class="header">';
                    echo '            <tr>';
                    echo '                <th WIDTH="110">Data</th>';
                    echo '                <th WIDTH="90">Hora</th>';
                    echo '                <th WIDTH="200">Aluno</th>'; 
                    echo '                <th>Descrição</th>'; 
                    echo '                <th>Local</th>'; 
                    echo '                <th WIDTH="140"></th>'; 
                    echo '            </tr>'; 
                    echo '        </thead>';
                    echo '        <tbody>'; 
                    while ($Resultado = $queryBusca->fetch_assoc()) {
                        echo '        <tr data-role="tableRow" data-id="">';
                        echo '            <td WIDTH="110">'.date('d/m/Y', strtotime($Resultado['ban_data'])).'</td>';
                        echo '            <td WIDTH="90">'.$Resultado['ban_hora'].'</td>';
                        echo '            <td WIDTH="200">';
                        echo BuscaDado('usu_nome', 'usuario', 'usu_codigo = '.$Resultado['usu_codigo']);
                        echo '            </td>';
                        echo '            <td>'.$Resultado['ban_descricao'].'</td>';
                        echo '            <td>'.$Resultado['ban_local'].'</td>';
                        echo '            <td WIDTH="140">';
                        echo '                <div class="align-center align-center-phone">';                         
                        echo '                    <form name="avaliar" method="POST" action="avalia-aluno-busca.php">';                              
                        echo '                        <input type="hidden" name="aluno" value="'.$Resultado['usu_codigo'].'">';
                        echo '                        <input type="hidden" name="banca" value="'.$Resultado['ban_codigo'].'">';
                        echo '                        <input type="hidden" name="detalhe" value="'.$Resultado['band_codigo'].'">';
                        echo '                        <input type="hidden" name="tipo" value="'.$Resultado['ban_tipo'].'">';
                        echo '                        <input type="hidden" name="data" value="'.$Resultado['ban_data'].'">';
                        echo '                        <input type="hidden" name="hora" value="'.$Resultado['ban_hora'].'">';
                        echo '                        <input type="hidden" name="local" value="'.$Resultado['ban_local'].'">';
                        echo '                        <input type="hidden" name="descricao" value="'.$Resultado['ban_descricao'].'">';
                        echo '                        <button class="btn primary gerarBtn small" id="gerar" name="gerar"  type="Submit">';
                        echo '                            <i class="icon-search"></i> Visualizar';
                        echo '                        </button>';                                         
                        echo '                    </form>';
                        echo '                </div>';
                        echo '            </td>'; 
                        echo '        </tr>';
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
            <button class="btn left" id="voltar" name="voltar" type="button" onclick="parent.location='pesquisa-alunoAvaliado.php'"> 
            <i class="icon-arrow-left"></i> Voltar</button> 
        </div>
    </div>

<?php
	include("../rodape.php");
?>