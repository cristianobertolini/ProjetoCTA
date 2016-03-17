<?php
    //Define a página como sendo do coordenador para uso restrito
    session_start();
    $_SESSION['categoriaPagina'] = 4;
    include("../restrito.php");
    include("cabecalho.php");
    include("../navbar.php");
    include("./navbar-aluno.php");
    
    include("../include/conexao.php");
?>

    <!-- main -->
    <div class="band">
        <div class="container">
            <h2 class="primary stroked-bottom text-shadowed margin-bottom ">Lista de Arquivos Enviados</h2>
            
            <?php
            $codigoAluno = $_SESSION['UsuarioCOD'];
            
            $sqlArquivo = "SELECT `arq_codigo`, `arq_data`, `arq_hora`, `arq_obs`, `arq_nome`, `arq_nome_original`, `arq_situacao`, 
                            case 
                                when `arq_tipo` = 1 then
                                    'Proposta'
                                when `arq_tipo` = 2 then
                                    'TGSI 1'
                                when `arq_tipo` = 3 then
                                    'TGSI 2'
                                when `arq_tipo` = 4 then
                                    'Proposta Inicial'
                            end as `arq_tipo` 
                            FROM `arquivo`
                            WHERE `usu_aluno` = ".$codigoAluno."
                            ORDER BY `arq_tipo`, `arq_codigo`";
                                                              
            /*retorna a quantidade registros encontrados na consulta acima */
            $queryArquivo = $mysqli->query($sqlArquivo);

            /*se quantidade de linhas maior que zero*/
            if(mysqli_num_rows($queryArquivo) > 0){
                echo '<br>';
                echo '<div id="paginationWrapper">'; 
                echo '    <table class="bordered rounded diced striped hovered shadowed narrow table">'; 
                echo '        <thead class="header">'; 
                echo '            <tr>'; 
                echo '                <th WIDTH="95">Tipo</th>';
                echo '                <th WIDTH="150">Nome</th>'; 
                echo '                <th WIDTH="115">Data</th>'; 
                echo '                <th WIDTH="90">Hora</th>'; 
                echo '                <th>Observação</th>';
                echo '                <th WIDTH="75"></th>';
                echo '            </tr>'; 
                echo '        </thead>';                     
                echo '        <tbody>';                  
                
                while ($Resultado = $queryArquivo->fetch_assoc()) {
                    echo '        <tr data-role="tableRow" data-id="">'; 
                    echo '            <td WIDTH="95">'.$Resultado['arq_tipo'].'</td>'; 
                    echo '            <td WIDTH="150">'.$Resultado['arq_nome_original'].'</td>'; 
                    echo '            <td WIDTH="115">'.date('d/m/Y', strtotime($Resultado['arq_data'])).'</td>';
                    echo '            <td WIDTH="90">'.$Resultado['arq_hora'].'</td>';
                    echo '            <td>'.$Resultado['arq_obs'].'</td>';
                    echo '            <td WIDTH="75"><button class="btn small primary" id="baixar" name="baixar"  type="button" onclick="window.location=\'./uploads/'.$Resultado['arq_nome'].'\'">';
                    echo '                      <i class="icon-download-alt"></i>';
                    echo '                </button></td>';
                    echo '        </tr>';
                }            
                echo '        </tbody>'; 
                echo '    </table>'; 
                echo '</div>';  
            } else {
                echo "<div class='row'><div class='span8'><div class='box error";
                echo "'><button type='button' class='close' data-dismiss='box'>&times;</button>Nenhum arquivo encontrado.";
                echo "</div></div></div>";
                echo '<button class="btn left cancelBtn" id="cancelar" name="cancel" type="button" onclick="parent.location=\'index.php\'">';
                echo '    <i class="icon-arrow-left"></i> Voltar</button>';              
            }
            ?>           
        </div>
    </div>
    
<?php include("../rodape.php"); ?>